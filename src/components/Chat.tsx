import { useState } from "react";
import { MessageCircle, X, ArrowUpRight, Send } from "lucide-react";
import { answer } from "../data/assistant";
import { de } from "../data/i18n";
import Logo from "./Logo";
export function extractDate(q: string) {
  const german = q.match(/\b(\d{1,2})[.]\s*(\d{1,2})[.]\s*(\d{4})\b/);
  const iso = q.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  const result = german
    ? `${german[3]}-${german[2].padStart(2, "0")}-${german[1].padStart(2, "0")}`
    : iso?.[0];
  if (!result) return "";
  const parsed = new Date(result + "T12:00:00Z");
  return Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== result
    ? ""
    : result;
}
export default function Chat({ onDate }: { onDate: (d: string) => void }) {
  const [open, setOpen] = useState(false),
    [input, setInput] = useState(""),
    [messages, setMessages] = useState([
      { role: "assistant", text: de.greeting },
    ]);
  async function ask(q: string) {
    if (!q.trim()) return;
    const date = extractDate(q);
    if (date) onDate(date);
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    let text = answer(q);
    if (import.meta.env.VITE_API_URL) {
      try {
        const res = await fetch(
          import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/api/chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: q }),
          },
        );
        if (res.ok) {
          const result = await res.json();
          if (typeof result.answer === "string") text = result.answer;
        }
      } catch {
        /* Local knowledge remains available. */
      }
    }
    setMessages((m) => [...m, { role: "assistant", text }]);
  }
  return (
    <aside className="chat">
      <button
        className="chat-launch"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="chat-panel"
      >
        <span className="chat-launch-icon">
          <MessageCircle size={18} />
        </span>{" "}
        Fragen zum Partyraum? {open && <X size={16} />}
      </button>
      {open && (
        <section
          id="chat-panel"
          className="chat-panel"
          aria-label="Partyraum-Assistent"
        >
          <div className="chat-head">
            <Logo small />
            <div>
              <span className="status-dot" />
              Taberna Assistent<small>Antworten aus unserer Wissensbasis</small>
            </div>
          </div>
          <div className="messages" aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={m.role}>
                {m.text}
              </p>
            ))}
          </div>
          <div className="quick">
            {[
              "Was kostet der Raum?",
              "Sind eigene Getränke erlaubt?",
              "Ist mein Termin frei?",
            ].map((q) => (
              <button key={q} onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
          <a
            href="#/anfrage"
            className="chat-cta"
            onClick={() => setOpen(false)}
          >
            Termin anfragen <ArrowUpRight size={16} />
          </a>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              aria-label="Deine Frage"
              maxLength={500}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Deine Frage …"
            />
            <button aria-label="Frage senden">
              <Send size={18} />
            </button>
          </form>
          <p className="chat-privacy">
            Bitte keine persönlichen Daten im Chat teilen.
          </p>
        </section>
      )}
    </aside>
  );
}
