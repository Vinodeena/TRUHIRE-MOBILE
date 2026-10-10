import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAuth } from '@/auth/auth-provider';
import PlaceholderScreen from '@/components/placeholder-screen';
import { useTheme } from '@/hooks/use-theme';

export default function SettingsScreen() {
  const colors = useTheme();
  const { signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setError(null);
    try {
      await signOut();
    } catch (signOutError) {
      setError(signOutError instanceof Error ? signOutError.message : 'Unable to sign out. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <PlaceholderScreen
      title="Settings"
      description="Settings are not available yet. This screen is a placeholder for a future update."
      note="Sign out to end your session on this device."
      footer={(
        <View style={styles.actions}>
          {error && <Text accessibilityLiveRegion="polite" style={[styles.error, { color: '#B42318' }]}>{error}</Text>}
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ disabled: isSigningOut }}
            disabled={isSigningOut}
            onPress={handleSignOut}
            style={({ pressed }) => [styles.button, { backgroundColor: colors.primary }, pressed && !isSigningOut && styles.pressed, isSigningOut && styles.disabled]}>
            {isSigningOut
              ? <ActivityIndicator color="#FFFFFF" />
              : <Text style={styles.buttonText}>Sign out</Text>}
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  actions: { width: '100%', gap: 10, marginTop: 8 },
  error: { fontSize: 13, lineHeight: 19 },
  button: { minHeight: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  disabled: { opacity: 0.65 },
  pressed: { opacity: 0.82 },
});
