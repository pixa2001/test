/** Form copy is kept together to add en/es without changing form behavior. */
export const formCopy = {
  contact: [
    {
      name: "firstName",
      label: "Vorname",
      type: "text",
      autocomplete: "given-name",
    },
    {
      name: "lastName",
      label: "Nachname",
      type: "text",
      autocomplete: "family-name",
    },
    { name: "email", label: "E-Mail", type: "email", autocomplete: "email" },
    { name: "phone", label: "Telefonnummer", type: "tel", autocomplete: "tel" },
  ],
  date: "Wunschdatum",
  eventType: "Art der Veranstaltung",
  select: "Bitte wählen",
  events: ["Geburtstag", "Firmenfeier", "Privatfeier", "Sonstiges"],
  birthdayValue: "Geburtstag",
  occasion: "Anlass",
  occasionPlaceholder: "z. B. 30. Geburtstag",
  age: "Alter des Geburtstagskindes",
  guests: "Erwartete Gästezahl",
  start: "Veranstaltungsbeginn",
  options: [
    { name: "drinks", label: "Eigene Getränke" },
    { name: "food", label: "Eigenes Essen / Catering" },
    { name: "lights", label: "Zusätzliche Lichttechnik" },
  ],
  yes: "Ja",
  no: "Nein",
  message: "Was sollten wir noch wissen?",
  messagePlaceholder: "Erzähl uns von deinem Abend …",
  consentBefore: "Ich habe die",
  privacy: "Datenschutzhinweise",
  consentAfter:
    "gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu.",
  note: "* Pflichtfelder. Deine Anfrage ist unverbindlich. Die Verfügbarkeit wird persönlich geprüft.",
  submit: "Unverbindlich anfragen",
  sending: "Wird gesendet …",
  email: "E-Mail öffnen",
  unavailable:
    "Der sichere Onlineversand ist noch nicht freigeschaltet. Bitte sende deine Anfrage direkt per E-Mail.",
  failure:
    "Die Anfrage konnte nicht versendet werden. Bitte versuche es erneut oder schreibe uns direkt per E-Mail.",
  successTitle: "Deine Anfrage ist unterwegs.",
  successText:
    "Danke für dein Interesse! Das Team prüft deinen Wunschtermin und meldet sich bei dir. Dies ist noch keine Buchungsbestätigung.",
  another: "Weitere Anfrage",
};
