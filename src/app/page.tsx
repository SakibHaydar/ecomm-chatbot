"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({
      text: input,
    });

    setInput("");
  };

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="relative flex flex-col h-screen w-full overflow-hidden selection:bg-blue-500/30">
      {/* Dynamic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 premium-panel px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-10 h-10 bg-black rounded-full flex items-center justify-center border border-white/10">
              <span className="text-xl">🛒</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              E-Shop AI Agent
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Active System</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="text-[10px] py-1 px-3 rounded-full glass border border-white/5 text-gray-400 font-mono">
            MODEL: KIMI-K2-INSTRUCT
          </span>
        </div>
      </header>

      {/* Main Chat Scroll Area */}
      <div className="flex-1 overflow-y-auto pt-24 pb-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in zoom-in duration-700">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative w-28 h-28 flex items-center justify-center premium-panel rounded-full border-white/20 shadow-2xl">
                  <span className="text-5xl animate-pulse">✨</span>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Modern Shopping, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 font-extrabold italic">Simplified.</span>
                </h2>
                <p className="text-gray-400 max-w-lg mx-auto text-base leading-relaxed">
                  I am your intelligent commerce agent. I can browse the catalog, compare specs, and find the perfect deals for you in seconds.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                {["Find York track pants under $500", "Show me shoes in the Shoes category"].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setInput(tip)}
                    className="premium-panel p-4 rounded-2xl text-sm text-gray-300 hover:text-white hover:border-white/30 hover:scale-[1.02] transition-all text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <span>&quot;{tip}&quot;</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className={`group relative w-full flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 mb-2 px-1 opacity-40 group-hover:opacity-80 transition-opacity">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">
                    {m.role === "user" ? "Client Terminal" : "AI core"}
                  </span>
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-5 text-sm relative transition-all duration-300 shadow-xl ${m.role === "user"
                    ? "bg-[var(--color-primary)]/20 backdrop-blur-md border border-white/20 text-white rounded-tr-none"
                    : "premium-panel text-gray-100 rounded-tl-none border-white/10"
                    }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed select-text">
                    {m.parts.map((part, i) => {
                      if (part.type === "text") {
                        return <div key={i} className="mb-2 last:mb-0">{part.text}</div>;
                      }

                      if (part.type === "reasoning") {
                        const reasoningPart = part as any;
                        const isStreaming = reasoningPart.state === 'streaming';

                        return (
                          <details key={i} className="mb-4 text-xs glass border border-white/10 rounded-xl group overflow-hidden transition-all duration-300">
                            <summary className="font-semibold text-gray-400 list-none flex items-center gap-2 select-none cursor-pointer p-3 hover:bg-white/5 transition-colors">
                              {isStreaming ? (
                                <div className="flex items-center gap-2 text-blue-400 min-w-0">
                                  <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin shrink-0"></div>
                                  <span className="truncate uppercase tracking-tighter">Analyzing Logic...</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 group-open:text-indigo-400 transition-colors">
                                  <span className="w-3 h-3 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-90">▶</span>
                                  <span className="uppercase tracking-tighter">Neural Thought Path</span>
                                </div>
                              )}
                            </summary>
                            <div className="px-4 py-3 border-t border-white/10 text-gray-400 font-mono text-[10px] whitespace-pre-wrap leading-relaxed bg-black/20 italic">
                              {reasoningPart.details || reasoningPart.text}
                            </div>
                          </details>
                        );
                      }

                      if (part.type.startsWith("tool-")) {
                        const toolPart = part as any;
                        const callId = toolPart.toolCallId;
                        const toolName = part.type.replace("tool-", "");
                        const hasResult = toolPart.state === 'output-available';

                        return (
                          <div key={callId} className="inline-flex items-center gap-3 px-3 py-1.5 glass-morphism border-white/10 text-[10px] my-3">
                            {hasResult ? (
                              <>
                                <span className="text-green-400 font-bold">✓</span>
                                <span className="text-gray-400 uppercase tracking-widest font-mono">DB QUERY COMPLETED: {toolName}</span>
                              </>
                            ) : (
                              <>
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping shrink-0"></div>
                                <span className="text-blue-400 uppercase tracking-widest font-mono">FETCHING {toolName}...</span>
                              </>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {status === "streaming" && (
            <div className="flex justify-start">
              <div className="glass-dark border border-white/10 rounded-2xl rounded-tl-none p-5 shadow-2xl flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Floating Input Dock */}
      <footer className="fixed bottom-8 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full premium-panel rounded-2xl p-2 pointer-events-auto border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
          >
            <input
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none text-gray-200 placeholder:text-gray-500 font-medium"
              value={input}
              placeholder="Ask anything about the catalog..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={status === "streaming" || !input.trim()}
              className="bg-blue-600/80 hover:bg-blue-500 text-white p-3 rounded-xl font-bold text-xs transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 flex items-center gap-2 group"
            >
              <span>SEND</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>
        </div>
        <p className="text-[9px] text-center text-gray-500 mt-4 uppercase tracking-[0.2em] font-medium pointer-events-none">
          SYSTEM INTERFACE V2.1 // POWERED BY NEURAL ENGINE
        </p>
      </footer>
    </main>
  );
}
