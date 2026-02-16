"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const markdownComponents: Components = {
  p: ({ children, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-2 last:mb-0" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-2 list-disc pl-4 space-y-1 last:mb-0" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-2 list-decimal pl-4 space-y-1 last:mb-0" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li {...props}>{children}</li>
  ),
  strong: ({ children, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <span className="font-bold" {...props}>
      {children}
    </span>
  ),
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const { messages, status, sendMessage } = useChat();

  const isLoading = status === "submitted" || status === "streaming";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only scroll when message count changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isOpen]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input;
    setInput("");

    await sendMessage({ text: currentInput });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/10 sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Rental Assistant</h3>
                  <p className="text-xs text-white/80">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center space-y-4 pt-8 text-center text-text-muted">
                  <MessageCircle className="h-12 w-12 opacity-20" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">
                      Halo! Ada yang bisa dibantu?
                    </p>
                    <p className="text-xs">
                      Tanya tentang ketersediaan mobil, harga, atau cara
                      booking.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m) => {
                    const content = m.parts
                      .filter((p) => p.type === "text")
                      .map((p) => p.text)
                      .join("");

                    return (
                      <div
                        key={m.id}
                        className={cn(
                          "flex w-max max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-2 text-sm",
                          m.role === "user"
                            ? "ml-auto bg-primary text-white"
                            : "bg-surface-hover text-text-primary",
                        )}
                      >
                        <div className="text-sm">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={markdownComponents}
                          >
                            {content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    );
                  })}
                  {isLoading && messages.at(-1)?.role === "user" && (
                    <div className="flex w-max max-w-[80%] items-center gap-2 rounded-2xl bg-surface-hover px-4 py-2 text-sm text-text-muted">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Thinking...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border bg-surface p-4"
            >
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-full border-border bg-background focus:ring-primary/20"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-primary text-white hover:bg-primary-hover disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
          isOpen
            ? "bg-surface text-text-primary hover:bg-surface-hover"
            : "bg-primary text-white hover:bg-primary-hover",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
