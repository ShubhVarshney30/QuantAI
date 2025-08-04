
'use server';
/**
 * @fileOverview This file defines a Genkit flow for maintaining conversation context with the AI financial finVerse.
 *
 * - maintainConversationContext - A function that maintains conversation context.
 * - MaintainConversationContextInput - The input type for the maintainConversationContext function.
 * - MaintainConversationContextOutput - The return type for the maintainConversationContext function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaintainConversationContextInputSchema = z.object({
  userInput: z.string().describe('The latest user input in the conversation.'),
  conversationHistory: z
    .string()
    .describe('The history of the conversation so far.'),
});
export type MaintainConversationContextInput = z.infer<
  typeof MaintainConversationContextInputSchema
>;

const MaintainConversationContextOutputSchema = z.object({
  aiResponse: z.string().describe("The AI&apos;s detailed response to the user&apos;s input, followed by a single, concise follow-up question if appropriate. The response should focus on one main point or question at a time."),
  updatedConversationHistory: z
    .string()
    .describe('The updated conversation history including the latest interaction.'),
});
export type MaintainConversationContextOutput = z.infer<
  typeof MaintainConversationContextOutputSchema
>;

export async function maintainConversationContext(
  input: MaintainConversationContextInput
): Promise<MaintainConversationContextOutput> {
  return maintainConversationContextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'maintainFinancialVerseContextPrompt',
  input: {schema: MaintainConversationContextInputSchema},
  output: {schema: MaintainConversationContextOutputSchema},
  prompt: `You are an exceptionally experienced financial advisor, the Financial QuantAI, with 1000 years of wisdom. Your demeanor is calm and insightful. Maintain this persona consistently.
Address the user respectfully, draw upon your (simulated) millennium of experience when relevant, and provide insightful financial guidance.
If the user asks about your name or identity, you can refer to yourself as a "Financial QuantAI" or similar, without needing a specific human name.

Your interaction style is focused and methodical:
1.  Provide a comprehensive and detailed answer to the user's most recent query or statement.
2.  After your explanation, if the conversation naturally leads to it or if more information is needed to advise them, ask *one clear, concise follow-up question*.
3.  Focus on addressing one topic or asking one question at a time. Avoid overwhelming the user with multiple questions in a single response.
4.  If the user's input introduces a new topic, address it thoroughly and then ask a relevant follow-up question if needed.

Conversation History:
{{{conversationHistory}}}

User Input:
{{{userInput}}}

AI Response (Provide your detailed explanation, then optionally one follow-up question):`,
});

const maintainConversationContextFlow = ai.defineFlow(
  {
    name: 'maintainFinancialVerseContextFlow',
    inputSchema: MaintainConversationContextInputSchema,
    outputSchema: MaintainConversationContextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    const updatedConversationHistory =
      input.conversationHistory + '\nUser: ' + input.userInput + '\nAI: ' + output!.aiResponse;

    return {aiResponse: output!.aiResponse, updatedConversationHistory};
  }
);

