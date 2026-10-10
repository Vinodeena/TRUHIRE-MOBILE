import type { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { supabase } from '@/lib/supabase';

export type Profile = {
  id: string;
  full_name: string | null;
};

type AuthContextValue = {
  session: Session | null;
  isLoading: boolean;
  profile: Profile | null;
  isProfileLoading: boolean;
  profileError: string | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}

async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Profile | null;
}

async function populateMissingProfileName(user: User, profile: Profile): Promise<Profile> {
  const nameFromMetadata = user.user_metadata?.full_name;
  const fullName = typeof nameFromMetadata === 'string' ? nameFromMetadata.trim() : '';
  if (!fullName || profile.full_name?.trim()) return profile;

  const update = supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id);
  const { data, error } = profile.full_name === null
    ? await update.is('full_name', null).select('id, full_name').maybeSingle()
    : await update.eq('full_name', profile.full_name).select('id, full_name').maybeSingle();

  if (error) throw new Error(error.message);
  if (data) return data as Profile;

  // A concurrent initializer may have filled the name between our read and update.
  const latestProfile = await getProfile(user.id);
  if (latestProfile?.full_name?.trim()) return latestProfile;
  throw new Error('Unable to update the profile name.');
}

async function loadOrCreateProfile(user: User): Promise<Profile> {
  const existingProfile = await getProfile(user.id);
  if (existingProfile) return populateMissingProfileName(user, existingProfile);

  const nameFromMetadata = user.user_metadata?.full_name;
  const fullName = typeof nameFromMetadata === 'string' ? nameFromMetadata.trim() : '';
  const profileData = {
    id: user.id,
    ...(fullName ? { full_name: fullName } : {}),
  };

  const { data: createdProfile, error: createError } = await supabase
    .from('profiles')
    .insert(profileData)
    .select('id, full_name')
    .single();

  if (createError) {
    if (createError.code === '23505') {
      const concurrentProfile = await getProfile(user.id);
      if (concurrentProfile) return populateMissingProfileName(user, concurrentProfile);
    }
    throw new Error(createError.message);
  }
  return createdProfile as Profile;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let receivedAuthStateChange = false;
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      receivedAuthStateChange = true;
      setSession(nextSession);
      setProfile((currentProfile) => currentProfile?.id === nextSession?.user.id ? currentProfile : null);
      setProfileError(null);
      setIsProfileLoading(Boolean(nextSession));
      setIsLoading(false);
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active || receivedAuthStateChange) return;
      if (error) setProfileError(error.message);
      setSession(data.session);
      setProfile((currentProfile) => currentProfile?.id === data.session?.user.id ? currentProfile : null);
      setIsProfileLoading(Boolean(data.session));
      setIsLoading(false);
    }).catch((error: unknown) => {
      if (!active || receivedAuthStateChange) return;
      setProfileError(error instanceof Error ? error.message : 'Unable to restore your session.');
      setIsLoading(false);
    });

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (!session) return;

    void loadOrCreateProfile(session.user).then((nextProfile) => {
      if (active) setProfile(nextProfile);
    }).catch((error: unknown) => {
      if (active) {
        setProfile(null);
        setProfileError(error instanceof Error ? error.message : 'Unable to load your profile.');
      }
    }).finally(() => {
      if (active) setIsProfileLoading(false);
    });

    return () => {
      active = false;
    };
  }, [session]);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    isLoading,
    profile,
    isProfileLoading,
    profileError,
    signOut: async () => {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw new Error(error.message);
    },
  }), [session, isLoading, profile, isProfileLoading, profileError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
