import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { streamText } from 'hono/streaming';

const app = new Hono();

app.use(
  '*',
  cors({
    credentials: true,
    origin: (origin) => origin || '*',
  })
);

app.get('/', (c) => {
  return c.json({ status: 'ok', app: 'Visora API' });
});

app.get('/api/health', (c) => {
  return c.json({ status: 'healthy' });
});

app.get('/api/models', (c) => {
  return c.json({
    models: [
      { id: 'gpt-5.2', name: 'GPT-5.2', providerId: 'openai' },
      { id: 'gpt-4o', name: 'GPT-4o', providerId: 'openai' },
      { id: 'claude-4.5-sonnet', name: 'Claude 4.5 Sonnet', providerId: 'anthropic' },
      { id: 'gemini-3.0-flash', name: 'Gemini 3.0 Flash', providerId: 'google' },
      { id: 'deepseek-r1', name: 'DeepSeek R1', providerId: 'deepseek' },
      { id: 'grok-4', name: 'Grok 4', providerId: 'xai' },
    ],
  });
});

// Chat streaming endpoint - simulates AI response
app.post('/api/chat', async (c) => {
  const body = await c.req.json();
  const { messages, model } = body;

  const lastUserMessage = messages?.filter((m: any) => m.role === 'user').pop();
  const userPrompt = lastUserMessage?.content || 'Hello';

  // Generate a contextual response based on the user's message
  const response = generateResponse(userPrompt, model);

  return streamText(c, async (stream) => {
    const words = response.split(' ');
    for (const word of words) {
      await stream.write(word + ' ');
      await new Promise((r) => setTimeout(r, 30 + Math.random() * 40));
    }
  });
});

function generateResponse(prompt: string, model: string): string {
  const p = prompt.toLowerCase();

  if (p.includes('hello') || p.includes('hi') || p.includes('halo')) {
    return `Hello! I'm Visora AI, powered by ${model}. How can I help you today? I can assist with coding, research, creative writing, analysis, and much more. Just ask me anything!`;
  }

  if (p.includes('code') || p.includes('function') || p.includes('program')) {
    return `Here's an example approach using ${model}:\n\n\`\`\`javascript\n// Example function\nfunction solve(input) {\n  // Process the input\n  const result = input\n    .split('')\n    .reverse()\n    .join('');\n  return result;\n}\n\nconsole.log(solve("hello")); // "olleh"\n\`\`\`\n\nThis demonstrates a simple string reversal. Would you like me to help with a more specific coding task?`;
  }

  if (p.includes('summarize') || p.includes('summary')) {
    return `Here's a concise summary:\n\n**Key Points:**\n\n1. The topic involves multiple interconnected themes that build upon historical foundations\n2. Recent developments have shifted the landscape significantly\n3. Experts suggest a balanced approach considering both traditional and modern perspectives\n4. The implications extend across social, economic, and technological domains\n\nWould you like me to elaborate on any specific aspect?`;
  }

  if (p.includes('explain') || p.includes('what is')) {
    return `Great question! Let me break this down in simple terms:\n\n**The Basics:**\nThink of it like building blocks. Each concept builds on the previous one, creating a larger structure.\n\n**How It Works:**\n- First, the foundational layer establishes the core principles\n- Then, intermediate concepts add complexity and nuance\n- Finally, advanced applications combine everything together\n\n**Why It Matters:**\nUnderstanding this helps you make better decisions and see connections others might miss.\n\nWant me to dive deeper into any particular aspect?`;
  }

  if (p.includes('design') || p.includes('color') || p.includes('ui')) {
    return `Here's a design recommendation:\n\n**Color Palette:**\n- Primary: #0EA5E9 (Sky Blue)\n- Secondary: #6366F1 (Indigo)\n- Accent: #F59E0B (Amber)\n- Background: #F8FAFC (Slate 50)\n- Text: #0F172A (Slate 900)\n\n**Typography:**\n- Headings: Inter, 700 weight\n- Body: Inter, 400 weight\n- Code: JetBrains Mono\n\n**Spacing:**\n- Use 4px base unit\n- Consistent padding: 16px, 24px, 32px\n\nThis creates a clean, professional look with good contrast and readability.`;
  }

  return `Thank you for your question! Using ${model}, here's my analysis:\n\nThis is a thoughtful topic that deserves careful consideration. Let me share some key insights:\n\n**Overview:**\nThe subject you've raised touches on several important areas. Understanding the context helps us form a more complete picture.\n\n**Key Considerations:**\n1. Multiple perspectives exist, each with valid reasoning\n2. The evidence points toward a nuanced conclusion\n3. Practical applications should be evaluated case by case\n\n**Recommendation:**\nI'd suggest approaching this step by step, starting with the fundamentals and building toward more complex analysis.\n\nWould you like me to explore any specific angle in more detail?`;
}

export default {
  fetch: app.fetch,
  port: 3002,
};
