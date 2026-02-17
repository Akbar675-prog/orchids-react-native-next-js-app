import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import {
  TrophyIcon,
  CoinsIcon,
  BarChart3Icon,
  UsersIcon,
  ZapIcon,
  CrownIcon,
  MedalIcon,
  StarIcon,
} from 'lucide-react-native';

const MOCK_TOP_USERS = [
  { name: 'Nauval Akbar', email: 'nau***@gmail.com', credits: 125000 },
  { name: 'Andi Pratama', email: 'and***@gmail.com', credits: 98500 },
  { name: 'Siti Rahayu', email: 'sit***@gmail.com', credits: 87200 },
  { name: 'Budi Santoso', email: 'bud***@yahoo.com', credits: 65000 },
  { name: 'Maya Putri', email: 'may***@gmail.com', credits: 52300 },
  { name: 'Rizky Fadilah', email: 'riz***@gmail.com', credits: 48900 },
  { name: 'Dewi Lestari', email: 'dew***@gmail.com', credits: 41200 },
  { name: 'Anonymous', email: 'ano***@mail.com', credits: 38700 },
];

const MOCK_MODELS = [
  { model: 'GPT 5.2', users: 2450, tokens: '12.8M+' },
  { model: 'Claude 4.5 Sonnet', users: 1890, tokens: '9.2M+' },
  { model: 'Gemini 3.0 Flash', users: 1650, tokens: '7.5M+' },
  { model: 'DeepSeek R1', users: 1200, tokens: '5.1M+' },
  { model: 'Grok 4', users: 980, tokens: '4.3M+' },
  { model: 'Llama 4 Scout', users: 750, tokens: '2.8M+' },
];

function getRankIcon(index: number) {
  switch (index) {
    case 0:
      return { Icon: CrownIcon, color: '#eab308' };
    case 1:
      return { Icon: MedalIcon, color: '#94a3b8' };
    case 2:
      return { Icon: StarIcon, color: '#d97706' };
    default:
      return { Icon: null, color: '' };
  }
}

export default function LeaderboardScreen() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'dark'];
  const isDark = colorScheme === 'dark';

  const cardBg = isDark ? '#1a1a2e' : '#f1f5f9';

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View
          className="mx-4 mt-6 overflow-hidden rounded-3xl p-8"
          style={{ backgroundColor: isDark ? '#0f1729' : '#eff6ff' }}
        >
          <View className="items-center">
            <View className="flex-row items-center gap-2 rounded-full px-3 py-1" style={{ backgroundColor: cardBg }}>
              <TrophyIcon size={12} color={theme.foreground} />
              <Text className="text-xs font-black uppercase tracking-widest" style={{ color: theme.foreground }}>
                Hall of Fame
              </Text>
            </View>
            <Text className="mt-4 text-center text-3xl font-black tracking-tighter" style={{ color: theme.foreground }}>
              VISORA{'\n'}
              <Text style={{ color: '#3b82f6' }}>LEADERBOARD</Text>
            </Text>
            <Text className="mt-3 text-center text-sm" style={{ color: theme.mutedForeground }}>
              Elite contributors and neural engines shaping the future.
            </Text>
          </View>
        </View>

        {/* Top Credits */}
        <View className="mt-8 px-4">
          <View className="flex-row items-center gap-3 px-2">
            <CoinsIcon size={24} color="#3b82f6" />
            <View>
              <Text className="text-xl font-black" style={{ color: theme.foreground }}>
                Top Credits
              </Text>
              <Text className="text-xs uppercase tracking-wider" style={{ color: theme.mutedForeground }}>
                Wealth Distribution
              </Text>
            </View>
          </View>

          <View className="mt-4 overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
            {MOCK_TOP_USERS.map((user, index) => {
              const rank = getRankIcon(index);
              return (
                <View
                  key={index}
                  className="flex-row items-center border-b px-4 py-4"
                  style={{ borderBottomColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
                >
                  <View
                    className="h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: isDark ? '#0f1729' : '#fff',
                    }}
                  >
                    {rank.Icon ? (
                      <rank.Icon size={18} color={rank.color} />
                    ) : (
                      <Text className="text-sm font-black" style={{ color: theme.mutedForeground }}>
                        {index + 1}
                      </Text>
                    )}
                  </View>
                  <View className="ml-3 flex-1">
                    <Text className="text-sm font-bold" style={{ color: theme.foreground }}>
                      {user.name}
                    </Text>
                    <Text className="text-xs" style={{ color: theme.mutedForeground }}>
                      {user.email}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1 rounded-xl px-3 py-1.5" style={{ backgroundColor: isDark ? '#0f1729' : '#dbeafe' }}>
                    <CoinsIcon size={12} color="#3b82f6" />
                    <Text className="text-sm font-black" style={{ color: '#3b82f6' }}>
                      {user.credits.toLocaleString()}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Model Popularity */}
        <View className="mt-10 px-4">
          <View className="flex-row items-center gap-3 px-2">
            <BarChart3Icon size={24} color="#059669" />
            <View>
              <Text className="text-xl font-black" style={{ color: theme.foreground }}>
                Intelligence
              </Text>
              <Text className="text-xs uppercase tracking-wider" style={{ color: theme.mutedForeground }}>
                Neural Popularity
              </Text>
            </View>
          </View>

          <View className="mt-4 overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
            {MOCK_MODELS.map((model, index) => (
              <View
                key={index}
                className="flex-row items-center border-b px-4 py-4"
                style={{ borderBottomColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
              >
                <View className="flex-1">
                  <Text className="text-sm font-bold" style={{ color: theme.foreground }}>
                    {model.model}
                  </Text>
                  <View className="mt-1 flex-row items-center gap-1">
                    <UsersIcon size={11} color={theme.mutedForeground} />
                    <Text className="text-xs" style={{ color: theme.mutedForeground }}>
                      {model.users} users
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-1 rounded-xl px-3 py-1.5" style={{ backgroundColor: isDark ? '#052e16' : '#dcfce7' }}>
                  <ZapIcon size={12} color="#059669" />
                  <Text className="text-sm font-black" style={{ color: '#059669' }}>
                    {model.tokens}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
