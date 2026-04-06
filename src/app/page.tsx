"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  PlusCircle,
  MessageSquare,
  Settings,
  Search,
  MoreVertical,
  Send,
  Bot,
  User,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Package,
  ChevronRight,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";

// ─── Color Palette ────────────────────────────────────────────────
const C = {
  bg:         "#0d1117",   // dark navy (not pure black)
  surface:    "#161b22",   // slightly elevated surface
  surface2:   "#21262d",   // card/item surface
  border:     "#30363d",   // subtle border
  primary:    "#6e40c9",   // deep violet
  primaryLt:  "#8b5cf6",   // lighter violet
  primaryGlow:"rgba(110,64,201,0.25)",
  accent:     "#58a6ff",   // sky blue accent
  accentGlow: "rgba(88,166,255,0.15)",
  success:    "#3fb950",   // green
  warn:       "#d29922",   // amber
  danger:     "#f85149",   // soft red
  textPrimary:"#e6edf3",
  textSecond: "#8b949e",
  textMuted:  "#484f58",
};

// Gradient helpers
const gradPrimary = `linear-gradient(135deg, ${C.primary}, ${C.primaryLt})`;
const gradAccent  = `linear-gradient(135deg, #4c6ef5, ${C.accent})`;

export default function Home() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "streaming") return;
    sendMessage({ text: input });
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, color: C.textPrimary, fontFamily: "Roboto, sans-serif" }}>

      {/* ══════════════════════════════════════════
          LEFT SIDEBAR
      ══════════════════════════════════════════ */}
      <aside style={{
        width: "268px", minWidth: "268px",
        display: "flex", flexDirection: "column",
        borderRight: `1px solid ${C.border}`,
        background: C.surface,
        flexShrink: 0,
      }}>

        {/* Brand */}
        <div style={{
          padding: "22px 20px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{
            background: gradPrimary,
            padding: "9px",
            borderRadius: "12px",
            color: "white",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 16px ${C.primaryGlow}`,
            flexShrink: 0,
          }}>
            <ShoppingBag size={18} strokeWidth={2} />
          </div>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "15px", color: C.textPrimary, margin: 0, letterSpacing: "-0.2px" }}>
              E-Shop AI
            </h2>
            <p style={{ fontSize: "10px", color: C.textMuted, margin: 0, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
              Commerce Assistant
            </p>
          </div>
        </div>

        {/* New Chat Button */}
        <div style={{ padding: "18px 20px 10px 20px" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.location.reload()}
            style={{
              width: "100%",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              background: gradPrimary,
              color: "white",
              padding: "11px 20px",
              borderRadius: "10px",
              fontWeight: 600, fontSize: "13px",
              border: "none", cursor: "pointer",
              boxShadow: `0 4px 16px ${C.primaryGlow}`,
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <PlusCircle size={16} strokeWidth={2} />
            New Chat
          </motion.button>
        </div>

        {/* Recent Queries */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "8px 12px 16px 12px" }}>
          <p style={{
            padding: "12px 10px 8px 10px",
            fontSize: "10px", fontWeight: 700, color: C.textMuted,
            textTransform: "uppercase", letterSpacing: "0.12em", margin: 0,
          }}>
            Recent Queries
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {[
              "Winter Collection Check",
              "Electronics Stock Update",
              "Monthly Audit - Nov",
              "Out of Stock Alerts",
            ].map((label, i) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  fontSize: "13px", fontWeight: 500,
                  color: i === 0 ? C.primaryLt : C.textSecond,
                  background: i === 0 ? `rgba(139,92,246,0.1)` : "transparent",
                  textDecoration: "none",
                  overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis",
                  transition: "background 0.15s, color 0.15s",
                  border: i === 0 ? `1px solid rgba(139,92,246,0.18)` : "1px solid transparent",
                }}
                onMouseEnter={e => {
                  if (i !== 0) {
                    (e.currentTarget as HTMLElement).style.background = C.surface2;
                    (e.currentTarget as HTMLElement).style.color = C.textPrimary;
                  }
                }}
                onMouseLeave={e => {
                  if (i !== 0) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = C.textSecond;
                  }
                }}
              >
                <MessageSquare size={15} strokeWidth={1.8} style={{ flexShrink: 0, color: i === 0 ? C.primaryLt : C.textMuted }} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
              </motion.a>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        <div style={{
          padding: "14px 20px",
          borderTop: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: gradAccent,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", flexShrink: 0,
            boxShadow: `0 4px 12px ${C.accentGlow}`,
          }}>
            <User size={16} strokeWidth={2} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: C.textPrimary, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Store Manager</p>
            <p style={{ fontSize: "11px", color: C.textMuted, margin: 0 }}>Premium Plan</p>
          </div>
          <motion.button
            whileHover={{ rotate: 90 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", color: C.textMuted, display: "flex" }}
          >
            <Settings size={15} strokeWidth={1.8} />
          </motion.button>
        </div>
      </aside>

      {/* ══════════════════════════════════════════
          MAIN CHAT AREA
      ══════════════════════════════════════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: C.bg }}>

        {/* Header */}
        <header style={{
          height: "64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 36px",
          borderBottom: `1px solid ${C.border}`,
          background: `${C.surface}cc`,
          backdropFilter: "blur(16px)",
          flexShrink: 0, zIndex: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Sparkles size={16} strokeWidth={2} style={{ color: C.primaryLt }} />
            <h1 style={{ fontWeight: 700, fontSize: "15px", color: C.textPrimary, margin: 0 }}>
              Inventory Assistant
            </h1>
            <span style={{
              padding: "2px 9px", borderRadius: "6px",
              background: "rgba(63,185,80,0.12)",
              color: C.success,
              fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
            }}>Online</span>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            {[Search, MoreVertical].map((Icon, i) => (
              <motion.button key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                style={{
                  padding: "8px", color: C.textSecond, background: "transparent",
                  border: "none", borderRadius: "8px", cursor: "pointer", display: "flex",
                }}
              >
                <Icon size={16} strokeWidth={1.8} />
              </motion.button>
            ))}
          </div>
        </header>

        {/* Chat Feed */}
        <div style={{ flex: 1, overflowY: "auto", padding: "36px 44px", display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Empty State */}
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "24px", textAlign: "center" }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  style={{
                    width: "68px", height: "68px",
                    background: gradPrimary,
                    borderRadius: "20px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 12px 36px ${C.primaryGlow}`,
                  }}
                >
                  <ShoppingBag size={30} strokeWidth={1.8} color="white" />
                </motion.div>

                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 700, color: C.textPrimary, margin: "0 0 10px 0" }}>
                    How can I help you today?
                  </h2>
                  <p style={{ color: C.textSecond, fontSize: "14px", maxWidth: "360px", lineHeight: "1.65", margin: "0 auto" }}>
                    Ask me anything about products, prices, categories, or stock availability.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%", maxWidth: "540px" }}>
                  {[
                    "Find York track pants under $500",
                    "Show me shoes under $200",
                    "What are the best-selling products?",
                    "Find Nike products in the catalog",
                  ].map((tip, i) => (
                    <motion.button
                      key={tip}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + i * 0.08 }}
                      whileHover={{ scale: 1.02, borderColor: `rgba(139,92,246,0.35)`, color: C.textPrimary }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setInput(tip)}
                      style={{
                        padding: "14px 16px",
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        borderRadius: "12px",
                        fontSize: "13px",
                        color: C.textSecond,
                        cursor: "pointer",
                        textAlign: "left",
                        fontWeight: 500,
                        lineHeight: "1.45",
                        transition: "border-color 0.15s, color 0.15s",
                        fontFamily: "Roboto, sans-serif",
                      }}
                    >
                      &quot;{tip}&quot;
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                style={{ maxWidth: "820px", width: "100%", margin: "0 auto" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {m.role === "user" ? (
                  <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", gap: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px", maxWidth: "74%" }}>
                      <div style={{
                        background: gradPrimary,
                        color: "white",
                        padding: "12px 18px",
                        borderRadius: "18px 18px 4px 18px",
                        boxShadow: `0 4px 18px ${C.primaryGlow}`,
                      }}>
                        <p style={{ fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                          {m.parts.map((p, i) => p.type === "text" ? <span key={i}>{p.text}</span> : null)}
                        </p>
                      </div>
                      <span style={{ fontSize: "11px", color: C.textMuted, paddingRight: "4px" }}>{now}</span>
                    </div>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: `rgba(139,92,246,0.12)`,
                      border: `1px solid rgba(139,92,246,0.2)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: C.primaryLt, flexShrink: 0,
                    }}>
                      <User size={14} strokeWidth={2} />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: gradPrimary,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${C.primaryGlow}`,
                    }}>
                      <Bot size={15} strokeWidth={2} color="white" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "82%" }}>
                      {m.parts.map((part, i) => {
                        if (part.type === "text") {
                          return (
                            <motion.div key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              style={{
                                background: C.surface,
                                color: C.textPrimary,
                                padding: "12px 18px",
                                borderRadius: "4px 18px 18px 18px",
                                border: `1px solid ${C.border}`,
                              }}
                            >
                              <p style={{ fontSize: "14px", lineHeight: "1.7", margin: 0, whiteSpace: "pre-wrap" }}>{part.text}</p>
                            </motion.div>
                          );
                        }

                        if (part.type === "reasoning") {
                          const rp = part as { type: string; state?: string; details?: string; text?: string };
                          const isStreaming = rp.state === "streaming";
                          return (
                            <details key={i} style={{
                              background: C.surface, border: `1px solid ${C.border}`,
                              borderRadius: "12px", overflow: "hidden",
                            }}>
                              <summary style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                padding: "10px 16px", cursor: "pointer",
                                color: isStreaming ? C.primaryLt : C.textSecond,
                                fontSize: "12px", fontWeight: 500, listStyle: "none",
                              }}>
                                {isStreaming
                                  ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite", color: C.primaryLt }} /> Thinking...</>
                                  : <><ChevronRight size={13} style={{ color: C.textMuted }} /> Thought Process</>}
                              </summary>
                              <div style={{
                                padding: "12px 16px",
                                borderTop: `1px solid ${C.border}`,
                                color: C.textMuted,
                                fontFamily: "monospace", fontSize: "11px",
                                whiteSpace: "pre-wrap", lineHeight: 1.7,
                              }}>
                                {rp.details ?? rp.text}
                              </div>
                            </details>
                          );
                        }

                        if (part.type.startsWith("tool-")) {
                          const tp = part as { type: string; toolCallId?: string; state?: string };
                          const toolName = part.type.replace("tool-", "");
                          const done = tp.state === "output-available";
                          return (
                            <div key={tp.toolCallId ?? i} style={{
                              display: "flex", alignItems: "center", gap: "8px",
                              padding: "8px 14px",
                              background: C.surface,
                              border: `1px solid ${C.border}`,
                              borderRadius: "10px",
                              fontSize: "12px", color: C.textSecond,
                            }}>
                              {done ? (
                                <><CheckCircle2 size={13} color={C.success} /><span>Catalog query: <code style={{ color: C.accent }}>{toolName}</code></span></>
                              ) : (
                                <><Loader2 size={13} style={{ animation: "spin 1s linear infinite", color: C.primaryLt }} /><span>Fetching <code style={{ color: C.accent }}>{toolName}</code>...</span></>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                      <span style={{ fontSize: "11px", color: C.textMuted, paddingLeft: "4px" }}>{now}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing dots */}
          {status === "streaming" && messages.at(-1)?.role !== "assistant" && (
            <div style={{ maxWidth: "820px", width: "100%", margin: "0 auto", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: gradPrimary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Bot size={15} color="white" />
              </div>
              <div style={{ background: C.surface, padding: "14px 18px", borderRadius: "4px 18px 18px 18px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: "6px" }}>
                {["-0.3s", "-0.15s", "0s"].map((d, i) => (
                  <span key={i} className="animate-bounce" style={{ width: "7px", height: "7px", background: C.primaryLt, borderRadius: "50%", display: "inline-block", animationDelay: d }} />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Chat Input ── */}
        <div style={{ padding: "16px 44px 26px", background: `linear-gradient(to top, ${C.bg} 70%, transparent)`, flexShrink: 0 }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit} style={{
              display: "flex", alignItems: "center",
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: "14px",
              padding: "8px 8px 8px 18px",
              gap: "10px",
              boxShadow: `0 8px 32px rgba(0,0,0,0.35)`,
            }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={status === "streaming"}
                placeholder="Ask about products, prices, or stock..."
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontSize: "14px", color: C.textPrimary,
                  fontFamily: "Roboto, sans-serif", height: "42px",
                }}
              />
              <motion.button
                type="submit"
                disabled={status === "streaming" || !input.trim()}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: "42px", height: "42px",
                  background: gradPrimary,
                  border: "none", borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", flexShrink: 0,
                  boxShadow: `0 4px 14px ${C.primaryGlow}`,
                  opacity: !input.trim() || status === "streaming" ? 0.3 : 1,
                  transition: "opacity 0.2s",
                }}
              >
                <Send size={16} color="white" strokeWidth={2} />
              </motion.button>
            </form>
            <p style={{ textAlign: "center", fontSize: "11px", color: C.textMuted, marginTop: "8px", fontWeight: 500 }}>
              AI can make mistakes. Verify critical information before placing orders.
            </p>
          </div>
        </div>
      </main>

      {/* ══════════════════════════════════════════
          RIGHT SIDEBAR
      ══════════════════════════════════════════ */}
      <aside className="hidden lg:flex" style={{
        width: "288px", minWidth: "288px",
        flexDirection: "column",
        borderLeft: `1px solid ${C.border}`,
        background: C.surface,
        flexShrink: 0,
      }}>

        {/* Stock Insights */}
        <div style={{ padding: "22px 22px 18px 22px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ fontWeight: 700, fontSize: "13px", color: C.textPrimary, margin: "0 0 14px 0", display: "flex", alignItems: "center", gap: "7px" }}>
            <Package size={14} strokeWidth={2} style={{ color: C.primaryLt }} />
            Stock Insights
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { value: "12", label: "Low Stock", color: C.warn },
              { value: "05", label: "Out of Stock", color: C.danger },
            ].map(({ value, label, color }) => (
              <div key={label} style={{
                background: C.surface2, padding: "14px 12px", borderRadius: "12px",
                border: `1px solid ${C.border}`, textAlign: "center",
              }}>
                <p style={{ fontSize: "26px", fontWeight: 700, color, margin: 0 }}>{value}</p>
                <p style={{ fontSize: "10px", fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "4px", marginBottom: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Filters + Category Health */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
          <h4 style={{ fontSize: "10px", fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 12px 0" }}>Quick Filters</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "26px" }}>
            {[
              { icon: AlertTriangle, label: "Urgent Restock", badge: "12", iconColor: C.danger, badgeBg: "rgba(248,81,73,0.1)", badgeColor: C.danger },
              { icon: Package, label: "Incoming Orders", badge: "24", iconColor: C.warn, badgeBg: "rgba(210,153,34,0.1)", badgeColor: C.warn },
              { icon: TrendingUp, label: "Top Performers", badge: <ChevronRight size={12} />, iconColor: C.primaryLt, badgeBg: C.surface2, badgeColor: C.textMuted },
            ].map(({ icon: Icon, label, badge, iconColor, badgeBg, badgeColor }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.01, x: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 14px",
                  background: C.surface2,
                  border: `1px solid ${C.border}`,
                  borderRadius: "12px",
                  cursor: "pointer", color: C.textSecond,
                  fontSize: "13px", fontWeight: 500,
                  fontFamily: "Roboto, sans-serif",
                  transition: "border-color 0.15s",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={15} strokeWidth={2} style={{ color: iconColor, flexShrink: 0 }} />
                  {label}
                </span>
                <span style={{ padding: "2px 8px", borderRadius: "999px", background: badgeBg, color: badgeColor, fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center" }}>
                  {badge}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Category Health */}
          <h4 style={{ fontSize: "10px", fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 14px 0" }}>Category Health</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Electronics", pct: 85, from: C.primary, to: C.primaryLt },
              { label: "Home & Living", pct: 42, from: "#f97316", to: "#fb923c" },
              { label: "Apparel", pct: 92, from: "#10b981", to: "#34d399" },
            ].map(({ label, pct, from, to }) => (
              <div key={label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 500, marginBottom: "7px" }}>
                  <span style={{ color: C.textSecond }}>{label}</span>
                  <span style={{ color: C.textMuted }}>{pct}%</span>
                </div>
                <div style={{ height: "5px", background: C.surface2, borderRadius: "999px", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${from}, ${to})`, borderRadius: "999px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <div style={{
          padding: "18px 22px",
          borderTop: `1px solid ${C.border}`,
          background: `linear-gradient(135deg, rgba(110,64,201,0.06), rgba(88,166,255,0.04))`,
        }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <Lightbulb size={16} strokeWidth={2} style={{ color: C.warn, marginTop: "1px", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: C.textPrimary, margin: "0 0 5px 0" }}>AI Suggestion</p>
              <p style={{ fontSize: "11px", color: C.textSecond, margin: 0, lineHeight: 1.65 }}>
                Winter items are moving 20% faster than last week. Consider early restocking for popular seasonal products.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
