"use client";

import { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CALENDAR_URL =
  "https://api.leadconnectorhq.com/widget/booking/X5hejJvME3TYrp96PRDt";

const GREETING =
  "¡Hola! Soy Daniela, asesora de BUILDRA. Estoy aquí para resolver tus dudas sobre proyectos, servicios y costos. ¿En qué te puedo ayudar?";

const QUICK_CHIPS = [
  "¿Qué proyectos realizan?",
  "¿Cuánto cuesta construir?",
  "¿Cómo funciona el proceso?",
  "Quiero agendar una visita",
];

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
function DanielaAvatar({ size = 40 }: { size?: number }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-full"
      style={{ width: size, height: size }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #1a1a14 0%, #222218 100%)",
          border: "1.5px solid #C9A96E",
        }}
      />
      {/* Letter D */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          style={{
            fontFamily: "var(--font-geist), system-ui, sans-serif",
            fontSize: size * 0.38,
            fontWeight: 500,
            color: "#C9A96E",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          D
        </span>
      </div>
      {/* Online dot */}
      <span
        className="absolute bottom-0 right-0 block rounded-full bg-[#22c55e]"
        style={{
          width: size * 0.27,
          height: size * 0.27,
          border: "2px solid #111111",
        }}
      />
    </div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-1.5 w-1.5 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

// ─── Mini lead form ───────────────────────────────────────────────────────────
function LeadForm({ onSuccess }: { onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Algo falló. Intenta de nuevo.");
      }
    } catch {
      setError("Sin conexión. Intenta de nuevo.");
    } finally {
      setSending(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-[13px] text-ink placeholder:text-muted/60 outline-none focus:border-accent/50 transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 pt-1">
      <input
        className={inputCls}
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <input
        className={inputCls}
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <input
        className={inputCls}
        placeholder="WhatsApp / Teléfono"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        autoComplete="tel"
      />
      {error && (
        <p className="text-[11px] text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="mt-1 rounded-lg bg-accent py-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-[#0A0A0A] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
      >
        {sending ? "Enviando…" : "Enviar mis datos"}
      </button>
      <p className="text-[10px] leading-[1.5] text-muted/70">
        Tus datos no se comparten. Un asesor te contacta en menos de 48 h.
      </p>
    </form>
  );
}

// ─── Main widget ──────────────────────────────────────────────────────────────
export function AdvisorChat() {
  const uid = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const [pulsed, setPulsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pulse the button after 4 s to draw attention
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: `${uid}-greeting`,
          role: "assistant",
          content: GREETING,
        },
      ]);
    }
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    setChipsVisible(false);

    const userMsg: Message = {
      id: `${uid}-u-${Date.now()}`,
      role: "user",
      content: text.trim(),
    };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      const reply = data.content || data.error || "Algo salió mal. Intenta de nuevo.";

      setMessages((prev) => [
        ...prev,
        {
          id: `${uid}-a-${Date.now()}`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${uid}-err-${Date.now()}`,
          role: "assistant",
          content: "Sin conexión en este momento. Escríbenos al +52 998 154 3151.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleChip(chip: string) {
    sendMessage(chip);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleLeadSuccess() {
    setLeadSent(true);
    setShowLeadForm(false);
    setMessages((prev) => [
      ...prev,
      {
        id: `${uid}-lead-ok-${Date.now()}`,
        role: "assistant",
        content:
          "¡Perfecto! Ya recibí tus datos. Un miembro del equipo te contactará en menos de 48 horas con una propuesta inicial. ¡Que tengas excelente día!",
      },
    ]);
  }

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[88px] right-6 z-50 hidden w-[360px] flex-col overflow-hidden rounded-[20px] md:flex"
            style={{
              background: "#111111",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.72), 0 0 0 1px rgba(201,169,110,0.07)",
              maxHeight: "560px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <DanielaAvatar size={42} />
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium text-ink leading-tight">
                  Daniela
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="block h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  <span className="text-[11px] text-muted">
                    Asesora BUILDRA · En línea
                  </span>
                </div>
              </div>
              {/* Calendar button */}
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Agendar visita"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/[0.06]"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="#C9A96E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="3" y="4" width="14" height="13" rx="2" />
                  <path d="M3 8h14M7 2v3M13 2v3" />
                </svg>
              </a>
              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/[0.06]"
                aria-label="Cerrar chat"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-3.5 w-3.5 text-muted"
                >
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
              style={{ minHeight: 0, maxHeight: "360px" }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2.5",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {msg.role === "assistant" && (
                    <DanielaAvatar size={28} />
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.6]",
                      msg.role === "user"
                        ? "rounded-tr-sm bg-accent/[0.14] text-ink"
                        : "rounded-tl-sm text-ink/90",
                    )}
                    style={
                      msg.role === "assistant"
                        ? { background: "rgba(255,255,255,0.05)" }
                        : {}
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <DanielaAvatar size={28} />
                  <div
                    className="rounded-2xl rounded-tl-sm"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Lead form card */}
              {showLeadForm && !leadSent && (
                <div className="flex justify-start gap-2.5">
                  <DanielaAvatar size={28} />
                  <div
                    className="w-full max-w-[82%] rounded-2xl rounded-tl-sm px-3.5 py-3"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <p className="mb-3 text-[13px] leading-[1.6] text-ink/90">
                      Déjame tus datos y un asesor te contacta en menos de 48 horas:
                    </p>
                    <LeadForm onSuccess={handleLeadSuccess} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            <AnimatePresence>
              {chipsVisible && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-2 px-4 pb-3"
                >
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleChip(chip)}
                      className="rounded-full border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 text-[11px] text-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                    >
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input area */}
            <div
              className="px-3 pb-3 pt-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu pregunta…"
                  disabled={isTyping}
                  className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[13px] text-ink placeholder:text-muted/50 outline-none focus:border-accent/30 transition-colors duration-200 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={isTyping || !input.trim()}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent text-[#0A0A0A] transition-all duration-200 hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Enviar"
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </div>

              {/* Bottom actions */}
              <div className="mt-2.5 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={() => {
                    if (!leadSent) setShowLeadForm((v) => !v);
                  }}
                  disabled={leadSent}
                  className="text-[11px] text-muted transition-colors duration-200 hover:text-accent disabled:opacity-40"
                >
                  {leadSent ? "✓ Datos enviados" : "Dejar mis datos"}
                </button>
                <a
                  href={CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-accent transition-opacity duration-200 hover:opacity-80"
                >
                  <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-3 w-3"
                  >
                    <rect x="1" y="2.5" width="12" height="10" rx="1.5" />
                    <path d="M1 6h12M5 1v3M9 1v3" />
                  </svg>
                  Agendar visita
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <div className="fixed bottom-6 right-[88px] z-50 hidden md:block">
        {/* Pulse ring */}
        {pulsed && !isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid #C9A96E" }}
            animate={{ scale: [1, 1.55], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          aria-label={isOpen ? "Cerrar chat" : "Hablar con Daniela"}
          className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full"
          style={{
            background: "#111111",
            border: "2px solid #C9A96E",
            boxShadow: "0 8px 28px rgba(201,169,110,0.22), 0 2px 8px rgba(0,0,0,0.5)",
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 45 }}
                transition={{ duration: 0.18 }}
                viewBox="0 0 16 16"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </motion.svg>
            ) : (
              <motion.span
                key="d"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontFamily: "var(--font-geist), system-ui, sans-serif",
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#C9A96E",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                D
              </motion.span>
            )}
          </AnimatePresence>
          {/* Online dot on button */}
          {!isOpen && (
            <span
              className="absolute bottom-0.5 right-0.5 block rounded-full bg-[#22c55e]"
              style={{ width: 12, height: 12, border: "2px solid #111111" }}
            />
          )}
        </motion.button>

        {/* Tooltip */}
        {!isOpen && (
          <div
            className="pointer-events-none absolute bottom-full right-0 mb-2.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background: "#181818",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            Hola, soy Daniela 👋
          </div>
        )}
      </div>
    </>
  );
}
