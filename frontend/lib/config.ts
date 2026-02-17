export const APP_NAME = 'Visora';
export const MODEL_DEFAULT = 'gpt-5.2';

export const MODELS = [
  { id: 'gpt-5.2', name: 'GPT-5.2', providerId: 'openai' },
  { id: 'gpt-4o', name: 'GPT-4o', providerId: 'openai' },
  { id: 'claude-4.5-sonnet', name: 'Claude 4.5 Sonnet', providerId: 'anthropic' },
  { id: 'claude-4.5-opus', name: 'Claude 4.5 Opus', providerId: 'anthropic' },
  { id: 'claude-opus-4.6', name: 'Claude Opus 4.6', providerId: 'anthropic' },
  { id: 'gemini-3.0-flash', name: 'Gemini 3.0 Flash', providerId: 'google' },
  { id: 'gemini-3.0-pro', name: 'Gemini 3.0 Pro', providerId: 'google' },
  { id: 'deepseek-r1', name: 'DeepSeek R1', providerId: 'deepseek' },
  { id: 'grok-4', name: 'Grok 4', providerId: 'xai' },
  { id: 'grok-4-heavy', name: 'Grok 4 Heavy', providerId: 'xai' },
  { id: 'grok-4.1-fast', name: 'Grok 4.1 Fast', providerId: 'xai' },
  { id: 'xvai-quantum-4.5', name: 'XVAI Quantum 4.5', providerId: 'xvai' },
  { id: 'moonshotai/kimi-k2.5', name: 'Kimi K2.5', providerId: 'moonshot' },
  { id: 'llama-3-70b-groq', name: 'Llama 3 70B', providerId: 'groq' },
  { id: 'llama-3.1-8b-groq', name: 'Llama 3.1 8B', providerId: 'groq' },
  { id: 'meta-llama/llama-4-scout-17b-16e-instruct', name: 'Llama 4 Scout', providerId: 'meta' },
];

export const SUGGESTIONS = [
  { label: 'Summarize', prompt: 'Summarize the French Revolution' },
  { label: 'Code Help', prompt: 'Help me write a function to reverse a string in JavaScript' },
  { label: 'Design', prompt: 'Design a color palette for a tech blog' },
  { label: 'Explain', prompt: 'Explain quantum physics like I\'m 10' },
  { label: 'Research', prompt: 'Research the pros and cons of remote work' },
  { label: 'Inspire', prompt: 'Inspire me with a beautiful quote about creativity' },
];

export const SYSTEM_PROMPT_DEFAULT = `You are a thoughtful and clear assistant. Your tone is calm, minimal, and human. You write with intention—never too much, never too little. You avoid clichés, speak simply, and offer helpful, grounded answers. When needed, you ask good questions. You don't try to impress—you aim to clarify. You're here to help the user think clearly and move forward, not to overwhelm or overperform.`;
