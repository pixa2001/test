import { useState } from "react";
import { ArrowUpRight, Menu, X, MapPin, ArrowRight } from "lucide-react";
import Logo from "./Logo";
import data from "../data/partyraum.json";
import { de } from "../data/i18n";
export const routes = [
  "partyraum",
  "ausstattung",
  "galerie",
  "preise",
  "faq",
  "anfrage",
] as const;
export type Page =
  | "home"
  | (typeof routes)[number]
  | "impressum"
  | "datenschutz";
export function Button({
  to = "anfrage",
  children = de.cta,
  secondary = false,
}: {
  to?: Page;
  children?: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      className={`button ${secondary ? "button-glass" : ""}`}
      href={to === "home" ? "#/" : "#/" + to}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  const labels = [...de.nav, de.cta];
  const link = (i: number) => (
    <a
      key={routes[i]}
      href={"#/" + routes[i]}
      aria-current={page === routes[i] ? "page" : undefined}
      onClick={() => setOpen(false)}
      className={i === 5 ? "nav-cta" : ""}
    >
      {labels[i]}
      {i === 5 && <ArrowUpRight size={14} />}
    </a>
  );
  return (
    <header className="site-header">
      <div className="nav-shell glass">
        <nav
          className={open ? "desktop-nav mobile-open" : "desktop-nav"}
          aria-label="Hauptnavigation"
        >
          <div className="nav-half">{[0, 1, 2].map(link)}</div>
          <div className="nav-half nav-right">{[3, 4, 5].map(link)}</div>
        </nav>
        <a
          className="nav-brand"
          href="#/"
          onClick={() => setOpen(false)}
          aria-label="Taberna Flamenca Startseite"
        >
          <Logo />
        </a>
        <span className="mobile-brand-name">
          TABERNA <span>FLAMENCA</span>
        </span>
        <button
          className="menu-toggle"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {text && <p>{text}</p>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-glow" />
      <div className="container">
        <a className="back-home" href="#/">
          {de.labels.home}
          <ArrowRight size={12} />
        </a>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{text}</p>
        {children}
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <>
      <section className="closing-banner">
        <div className="botanical botanical-left" aria-hidden="true">
          ❦
        </div>
        <Eyebrow>{de.closing.eyebrow}</Eyebrow>
        <h2>{de.closing.title}</h2>
        <p>{de.closing.text}</p>
        <Button />
        <div className="botanical botanical-right" aria-hidden="true">
          ❦
        </div>
      </section>
      <footer className="site-footer container">
        <a href="#/" className="footer-brand">
          <Logo small />
          <span>
            TABERNA FLAMENCA<small>KÖLN · ALTSTADT</small>
          </span>
        </a>
        <p>
          <MapPin size={14} />
          {data.address}
          <br />
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </p>
        <div className="footer-links">
          <a href="#/impressum">{de.labels.legal}</a>
          <a href="#/datenschutz">{de.labels.privacy}</a>
          <span>
            © {new Date().getFullYear()} {data.name}
          </span>
        </div>
      </footer>
    </>
  );
}
