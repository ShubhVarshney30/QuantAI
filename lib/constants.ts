// src/lib/constants.ts
export const LOCAL_STORAGE_KEYS = {
  // ONBOARDING_COMPLETE: 'geminiflow_onboarding_complete', // Removed
  // USER_PROFILE: 'geminiflow_user_profile', // Removed
  CONVERSATION_HISTORY: 'verse_advisor_conversation_history', // Renamed
  SELECTED_MODEL: 'verse_advisor_selected_model', // Renamed
};

export const DEFAULT_MODEL_ID = 'googleai/gemini-2.0-flash';
export const DEFAULT_MODEL_NAME = 'Gemini 2.0 Flash'; // This is about the AI model, not the app name

export const AVAILABLE_MODELS = [
  { id: 'googleai/gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
  // Add other models here if backend supports them and genkit.ts is updated
];
