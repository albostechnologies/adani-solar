"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, type RouteName } from "@/lib/router";

interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
  cta?: { label: string; route: RouteName };
}

interface QuickReply {
  label: string;
  keywords: string[];
  response: string;
  cta?: { label: string; route: RouteName };
}

const QUICK_REPLIES: QuickReply[] = [
  {
    label: "Tell me about your products",
    keywords: ["product", "modules", "panel", "topcon", "monoperc", "cell", "glass"],
    response:
      "Adani Solar manufactures high-performance TOPCon (up to 22.5% efficiency, 570W–590W) and MonoPERC (390W–545W) modules, plus solar cells and solar glass at our Mundra facility. Both are backed by 25–30 year performance warranties.",
    cta: { label: "View products", route: "product-topcon" },
  },
  {
    label: "Get a quote",
    keywords: ["quote", "price", "cost", "pricing", "buy", "purchase", "rate"],
    response:
      "I'd love to help with a quote! Module pricing depends on capacity, model (TOPCon/MonoPERC) and order volume. Please share your requirements on the Contact page and our sales team will revert within 24 hours.",
    cta: { label: "Contact sales", route: "contact" },
  },
  {
    label: "Technical specifications",
    keywords: ["spec", "specification", "warranty", "efficiency", "power", "technical", "datasheet"],
    response:
      "TOPCon: 570W–590W, up to 22.5% efficiency, -0.29%/°C temp coefficient, 30-year warranty, bifacial up to 80%. MonoPERC: 390W–545W, up to 21.3% efficiency, 25-year warranty. Detailed datasheets are available on request via our contact form.",
    cta: { label: "Contact for datasheet", route: "contact" },
  },
  {
    label: "Talk to an expert",
    keywords: ["expert", "talk", "human", "call", "support", "help", "advice", "engineer"],
    response:
      "Our solar experts are available Mon–Sat, 9 AM – 6 PM IST. You can reach us at +91-79-2555 5555 or via the Ask Our Expert form on the contact page.",
    cta: { label: "Ask Our Expert", route: "contact" },
  },
];

const DEFAULT_RESPONSE =
  "Thanks for your message! I can help with product details, pricing quotes, technical specifications, or connecting you with a solar expert. Try one of the quick replies below, or visit our contact page for a personalised response.";

const STORAGE_KEY = "adanisolar_chat_dismissed";

function matchReply(input: string): QuickReply | null {
  const lower = input.toLowerCase();
  for (const q of QUICK_REPLIES) {
    if (q.keywords.some((k) => lower.includes(k))) return q;
  }
  return null;
}

let messageCounter = 0;
function newId() {
  messageCounter += 1;
  return `msg-${Date.now()}-${messageCounter}`;
}

export function ChatWidget() {
  const { navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: newId(),
      from: "bot",
      text:
        "Hi! I'm the Adani Solar Assistant. Ask me about our products, get a quote, request specifications, or talk to an expert.",
    },
  ]);
  const [hasInteracted, setHasInteracted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore dismissed state from localStorage (per-session)
  useEffect(() => {
    let shouldDismiss = false;
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      shouldDismiss = stored === "1";
    } catch {
      // ignore
    }
    if (shouldDismiss) {
      // Defer to avoid synchronous setState in effect
      const t = setTimeout(() => setDismissed(true), 0);
      return () => clearTimeout(t);
    }
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const dismiss = () => {
    setDismissed(true);
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: newId(),
      from: "user",
      text: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setHasInteracted(true);

    // Canned bot reply based on keyword match
    setTimeout(() => {
      const match = matchReply(text);
      const botMsg: ChatMessage = match
        ? {
            id: newId(),
            from: "bot",
            text: match.response,
            cta: match.cta,
          }
        : { id: newId(), from: "bot", text: DEFAULT_RESPONSE };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleQuickReply = (q: QuickReply) => {
    sendMessage(q.label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  if (dismissed) return null;

  return (
    <div data-tour-id="tour-search-chat" className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
            role="dialog"
            aria-label="Solar Assistant chat"
          >
            {/* Header */}
            <div className="bg-solar-dark px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-solar-green/20 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-solar-green-light" />
                </div>
                <div>
                  <p className="text-white font-[family-name:var(--font-poppins)] text-sm font-semibold leading-tight">
                    Solar Assistant
                  </p>
                  <p className="text-white/60 text-xs leading-tight">
                    Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-3 py-3 bg-muted/30">
              <div ref={scrollRef} className="space-y-3 px-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.from === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        m.from === "user"
                          ? "bg-solar-green text-white rounded-br-md"
                          : "bg-white border border-border text-foreground rounded-bl-md"
                      }`}
                    >
                      <p>{m.text}</p>
                      {m.cta && (
                        <button
                          onClick={() => {
                            navigate(m.cta!.route);
                            setIsOpen(false);
                          }}
                          className="mt-2 text-xs font-semibold text-solar-green hover:text-solar-green-dark underline underline-offset-2"
                        >
                          {m.cta.label} →
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Quick replies when user hasn't typed yet */}
                {!hasInteracted && (
                  <div className="pt-2 space-y-2">
                    <p className="text-xs text-muted-foreground px-1">
                      Quick replies:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_REPLIES.map((q) => (
                        <button
                          key={q.label}
                          onClick={() => handleQuickReply(q)}
                          className="text-xs px-3 py-1.5 rounded-full bg-solar-green/10 text-solar-green hover:bg-solar-green/20 transition-colors border border-solar-green/20"
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border p-3 bg-white flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                className="flex-1 h-9 text-sm rounded-full"
                aria-label="Chat message"
              />
              <Button
                type="submit"
                size="icon"
                className="w-9 h-9 rounded-full bg-solar-green hover:bg-solar-green-dark shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <button
            onClick={dismiss}
            className="bg-white text-muted-foreground hover:text-foreground text-xs px-3 py-2 rounded-full shadow border border-border transition-colors"
            aria-label="Dismiss chat assistant"
          >
            Dismiss
          </button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen((v) => !v)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-solar-green hover:bg-solar-green-dark text-white shadow-lg shadow-solar-green/30 flex items-center justify-center transition-colors"
          aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
