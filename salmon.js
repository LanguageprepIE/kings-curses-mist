const app=document.getElementById('salmonApp');
const language=document.getElementById('language');
let lang=localStorage.getItem('okcm-language')==='es'?'es':'en';
language.value=lang;
let view='intro',page=Math.max(0,Number(localStorage.getItem('okcm-salmon-page-'+lang)||0)),fontScale=Number(localStorage.getItem('okcm-font')||1),night=false;
let pages={en:[],es:[]};
const labels={
en:{book:'Of Kings, Curses and Mist',back:'Library',title:'The Salmon of Knowledge',desc:'A boy in search of wisdom, a poet who has waited seven years, and a gift neither expected.',minutes:'About 12–15 minutes',open:'Read the legend',continue:'Continue reading',previous:'Previous',next:'Next',after:'After the story',finish:'Return to the library',read:'Read aloud',stop:'Stop',night:'Night',day:'Day',question:'After the Story',understanding:'Understanding',reflect:'Think about it',reflectText:'Finegas waited seven years for a gift that went to someone else. Which part of his response do you find most difficult to imagine, and why?',beyond:'Beyond the Legend',sources:'Sources & Further Reading',sourceNote:'These sources inform an original literary retelling. Dialogues and character motivations are creative additions.',correct:'Correct.',wrong:'Not quite. Try another answer.',return:'Return to the reader'},
es:{book:'De reyes, maldiciones y niebla',back:'Biblioteca',title:'El salmón del conocimiento',desc:'Un muchacho que busca aprender, un poeta que lleva siete años esperando y un don que ninguno de los dos esperaba recibir así.',minutes:'Aprox. 12–15 minutos',open:'Leer la leyenda',continue:'Continuar leyendo',previous:'Anterior',next:'Siguiente',after:'Después de la historia',finish:'Volver a la biblioteca',read:'Escuchar',stop:'Detener',night:'Noche',day:'Día',question:'Después de la historia',understanding:'Comprensión',reflect:'Para reflexionar',reflectText:'Finegas esperó siete años para obtener un don que recibió otra persona. ¿Qué aspecto de su reacción te parece más difícil de comprender? ¿Por qué?',beyond:'Más allá de la leyenda',sources:'Fuentes y lecturas complementarias',sourceNote:'Estas fuentes documentan una tradición que aquí se adapta literariamente. Los diálogos y las motivaciones desarrolladas son aportaciones creativas.',correct:'¡Correcto!',wrong:'No exactamente. Prueba otra respuesta.',return:'Volver al relato'}};
const cultural={
en:[
{title:'A hero before his adventures',text:'Fionn mac Cumhaill is one of the great figures of the Fenian Cycle, a body of Irish stories about heroes associated with the Fianna. This episode belongs to accounts of his youth. The magical gift does not make him a flawless hero: his later stories include difficult choices, battles, losses and surprising encounters. The version you have read ends before those adventures begin.'},
{title:'The Boyne and the hazels',text:'The River Boyne is real, flowing through eastern Ireland towards the Irish Sea. In Irish myth it is bound to stories of hidden knowledge and poetic inspiration. Some traditions connect the salmon with hazelnuts from sacred trees that fell into enchanted water. Such details belong to overlapping bodies of lore; they should not be mistaken for a single fixed description of the river or of the fish.'},
{title:'The thumb of knowledge',text:'In an early account of the boyhood deeds of Finn, the young hero burns his thumb while cooking the fish, then puts it in his mouth. Later, placing his thumb in his mouth helps him gain knowledge that would otherwise be hidden. Retellings vary in the precise way the burn occurs. It is a striking image: the gift arrives through an ordinary, almost accidental human gesture.'},
{title:'Names, prophecy and poetry',text:'Finegas is also written Finnéces or Finn Éces, while Fionn is often rendered Finn. The boy is called Demne in accounts of his early life. The prophecy that someone named Finn would taste the salmon therefore carries a play of names. The old poet is more than a fisherman: poets in early Irish literature are guardians of learning and memory. His hesitant generosity here is our literary interpretation of the traditional encounter.'}],
es:[
{title:'Un héroe antes de sus aventuras',text:'Fionn mac Cumhaill es uno de los grandes protagonistas del ciclo feniano, un conjunto de relatos irlandeses vinculados a los guerreros de la Fianna. La historia del salmón pertenece a las narraciones sobre su juventud. El don recibido no lo convierte en un héroe perfecto: en sus aventuras posteriores encontrará conflictos, pérdidas y decisiones difíciles. Nuestro relato termina antes de que emprenda ese camino.'},
{title:'El Boyne y los avellanos',text:'El río Boyne existe realmente y recorre el este de Irlanda hasta desembocar en el mar de Irlanda. La mitología lo relaciona con conocimientos ocultos y con la inspiración de los poetas. Algunas tradiciones explican el don del salmón mediante las avellanas de árboles sagrados que caían en aguas encantadas. Estos motivos aparecen en relatos relacionados, pero no constituyen una única descripción invariable de la leyenda.'},
{title:'El pulgar del conocimiento',text:'En un relato antiguo sobre la juventud de Fionn, el muchacho se quema el pulgar mientras cocina el pescado y se lo lleva a la boca. Según la tradición, ese mismo gesto le permitirá después acceder a conocimientos que otros ignoran. Los detalles de la quemadura cambian entre versiones. Resulta fascinante que un poder extraordinario surja de un acto tan cotidiano como intentar aliviar el dolor.'},
{title:'Nombres, profecías y poesía',text:'Finegas aparece también como Finnéces o Finn Éces, y el nombre de Fionn suele escribirse Finn. Algunas fuentes llaman Demne al protagonista durante su infancia. La profecía juega, por tanto, con nombres que se parecen. Finegas no es simplemente un pescador: el poeta representa una tradición de conocimiento y memoria. La decepción y la generosidad con las que lo retratamos forman parte de nuestra interpretación literaria.'}]
};
const quiz={
en:[{q:'Why had Finegas watched the pool for seven years?',a:['He was looking for a lost boat.','He hoped to catch the salmon that carried extraordinary knowledge.','He was waiting for Fionn to return.'],correct:1},{q:'How did Fionn first taste the salmon?',a:['He burned his thumb and put it in his mouth.','Finegas offered him the first bite.','He secretly ate the fish by the river.'],correct:0},{q:'What did Finegas do after learning what had happened?',a:['He sent Fionn away without speaking.','He tried to catch a second salmon.','He told Fionn to eat the salmon.'],correct:2}],
es:[{q:'¿Por qué había vigilado Finegas el remanso durante siete años?',a:['Buscaba una barca perdida.','Esperaba capturar el salmón que poseía conocimientos extraordinarios.','Esperaba el regreso de Fionn.'],correct:1},{q:'¿Cómo probó Fionn el salmón por primera vez?',a:['Se quemó el pulgar y se lo llevó a la boca.','Finegas le ofreció el primer bocado.','Se comió el pescado a escondidas junto al río.'],correct:0},{q:'¿Qué hizo Finegas cuando comprendió lo ocurrido?',a:['Despidió a Fionn sin hablarle.','Intentó pescar un segundo salmón.','Le dijo a Fionn que se comiera el salmón.'],correct:2}]};
const safe=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t=()=>labels[lang];
function parse(md){
const groups=md.split(/\n(?=## [1-9]\. )/).filter(part=>/^## [1-9]\./.test(part));
const result=[];
for(const [groupIndex,group] of groups.entries()){
const [heading,...rest]=group.trim().split('\n');
const title=heading.replace(/^## [1-9]\. /,'');
const paras=rest.join('\n').trim().split(/\n\s*\n/).filter(Boolean);
let chunk=[],size=0;
for(const p of paras){
if(chunk.length>=3&&size+p.length>1500){result.push({title,paras:chunk,groupIndex});chunk=[];size=0}
chunk.push(p);size+=p.length;
}
if(chunk.length)result.push({title,paras:chunk,groupIndex});
}
return result;
}
async function load(){
const [en,es]=await Promise.all(['en','es'].map(l=>fetch('editorial/02-salmon-of-knowledge.'+l+'.md').then(r=>{if(!r.ok)throw Error('Unable to fetch story');return r.text()})));
pages.en=parse(en);pages.es=parse(es);
if(!pages.en.length||!pages.es.length)throw Error('Empty story');
page=Math.min(page,pages[lang].length);
render();
}
function save(){localStorage.setItem('okcm-salmon-page-'+lang,String(page))}
function stop(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function illustratedPage(index){
const story=pages[lang],n=story.length;
if(index===0)return true;
if(index>=n)return false;
const current=story[index];
return (current.groupIndex===1 && (index===n-1 || story[index+1].groupIndex!==1))
  || (current.groupIndex===3 && story[index-1].groupIndex!==3);
}
function scene(){
const n=pages[lang].length;
const ornaments=['assets/ornament-knot-small.webp','assets/ornament-triskele.webp','assets/ornament-oval.webp','assets/ornament-diamond.webp'];
let ornamentIndex=0;
for(let i=0;i<page;i++)if(!illustratedPage(i))ornamentIndex++;
const decoration={src:ornaments[ornamentIndex%ornaments.length],alt:'',decor:true};
if(page===0)return {src:'assets/salmon-mentor-4x5.webp',alt:lang==='es'?'Finegas conversa con el joven Fionn junto al Boyne':'Finegas speaks with young Fionn beside the Boyne',decor:false};
if(page===n)return decoration;
const current=pages[lang][page];
if(current.groupIndex===1 && (page===n-1 || pages[lang][page+1].groupIndex!==1))return {src:'assets/salmon-cover.webp',alt:lang==='es'?'El salmón salta entre las aguas del río Boyne':'The salmon leaps from the River Boyne',decor:false};
if(current.groupIndex===3 && pages[lang][page-1].groupIndex!==3)return {src:'assets/salmon-gift-4x5.webp',alt:lang==='es'?'Finegas habla con Fionn junto al salmón cocinado':'Finegas speaks with Fionn beside the cooked salmon',decor:false};
return decoration;
}
function go(v){stop();view=v;render();window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true})}
function intro(){return '<section class="salmon-opening"><img src="assets/salmon-cover.webp" alt="'+(lang==='es'?'Salmón plateado emergiendo del río Boyne':'Silver salmon leaping from the River Boyne')+'"><div class="mini-label">02 · '+t().minutes+'</div><h1>'+t().title+'</h1><p>'+t().desc+'</p><button class="button" data-action="read">'+t().open+' →</button></section>'}
function reader(){
const n=pages[lang].length;
const beyond=page===n;const p=beyond?null:pages[lang][page];const sc=scene();
const body=beyond?cultural[lang].map(x=>'<section class="beyond-note"><h3>'+safe(x.title)+'</h3><p>'+safe(x.text)+'</p></section>').join(''):p.paras.map((x,i)=>'<p>'+MythCards.highlight(x,lang,'salmon',pages[lang].map(x=>x.paras),page,i)+'</p>').join('');
const heading=beyond?t().beyond:p.title;
const img='<div class="page-image '+(sc.decor?'decorative':'')+'" style="--scene-image:url(&quot;'+sc.src+'&quot;)"><img src="'+sc.src+'" alt="'+safe(sc.alt)+'" loading="lazy"><div class="image-caption">'+safe(heading)+'</div></div>';
return '<div class="reader-wrap salmon-reader '+(night?'night':'')+'" style="--font-scale:'+fontScale+'"><div class="reader-tools"><div class="left"><a class="tool" href="index.html">'+t().back+'</a><span class="mini-label">02 · '+t().title+'</span></div><div class="right"><button class="tool" data-action="smaller">A−</button><button class="tool" data-action="larger">A+</button><button class="tool" data-action="theme">'+(night?t().day:t().night)+'</button><button class="tool" data-action="speak">'+t().read+' ▶</button><button class="tool" data-action="stop">■ '+t().stop+'</button></div></div><article class="spread">'+img+'<div class="page-text"><div class="folio">'+t().title+' · '+(page+1)+' / '+(n+1)+'</div><h2>'+safe(heading)+'</h2><div class="prose" id="spokenText">'+body+'</div></div></article><nav class="reader-navigation"><button class="button secondary" data-action="prev" '+(page===0?'disabled':'')+'>← '+t().previous+'</button><span class="page-count">'+(page+1)+' / '+(n+1)+'</span><button class="button" data-action="next">'+(page===n?t().after:page===n-1?t().beyond:t().next)+' →</button></nav></div>';
}
function questions(){return '<section class="qa"><button class="tool" data-action="read">'+t().return+'</button><h2>'+t().question+'</h2><h3>'+t().understanding+'</h3>'+quiz[lang].map((q,i)=>'<fieldset class="question"><legend>'+(i+1)+'. '+safe(q.q)+'</legend>'+q.a.map((a,j)=>'<label class="choice"><input type="radio" name="q'+i+'" value="'+j+'"> '+safe(a)+'</label>').join('')+'<p class="feedback" id="feedback'+i+'" aria-live="polite"></p></fieldset>').join('')+'<aside><h3>'+t().reflect+'</h3><p>'+t().reflectText+'</p></aside><a class="button" href="index.html">'+t().finish+'</a></section>'}
function bibliography(){
document.getElementById('sourceSummary').textContent=t().sources;
document.getElementById('sourceList').innerHTML='<h3>'+t().title+'</h3><h4>'+(lang==='es'?'Fuentes tradicionales y documentación':'Traditional sources and documentation')+'</h4><ul><li><a target="_blank" rel="noopener" href="https://celt.ucc.ie/published/T303023.html">UCC CELT — The Boyish Exploits of Finn</a></li><li><a target="_blank" rel="noopener" href="https://www.duchas.ie/en/cbes/5008882/4963505/5077854">Dúchas — The Salmon of Knowledge in Drogheda</a></li></ul><h4>'+(lang==='es'?'Lecturas complementarias':'Further reading')+'</h4><ul><li><a target="_blank" rel="noopener" href="https://www.askaboutireland.ie/reading-room/history-heritage/folklore-of-ireland/folklore-in-ireland/traditional-storytelling/fionn-and-the-fianna/the-salmon-of-knowledge/index.xml">Ask About Ireland — The Salmon of Knowledge</a></li><li><a target="_blank" rel="noopener" href="https://www.librariesireland.ie/sites/default/files/media/file-uploads/2018-10/The-Salmon-of-Knowledge-eng-sen.pdf">Libraries Ireland — The Salmon of Knowledge</a></li></ul><p>'+t().sourceNote+'</p>';
}
function render(){document.documentElement.lang=lang;document.title=t().title+' — '+t().book;document.getElementById('brandTitle').textContent='✧ '+t().book;document.getElementById('credit').textContent=(lang==='es'?'Creado y dirigido por David Martín Guerrero · Adaptación original de una leyenda tradicional irlandesa, con apoyo de IA para el texto y las ilustraciones.':'Created and curated by David Martín Guerrero · Original literary retelling of Irish tradition, with AI assistance for text and illustrations.');bibliography();app.innerHTML=view==='intro'?intro():view==='reader'?reader():questions();}
function speak(){if(!('speechSynthesis'in window)||view!=='reader')return;stop();const n=pages[lang].length;const txt=page===n?cultural[lang].map(v=>v.title+'. '+v.text).join(' '):pages[lang][page].title+'. '+pages[lang][page].paras.join(' ');const u=new SpeechSynthesisUtterance(txt);u.lang=lang==='es'?'es-ES':'en-IE';u.rate=.88;speechSynthesis.speak(u)}
document.addEventListener('click',e=>{const x=e.target.closest('[data-action]');if(!x)return;switch(x.dataset.action){case'read':go('reader');break;case'next':if(page===pages[lang].length){go('quiz')}else{page++;save();go('reader')}break;case'prev':if(page>0){page--;save();go('reader')}break;case'smaller':fontScale=Math.max(.9,Math.round((fontScale-.1)*100)/100);localStorage.setItem('okcm-font',fontScale);render();break;case'larger':fontScale=Math.min(1.55,Math.round((fontScale+.1)*100)/100);localStorage.setItem('okcm-font',fontScale);render();break;case'theme':night=!night;render();break;case'speak':speak();break;case'stop':stop();break}});
document.addEventListener('change',e=>{if(!e.target.matches('input[type=radio]'))return;const i=Number(e.target.name.slice(1));document.getElementById('feedback'+i).textContent=Number(e.target.value)===quiz[lang][i].correct?t().correct:t().wrong});
language.addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('okcm-language',lang);page=Math.min(Number(localStorage.getItem('okcm-salmon-page-'+lang)||0),pages[lang].length);stop();render()});
let touchStart=null;
document.addEventListener('touchstart',e=>{if(view!=='reader'||!e.target.closest('.spread')||e.touches.length!==1){touchStart=null;return}touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
document.addEventListener('touchend',e=>{if(!touchStart||e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<80||Math.abs(dx)<Math.abs(dy)*1.4)return;if(dx<0){if(page<pages[lang].length){page++;save();go('reader')}else go('quiz')}else if(page>0){page--;save();go('reader')}},{passive:true});
MythCards.bind(()=>lang);
load().catch(err=>{app.innerHTML='<section class="qa">'+(lang==='es'?'No se pudo cargar la leyenda.':'Unable to load the story.')+'</section>';console.error(err)});
