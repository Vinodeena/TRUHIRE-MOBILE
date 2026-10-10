import PlaceholderScreen from '@/components/placeholder-screen';
import { useAuth } from '@/auth/auth-provider';

export default function ProfileScreen() {
  const { profile, isProfileLoading, profileError } = useAuth();
  const description = profileError
    ? 'Your account is signed in, but your profile could not be loaded.'
    : isProfileLoading
      ? 'Loading your profile…'
      : profile?.full_name
        ? `Welcome, ${profile.full_name}. Your professional profile is managed here.`
        : 'Profile tools are not available yet. Your professional profile will be managed here in a future update.';

  return (
    <PlaceholderScreen
      title="My Profile"
      description={description}
      note={profileError
        ? 'Check your connection and try again. Profile access depends on your account permissions.'
        : 'Your profile details are connected to your signed-in account.'}
    />
  );
}
