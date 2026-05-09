import { useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { chatWithAi } from "@/lib/api";

const suggestions = [
  "Show modern restaurant templates",
  "Which template is best for cafes?",
  "What is included in setup?",
];

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string; fallbackUsed?: boolean }[]>([
    {
      role: "assistant",
      text: "Hi! I am your AI assistant. Ask me about templates, pricing, setup, or restaurant website ideas.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    const message = query.trim();
    if (!message) return;
    setMessages((prev) => [...prev, { role: "user", text: message }]);
    setQuery("");
    setLoading(true);
    try {
      const res = await chatWithAi(message);
      const reply = res?.data?.reply || "I could not generate a response right now.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
          fallbackUsed: Boolean(res?.data?.fallbackUsed),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "AI service is currently unavailable. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-[320px] rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Template discovery helper</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3 px-4 py-4">
            <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border border-border bg-muted/30 p-2">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.role}-${index}`}
                  className={`rounded-md px-2 py-1.5 text-sm ${
                    msg.role === "user" ? "bg-primary/10 text-foreground" : "bg-background text-muted-foreground"
                  }`}
                >
                  <div>{msg.text}</div>
                  {msg.role === "assistant" && msg.fallbackUsed === true ? (
                    <div className="mt-1 inline-flex rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      Smart fallback response
                    </div>
                  ) : null}
                  {msg.role === "assistant" && msg.fallbackUsed === false ? (
                    <div className="mt-1 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
                      Live AI response
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask about templates..."
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="button" size="icon" onClick={handleAsk} disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
              <Button type="button" onClick={handleAsk} disabled={loading}>
                {loading ? "..." : "Ask"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          size="lg"
          className="rounded-full shadow-xl"
          onClick={() => setOpen(true)}
        >
          <Bot className="mr-2 h-5 w-5" />
          Ask AI
        </Button>
      )}
    </div>
  );
};

export default AIChatbot;
