// src/components/chat/MarkdownRenderer.tsx
"use client";

import type { FC } from 'react';
import { Check, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  language?: string; // Language can be optional
  value: string;
}

export const CodeBlock: FC<CodeBlockProps & React.HTMLAttributes<HTMLElement>> = ({ language, value, className: propClassName, ...props }) => {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        setHasCopied(true);
        toast({ title: 'Copied!', description: 'Code copied to clipboard.' });
      }).catch(err => {
        toast({ title: 'Error', description: 'Could not copy code.', variant: 'destructive' });
        console.error('Failed to copy: ', err);
      });
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.position = "fixed"; 
        textArea.style.left = "-9999px"; // Move off-screen
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setHasCopied(true);
            toast({ title: 'Copied!', description: 'Code copied to clipboard.' });
        } catch (err) {
            toast({ title: 'Error', description: 'Could not copy code.', variant: 'destructive' });
            console.error('Failed to copy with execCommand: ', err);
        }
        document.body.removeChild(textArea);
    }
  };

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const lang = language || 'plaintext';

  return (
    <div className={cn("relative my-3 rounded-lg bg-muted text-muted-foreground shadow-sm", propClassName)}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border">
        <span className="text-xs font-medium">{lang}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={copyToClipboard}
          aria-label="Copy code"
        >
          {hasCopied ? <Check size={16} /> : <Clipboard size={16} />}
        </Button>
      </div>
      <pre className="overflow-x-auto p-3 text-sm font-mono whitespace-pre-wrap break-words">
        <code {...props} className={`language-${lang}`}>
          {value}
        </code>
      </pre>
    </div>
  );
};
