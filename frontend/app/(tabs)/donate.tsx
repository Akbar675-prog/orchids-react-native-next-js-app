import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import {
  HeartIcon,
  CoffeeIcon,
  SparklesIcon,
  GiftIcon,
  CheckIcon,
} from 'lucide-react-native';

const DONATION_AMOUNTS = [
  { value: 25000, label: 'Rp 25K', emoji: 'coffee' },
  { value: 50000, label: 'Rp 50K', emoji: 'food' },
  { value: 100000, label: 'Rp 100K', emoji: 'gift' },
  { value: 250000, label: 'Rp 250K', emoji: 'diamond' },
  { value: 500000, label: 'Rp 500K', emoji: 'rocket' },
];

const EMOJIS: Record<string, string> = {
  coffee: '☕',
  food: '🍜',
  gift: '🎁',
  diamond: '💎',
  rocket: '🚀',
};

export default function DonateScreen() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'dark'];
  const isDark = colorScheme === 'dark';

  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState<'form' | 'success'>('form');

  const finalAmount = customAmount ? parseInt(customAmount) * 1000 : selectedAmount;
  const cardBg = isDark ? '#1a1a2e' : '#f1f5f9';

  const handleDonate = () => {
    if (finalAmount < 10000) {
      Alert.alert('Minimum Donasi', 'Minimum donasi Rp 10.000');
      return;
    }
    setStep('success');
  };

  if (step === 'success') {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
        <View className="flex-1 items-center justify-center px-8">
          <View
            className="h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: isDark ? '#052e16' : '#dcfce7' }}
          >
            <CheckIcon size={48} color="#059669" />
          </View>
          <Text className="mt-6 text-3xl font-bold" style={{ color: theme.foreground }}>
            Terima Kasih! 🎉
          </Text>
          <Text
            className="mt-4 text-center text-base"
            style={{ color: theme.mutedForeground }}
          >
            Donasi kamu telah diterima. Dukunganmu sangat berarti untuk pengembangan
            Visora AI.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setStep('form');
              setSelectedAmount(50000);
              setCustomAmount('');
              setName('');
              setMessage('');
            }}
            className="mt-8 rounded-full border px-8 py-3"
            style={{ borderColor: theme.border }}
          >
            <Text style={{ color: theme.foreground }}>Donasi Lagi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="items-center px-6 pt-10">
          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{
              backgroundColor: '#ec4899',
            }}
          >
            <HeartIcon size={36} color="white" />
          </View>
          <Text
            className="mt-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: '#ec4899' }}
          >
            Support Development
          </Text>
          <Text
            className="mt-3 text-center text-3xl font-black tracking-tight"
            style={{ color: theme.foreground }}
          >
            Dukung <Text style={{ color: '#ec4899' }}>Visora</Text>
          </Text>
          <Text
            className="mt-3 text-center text-base"
            style={{ color: theme.mutedForeground }}
          >
            Bantu kami terus mengembangkan Visora AI agar tetap gratis dan dapat
            diakses oleh semua orang.
          </Text>
        </View>

        {/* Donation Form */}
        <View className="mt-8 mx-4 rounded-3xl p-6" style={{ backgroundColor: cardBg }}>
          {/* Amount Selection */}
          <Text
            className="mb-3 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            Pilih Nominal
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {DONATION_AMOUNTS.map((amt) => (
              <TouchableOpacity
                key={amt.value}
                onPress={() => {
                  setSelectedAmount(amt.value);
                  setCustomAmount('');
                }}
                className="items-center rounded-2xl border-2 px-4 py-3"
                style={{
                  borderColor:
                    selectedAmount === amt.value && !customAmount
                      ? '#ec4899'
                      : isDark
                        ? '#2a2a3e'
                        : '#e2e8f0',
                  backgroundColor:
                    selectedAmount === amt.value && !customAmount
                      ? isDark
                        ? '#4c0519'
                        : '#fce7f3'
                      : 'transparent',
                }}
              >
                <Text className="text-xl">{EMOJIS[amt.emoji]}</Text>
                <Text className="mt-1 text-sm font-bold" style={{ color: theme.foreground }}>
                  {amt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Amount */}
          <Text
            className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            Atau Nominal Lain (dalam ribuan)
          </Text>
          <View
            className="flex-row items-center rounded-2xl border-2 px-4 py-3"
            style={{ borderColor: isDark ? '#2a2a3e' : '#e2e8f0' }}
          >
            <Text style={{ color: theme.mutedForeground }} className="font-bold">
              Rp
            </Text>
            <TextInput
              className="mx-2 flex-1 text-lg"
              style={{ color: theme.foreground }}
              placeholder="100"
              placeholderTextColor={theme.mutedForeground}
              value={customAmount}
              onChangeText={(v) => {
                setCustomAmount(v.replace(/[^0-9]/g, ''));
                setSelectedAmount(0);
              }}
              keyboardType="number-pad"
            />
            <Text style={{ color: theme.mutedForeground }}>.000</Text>
          </View>

          {/* Name & Message */}
          <Text
            className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            Nama (opsional)
          </Text>
          <TextInput
            className="rounded-2xl border-2 px-4 py-3 text-base"
            style={{
              color: theme.foreground,
              borderColor: isDark ? '#2a2a3e' : '#e2e8f0',
            }}
            placeholder="Nama kamu"
            placeholderTextColor={theme.mutedForeground}
            value={name}
            onChangeText={setName}
          />

          <Text
            className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider"
            style={{ color: theme.mutedForeground }}
          >
            Pesan (opsional)
          </Text>
          <TextInput
            className="min-h-[100px] rounded-2xl border-2 px-4 py-3 text-base"
            style={{
              color: theme.foreground,
              borderColor: isDark ? '#2a2a3e' : '#e2e8f0',
            }}
            placeholder="Tulis pesan untuk developer..."
            placeholderTextColor={theme.mutedForeground}
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
          />

          {/* Donate Button */}
          <TouchableOpacity
            onPress={handleDonate}
            disabled={finalAmount < 10000}
            className="mt-6 flex-row items-center justify-center rounded-2xl py-4"
            style={{
              backgroundColor: finalAmount >= 10000 ? '#ec4899' : theme.muted,
            }}
          >
            <SparklesIcon size={20} color="white" />
            <Text className="ml-2 text-lg font-bold text-white">
              Donasi Rp {finalAmount.toLocaleString('id-ID')}
            </Text>
          </TouchableOpacity>

          {finalAmount < 10000 && (
            <Text
              className="mt-2 text-center text-sm"
              style={{ color: theme.mutedForeground }}
            >
              Minimum donasi Rp 10.000
            </Text>
          )}
        </View>

        {/* Benefits */}
        <View className="mt-8 flex-row gap-3 px-4">
          {[
            { Icon: CoffeeIcon, title: 'Server Costs', desc: 'Infrastruktur cloud' },
            { Icon: SparklesIcon, title: 'AI Models', desc: 'Model AI premium' },
            { Icon: GiftIcon, title: 'New Features', desc: 'Fitur inovatif' },
          ].map((b, idx) => (
            <View
              key={idx}
              className="flex-1 items-center rounded-2xl p-4"
              style={{ backgroundColor: cardBg }}
            >
              <b.Icon size={24} color="#ec4899" />
              <Text
                className="mt-2 text-center text-xs font-bold"
                style={{ color: theme.foreground }}
              >
                {b.title}
              </Text>
              <Text
                className="mt-1 text-center text-[10px]"
                style={{ color: theme.mutedForeground }}
              >
                {b.desc}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
