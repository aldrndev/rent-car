"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import Image from "next/image";

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
  const [showPopup, setShowPopup] = useState(false);
  const [input, setInput] = useState("");

  const { messages, status, sendMessage } = useChat();

  const isLoading = status === "submitted" || status === "streaming";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup after 3 seconds if not already open
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only scroll when message count changes
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShowPopup(false); // Close popup when chat opens
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
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/20 bg-white/10">
                  <Image
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=128&h=128&fit=crop&q=80&auto=format"
                    alt="AI Assistant"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Rental Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <p className="text-xs font-medium text-white/90">Online</p>
                  </div>
                </div>
              </div>
              <Button
                type="button"
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
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-surface-hover shadow-sm">
                    <Image
                      src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=128&h=128&fit=crop&q=80&auto=format"
                      alt="AI Assistant"
                      fill
                      className="object-cover"
                    />
                  </div>
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

                    const isUser = m.role === "user";

                    return (
                      <div
                        key={m.id}
                        className={cn(
                          "flex w-full gap-3",
                          isUser ? "flex-row-reverse" : "flex-row",
                        )}
                      >
                        {!isUser && (
                          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface shadow-sm">
                            <Image
                              src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=128&h=128&fit=crop&q=80&auto=format"
                              alt="AI"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div
                          className={cn(
                            "flex max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                            isUser
                              ? "bg-primary text-white ml-auto rounded-tr-none"
                              : "bg-surface border border-border text-text-primary rounded-tl-none",
                          )}
                        >
                          <div className="text-sm leading-relaxed">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={markdownComponents}
                            >
                              {content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {isLoading && messages.at(-1)?.role === "user" && (
                    <div className="flex w-full gap-3">
                      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface shadow-sm">
                        <Image
                          src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=128&h=128&fit=crop&q=80&auto=format"
                          alt="AI"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-border bg-surface px-4 py-3 text-sm text-text-muted shadow-sm">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted/50 [animation-delay:-0.3s]"></span>
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted/50 [animation-delay:-0.15s]"></span>
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-text-muted/50"></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border bg-surface p-3"
            >
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 rounded-full border-border bg-background px-4 focus:ring-primary/20"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-primary text-white hover:bg-primary-hover disabled:opacity-50 h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup / Tooltip */}
      <AnimatePresence>
        {!isOpen && showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-20 right-0 z-40 w-64 origin-bottom-right rounded-2xl border border-border bg-surface p-4 shadow-xl shadow-primary/5"
          >
            <div className="flex items-start gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface">
                <Image
                  src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=128&h=128&fit=crop&q=80&auto=format"
                  alt="AI"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-text">
                  Butuh bantuan?
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Chat saya untuk cek ketersediaan mobil & harga promo! 🚗
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="text-text-muted hover:text-text cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-b border-r border-border bg-surface"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
        }}
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 relative",
          isOpen
            ? "bg-surface text-text-primary hover:bg-surface-hover"
            : "bg-primary text-white hover:bg-primary-hover",
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6" />
            {showPopup && (
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
              </span>
            )}
          </div>
        )}
      </Button>
    </div>
  );
}
