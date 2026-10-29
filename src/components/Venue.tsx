import {
  Users,
  KeyRound,
  Music2,
  Wine,
  Clock,
  Lightbulb,
  Refrigerator,
  Sparkles,
  Footprints,
  Check,
  ArrowUpRight,
} from "lucide-react";
import data from "../data/partyraum.json";
import { de } from "../data/i18n";
import { Button, Eyebrow } from "./Layout";
const icons = {
  users: Users,
  key: KeyRound,
  music: Music2,
  wine: Wine,
  clock: Clock,
  light: Lightbulb,
  fridge: Refrigerator,
  sparkles: Sparkles,
  dance: Footprints,
};
export function Facts() {
  return (
    <div className="facts container">
      {data.facts.map((f) => {
        const Icon = icons[f.icon as keyof typeof icons];
        return (
          <div className="fact-card glass" key={f.title}>
            <Icon size={24} strokeWidth={1.4} />
            <strong>{f.title}</strong>
            <span>{f.detail}</span>
          </div>
        );
      })}
    </div>
  );
}
export function Equipment({ compact = false }: { compact?: boolean }) {
  return (
    <div className="equipment-grid">
      {(compact ? data.equipment.slice(0, 3) : data.equipment).map(
        (item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <article className="equipment-card glass" key={item.title}>
              <span className="card-number">0{i + 1}</span>
              <div className="icon-well">
                <Icon size={28} strokeWidth={1.3} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        },
      )}
    </div>
  );
}
export function PriceCard() {
  return (
    <article className="price-card glass">
      <div className="price-card-top">
        <span className="pill">DEIN ABEND IN DER TABERNA</span>
        <KeyRound size={23} />
      </div>
      <h3>{de.price.cardTitle}</h3>
      <div className="price-amount">
        {data.rent}
        <span>€</span>
      </div>
      <p className="price-unit">{de.price.unit}</p>
      <div className="price-divider" />
      <Eyebrow>{de.price.included}</Eyebrow>
      <ul>
        {data.included.map((item) => (
          <li key={item}>
            <Check size={16} />
            {item}
          </li>
        ))}
      </ul>
      <div className="bring-your-own">
        <Wine size={21} />
        <p>{de.price.own}</p>
      </div>
      <Button>{de.price.cta}</Button>
      <p className="caption">{de.price.note}</p>
    </article>
  );
}
export function FAQ({ compact = false }: { compact?: boolean }) {
  return (
    <div className="faq-list">
      {(compact ? data.faq.slice(0, 4) : data.faq).map((f, i) => (
        <details className="glass" key={f.id}>
          <summary>
            <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
            {f.q}
            <span className="faq-plus">+</span>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
      {compact && (
        <a className="text-link" href="#/faq">
          Alle Fragen & Antworten
          <ArrowUpRight size={17} />
        </a>
      )}
    </div>
  );
}
