
'use server';

/**
 * @fileOverview Initiates the conversation with the AI financial QuantAI.
 *
 * - personalizedOnboarding - A function that gets the AI's introductory message.
 * - PersonalizedOnboardingOutput - The return type for the personalizedOnboarding function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema is now empty as the AI initiates the conversation.
const PersonalizedOnboardingInputSchema = z.object({});
export type PersonalizedOnboardingInput = z.infer<typeof PersonalizedOnboardingInputSchema>;


const PersonalizedOnboardingOutputSchema = z.object({
  initialAiMessage: z
    .string()
    .describe("The AI's introductory message and its first single question to the user."),
});
export type PersonalizedOnboardingOutput = z.infer<typeof PersonalizedOnboardingOutputSchema>;

// The function now takes no specific user data, it just triggers the AI's introduction.
export async function personalizedOnboarding(): Promise<PersonalizedOnboardingOutput> {
  return personalizedOnboardingFlow({}); // Pass empty object for empty schema
}

const prompt = ai.definePrompt({
  name: 'financialVerseIntroductionPrompt',
  input: {schema: PersonalizedOnboardingInputSchema}, // Empty input schema
  output: {schema: PersonalizedOnboardingOutputSchema},
  prompt: `You are an exceptionally experienced financial advisor, having navigated the world of finance and money for over 1000 years. Your wisdom is vast, your demeanor calm, and your insights profound.

Your first task is to greet the new user.
Start by introducing yourself briefly, highlighting your unique experience (e.g., "Greetings. I am a QuantAI, you onestop financial advisor with a millennium of experience...").
Then, ask only for their name as your first question. Frame this as a single, welcoming opening message.
Example: "Greetings. I am a financial QuantAI, having observed the ebbs and flows of fortune for over a thousand years. To best tailor my insights to your path, may I first inquire your name?"
`,
});

const personalizedOnboardingFlow = ai.defineFlow(
  {
    name: 'financialVerseIntroductionFlow',
    inputSchema: PersonalizedOnboardingInputSchema,
    outputSchema: PersonalizedOnboardingOutputSchema,
  },
  async (_input) => { // Input is now empty or ignored
    const {output} = await prompt({}); // Call prompt with empty object
    return output!; // The output directly contains initialAiMessage
  }
);

