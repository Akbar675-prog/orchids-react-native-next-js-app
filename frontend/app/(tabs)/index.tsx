import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  SendIcon,
  SquareIcon,
  PlusIcon,
  MenuIcon,
  SparklesIcon,
  ChevronDownIcon,
  XIcon,
  Trash2Icon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';
import { BACKEND_URL } from '@/lib/api';
import { MODELS, MODEL_DEFAULT, SUGGESTIONS, APP_NAME } from '@/lib/config';
import {
  Chat,
  ChatMessage,
  createChat,
  addMessageToChat,
  updateAssistantMessage,
  getChats,
  deleteChat,
} from '@/lib/chat-store';

const HEADING_PHRASES = [
  'how are you?',
  'how can I help you today?',
  'what can I do for you?',
  'need anything right now?',
  'ready to get started?',
];

export default function ChatScreen() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme ?? 'dark'];

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(MODEL_DEFAULT);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [headingIndex, setHeadingIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % HEADING_PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadHistory = useCallback(async () => {
    const chats = await getChats();
    setChatHistory(chats);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleNewChat = useCallback(() => {
    setCurrentChatId(null);
    setMessages([]);
    setInput('');
  }, []);

  const handleLoadChat = useCallback(async (chat: Chat) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    setSelectedModel(chat.model);
    setShowHistory(false);
  }, []);

  const handleDeleteChat = useCallback(
    async (id: string) => {
      await deleteChat(id);
      if (currentChatId === id) {
        handleNewChat();
      }
      loadHistory();
    },
    [currentChatId, handleNewChat, loadHistory]
  );

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    let chatId = currentChatId;

    // Create a new chat if needed
    if (!chatId) {
      const chat = await createChat(selectedModel);
      chatId = chat.id;
      setCurrentChatId(chatId);
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(36) + 'u',
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    };

    const assistantMsg: ChatMessage = {
      id: Date.now().toString(36) + 'a',
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
    };

    const newMessages = [...messages, userMsg, assistantMsg];
    setMessages(newMessages);
    setInput('');
    setIsStreaming(true);

    await addMessageToChat(chatId, userMsg);
    await addMessageToChat(chatId, assistantMsg);

    try {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const allMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          messages: allMessages,
          model: selectedModel,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
            updated[lastIdx] = { ...updated[lastIdx], content: fullContent };
          }
          return updated;
        });
      }

      await updateAssistantMessage(chatId, assistantMsg.id, fullContent);
      loadHistory();
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setMessages((prev) => {
          const updated = [...prev];
          const lastIdx = updated.length - 1;
          if (lastIdx >= 0 && updated[lastIdx].role === 'assistant') {
            updated[lastIdx] = {
              ...updated[lastIdx],
              content: 'Sorry, an error occurred. Please try again.',
            };
          }
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [input, isStreaming, currentChatId, selectedModel, messages, loadHistory]);

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
  }, []);

  const handleSuggestion = useCallback(
    (prompt: string) => {
      setInput(prompt);
    },
    []
  );

  const showOnboarding = messages.length === 0;
  const currentModelName =
    MODELS.find((m) => m.id === selectedModel)?.name || selectedModel;

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => {
      const isUser = item.role === 'user';
      return (
        <View
          className={`px-4 py-2 ${isUser ? 'items-end' : 'items-start'}`}
          style={{ maxWidth: '100%' }}
        >
          <View
            className={`max-w-[85%] rounded-3xl px-4 py-3 ${
              isUser ? 'rounded-tr-sm bg-accent' : ''
            }`}
            style={
              isUser
                ? { backgroundColor: theme.accent }
                : undefined
            }
          >
            <Text
              className={`text-base leading-6 ${
                isUser ? 'text-accent-foreground' : 'text-foreground'
              }`}
              style={{ color: isUser ? theme.accentForeground : theme.foreground }}
              selectable
            >
              {item.content || (isStreaming && !isUser ? '' : '')}
            </Text>
            {!item.content && !isUser && isStreaming && (
              <View className="flex-row items-center gap-1 py-1">
                <ActivityIndicator size="small" color={theme.mutedForeground} />
                <Text className="text-xs text-muted-foreground" style={{ color: theme.mutedForeground }}>
                  Thinking...
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    },
    [isStreaming, theme]
  );

  return (
    <SafeAreaView className="flex-1 bg-background" style={{ backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View
          className="flex-row items-center justify-between border-b px-4 py-3"
          style={{ borderBottomColor: theme.border }}
        >
          <TouchableOpacity
            onPress={() => {
              loadHistory();
              setShowHistory(true);
            }}
            className="p-2"
          >
            <MenuIcon size={22} color={theme.foreground} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowModelPicker(true)}
            className="flex-row items-center gap-1 rounded-full px-3 py-1.5"
            style={{ backgroundColor: theme.secondary }}
          >
            <SparklesIcon size={14} color={theme.mutedForeground} />
            <Text className="text-sm font-semibold" style={{ color: theme.foreground }}>
              {currentModelName}
            </Text>
            <ChevronDownIcon size={14} color={theme.mutedForeground} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNewChat} className="p-2">
            <PlusIcon size={22} color={theme.foreground} />
          </TouchableOpacity>
        </View>

        {/* Messages or Onboarding */}
        {showOnboarding ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text
              className="mb-2 text-3xl font-bold tracking-tight"
              style={{ color: theme.foreground }}
            >
              Hi,
            </Text>
            <Text
              className="mb-8 text-2xl font-medium"
              style={{ color: theme.mutedForeground }}
            >
              {HEADING_PHRASES[headingIndex]}
            </Text>

            <View className="w-full flex-row flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <TouchableOpacity
                  key={s.label}
                  onPress={() => handleSuggestion(s.prompt)}
                  className="rounded-2xl border px-4 py-2.5"
                  style={{ borderColor: theme.border }}
                >
                  <Text
                    className="text-sm font-medium"
                    style={{ color: theme.foreground }}
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 16 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() =>
              flatListRef.current?.scrollToEnd({ animated: false })
            }
          />
        )}

        {/* Input */}
        <View
          className="border-t px-3 pb-2 pt-2"
          style={{ borderTopColor: theme.border }}
        >
          <View
            className="flex-row items-end rounded-3xl border px-4 py-2"
            style={{ borderColor: theme.border, backgroundColor: theme.card }}
          >
            <TextInput
              className="max-h-28 min-h-[40px] flex-1 text-base"
              style={{ color: theme.foreground }}
              placeholder="Ask anything"
              placeholderTextColor={theme.mutedForeground}
              value={input}
              onChangeText={setInput}
              multiline
              editable={!isStreaming}
              onSubmitEditing={sendMessage}
              returnKeyType="send"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              onPress={isStreaming ? handleStop : sendMessage}
              disabled={!isStreaming && !input.trim()}
              className="ml-2 items-center justify-center rounded-full p-2"
              style={{
                backgroundColor:
                  isStreaming || input.trim()
                    ? theme.primary
                    : theme.secondary,
              }}
            >
              {isStreaming ? (
                <SquareIcon size={18} color={theme.primaryForeground} />
              ) : (
                <SendIcon
                  size={18}
                  color={
                    input.trim()
                      ? theme.primaryForeground
                      : theme.mutedForeground
                  }
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Model Picker Modal */}
      <Modal visible={showModelPicker} transparent animationType="slide">
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setShowModelPicker(false)}
        >
          <Pressable onPress={() => {}}>
            <View
              className="max-h-[60%] rounded-t-3xl pb-8 pt-4"
              style={{ backgroundColor: theme.card }}
            >
              <View className="mb-2 flex-row items-center justify-between px-5">
                <Text className="text-lg font-bold" style={{ color: theme.foreground }}>
                  Select Model
                </Text>
                <TouchableOpacity onPress={() => setShowModelPicker(false)}>
                  <XIcon size={22} color={theme.mutedForeground} />
                </TouchableOpacity>
              </View>
              <ScrollView className="px-3">
                {MODELS.map((model) => (
                  <TouchableOpacity
                    key={model.id}
                    onPress={() => {
                      setSelectedModel(model.id);
                      setShowModelPicker(false);
                    }}
                    className="flex-row items-center justify-between rounded-xl px-4 py-3"
                    style={{
                      backgroundColor:
                        selectedModel === model.id ? theme.accent : 'transparent',
                    }}
                  >
                    <View>
                      <Text
                        className="text-base font-semibold"
                        style={{ color: theme.foreground }}
                      >
                        {model.name}
                      </Text>
                      <Text
                        className="text-xs"
                        style={{ color: theme.mutedForeground }}
                      >
                        {model.providerId}
                      </Text>
                    </View>
                    {selectedModel === model.id && (
                      <View
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: '#60a5fa' }}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* History Drawer Modal */}
      <Modal visible={showHistory} transparent animationType="slide">
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onPress={() => setShowHistory(false)}
        >
          <Pressable onPress={() => {}}>
            <View
              className="max-h-[70%] rounded-t-3xl pb-8 pt-4"
              style={{ backgroundColor: theme.card }}
            >
              <View className="mb-2 flex-row items-center justify-between px-5">
                <Text className="text-lg font-bold" style={{ color: theme.foreground }}>
                  Chat History
                </Text>
                <TouchableOpacity onPress={() => setShowHistory(false)}>
                  <XIcon size={22} color={theme.mutedForeground} />
                </TouchableOpacity>
              </View>
              <ScrollView className="px-3">
                {chatHistory.length === 0 ? (
                  <View className="items-center py-12">
                    <Text style={{ color: theme.mutedForeground }}>No chats yet</Text>
                  </View>
                ) : (
                  chatHistory.map((chat) => (
                    <View
                      key={chat.id}
                      className="flex-row items-center rounded-xl px-4 py-3"
                      style={{
                        backgroundColor:
                          currentChatId === chat.id ? theme.accent : 'transparent',
                      }}
                    >
                      <TouchableOpacity
                        className="flex-1"
                        onPress={() => handleLoadChat(chat)}
                      >
                        <Text
                          className="text-base font-medium"
                          style={{ color: theme.foreground }}
                          numberOfLines={1}
                        >
                          {chat.title}
                        </Text>
                        <Text
                          className="mt-0.5 text-xs"
                          style={{ color: theme.mutedForeground }}
                        >
                          {new Date(chat.updatedAt).toLocaleDateString()} · {chat.messages.length} messages
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteChat(chat.id)}
                        className="ml-2 p-2"
                      >
                        <Trash2Icon size={16} color={theme.mutedForeground} />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
