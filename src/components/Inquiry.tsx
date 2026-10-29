import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import data from "../data/partyraum.json";
import { de } from "../data/i18n";
import { formCopy as copy } from "../data/form.de";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
  }
}
function FormSection({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  return (
    <section
      className="form-section glass"
      aria-labelledby={`form-heading-${index}`}
    >
      <div className="form-section-title">
        <span>0{index + 1}</span>
        <div>
          <h2 id={`form-heading-${index}`}>{de.inquiry.steps[index]}</h2>
          <p>{de.inquiry.stepNotes[index]}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
function today() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export default function Inquiry({
  date,
  setDate,
}: {
  date: string;
  setDate: (v: string) => void;
}) {
  const [birthday, setBirthday] = useState(false),
    [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [done, setDone] = useState(false);
  const captcha = useRef<HTMLDivElement>(null),
    token = useRef(""),
    widget = useRef("");
  useEffect(() => {
    const key = import.meta.env.VITE_TURNSTILE_SITE_KEY;
    if (!key) return;
    let active = true;
    const mount = () => {
      if (active && captcha.current && window.turnstile)
        widget.current = window.turnstile.render(captcha.current, {
          sitekey: key,
          callback: (v: string) => (token.current = v),
          "expired-callback": () => (token.current = ""),
        });
    };
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = mount;
    document.head.append(script);
    return () => {
      active = false;
      if (widget.current) window.turnstile?.remove(widget.current);
      script.remove();
    };
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (busy || !form.reportValidity()) return;
    setStatus("");
    if (!import.meta.env.VITE_API_URL) {
      setStatus(copy.unavailable);
      return;
    }
    setBusy(true);
    try {
      const payload = Object.fromEntries(new FormData(form));
      const res = await fetch(
        import.meta.env.VITE_API_URL.replace(/\/$/, "") + "/api/inquiry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, turnstileToken: token.current }),
          signal: AbortSignal.timeout(20000),
        },
      );
      if (!res.ok) throw new Error("Mail not accepted");
      setDone(true);
    } catch {
      setStatus(copy.failure);
    } finally {
      setBusy(false);
      if (widget.current) window.turnstile?.reset(widget.current);
      token.current = "";
    }
  }
  if (done)
    return (
      <div className="success glass" role="status">
        <CheckCircle size={42} />
        <h3>{copy.successTitle}</h3>
        <p>{copy.successText}</p>
        <button className="button button-glass" onClick={() => setDone(false)}>
          {copy.another}
        </button>
      </div>
    );
  return (
    <form className="inquiry-form" onSubmit={submit} aria-busy={busy}>
      <FormSection index={0}>
        <div className="form-grid">
          {copy.contact.map((f) => (
            <label key={f.name}>
              {f.label} *
              <input
                name={f.name}
                type={f.type}
                autoComplete={f.autocomplete}
                required
                maxLength={150}
              />
            </label>
          ))}
        </div>
      </FormSection>
      <FormSection index={1}>
        <div className="form-grid">
          <label>
            {copy.date} *
            <input
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today()}
              required
            />
          </label>
          <label>
            {copy.eventType} *
            <select
              name="eventType"
              required
              onChange={(e) =>
                setBirthday(e.target.value === copy.birthdayValue)
              }
            >
              <option value="">{copy.select}</option>
              {copy.events.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            {copy.occasion} *
            <input
              name="occasion"
              required
              maxLength={160}
              placeholder={copy.occasionPlaceholder}
            />
          </label>
          {birthday && (
            <label>
              {copy.age} *
              <input name="age" type="number" min="1" max="120" required />
            </label>
          )}
          <label>
            {copy.guests} *
            <input
              name="guests"
              type="number"
              min="1"
              max={data.capacity}
              required
              placeholder={`Bis ca. ${data.capacity}`}
            />
          </label>
          <label>
            {copy.start} *<input name="startTime" type="time" required />
          </label>
        </div>
      </FormSection>
      <FormSection index={2}>
        <div className="options">
          {copy.options.map((f) => (
            <fieldset key={f.name}>
              <legend>{f.label} *</legend>
              {[copy.yes, copy.no].map((v) => (
                <label key={v}>
                  <input type="radio" name={f.name} value={v} required />
                  {v}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <label>
          {copy.message}
          <textarea
            name="message"
            rows={4}
            maxLength={4000}
            placeholder={copy.messagePlaceholder}
          />
        </label>
      </FormSection>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" value="yes" required />
        <span>
          {copy.consentBefore}{" "}
          <a href="#/datenschutz" target="_blank" rel="noopener noreferrer">
            {copy.privacy}
          </a>{" "}
          {copy.consentAfter} *
        </span>
      </label>
      <div ref={captcha} />
      <p className="form-note">{copy.note}</p>
      {status && (
        <p className="form-error" role="alert">
          {status} <a href={`mailto:${data.email}`}>{copy.email}</a>
        </p>
      )}
      <button className="button" disabled={busy}>
        {busy ? copy.sending : copy.submit}
        <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
