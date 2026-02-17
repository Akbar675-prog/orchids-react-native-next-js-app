import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ArrowLeftIcon } from 'lucide-react-native';

export default function AuthScreen() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'dark'];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuth = async (provider: string) => {
    setIsLoading(provider);
    try {
      // In a real app, this would open the OAuth flow
      Alert.alert(
        'OAuth Sign In',
        `${provider} sign in would be handled here with Supabase Auth.\n\nConfigure SUPABASE_URL and SUPABASE_ANON_KEY to enable.`,
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center gap-1 px-4 py-3"
      >
        <ArrowLeftIcon size={20} color={theme.foreground} />
        <Text style={{ color: theme.foreground }}>Back</Text>
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center px-8">
        <View className="w-full max-w-md">
          <Text
            className="text-center text-3xl font-bold tracking-tight"
            style={{ color: theme.foreground }}
          >
            Welcome to Visora
          </Text>
          <Text
            className="mt-3 text-center text-base"
            style={{ color: theme.mutedForeground }}
          >
            Sign in or create an account to continue
          </Text>

          <View className="mt-10 gap-3">
            {/* Google */}
            <TouchableOpacity
              onPress={() => handleOAuth('Google')}
              disabled={isLoading !== null}
              className="flex-row items-center justify-center rounded-xl py-4"
              style={{ backgroundColor: theme.secondary }}
            >
              <Text className="text-lg font-medium" style={{ color: theme.foreground }}>
                {isLoading === 'Google' ? 'Connecting...' : 'Continue with Google'}
              </Text>
            </TouchableOpacity>

            {/* GitHub */}
            <TouchableOpacity
              onPress={() => handleOAuth('GitHub')}
              disabled={isLoading !== null}
              className="flex-row items-center justify-center rounded-xl py-4"
              style={{ backgroundColor: theme.secondary }}
            >
              <Text className="text-lg font-medium" style={{ color: theme.foreground }}>
                {isLoading === 'GitHub' ? 'Connecting...' : 'Continue with GitHub'}
              </Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity
              onPress={() => handleOAuth('Facebook')}
              disabled={isLoading !== null}
              className="flex-row items-center justify-center rounded-xl py-4"
              style={{ backgroundColor: theme.secondary }}
            >
              <Text className="text-lg font-medium" style={{ color: theme.foreground }}>
                {isLoading === 'Facebook' ? 'Connecting...' : 'Continue with Facebook'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="pb-8 px-8">
        <Text className="text-center text-sm" style={{ color: theme.mutedForeground }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
}
