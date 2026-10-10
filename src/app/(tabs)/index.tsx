import { Link } from 'expo-router';
import { useColorScheme, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset, Colors, MaxContentWidth, Spacing } from '@/constants/theme';

const shortcuts = [
  { title: 'Employment history', detail: 'Your roles and experience', icon: '01', href: '/work-history' as const },
  { title: 'Skills', detail: 'Strengths you bring to work', icon: '02', href: '/profile' as const },
  { title: 'Achievements', detail: 'Milestones worth sharing', icon: '03', href: '/profile' as const },
];

export default function HomeScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={[styles.brandMark, { backgroundColor: colors.primary }]}><Text style={styles.brandInitials}>T</Text></View>
            <Text style={[styles.brandName, { color: colors.text }]}>TruHire</Text>
          </View>
          <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>YOUR WORK, YOUR STORY</Text>
          <Text style={[styles.welcome, { color: colors.text }]}>Welcome to your next step.</Text>
          <Text style={[styles.subheading, { color: colors.textSecondary }]}>A place to bring your experience and skills together.</Text>
        </View>

        <View style={[styles.profileCard, { backgroundColor: colors.primary }]}>
          <View style={styles.profileCardTop}>
            <View style={styles.profileBadge}><Text style={styles.profileBadgeText}>TH</Text></View>
            <View style={styles.profileLabel}><Text style={styles.profileLabelText}>YOUR PROFESSIONAL PROFILE</Text></View>
          </View>
          <Text style={styles.profileTitle}>Your experience deserves to be seen.</Text>
          <Text style={styles.profileDescription}>Bring your work history, skills and achievements together in one professional profile.</Text>
          <Link href="/profile" asChild>
            <Pressable accessibilityRole="button" style={styles.profileButton}>
              <Text style={[styles.profileButtonText, { color: colors.primary }]}>Explore my profile</Text>
              <Text style={[styles.profileButtonText, { color: colors.primary }]}>→</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.sectionHeader}>
          <View><Text style={[styles.sectionTitle, { color: colors.text }]}>Your work story</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>The details that make you, you.</Text></View>
        </View>
        <View style={styles.shortcutList}>
          {shortcuts.map((item) => (
            <Link key={item.title} href={item.href} asChild>
              <Pressable
                accessibilityRole="button"
                style={StyleSheet.flatten([
                  styles.shortcut,
                  { backgroundColor: colors.backgroundElement, borderColor: colors.border },
                ])}>
                <View style={[styles.shortcutIcon, { backgroundColor: colors.backgroundSelected }]}><Text style={[styles.shortcutIconText, { color: colors.primary }]}>{item.icon}</Text></View>
                <View style={styles.shortcutCopy}>
                  <Text style={[styles.shortcutTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.shortcutDetail, { color: colors.textSecondary }]}>{item.detail}</Text>
                </View>
                <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
              </Pressable>
            </Link>
          ))}
        </View>

        <View style={[styles.shareCard, { backgroundColor: colors.backgroundSelected, borderColor: colors.border }]}>
          <View style={styles.shareCopy}>
            <Text style={[styles.shareTitle, { color: colors.text }]}>Ready to share your profile?</Text>
            <Text style={[styles.shareDetail, { color: colors.textSecondary }]}>Profile sharing is coming soon.</Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: true }} disabled style={[styles.shareButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.shareButtonText}>Share profile · coming soon</Text>
          </Pressable>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.backgroundElement, borderColor: colors.border }]}>
          <View style={[styles.infoMark, { backgroundColor: colors.accent }]}><Text style={styles.infoMarkText}>✓</Text></View>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Why a verified work history matters</Text>
          <Text style={[styles.infoBody, { color: colors.textSecondary }]}>A reliable record of your experience can help employers understand the work you have done and the skills you have built. Verification features are not available yet.</Text>
        </View>
        <Text style={[styles.footer, { color: colors.textSecondary }]}>Built around your experience. Shared on your terms.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', paddingHorizontal: 22, paddingTop: 16, paddingBottom: BottomTabInset + Spacing.four, gap: 24 },
  header: { gap: 8 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  brandMark: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  brandInitials: { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  brandName: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5 },
  welcome: { fontSize: 27, lineHeight: 33, fontWeight: '800', letterSpacing: -0.7 },
  subheading: { fontSize: 15, lineHeight: 22 },
  profileCard: { borderRadius: 24, padding: 22, gap: 14 },
  profileCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  profileBadge: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center' },
  profileBadgeText: { color: '#FFFFFF', fontWeight: '800', fontSize: 14 },
  profileLabel: { backgroundColor: 'rgba(168,226,210,0.18)', borderRadius: 20, paddingHorizontal: 11, paddingVertical: 7 },
  profileLabelText: { color: '#C8F1E5', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  profileTitle: { color: '#FFFFFF', fontSize: 23, lineHeight: 29, fontWeight: '800', letterSpacing: -0.4, maxWidth: 290 },
  profileDescription: { color: '#D2E5E1', fontSize: 14, lineHeight: 21 },
  profileButton: { minHeight: 48, marginTop: 3, backgroundColor: '#FFFFFF', borderRadius: 14, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  profileButtonText: { fontWeight: '700', fontSize: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  sectionSubtitle: { fontSize: 13, marginTop: 4 },
  shortcutList: { gap: 10, marginTop: -12 },
  shortcut: { minHeight: 76, borderWidth: 1, borderRadius: 17, paddingHorizontal: 13, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 13 },
  shortcutIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  shortcutIconText: { fontSize: 12, fontWeight: '800', letterSpacing: 0.3 },
  shortcutCopy: { flex: 1, gap: 4 },
  shortcutTitle: { fontSize: 15, fontWeight: '700' },
  shortcutDetail: { fontSize: 12 },
  chevron: { fontSize: 25, marginRight: 2 },
  shareCard: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 14 },
  shareCopy: { gap: 5 },
  shareTitle: { fontSize: 16, fontWeight: '700' },
  shareDetail: { fontSize: 13 },
  shareButton: { minHeight: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center', opacity: 0.72 },
  shareButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  infoCard: { borderWidth: 1, borderRadius: 18, padding: 18, gap: 10 },
  infoMark: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  infoMarkText: { color: '#123F46', fontSize: 16, fontWeight: '800' },
  infoTitle: { fontSize: 16, lineHeight: 22, fontWeight: '700' },
  infoBody: { fontSize: 13, lineHeight: 20 },
  footer: { textAlign: 'center', fontSize: 12, paddingBottom: 4 },
});
