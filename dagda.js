const app=document.getElementById('salmonApp');
const language=document.getElementById('language');
let lang=localStorage.getItem('okcm-language')==='es'?'es':'en';
language.value=lang;
let view='intro',page=Math.max(0,Number(localStorage.getItem('okcm-dagda-page-'+lang)||0)),fontScale=Number(localStorage.getItem('okcm-font')||1),night=false;
let pages={en:[],es:[]};
const labels={
en:{book:'Of Kings, Curses and Mist',back:'Library',title:"The Dagda's Harp",desc:'A stolen harp, a hall of enemies and three melodies that change everything. · Editorial draft',minutes:'About 10–13 minutes',open:'Read the draft',continue:'Continue reading',previous:'Previous',next:'Next',after:'After the story',finish:'Return to the library',read:'Read aloud',stop:'Stop',night:'Night',day:'Day',question:'After the Story',understanding:'Understanding',reflect:'Think about it',reflectText:'Which of the three melodies most surprised you, and why?',beyond:'Beyond the Legend',sources:'Sources & Further Reading',sourceNote:'This is an original literary draft based on a medieval Irish tradition. It is pending editorial review.',correct:'Correct.',wrong:'Not quite. Try another answer.',return:'Return to the reader'},
es:{book:'De reyes, maldiciones y niebla',back:'Biblioteca',title:'El arpa del Dagda',desc:'Un arpa robada, un salón lleno de enemigos y tres melodías capaces de cambiarlo todo. · Borrador editorial',minutes:'Aprox. 10–13 minutos',open:'Leer el borrador',continue:'Continuar leyendo',previous:'Anterior',next:'Siguiente',after:'Después de la historia',finish:'Volver a la biblioteca',read:'Escuchar',stop:'Detener',night:'Noche',day:'Día',question:'Después de la historia',understanding:'Comprensión',reflect:'Para reflexionar',reflectText:'¿Cuál de las tres melodías te ha sorprendido más y por qué?',beyond:'Más allá de la leyenda',sources:'Fuentes y lecturas complementarias',sourceNote:'Borrador literario original basado en una tradición medieval irlandesa, pendiente de revisión editorial.',correct:'¡Correcto!',wrong:'No exactamente. Prueba otra respuesta.',return:'Volver al relato'}};
const cultural={
en:[
{title:'A people of old Ireland',text:'The Tuatha Dé Danann are a supernatural people in Irish myth. They appear in stories of battles, magical crafts and the struggle for Ireland. The Fomorians are among their recurring rivals, though the traditions do not always portray either group in exactly the same way. The Dagda, Lugh and Ogma are important figures in this mythological world.'},
{title:'A harp with two names',text:'In the medieval tale Cath Maige Tuired, the Dagda calls the harp by the names Daur Dá Bláo and Cóir Cetharchair. Úaithne is described there as his harper, the person taken by the Fomorians. Some later versions use Uaithne as the instrument’s name instead. Our story follows the distinction made in this particular source.'},
{title:'Three strains of music',text:'The old account identifies three kinds of music associated with an accomplished harper: the sorrowful strain, the joyful strain and the sleeping strain. Their effect is magical in the legend, but the underlying idea is familiar: music can transform the atmosphere of a gathering and awaken powerful feelings.'},
{title:'What the old account tells us',text:'The episode occurs near the end of the Second Battle of Mag Tuired. The Dagda, Lugh and Ogma enter the hall where Bres and Elatha are present; the harp flies back and the three escape after its music puts the company to sleep. The medieval text says the flying harp killed nine men. This adaptation describes the impact without that numerical detail and invents conversations, personal reactions and the quiet journey home.'}
],
es:[
{title:'Un pueblo de la Irlanda legendaria',text:'Los Tuatha Dé Danann son un pueblo sobrenatural de la mitología irlandesa. Aparecen en relatos sobre grandes batallas, artes mágicas y la disputa por el dominio de Irlanda. Los fomorianos figuran entre sus adversarios habituales, aunque las tradiciones no siempre describen a ambos pueblos del mismo modo. El Dagda, Lugh y Ogma son figuras destacadas de ese universo mitológico.'},
{title:'Un arpa con dos nombres',text:'En el relato medieval Cath Maige Tuired, el Dagda llama al arpa por los nombres Daur Dá Bláo y Cóir Cetharchair. Allí, Úaithne es su arpista, el músico capturado por los fomorianos. Algunas adaptaciones posteriores emplean Uaithne como nombre del instrumento. Nuestra versión respeta la distinción que aparece en esta fuente.'},
{title:'Las tres melodías',text:'El texto antiguo menciona tres clases de música asociadas a un buen arpista: la que provoca tristeza, la que despierta alegría y la que induce el sueño. En la leyenda sus efectos son mágicos, pero parten de una experiencia reconocible: la música puede cambiar el ambiente de una reunión y despertar emociones inesperadas.'},
{title:'Lo que cuenta la fuente antigua',text:'El episodio se sitúa hacia el final de la Segunda Batalla de Mag Tuired. El Dagda, Lugh y Ogma entran en el salón donde se encuentran Bres y Elatha; el arpa regresa volando y los tres escapan cuando la música duerme a los presentes. El texto medieval afirma que el instrumento mató a nueve hombres durante su regreso. En nuestra adaptación no se precisa esa cifra y se recrean literariamente los diálogos, las reacciones y el camino de vuelta.'}
]};
const quiz={
en:[{q:'What did the Fomorians take?',a:['The Dagda’s harp and its keeper Uaithne.','The Dagda’s cauldron.','Lugh’s sword.'],correct:0},{q:'How did the harp return?',a:['Ogma climbed the wall.','The Dagda called it by its old names.','Bres returned it.'],correct:1},{q:'What happened during the third melody?',a:['Everyone danced.','The hall caught fire.','The Fomorians fell asleep.'],correct:2}],
es:[{q:'¿Qué se llevaron los fomorianos?',a:['El arpa del Dagda y a Uaithne, su custodio.','El caldero del Dagda.','La espada de Lugh.'],correct:0},{q:'¿Cómo regresó el arpa?',a:['Ogma trepó por la pared.','El Dagda la llamó por sus antiguos nombres.','Bres la devolvió.'],correct:1},{q:'¿Qué provocó la tercera melodía?',a:['Todos bailaron.','El salón comenzó a arder.','Los fomorianos se quedaron dormidos.'],correct:2}]};
const safe=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t=()=>labels[lang];
function parse(md){
const sections=md.split(/\n(?=## [1-9]\. )/).filter(part=>/^## [1-9]\./.test(part));
const result=[];
for(const [groupIndex,section] of sections.entries()){
  const [heading,...rest]=section.trim().split('\n');
  const title=heading.replace(/^## [1-9]\. /,'');
  const paras=rest.join('\n').trim().split(/\n\s*\n/).filter(Boolean);
  const total=paras.reduce((sum,p)=>sum+p.length,0);
  // Split only long narrative movements; balance their pages to avoid tiny fragments.
  const targetPages=Math.max(1,Math.round(total/1800));
  let chunks=[],chunk=[],length=0,consumed=0;
  for(let i=0;i<paras.length;i++){
    const remaining=paras.slice(i).reduce((sum,p)=>sum+p.length,0);
    const remainingSlots=targetPages-chunks.length;
    const goal=Math.ceil((remaining+length)/Math.max(1,remainingSlots));
    if(chunk.length && remainingSlots>1 && length>=goal && remaining>400){
      chunks.push(chunk);chunk=[];length=0;
    }
    chunk.push(paras[i]);length+=paras[i].length;
  }
  if(chunk.length)chunks.push(chunk);
  for(const group of chunks)result.push({title,paras:group,groupIndex});
}
return result;
}
async function load(){
const [en,es]=await Promise.all(['en','es'].map(l=>fetch('editorial/03-dagdas-harp.'+l+'.md?v=3').then(r=>{if(!r.ok)throw Error('Unable to fetch story');return r.text()})));
pages.en=parse(en);pages.es=parse(es);
if(!pages.en.length||!pages.es.length)throw Error('Empty story');
page=Math.min(page,pages[lang].length);
render();
}
function save(){localStorage.setItem('okcm-dagda-page-'+lang,String(page))}
function stop(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function illustratedPage(index){
const n=pages[lang].length;
if(index>=n)return false;
const item=pages[lang][index];
if(item.groupIndex===0)return index===0;
if(item.groupIndex===2)return index===0||pages[lang][index-1]?.groupIndex!==2;
if(item.groupIndex===3)return index===0||pages[lang][index-1]?.groupIndex!==3;
return false;
}
function scene(){
const items=pages[lang],item=items[page];
const ornaments=['assets/ornament-knot-small.webp','assets/ornament-triskele.webp','assets/ornament-oval.webp','assets/ornament-diamond.webp'];
const ornament={src:ornaments[page%ornaments.length],alt:'',decor:true};
if(!item)return ornament;
if(item.groupIndex===0&&page===0)return {src:'assets/dagda-empty-hall-4x5.webp',alt:lang==='es'?'El Dagda, Lugh y Ogma observan el lugar vacío donde descansaba el arpa':'The Dagda, Lugh and Ogma face the empty place where the harp had rested',decor:false};
if(item.groupIndex===2 && (page===0||items[page-1]?.groupIndex!==2))return {src:'assets/dagda-harp-returns-4x5.webp',alt:lang==='es'?'El arpa regresa volando hacia el Dagda en el salón de los fomorianos':'The harp flies back to the Dagda in the Fomorian hall',decor:false};
if(item.groupIndex===3 && (page===0||items[page-1]?.groupIndex!==3))return {src:'assets/dagda-three-melodies-4x5.webp',alt:lang==='es'?'El Dagda toca el arpa mientras los fomorianos lloran, ríen y se duermen':'The Dagda plays as the Fomorians weep, laugh and fall asleep',decor:false};
return ornament;
}
function go(v){stop();view=v;render();window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true})}
function intro(){return '<section class="salmon-opening"><img src="assets/dagda-harp-returns-4x5.webp" alt="'+(lang==='es'?'El arpa mágica regresa al Dagda':'The magical harp returns to the Dagda')+'" onerror="this.src=\'assets/ornament-triskele.webp\'" style="max-height:560px;object-fit:contain;background:#eee4cf"><div class="mini-label">03 · '+t().minutes+' · '+(lang==='es'?'BORRADOR':'DRAFT')+'</div><h1>'+t().title+'</h1><p>'+t().desc+'</p><button class="button" data-action="read">'+t().open+' →</button></section>'}
function reader(){
const n=pages[lang].length;
const beyond=page===n;const p=beyond?null:pages[lang][page];const sc=scene();
const body=beyond?cultural[lang].map(x=>'<section class="beyond-note"><h3>'+safe(x.title)+'</h3><p>'+safe(x.text)+'</p></section>').join(''):p.paras.map(x=>'<p>'+safe(x)+'</p>').join('');
const heading=beyond?t().beyond:p.title;
const img='<div class="page-image '+(sc.decor?'decorative':'')+'" style="--scene-image:url(&quot;'+sc.src+'&quot;)"><img src="'+sc.src+'" alt="'+safe(sc.alt)+'" onerror="this.onerror=null;this.src=\'assets/ornament-triskele.webp\'" loading="lazy"><div class="image-caption">'+safe(heading)+'</div></div>';
return '<div class="reader-wrap salmon-reader '+(night?'night':'')+'" style="--font-scale:'+fontScale+'"><div class="reader-tools"><div class="left"><a class="tool" href="index.html">'+t().back+'</a><span class="mini-label">03 · '+t().title+'</span></div><div class="right"><button class="tool" data-action="smaller">A−</button><button class="tool" data-action="larger">A+</button><button class="tool" data-action="theme">'+(night?t().day:t().night)+'</button><button class="tool" data-action="speak">'+t().read+' ▶</button><button class="tool" data-action="stop">■ '+t().stop+'</button></div></div><article class="spread">'+img+'<div class="page-text"><div class="folio">'+t().title+' · '+(page+1)+' / '+(n+1)+'</div><h2>'+safe(heading)+'</h2><div class="prose" id="spokenText">'+body+'</div></div></article><nav class="reader-navigation"><button class="button secondary" data-action="prev" '+(page===0?'disabled':'')+'>← '+t().previous+'</button><span class="page-count">'+(page+1)+' / '+(n+1)+'</span><button class="button" data-action="next">'+(page===n?t().after:page===n-1?t().beyond:t().next)+' →</button></nav></div>';
}
function questions(){return '<section class="qa"><button class="tool" data-action="read">'+t().return+'</button><h2>'+t().question+'</h2><h3>'+t().understanding+'</h3>'+quiz[lang].map((q,i)=>'<fieldset class="question"><legend>'+(i+1)+'. '+safe(q.q)+'</legend>'+q.a.map((a,j)=>'<label class="choice"><input type="radio" name="q'+i+'" value="'+j+'"> '+safe(a)+'</label>').join('')+'<p class="feedback" id="feedback'+i+'" aria-live="polite"></p></fieldset>').join('')+'<aside><h3>'+t().reflect+'</h3><p>'+t().reflectText+'</p></aside><a class="button" href="index.html">'+t().finish+'</a></section>'}
function bibliography(){
document.getElementById('sourceSummary').textContent=t().sources;
document.getElementById('sourceList').innerHTML='<h3>'+t().title+'</h3><h4>'+(lang==='es'?'Fuente medieval':'Medieval source')+'</h4><p><a href="https://celt.ucc.ie/published/T300010.html" target="_blank" rel="noopener">University College Cork, CELT — Cath Maige Tuired: The Second Battle of Mag Tuired, §§163–164</a></p><h4>'+(lang==='es'?'Para saber más':'Further reading')+'</h4><p><a href="https://celt.ucc.ie/document/T300010/" target="_blank" rel="noopener">UCC CELT — Introduction and full text</a></p><p>'+t().sourceNote+'</p>';
}
function render(){document.documentElement.lang=lang;document.title=t().title+' — '+t().book;document.getElementById('brandTitle').textContent='✧ '+t().book;document.getElementById('credit').textContent=(lang==='es'?'Creado y dirigido por David Martín Guerrero · Adaptación original de una leyenda tradicional irlandesa, con apoyo de IA para el texto y las ilustraciones.':'Created and curated by David Martín Guerrero · Original literary retelling of Irish tradition, with AI assistance for text and illustrations.');bibliography();app.innerHTML=view==='intro'?intro():view==='reader'?reader():questions();}
function speak(){if(!('speechSynthesis'in window)||view!=='reader')return;stop();const n=pages[lang].length;const txt=page===n?cultural[lang].map(v=>v.title+'. '+v.text).join(' '):pages[lang][page].title+'. '+pages[lang][page].paras.join(' ');const u=new SpeechSynthesisUtterance(txt);u.lang=lang==='es'?'es-ES':'en-IE';u.rate=.88;speechSynthesis.speak(u)}
document.addEventListener('click',e=>{const x=e.target.closest('[data-action]');if(!x)return;switch(x.dataset.action){case'read':go('reader');break;case'next':if(page===pages[lang].length){go('quiz')}else{page++;save();go('reader')}break;case'prev':if(page>0){page--;save();go('reader')}break;case'smaller':fontScale=Math.max(.9,Math.round((fontScale-.1)*100)/100);localStorage.setItem('okcm-font',fontScale);render();break;case'larger':fontScale=Math.min(1.55,Math.round((fontScale+.1)*100)/100);localStorage.setItem('okcm-font',fontScale);render();break;case'theme':night=!night;render();break;case'speak':speak();break;case'stop':stop();break}});
document.addEventListener('change',e=>{if(!e.target.matches('input[type=radio]'))return;const i=Number(e.target.name.slice(1));document.getElementById('feedback'+i).textContent=Number(e.target.value)===quiz[lang][i].correct?t().correct:t().wrong});
language.addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('okcm-language',lang);page=Math.min(Number(localStorage.getItem('okcm-dagda-page-'+lang)||0),pages[lang].length);stop();render()});
let touchStart=null;
document.addEventListener('touchstart',e=>{if(view!=='reader'||!e.target.closest('.spread')||e.touches.length!==1){touchStart=null;return}touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
document.addEventListener('touchend',e=>{if(!touchStart||e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<80||Math.abs(dx)<Math.abs(dy)*1.4)return;if(dx<0){if(page<pages[lang].length){page++;save();go('reader')}else go('quiz')}else if(page>0){page--;save();go('reader')}},{passive:true});
load().catch(err=>{app.innerHTML='<section class="qa">'+(lang==='es'?'No se pudo cargar la leyenda.':'Unable to load the story.')+'</section>';console.error(err)});
