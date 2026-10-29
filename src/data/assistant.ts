import data from "./partyraum.json";
import { de } from "./i18n";
export function answer(question: string) {
  const q = question.toLocaleLowerCase("de");
  if (
    /frei|verfügbar|termin|buch|reservier|\d{1,2}[./]\d{1,2}|\d{4}-\d{2}-\d{2}/.test(
      q,
    )
  )
    return de.availability;
  const matches = data.faq
    .map((f) => ({
      faq: f,
      score: Math.max(
        0,
        ...f.keywords.filter((k) => q.includes(k)).map((k) => k.length),
      ),
    }))
    .sort((a, b) => b.score - a.score);
  return matches[0]?.score ? matches[0].faq.a : de.unknown;
}
