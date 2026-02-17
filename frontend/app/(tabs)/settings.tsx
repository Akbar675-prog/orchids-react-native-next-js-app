import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  UserIcon,
  PaletteIcon,
  SunIcon,
  MoonIcon,
  BellIcon,
  ShieldIcon,
  Trash2Icon,
  LogOutIcon,
  ChevronRightIcon,
  InfoIcon,
  KeyIcon,
  GlobeIcon,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'dark'];
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const [notifications, setNotifications] = useState(true);

  const cardBg = isDark ? '#1a1a2e' : '#f1f5f9';

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your chat history and preferences. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert('Done', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-6 pt-8 pb-4">
          <Text className="text-3xl font-black tracking-tight" style={{ color: theme.foreground }}>
            Settings
          </Text>
        </View>

        {/* Profile Section */}
        <View className="px-4">
          <TouchableOpacity
            onPress={() => router.push('/auth')}
            className="flex-row items-center rounded-2xl p-4"
            style={{ backgroundColor: cardBg }}
          >
            <View
              className="h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: isDark ? '#0f1729' : '#dbeafe' }}
            >
              <UserIcon size={24} color="#3b82f6" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold" style={{ color: theme.foreground }}>
                Guest User
              </Text>
              <Text className="text-sm" style={{ color: theme.mutedForeground }}>
                Sign in to sync your chats
              </Text>
            </View>
            <ChevronRightIcon size={20} color={theme.mutedForeground} />
          </TouchableOpacity>
        </View>

        {/* Appearance */}
        <View className="mt-6 px-4">
          <Text
            className="mb-3 px-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            Appearance
          </Text>
          <View className="overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
            <TouchableOpacity
              onPress={toggleColorScheme}
              className="flex-row items-center justify-between border-b px-4 py-4"
              style={{ borderBottomColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
            >
              <View className="flex-row items-center gap-3">
                {isDark ? (
                  <MoonIcon size={20} color={theme.foreground} />
                ) : (
                  <SunIcon size={20} color={theme.foreground} />
                )}
                <Text className="text-base" style={{ color: theme.foreground }}>
                  Dark Mode
                </Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleColorScheme}
                trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                thumbColor="white"
              />
            </TouchableOpacity>
            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center gap-3">
                <PaletteIcon size={20} color={theme.foreground} />
                <Text className="text-base" style={{ color: theme.foreground }}>
                  Theme Color
                </Text>
              </View>
              <Text style={{ color: theme.mutedForeground }}>Default</Text>
            </View>
          </View>
        </View>

        {/* General */}
        <View className="mt-6 px-4">
          <Text
            className="mb-3 px-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            General
          </Text>
          <View className="overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
            <View
              className="flex-row items-center justify-between border-b px-4 py-4"
              style={{ borderBottomColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
            >
              <View className="flex-row items-center gap-3">
                <BellIcon size={20} color={theme.foreground} />
                <Text className="text-base" style={{ color: theme.foreground }}>
                  Notifications
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#e2e8f0', true: '#3b82f6' }}
                thumbColor="white"
              />
            </View>
            <TouchableOpacity
              className="flex-row items-center justify-between border-b px-4 py-4"
              style={{ borderBottomColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
            >
              <View className="flex-row items-center gap-3">
                <GlobeIcon size={20} color={theme.foreground} />
                <Text className="text-base" style={{ color: theme.foreground }}>
                  Language
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text style={{ color: theme.mutedForeground }}>Bahasa Indonesia</Text>
                <ChevronRightIcon size={16} color={theme.mutedForeground} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center gap-3">
                <KeyIcon size={20} color={theme.foreground} />
                <Text className="text-base" style={{ color: theme.foreground }}>
                  API Keys
                </Text>
              </View>
              <ChevronRightIcon size={16} color={theme.mutedForeground} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Privacy & Data */}
        <View className="mt-6 px-4">
          <Text
            className="mb-3 px-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            Privacy & Data
          </Text>
          <View className="overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
            <TouchableOpacity
              className="flex-row items-center justify-between border-b px-4 py-4"
              style={{ borderBottomColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
            >
              <View className="flex-row items-center gap-3">
                <ShieldIcon size={20} color={theme.foreground} />
                <Text className="text-base" style={{ color: theme.foreground }}>
                  Privacy Policy
                </Text>
              </View>
              <ChevronRightIcon size={16} color={theme.mutedForeground} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleClearData}
              className="flex-row items-center justify-between px-4 py-4"
            >
              <View className="flex-row items-center gap-3">
                <Trash2Icon size={20} color="#ef4444" />
                <Text className="text-base" style={{ color: '#ef4444' }}>
                  Clear All Data
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View className="mt-6 px-4">
          <View className="overflow-hidden rounded-2xl" style={{ backgroundColor: cardBg }}>
            <TouchableOpacity className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center gap-3">
                <InfoIcon size={20} color={theme.foreground} />
                <View>
                  <Text className="text-base" style={{ color: theme.foreground }}>
                    Visora AI
                  </Text>
                  <Text className="text-xs" style={{ color: theme.mutedForeground }}>
                    Version 4.5.0 · By Nauval Akbar
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Out */}
        <View className="mt-6 px-4">
          <TouchableOpacity
            className="flex-row items-center justify-center gap-2 rounded-2xl py-4"
            style={{ backgroundColor: cardBg }}
          >
            <LogOutIcon size={18} color={theme.mutedForeground} />
            <Text className="text-base font-medium" style={{ color: theme.mutedForeground }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
