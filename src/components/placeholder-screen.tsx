import type { ReactNode } from 'react';
import { useColorScheme, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, MaxContentWidth } from '@/constants/theme';

type Props = { title: string; description: string; note?: string; footer?: ReactNode };

export default function PlaceholderScreen({ title, description, note, footer }: Props) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.mark, { backgroundColor: colors.primary }]}><Text style={styles.markText}>T</Text></View>
        <Text style={[styles.eyebrow, { color: colors.textSecondary }]}>TRUHIRE</Text>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
        {footer}
        <View style={[styles.note, { backgroundColor: colors.backgroundSelected, borderColor: colors.border }]}>
          <Text style={[styles.noteText, { color: colors.textSecondary }]}>{note ?? 'Tools on this screen are a preview and are not available yet.'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: { flex: 1, width: '100%', maxWidth: MaxContentWidth, alignSelf: 'center', justifyContent: 'center', padding: 28, gap: 12 },
  mark: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  markText: { color: '#FFFFFF', fontSize: 23, fontWeight: '800' },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.6 },
  title: { fontSize: 29, lineHeight: 36, fontWeight: '800', letterSpacing: -0.6 },
  description: { fontSize: 15, lineHeight: 23 },
  note: { borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 12 },
  noteText: { fontSize: 13, lineHeight: 19 },
});
