import venue from "../../src/data/partyraum.json" with { type: "json" };
interface Env {RESEND_API_KEY:string;MAIL_FROM:string;ALLOWED_ORIGIN:string;TURNSTILE_SECRET_KEY:string}
type Context={request:Request;env:Env};
export async function onRequest({request,env}:Context):Promise<Response>{
 const origin=request.headers.get('Origin');const headers:Record<string,string>={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};
 if(origin!==env.ALLOWED_ORIGIN)return new Response('{"error":"Origin not allowed"}',{status:403,headers});
 headers['Access-Control-Allow-Origin']=env.ALLOWED_ORIGIN;headers['Access-Control-Allow-Methods']='POST, OPTIONS';headers['Access-Control-Allow-Headers']='Content-Type';
 const reply=(status:number,error?:string)=>new Response(JSON.stringify(error?{error}:{ok:true}),{status,headers});
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 if(request.method!=='POST')return reply(405,'Method not allowed');
 if(!env.RESEND_API_KEY||!env.MAIL_FROM||!env.TURNSTILE_SECRET_KEY)return reply(503,'Mail service not configured');
 if(!request.headers.get('Content-Type')?.includes('application/json'))return reply(415,'JSON required');
 try{
 const raw=await request.text();if(raw.length>16000)return reply(413,'Request too large');
 const d:Record<string,unknown>=JSON.parse(raw);if(d.website)return reply(400,'Invalid request');
 const required=['firstName','lastName','email','phone','date','eventType','occasion','guests','startTime','drinks','food','lights'];
 if(required.some(k=>typeof d[k]!=='string'||!String(d[k]).trim()||String(d[k]).length>200)||d.consent!=='yes')return reply(400,'Missing or invalid fields');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email))||/[\r\n]/.test(String(d.email)))return reply(400,'Invalid email');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(String(d.date))||new Date(String(d.date)+'T12:00:00Z').toISOString().slice(0,10)!==d.date||String(d.date)<new Date().toISOString().slice(0,10))return reply(400,'Invalid date');
 if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(String(d.startTime))||!Number.isInteger(Number(d.guests))||Number(d.guests)<1||Number(d.guests)>venue.capacity)return reply(400,'Invalid time or guest count');
 if(['drinks','food','lights'].some(k=>!['Ja','Nein'].includes(String(d[k]))))return reply(400,'Invalid choice');
 if(d.eventType==='Geburtstag'&&(!Number.isInteger(Number(d.age))||Number(d.age)<1||Number(d.age)>120))return reply(400,'Invalid age');
 if(d.message!==undefined&&(typeof d.message!=='string'||d.message.length>4000))return reply(400,'Invalid message');
 if(typeof d.turnstileToken!=='string'||d.turnstileToken.length>2048)return reply(400,'Spam protection required');
 const verification=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:d.turnstileToken})});
 const verified=await verification.json() as {success?:boolean};if(!verified.success)return reply(403,'Spam protection failed');
 const labels:Record<string,string>={firstName:'Vorname',lastName:'Nachname',email:'E-Mail',phone:'Telefon',date:'Wunschdatum',eventType:'Veranstaltungsart',occasion:'Anlass',age:'Alter Geburtstagskind',guests:'Gästezahl',startTime:'Beginn',drinks:'Eigene Getränke',food:'Eigenes Essen / Catering',lights:'Zusätzliche Lichttechnik',message:'Nachricht',consent:'Datenschutz-Zustimmung'};
 const text=Object.entries(labels).map(([k,label])=>`${label}: ${d[k]||'–'}`).join('\n\n');
 const date=String(d.date).split('-').reverse().join('.');const occasion=String(d.occasion).replace(/[\r\n]/g,' ').slice(0,120);
 const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:env.MAIL_FROM,to:[venue.email],reply_to:d.email,subject:`Partyraum-Anfrage – ${occasion} – ${date}`,text})});
 if(!sent.ok)return reply(502,'Mail delivery failed');return reply(200);
 }catch{return reply(400,'Request could not be processed')}
}
