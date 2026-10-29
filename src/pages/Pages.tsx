import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Clock,
  Music2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { de } from "../data/i18n";
import data from "../data/partyraum.json";
import Gallery from "../components/Gallery";
import Inquiry from "../components/Inquiry";
import { Button, PageHero, SectionTitle, Eyebrow } from "../components/Layout";
import { Facts, Equipment, PriceCard, FAQ } from "../components/Venue";
export function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src={import.meta.env.BASE_URL + data.heroImage}
          alt={data.heroAlt}
          width="1600"
          height="1100"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-petals" aria-hidden="true">
          ❦
        </div>
        <div className="hero-content container">
          <Eyebrow>{de.hero.eyebrow}</Eyebrow>
          <h1>
            {de.hero.lines.map((l, i) => (
              <span key={l} className={i === 2 ? "hero-gold" : ""}>
                {l}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">{de.hero.subtitle}</p>
          <p className="hero-note">{de.hero.note}</p>
          <div className="hero-actions">
            <Button />
            <Button to="partyraum" secondary>
              {de.secondaryCta}
            </Button>
          </div>
          <p className="hero-location">
            <MapPin size={14} />
            {data.address}
          </p>
        </div>
        <div className="hero-bottom container">
          <span>FLAMENCO SOUL. YOUR KIND OF NIGHT.</span>
          <a href="#/galerie">
            ENTDECKEN <ArrowDown size={13} />
          </a>
        </div>
      </section>
      <Facts />
      <section className="section container room-intro">
        <div className="intro-visual">
          <img
            src={import.meta.env.BASE_URL + data.gallery[1].src}
            alt={data.gallery[1].alt}
            loading="lazy"
            width="1600"
            height="1100"
          />
          <div className="image-badge glass">
            <span>EN EL CORAZÓN DE COLONIA</span>
            <strong>
              Mitten in Köln.
              <br />
              Ganz bei euch.
            </strong>
          </div>
        </div>
        <div className="intro-copy">
          <Eyebrow>{de.room.eyebrow}</Eyebrow>
          <h2>{de.room.title}</h2>
          <p>{de.room.intro}</p>
          <div className="rule-line">
            <span />
            {data.floor} · bis ca. {data.capacity} Personen
          </div>
          <Button to="partyraum" secondary>
            {de.room.link}
          </Button>
        </div>
      </section>
      <section className="section section-tinted">
        <div className="container">
          <SectionTitle
            eyebrow={de.equipment.eyebrow}
            title={de.equipment.title}
            text="Dein Lieblingssong. Dein Lieblingslicht. Dein Abend."
          />
          <Equipment compact />
          <div className="section-link">
            <a className="text-link" href="#/ausstattung">
              Die ganze Ausstattung
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow={de.gallery.eyebrow}
          title={de.room.galleryTitle}
        />
        <Gallery />
      </section>
      <section className="section price-section">
        <div className="container split-layout">
          <div>
            <Eyebrow>{de.price.eyebrow}</Eyebrow>
            <h2>{de.price.title}</h2>
            <p>{de.price.intro}</p>
            <div className="small-note glass">
              <Clock size={22} />
              <p>{data.closing}</p>
            </div>
            <a className="text-link" href="#/preise">
              Alle Preisdetails
              <ArrowUpRight size={17} />
            </a>
          </div>
          <PriceCard />
        </div>
      </section>
      <section className="section container split-layout">
        <div>
          <Eyebrow>{de.faq.eyebrow}</Eyebrow>
          <h2>{de.faq.title}</h2>
          <p>{de.faq.intro}</p>
        </div>
        <FAQ compact />
      </section>
    </>
  );
}
export function Room() {
  return (
    <>
      <PageHero
        eyebrow={de.room.eyebrow}
        title={de.room.title}
        text={de.room.intro}
      >
        <Button />
      </PageHero>
      <div className="container room-wide-image">
        <img
          src={import.meta.env.BASE_URL + data.heroImage}
          alt={data.heroAlt}
          width="1600"
          height="1100"
          fetchPriority="high"
        />
        <div className="image-bottom glass">
          <span>{data.floor}</span>
          <span>Bis ca. {data.capacity} Personen</span>
          <span>{data.rent} € Raummiete</span>
        </div>
      </div>
      <Facts />
      <section className="section container">
        <SectionTitle
          eyebrow={de.gallery.eyebrow}
          title={de.room.galleryTitle}
        />
        <Gallery />
      </section>
      <section className="section section-tinted">
        <div className="container">
          <SectionTitle
            eyebrow={de.equipment.eyebrow}
            title={de.equipment.title}
          />
          <Equipment />
        </div>
      </section>
      <section className="section container split-layout">
        <div>
          <Eyebrow>EUER RAHMEN FÜR DIE NACHT</Eyebrow>
          <h2>Alles Wichtige auf einen Blick.</h2>
          <p>{data.closing}</p>
          <p>{data.viewing}</p>
          <Button />
        </div>
        <PriceCard />
      </section>
    </>
  );
}
export function EquipmentPage() {
  return (
    <>
      <PageHero
        eyebrow={de.equipment.eyebrow}
        title={de.equipment.title}
        text={de.equipment.intro}
      />
      <section className="section container page-first-section">
        <Equipment />
        <div className="music-rule glass">
          <Music2 size={34} />
          <div>
            <h2>{de.equipment.musicRule}</h2>
            <p>
              {data.equipment[0].text} {de.equipment.musicNote}
            </p>
          </div>
          <Button />
        </div>
      </section>
    </>
  );
}
export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow={de.gallery.eyebrow}
        title={de.gallery.title}
        text={de.gallery.intro}
      />
      <section className="section container page-first-section">
        <Gallery />
        <div className="visit-card glass">
          <Clock size={27} />
          <div>
            <h3>{de.inquiry.visit}</h3>
            <p>{data.viewing}</p>
          </div>
          <Button />
        </div>
      </section>
    </>
  );
}
export function Prices() {
  return (
    <>
      <PageHero
        eyebrow={de.price.eyebrow}
        title={de.price.title}
        text={de.price.intro}
      />
      <section className="section container prices-layout page-first-section">
        <PriceCard />
        <div className="price-side">
          <Eyebrow>DEINE FEIER. DEINE FREIHEIT.</Eyebrow>
          <h2>
            Bring mit,
            <br />
            was dir schmeckt.
          </h2>
          <p>{de.price.own}</p>
          <div className="small-note glass">
            <Clock size={24} />
            <p>{data.closing}</p>
          </div>
          <p>{de.price.note}</p>
          <a className="text-link" href="#/faq">
            Noch Fragen?
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
export function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow={de.faq.eyebrow}
        title={de.faq.title}
        text={de.faq.intro}
      />
      <section className="section container faq-page page-first-section">
        <FAQ />
        <aside className="faq-contact glass">
          <Mail size={30} />
          <h3>{de.faq.contact}</h3>
          <p>{de.faq.chat}</p>
          <a className="text-link" href={`mailto:${data.email}`}>
            {data.email}
            <ArrowUpRight size={15} />
          </a>
          <Button />
        </aside>
      </section>
    </>
  );
}
export function InquiryPage({
  date,
  setDate,
}: {
  date: string;
  setDate: (d: string) => void;
}) {
  return (
    <>
      <PageHero
        eyebrow={de.inquiry.eyebrow}
        title={de.inquiry.title}
        text={de.inquiry.intro}
      />
      <section className="section container inquiry-layout page-first-section">
        <aside className="inquiry-aside">
          <div className="inquiry-summary glass">
            <Eyebrow>DEIN PARTYRAUM</Eyebrow>
            <h2>{data.name}</h2>
            <p>
              <MapPin size={15} />
              {data.address}
            </p>
            <ul>
              {data.facts.map((f) => (
                <li key={f.title}>{f.title}</li>
              ))}
            </ul>
          </div>
          <div className="visit-card glass">
            <Clock size={25} />
            <div>
              <h3>{de.inquiry.visit}</h3>
              <p>{data.viewing}</p>
            </div>
          </div>
          <p className="secure-note">
            <ShieldCheck size={18} />
            Sichere Übertragung. Persönliche Rückmeldung.
          </p>
          <a className="text-link" href={`mailto:${data.email}`}>
            {data.email}
            <ArrowUpRight size={15} />
          </a>
        </aside>
        <Inquiry date={date} setDate={setDate} />
      </section>
    </>
  );
}
export function Legal({ privacy = false }: { privacy?: boolean }) {
  return (
    <>
      <PageHero
        eyebrow="TABERNA FLAMENCA KÖLN"
        title={privacy ? de.labels.privacy : de.labels.legal}
        text="Angaben und Hinweise zur Website"
      />
      <section className="section container legal-copy glass">
        {privacy ? (
          <>
            <h2>Datenschutzhinweise</h2>
            <p>
              Das Anfrageformular verarbeitet Namen, E-Mail, Telefonnummer und
              Veranstaltungsangaben zur Bearbeitung deiner Anfrage. Eine Anfrage
              führt nicht automatisch zu einer Buchung. Für vorvertragliche
              Anfragen gilt Art. 6 Abs. 1 lit. b DSGVO, im Übrigen je nach
              Anfrage Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              Ohne eingerichtete API werden Formulardaten nicht versendet. Bei
              aktivierter API werden sie über Cloudflare und den Maildienst
              Resend an {data.email} übertragen. Cloudflare Turnstile wird nur
              bei konfiguriertem Site-Key geladen und kann Verbindungs- und
              Browserdaten verarbeiten.
            </p>
            <p>
              Der Assistent arbeitet standardmäßig lokal. Bei konfigurierter API
              werden Fragen an den Server übertragen. Falls die optionale
              KI-Klassifizierung eingeschaltet ist, werden bisher unbekannte
              Fragen an OpenAI übertragen, um sie einer vorhandenen FAQ-Antwort
              zuzuordnen. Vermeide personenbezogene Daten im Chat. Es gibt
              keinen Zugriff auf einen Belegungskalender.
            </p>
            <p>
              Du kannst Auskunft, Berichtigung, Löschung, Einschränkung,
              Datenübertragbarkeit und gegebenenfalls Widerspruch verlangen und
              dich bei einer Datenschutzaufsichtsbehörde beschweren. Kontakt:{" "}
              {data.email}.
            </p>
            <div className="legal-notice">
              <h3>Vor regulärer Veröffentlichung zu ergänzen</h3>
              <p>
                Verantwortlicher, tatsächlicher Hosting-Anbieter (derzeit GitHub
                Pages für die Website), Auftragsverarbeitungsverträge,
                Drittlandtransfers und Schutzmaßnahmen, konkrete Löschfristen
                sowie Rechtsgrundlage des Spam-Schutzes sind verbindlich zu
                prüfen und zu ergänzen. Dies ist eine vorbereitete Grundlage,
                keine abschließend geprüfte Datenschutzerklärung.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2>{data.name}</h2>
            <p>
              {data.address}
              <br />
              E-Mail: <a href={`mailto:${data.email}`}>{data.email}</a>
            </p>
            <div className="legal-notice">
              <h3>Betreiberangaben noch unvollständig</h3>
              <p>
                Vollständiger rechtlicher Betreibername, Rechtsform,
                vertretungsberechtigte Person, telefonischer Kontakt sowie
                gegebenenfalls Register- und Umsatzsteuerangaben müssen vom
                Betreiber ergänzt werden. Diese Angaben wurden nicht erfunden.
              </p>
            </div>
          </>
        )}
      </section>
    </>
  );
}
