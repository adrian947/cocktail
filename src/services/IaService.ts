import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';

export const openRouter = async (prompt: string) => {
  const openrouter = createOpenRouter({
    apiKey: import.meta.env.VITE_OPEN_ROUTER_KEY,
  });

  const result = await streamText({
    // model: openrouter('deepseek/deepseek-chat:free'),
    model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
    prompt,
    system: 'Responde presentandote como un bartender profesional',
  });

  return result.textStream;
};
