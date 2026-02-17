import AsyncStorage from '@react-native-async-storage/async-storage';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt?: number;
};

export type Chat = {
  id: string;
  title: string;
  model: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

const CHATS_KEY = 'visora_chats';
const CURRENT_CHAT_KEY = 'visora_current_chat';

export async function getChats(): Promise<Chat[]> {
  const raw = await AsyncStorage.getItem(CHATS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveChats(chats: Chat[]): Promise<void> {
  await AsyncStorage.setItem(CHATS_KEY, JSON.stringify(chats));
}

export async function getChatById(id: string): Promise<Chat | null> {
  const chats = await getChats();
  return chats.find((c) => c.id === id) || null;
}

export async function createChat(model: string): Promise<Chat> {
  const chat: Chat = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    title: 'New Chat',
    model,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const chats = await getChats();
  chats.unshift(chat);
  await saveChats(chats);
  return chat;
}

export async function updateChat(id: string, updates: Partial<Chat>): Promise<void> {
  const chats = await getChats();
  const idx = chats.findIndex((c) => c.id === id);
  if (idx >= 0) {
    chats[idx] = { ...chats[idx], ...updates, updatedAt: Date.now() };
    await saveChats(chats);
  }
}

export async function deleteChat(id: string): Promise<void> {
  const chats = await getChats();
  await saveChats(chats.filter((c) => c.id !== id));
}

export async function addMessageToChat(
  chatId: string,
  message: ChatMessage
): Promise<void> {
  const chats = await getChats();
  const idx = chats.findIndex((c) => c.id === chatId);
  if (idx >= 0) {
    chats[idx].messages.push(message);
    chats[idx].updatedAt = Date.now();
    // Auto-title from first user message
    if (
      chats[idx].title === 'New Chat' &&
      message.role === 'user' &&
      chats[idx].messages.filter((m) => m.role === 'user').length === 1
    ) {
      chats[idx].title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
    }
    await saveChats(chats);
  }
}

export async function updateAssistantMessage(
  chatId: string,
  messageId: string,
  content: string
): Promise<void> {
  const chats = await getChats();
  const idx = chats.findIndex((c) => c.id === chatId);
  if (idx >= 0) {
    const msgIdx = chats[idx].messages.findIndex((m) => m.id === messageId);
    if (msgIdx >= 0) {
      chats[idx].messages[msgIdx].content = content;
      chats[idx].updatedAt = Date.now();
      await saveChats(chats);
    }
  }
}

export async function getCurrentChatId(): Promise<string | null> {
  return AsyncStorage.getItem(CURRENT_CHAT_KEY);
}

export async function setCurrentChatId(id: string | null): Promise<void> {
  if (id) {
    await AsyncStorage.setItem(CURRENT_CHAT_KEY, id);
  } else {
    await AsyncStorage.removeItem(CURRENT_CHAT_KEY);
  }
}
