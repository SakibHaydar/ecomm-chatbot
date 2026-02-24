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
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl flex flex-col h-[85vh] border border-gray-100">
        {/* Header */}
        <header className="p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
            E-Shop AI Assistant
          </h1>
          <p className="text-blue-100 text-xs">Ask about prices, sizes, and stock!</p>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-60">
              <div className="text-4xl">👋</div>
              <p className="text-gray-500 font-medium">Hello! How can I help you today?</p>
              <p className="text-gray-400 text-sm">Example: &quot;Is Nike Air Max available in size 9?&quot;</p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm transition-all duration-200 ${m.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none hover:bg-blue-700"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none hover:shadow-md"
                  }`}
              >
                <div className="flex items-center gap-2 mb-1 opacity-70">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {m.role === "user" ? "You" : "AI Assistant"}
                  </span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.parts.map((part, i) => {
                    if (part.type === "text") {
                      return <span key={i}>{part.text}</span>;
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}
          {status === "streaming" && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <footer className="p-4 bg-white border-t rounded-b-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 focus-within:ring-2 focus-within:ring-blue-400 focus-within:bg-white transition-all shadow-inner"
          >
            <input
              className="flex-1 bg-transparent p-3 text-sm outline-none text-gray-700"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={status === "streaming" || !input.trim()}
              className="bg-blue-600 text-white p-2 px-4 rounded-lg font-bold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md active:scale-95"
            >
              Send
            </button>
          </form>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            Powered by Gemini AI - Tool-Enabled E-commerce Agent
          </p>
        </footer>
      </div>
    </main>
  );
}
