// src/app/(app)/settings/page.tsx
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useLocalStorage from '@/hooks/use-local-storage';
import { AVAILABLE_MODELS, DEFAULT_MODEL_ID, DEFAULT_MODEL_NAME, LOCAL_STORAGE_KEYS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { AlertCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const [selectedModel, setSelectedModel] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.SELECTED_MODEL,
    DEFAULT_MODEL_ID
  );
  const { toast } = useToast();
  const router = useRouter();

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    const modelName = AVAILABLE_MODELS.find(m => m.id === value)?.name || value;
    toast({ title: "Model Preference Updated", description: `UI preference set to ${modelName}. Note: This does not change the backend model for the AI.` });
  };

  const handleResetData = () => {
    // Only reset keys that are still relevant
    const keysToReset = [
        LOCAL_STORAGE_KEYS.CONVERSATION_HISTORY,
        LOCAL_STORAGE_KEYS.SELECTED_MODEL
    ];
    keysToReset.forEach(key => {
      if (typeof window !== 'undefined' && key) window.localStorage.removeItem(key);
    });
    toast({ title: "Application Data Reset", description: "All local data has been cleared. Redirecting to chat..." });
    setTimeout(() => router.push('/ai-assistant'), 500); 
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pt-3 pb-16 ">
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="p-6">
          <CardTitle className="text-2xl font-semibold">AI Configuration</CardTitle>
          <CardDescription className="pt-1">
            Manage preferences for the AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="backend-model" className="font-medium">Current Backend AI Model</Label>
            <Input id="backend-model" type="text" readOnly value={`${DEFAULT_MODEL_NAME} (${DEFAULT_MODEL_ID})`} className="bg-muted border-border cursor-default" />
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <AlertCircle size={14} /> The AI model is configured in the backend (<code>src/ai/genkit.ts</code>).
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="model-select-ui" className="font-medium">Preferred Model (UI Placeholder)</Label>
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger id="model-select-ui" className="w-full">
                <SelectValue placeholder="Select an AI model" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
             <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <AlertCircle size={14} />
              Changing this updates a local preference and does not change the active backend AI model.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-lg border-destructive">
        <CardHeader className="p-6 bg-destructive/10 rounded-t-lg">
          <CardTitle className="text-xl font-semibold text-destructive">Application Data</CardTitle>
          <CardDescription className="pt-1 text-destructive/90">
            Manage your local application data stored in the browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-foreground">
            This action will clear your chat history and any saved preferences. This cannot be undone.
          </p>
        </CardContent>
        <CardFooter className="p-6 border-t border-destructive/20">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="gap-2">
                <Trash2 size={16} />
                Reset All Application Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your local application data, including chat history and preferences.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetData} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  Yes, reset data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
