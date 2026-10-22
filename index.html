<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Taberna Meldung">
<meta name="theme-color" content="#111111">

<title>Taberna Flamenca – Meldung</title>

<style>
:root{
  --bg:#0d0d0f;
  --card:#19191d;
  --line:#303036;
  --text:#f7f7f4;
  --muted:#a7a7ad;
  --orange:#f28c28;
  --turq:#28c8c2;
  --gold:#e5b44b;
}

*{box-sizing:border-box}

body{
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
  min-height:100vh;
}

.app{
  max-width:760px;
  margin:auto;
  padding:35px 22px;
}

.brand{
  font-size:12px;
  letter-spacing:.18em;
  text-transform:uppercase;
  color:var(--orange);
  font-weight:800;
}

h1{
  font-size:30px;
  margin:12px 0 5px;
}

.hint{
  color:var(--muted);
  margin-bottom:25px;
}

.progress{
  height:5px;
  background:#27272b;
  border-radius:99px;
  overflow:hidden;
  margin-bottom:25px;
}

.progress div{
  height:100%;
  background:linear-gradient(90deg,var(--orange),var(--gold));
  width:25%;
  transition:.3s;
}

.grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:12px;
}

.btn{
  border:1px solid var(--line);
  background:var(--card);
  color:var(--text);
  border-radius:16px;
  min-height:80px;
  padding:16px;
  text-align:left;
  font-size:16px;
  font-weight:700;
}

.btn:active{
  transform:scale(.98);
  border-color:var(--orange);
}

.field{
  width:100%;
  border:1px solid var(--line);
  background:var(--card);
  color:var(--text);
  border-radius:14px;
  padding:15px;
  font-size:17px;
  margin:8px 0 20px;
}

textarea.field{
  min-height:130px;
}

.primary{
  width:100%;
  border:0;
  background:var(--orange);
  color:#17110a;
  border-radius:15px;
  min-height:55px;
  font-size:17px;
  font-weight:800;
}

.secondary{
  width:100%;
  border:1px solid var(--line);
  background:transparent;
  color:var(--text);
  border-radius:15px;
  min-height:50px;
  margin-top:10px;
  font-size:16px;
}

.panel{
  background:var(--card);
  border:1px solid var(--line);
  border-radius:17px;
  padding:18px;
  margin-bottom:15px;
}

.mail{
  display:flex;
  align-items:center;
  justify-content:center;
  background:var(--turq);
  color:#071313;
  text-decoration:none;
  border-radius:15px;
  min-height:55px;
  font-weight:800;
}

.hidden{display:none}

pre{
  white-space:pre-wrap;
  font-family:inherit;
  line-height:1.5;
}

@media(max-width:430px){
  .grid{grid-template-columns:1fr}
  .app{padding:25px 16px}
}
</style>
</head>

<body>

<main class="app">

<div class="brand">TABERNA FLAMENCA · MELDESYSTEM</div>

<h1 id="title">Wo ist das Problem?</h1>
<div class="hint" id="hint">Wähle den Bereich aus.</div>

<div class="progress">
  <div id="progress"></div>
</div>

<section id="step1">

<div class="grid">

<button class="btn area" data-value="Erdgeschoss">
🍹<br>Erdgeschoss
</button>

<button class="btn area" data-value="1. Obergeschoss">
⬆️<br>1. Obergeschoss
</button>

<button class="btn area" data-value="Keller">
📦<br>Keller
</button>

<button class="btn area" data-value="Toiletten">
🚻<br>Toiletten
</button>

<button class="btn area" data-value="Außenbereich">
🚪<br>Außenbereich
</button>

<button class="btn area" data-value="Sonstiges">
•••<br>Sonstiges
</button>

</div>

</section>


<section id="step2" class="hidden">

<div class="grid">

<button class="btn problem" data-value="Defekt / beschädigt">
🔧<br>Defekt / beschädigt
</button>

<button class="btn problem" data-value="Funktioniert nicht">
⚠️<br>Funktioniert nicht
</button>

<button class="btn problem" data-value="Fehlt / nachbestellen">
📋<br>Fehlt / nachbestellen
</button>

<button class="btn problem" data-value="Reinigung / Verschmutzung">
🧹<br>Reinigung
</button>

</div>

<button class="secondary" onclick="showStep(1)">
← Zurück
</button>

</section>


<section id="step3" class="hidden">

<label>Was genau ist betroffen?</label>

<input
id="item"
class="field"
placeholder="z. B. Kühlschrank, Licht, Wasserhahn">

<label>Zusätzliche Nachricht</label>

<textarea
id="note"
class="field"
placeholder="Beschreibe kurz, was passiert ist …"></textarea>

<button class="primary" id="create">
Meldung erstellen
</button>

<button class="secondary" onclick="showStep(2)">
← Zurück
</button>

</section>


<section id="step4" class="hidden">

<div class="panel">

<div class="brand">VORSCHAU DER E-MAIL</div>

<h3 id="subject"></h3>

<pre id="preview"></pre>

</div>

<a id="mail" class="mail" href="#">
✉️ E-Mail im Mail-Programm öffnen
</a>

<button class="secondary" onclick="restart()">
Neue Meldung
</button>

</section>

</main>


<script>

let area="";
let problem="";

const titles=[
"Wo ist das Problem?",
"Worum geht es?",
"Was möchtest du melden?",
"Meldung fertig"
];

const hints=[
"Wähle den Bereich aus.",
"Wähle aus, was passiert ist.",
"Beschreibe kurz das Problem.",
"Prüfe die Meldung."
];

function showStep(n){

for(let i=1;i<=4;i++){
document.getElementById("step"+i)
.classList.toggle("hidden",i!==n);
}

document.getElementById("title").textContent=titles[n-1];
document.getElementById("hint").textContent=hints[n-1];

document.getElementById("progress").style.width=(n*25)+"%";

}

document.querySelectorAll(".area").forEach(button=>{

button.addEventListener("click",()=>{

area=button.dataset.value;

showStep(2);

});

});


document.querySelectorAll(".problem").forEach(button=>{

button.addEventListener("click",()=>{

problem=button.dataset.value;

showStep(3);

});

});


document.getElementById("create").addEventListener("click",()=>{

const item=document.getElementById("item").value.trim();

const note=document.getElementById("note").value.trim();

if(!item){

alert("Bitte gib an, was betroffen ist.");

return;

}

const subject=
"Taberna – Meldung: "+area+" – "+item;

const body=
`TABERNA FLAMENCA – MELDUNG

Bereich: ${area}

Problem: ${problem}

Betroffen: ${item}

Beschreibung:
${note || "Keine zusätzliche Angabe."}`;

document.getElementById("subject").textContent=
"Betreff: "+subject;

document.getElementById("preview").textContent=body;

document.getElementById("mail").href=
"mailto:?subject="+encodeURIComponent(subject)+
"&body="+encodeURIComponent(body);

showStep(4);

});


function restart(){

area="";
problem="";

document.getElementById("item").value="";
document.getElementById("note").value="";

showStep(1);

}

</script>

</body>
</html>
