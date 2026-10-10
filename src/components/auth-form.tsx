import { Link } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

type Props = { mode: 'sign-in' | 'sign-up' };

function getValidationMessage(email: string, password: string, isSignUp: boolean) {
  if (!email.trim()) return 'Enter your email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.';
  if (!password) return 'Enter your password.';
  if (isSignUp && password.length < 8) return 'Use a password with at least 8 characters.';
  return null;
}

function getAuthErrorMessage(error: unknown, isSignUp: boolean) {
  const message = error instanceof Error ? error.message.toLowerCase() : '';
  const code = typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string'
    ? error.code.toLowerCase()
    : '';
  const status = typeof error === 'object' && error !== null && 'status' in error ? error.status : undefined;

  if (
    code === 'weak_password' ||
    (message.includes('password') && (message.includes('weak') || message.includes('at least')))
  ) {
    return 'Choose a stronger password with at least 8 characters.';
  }
  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'Confirm your email address before signing in.';
  }
  if (
    isSignUp &&
    (code === 'user_already_exists' || code === 'email_exists' || message.includes('already registered'))
  ) {
    return 'An account with this email already exists. Try signing in instead.';
  }
  if (
    code === 'invalid_credentials' ||
    code === 'invalid_grant' ||
    (status === 400 && !isSignUp)
  ) {
    return 'The email or password is incorrect. Check your details and try again.';
  }
  if (
    (error instanceof TypeError && /fetch|network/i.test(error.message)) ||
    /failed to fetch|load failed|network request failed|network error/i.test(message)
  ) {
    return 'Unable to connect. Check your internet connection and try again.';
  }
  return isSignUp
    ? 'Unable to create your account right now. Please try again.'
    : 'Unable to sign in right now. Check your details and try again.';
}

export default function AuthForm({ mode }: Props) {
  const colors = useTheme();
  const isSignUp = mode === 'sign-up';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setNotice(null);
    const validationMessage = getValidationMessage(email, password, isSignUp);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (isSignUp) {
        const name = fullName.trim();
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: name ? { full_name: name } : {},
          },
        });
        if (signUpError) throw signUpError;
        if (!data.session) {
          setNotice('Check your email to confirm your account, then return here to sign in.');
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (signInError) throw signInError;
      }
    } catch (submitError) {
      setError(getAuthErrorMessage(submitError, isSignUp));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={[styles.card, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
            <View style={[styles.brandMark, { backgroundColor: colors.primary }]}>
              <Text style={styles.brandInitials}>T</Text>
            </View>
            <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>YOUR WORK, YOUR STORY</Text>
            <Text style={[styles.title, { color: colors.text }]}>
              {isSignUp ? 'Create your account' : 'Welcome back'}
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {isSignUp
                ? 'Start building a professional profile around your experience.'
                : 'Sign in to continue to your TruHire profile.'}
            </Text>

            {isSignUp && (
              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Full name <Text style={{ color: colors.textSecondary }}>(optional)</Text></Text>
                <TextInput
                  autoCapitalize="words"
                  autoComplete="name"
                  maxLength={100}
                  onChangeText={setFullName}
                  placeholder="Your full name"
                  placeholderTextColor={colors.textSecondary}
                  returnKeyType="next"
                  style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                  value={fullName}
                />
              </View>
            )}

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={colors.textSecondary}
                returnKeyType="next"
                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                textContentType="emailAddress"
                value={email}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Password</Text>
              <TextInput
                autoCapitalize="none"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                onChangeText={setPassword}
                onSubmitEditing={submit}
                placeholder={isSignUp ? 'At least 8 characters' : 'Your password'}
                placeholderTextColor={colors.textSecondary}
                returnKeyType="go"
                secureTextEntry
                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                textContentType={isSignUp ? 'newPassword' : 'password'}
                value={password}
              />
            </View>

            {error && <Text accessibilityLiveRegion="polite" style={[styles.message, { color: '#B42318' }]}>{error}</Text>}
            {notice && <Text accessibilityLiveRegion="polite" style={[styles.message, { color: colors.primary }]}>{notice}</Text>}

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: isSubmitting }}
              disabled={isSubmitting}
              onPress={submit}
              style={({ pressed }) => [styles.submitButton, { backgroundColor: colors.primary }, pressed && !isSubmitting && styles.pressed, isSubmitting && styles.disabled]}>
              {isSubmitting
                ? <ActivityIndicator color="#FFFFFF" />
                : <Text style={styles.submitText}>{isSignUp ? 'Create account' : 'Sign in'}</Text>}
            </Pressable>

            <View style={styles.switchRow}>
              <Text style={[styles.switchText, { color: colors.textSecondary }]}>
                {isSignUp ? 'Already have an account?' : 'New to TruHire?'}
              </Text>
              <Link href={isSignUp ? '/sign-in' : '/sign-up'} asChild>
                <Pressable accessibilityRole="link" disabled={isSubmitting}>
                  <Text style={[styles.linkText, { color: colors.primary }]}>{isSignUp ? 'Sign in' : 'Create account'}</Text>
                </Pressable>
              </Link>
            </View>
          </View>
          <Text style={[styles.footer, { color: colors.textSecondary }]}>Built around your experience. Shared on your terms.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 22, gap: 18 },
  card: { width: '100%', maxWidth: 440, borderWidth: 1, borderRadius: 24, padding: 24, gap: 16 },
  brandMark: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  brandInitials: { color: '#FFFFFF', fontSize: 22, fontWeight: '800' },
  eyebrow: { fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 2 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800', letterSpacing: -0.5, marginTop: -9 },
  description: { fontSize: 14, lineHeight: 21, marginTop: -8 },
  fieldGroup: { gap: 7 },
  label: { fontSize: 13, fontWeight: '700' },
  input: { minHeight: 50, borderWidth: 1, borderRadius: 13, paddingHorizontal: 14, fontSize: 15 },
  message: { fontSize: 13, lineHeight: 19 },
  submitButton: { minHeight: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  submitText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  disabled: { opacity: 0.65 },
  pressed: { opacity: 0.82 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, flexWrap: 'wrap' },
  switchText: { fontSize: 13 },
  linkText: { fontSize: 13, fontWeight: '700', paddingVertical: 4 },
  footer: { fontSize: 12, textAlign: 'center' },
});
