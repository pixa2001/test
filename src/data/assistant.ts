import data from './partyraum.json';
import {de} from './i18n';
export function answer(question:string){
 const q=question.toLocaleLowerCase('de');
 if(/frei|verfügbar|termin|buch|reservier|\d{1,2}[./]\d{1,2}|\d{4}-\d{2}-\d{2}/.test(q))return de.availability;
 return data.faq.find(f=>f.keywords.some(k=>q.includes(k)))?.a||de.unknown;
}
