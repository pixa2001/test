import { useEffect, useRef, useState } from "react";
import { Header, Footer, routes, type Page } from "./components/Layout";
import Chat from "./components/Chat";
import {
  Home,
  Room,
  EquipmentPage,
  GalleryPage,
  Prices,
  FAQPage,
  InquiryPage,
  Legal,
} from "./pages/Pages";
import { de } from "./data/i18n";
const validPages: Page[] = ["home", ...routes, "impressum", "datenschutz"];
function currentPage(): Page {
  const p = window.location.hash.replace(/^#\/?/, "") || "home";
  return validPages.includes(p as Page) ? (p as Page) : "home";
}
export default function App() {
  const [page, setPage] = useState<Page>(currentPage),
    [date, setDate] = useState("");
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);
  useEffect(() => {
    const onHash = () => setPage(currentPage());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: "Deine Party. Deine Musik. Deine Nacht.",
      partyraum: de.labels.room,
      ausstattung: de.labels.equipment,
      galerie: de.labels.gallery,
      preise: de.labels.prices,
      faq: de.labels.faq,
      anfrage: de.labels.inquiry,
      impressum: de.labels.legal,
      datenschutz: de.labels.privacy,
    };
    document.title = `${titles[page]} | Taberna Flamenca Köln`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!first.current) main.current?.focus({ preventScroll: true });
    first.current = false;
  }, [page]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".section-heading,.equipment-card,.price-card,.intro-copy",
      )
      .forEach((el) => {
        el.classList.add("scroll-reveal");
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, [page]);
  let content;
  switch (page) {
    case "partyraum":
      content = <Room />;
      break;
    case "ausstattung":
      content = <EquipmentPage />;
      break;
    case "galerie":
      content = <GalleryPage />;
      break;
    case "preise":
      content = <Prices />;
      break;
    case "faq":
      content = <FAQPage />;
      break;
    case "anfrage":
      content = <InquiryPage date={date} setDate={setDate} />;
      break;
    case "impressum":
      content = <Legal />;
      break;
    case "datenschutz":
      content = <Legal privacy />;
      break;
    default:
      content = <Home />;
  }
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          main.current?.focus();
        }}
      >
        Zum Inhalt
      </a>
      <Header page={page} />
      <main ref={main} id="main" tabIndex={-1} className={`route-${page}`}>
        {content}
      </main>
      <Footer />
      <Chat onDate={setDate} />
    </>
  );
}
