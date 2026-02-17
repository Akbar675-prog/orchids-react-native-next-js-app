import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { MODELS } from '@/lib/config';
import {
  CpuIcon,
  ZapIcon,
  ShieldCheckIcon,
  CodeIcon,
  HeartIcon,
  GlobeIcon,
  ShieldIcon,
  LockIcon,
  DatabaseIcon,
  SearchIcon,
  TerminalIcon,
  BrainIcon,
  RocketIcon,
  LayersIcon,
} from 'lucide-react-native';

export default function AboutScreen() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'dark'];
  const isDark = colorScheme === 'dark';

  const stats = [
    { label: 'AI Models', value: '50+', Icon: CpuIcon, color: '#0891b2' },
    { label: 'Response Time', value: '< 2s', Icon: ZapIcon, color: '#d97706' },
    { label: 'Data Security', value: '100%', Icon: ShieldCheckIcon, color: '#059669' },
    { label: 'Open Source', value: 'AOSP', Icon: CodeIcon, color: '#e11d48' },
  ];

  const securityFeatures = [
    {
      title: 'End-to-End Encryption',
      desc: 'Setiap percakapan dienkripsi menggunakan protokol TLS terbaru.',
      Icon: LockIcon,
      color: '#2563eb',
    },
    {
      title: 'Supabase Infrastructure',
      desc: 'Infrastruktur cloud terdistribusi dengan kepatuhan SOC2.',
      Icon: DatabaseIcon,
      color: '#059669',
    },
    {
      title: 'Isolated Logic',
      desc: 'Eksekusi logika dalam lingkungan terisolasi untuk mencegah intrusi.',
      Icon: ShieldCheckIcon,
      color: '#e11d48',
    },
  ];

  const cardBg = isDark ? '#1a1a2e' : '#f1f5f9';
  const cardBorder = isDark ? '#2a2a3e' : '#e2e8f0';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="items-center px-6 pt-12 pb-8">
          <View
            className="mb-6 h-20 w-20 items-center justify-center rounded-3xl"
            style={{ backgroundColor: cardBg }}
          >
            <BrainIcon size={40} color="#0891b2" />
          </View>
          <Text
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#0891b2' }}
          >
            The Future of Intelligence
          </Text>
          <Text
            className="mt-3 text-center text-4xl font-black tracking-tighter"
            style={{ color: theme.foreground }}
          >
            Visora{'\n'}
            <Text style={{ color: '#0891b2' }}>Professional</Text> AI.
          </Text>
          <Text
            className="mt-4 max-w-md text-center text-base leading-6"
            style={{ color: theme.mutedForeground }}
          >
            Definisi baru interaksi kecerdasan buatan. Satu platform, puluhan model,
            privasi mutlak, dan kecepatan tanpa kompromi.
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row flex-wrap justify-center gap-3 px-4">
          {stats.map((stat, idx) => (
            <View
              key={idx}
              className="w-[45%] items-center rounded-2xl p-5"
              style={{ backgroundColor: cardBg, borderColor: cardBorder, borderWidth: 1 }}
            >
              <stat.Icon size={22} color={stat.color} />
              <Text
                className="mt-2 text-xs font-bold uppercase tracking-wider"
                style={{ color: theme.mutedForeground }}
              >
                {stat.label}
              </Text>
              <Text
                className="mt-1 text-2xl font-black"
                style={{ color: theme.foreground }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Vision */}
        <View className="mt-12 px-6">
          <Text
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#0891b2' }}
          >
            Visi & Filosofi
          </Text>
          <Text
            className="mt-3 text-2xl font-black tracking-tight"
            style={{ color: theme.foreground }}
          >
            Evolusi Kecerdasan Digital.
          </Text>
          <Text
            className="mt-4 text-base leading-7"
            style={{ color: theme.mutedForeground }}
          >
            Visora lahir dari sebuah pertanyaan sederhana:{' '}
            <Text className="font-bold italic" style={{ color: theme.foreground }}>
              "Bagaimana jika AI tidak lagi terfragmentasi?"
            </Text>{' '}
            Kami percaya bahwa setiap pengguna berhak mendapatkan model terbaik untuk
            setiap tugas.
          </Text>

          <View className="mt-6 flex-row gap-3">
            <View
              className="flex-1 rounded-2xl border-l-4 p-5"
              style={{
                backgroundColor: cardBg,
                borderLeftColor: '#d97706',
              }}
            >
              <ZapIcon size={24} color="#d97706" />
              <Text className="mt-2 text-sm font-black uppercase" style={{ color: theme.foreground }}>
                Ultra-Fast
              </Text>
              <Text className="mt-1 text-xs" style={{ color: theme.mutedForeground }}>
                Respons di bawah 2 detik untuk setiap query.
              </Text>
            </View>
            <View
              className="flex-1 rounded-2xl border-l-4 p-5"
              style={{
                backgroundColor: cardBg,
                borderLeftColor: '#0891b2',
              }}
            >
              <GlobeIcon size={24} color="#0891b2" />
              <Text className="mt-2 text-sm font-black uppercase" style={{ color: theme.foreground }}>
                Deep Context
              </Text>
              <Text className="mt-1 text-xs" style={{ color: theme.mutedForeground }}>
                Pencarian web real-time untuk akurasi data terbaru.
              </Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View className="mt-12 px-6">
          <View className="flex-row items-center gap-2 rounded-xl p-4" style={{ backgroundColor: cardBg }}>
            <LayersIcon size={24} color="#0891b2" />
            <View>
              <Text className="font-black text-sm uppercase" style={{ color: theme.foreground }}>
                Multi-Model Agility
              </Text>
              <Text className="text-xs" style={{ color: theme.mutedForeground }}>
                GPT-4, Claude, DeepSeek, Llama.
              </Text>
            </View>
          </View>
          <View className="mt-3 flex-row items-center gap-2 rounded-xl p-4" style={{ backgroundColor: cardBg }}>
            <SearchIcon size={24} color="#059669" />
            <View>
              <Text className="font-black text-sm uppercase" style={{ color: theme.foreground }}>
                Real-time Synthesis
              </Text>
              <Text className="text-xs" style={{ color: theme.mutedForeground }}>
                Data web terkini dalam satu klik.
              </Text>
            </View>
          </View>
          <View className="mt-3 flex-row items-center gap-2 rounded-xl p-4" style={{ backgroundColor: cardBg }}>
            <TerminalIcon size={24} color="#e11d48" />
            <View>
              <Text className="font-black text-sm uppercase" style={{ color: theme.foreground }}>
                Developer Centric
              </Text>
              <Text className="text-xs" style={{ color: theme.mutedForeground }}>
                Advanced Neural Processing.
              </Text>
            </View>
          </View>
        </View>

        {/* Security */}
        <View className="mt-12 px-6">
          <View className="items-center">
            <Text
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: '#059669' }}
            >
              Privacy & Security
            </Text>
            <Text
              className="mt-3 text-center text-2xl font-black tracking-tight"
              style={{ color: theme.foreground }}
            >
              Keamanan Tanpa Kompromi.
            </Text>
          </View>

          <View className="mt-6 gap-3">
            {securityFeatures.map((f, idx) => (
              <View
                key={idx}
                className="items-center rounded-2xl p-6"
                style={{ backgroundColor: cardBg }}
              >
                <f.Icon size={28} color={f.color} />
                <Text
                  className="mt-3 text-base font-black uppercase"
                  style={{ color: theme.foreground }}
                >
                  {f.title}
                </Text>
                <Text
                  className="mt-2 text-center text-sm"
                  style={{ color: theme.mutedForeground }}
                >
                  {f.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Models Grid */}
        <View className="mt-12 px-6">
          <Text
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#0891b2' }}
          >
            Artificial Intelligence
          </Text>
          <Text
            className="mt-3 text-2xl font-black tracking-tight"
            style={{ color: theme.foreground }}
          >
            Ekosistem Model Global.
          </Text>

          <View className="mt-6 flex-row flex-wrap gap-3">
            {MODELS.slice(0, 12).map((model) => (
              <View
                key={model.id}
                className="w-[30%] items-center rounded-2xl p-4"
                style={{ backgroundColor: cardBg }}
              >
                <Text
                  className="text-lg font-black uppercase"
                  style={{ color: theme.mutedForeground }}
                >
                  {model.providerId.substring(0, 2)}
                </Text>
                <Text
                  className="mt-2 text-center text-xs font-bold"
                  style={{ color: theme.foreground }}
                  numberOfLines={1}
                >
                  {model.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Architecture */}
        <View className="mt-12 px-6">
          <Text
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: '#e11d48' }}
          >
            Modern Stack
          </Text>
          <Text
            className="mt-3 text-2xl font-black tracking-tight"
            style={{ color: theme.foreground }}
          >
            Arsitektur Next-Gen.
          </Text>

          <View className="mt-6 gap-3">
            {[
              { name: 'React Native', desc: 'Cross-platform mobile app with Expo Router.', Icon: RocketIcon, color: '#0891b2' },
              { name: 'Hono Backend', desc: 'Edge-optimized API with streaming support.', Icon: DatabaseIcon, color: '#059669' },
              { name: 'AI Models', desc: 'Multi-provider AI with real-time streaming.', Icon: CodeIcon, color: '#e11d48' },
            ].map((dir, idx) => (
              <View key={idx} className="rounded-2xl p-6" style={{ backgroundColor: cardBg }}>
                <dir.Icon size={24} color={dir.color} />
                <Text className="mt-3 text-base font-bold" style={{ color: theme.foreground }}>
                  {dir.name}
                </Text>
                <Text className="mt-1 text-sm" style={{ color: theme.mutedForeground }}>
                  {dir.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="mt-16 items-center px-6 pb-8">
          <Text
            className="text-center text-2xl font-black tracking-tight"
            style={{ color: theme.foreground }}
          >
            Siap Menjelajahi Masa Depan?
          </Text>
          <Text
            className="mt-4 text-center text-base"
            style={{ color: theme.mutedForeground }}
          >
            Dikembangkan dengan cinta oleh{' '}
            <Text className="font-black italic" style={{ color: theme.foreground }}>
              Nauval Akbar
            </Text>
          </Text>
          <View className="mt-6 flex-row gap-3">
            <View className="flex-row items-center gap-2 rounded-xl px-4 py-2" style={{ backgroundColor: cardBg }}>
              <HeartIcon size={14} color="#e11d48" />
              <Text className="text-xs font-bold uppercase" style={{ color: '#e11d48' }}>
                Made with Love
              </Text>
            </View>
            <View className="flex-row items-center gap-2 rounded-xl px-4 py-2" style={{ backgroundColor: cardBg }}>
              <CodeIcon size={14} color="#0891b2" />
              <Text className="text-xs font-bold uppercase" style={{ color: '#0891b2' }}>
                v4.5.0
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
