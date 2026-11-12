const app=document.getElementById('salmonApp');
const language=document.getElementById('language');
let lang=localStorage.getItem('okcm-language')==='es'?'es':'en';
language.value=lang;
let view='intro',page=Math.max(0,Number(localStorage.getItem('okcm-dagda-page-'+lang)||0)),fontScale=Number(localStorage.getItem('okcm-font')||1),night=false;
let pages={en:[],es:[]};
const labels={
en:{book:'Of Kings, Curses and Mist',back:'Library',title:"The Dagda's Harp",desc:'A stolen harp, a hall of enemies and three melodies that change everything. · Editorial draft',minutes:'About 10–13 minutes',open:'Read the draft',continue:'Continue reading',previous:'Previous',next:'Next',after:'After the story',finish:'Return to the library',read:'Read aloud',stop:'Stop',night:'Night',day:'Day',question:'After the Story',understanding:'Understanding',reflect:'Think about it',reflectText:'Which of the three melodies most surprised you, and why?',beyond:'Behind the Legend · In preparation',sources:'Sources & Further Reading',sourceNote:'This is an original literary draft based on a medieval Irish tradition. It is pending editorial review.',correct:'Correct.',wrong:'Not quite. Try another answer.',return:'Return to the reader'},
es:{book:'De reyes, maldiciones y niebla',back:'Biblioteca',title:'El arpa del Dagda',desc:'Un arpa robada, un salón lleno de enemigos y tres melodías capaces de cambiarlo todo. · Borrador editorial',minutes:'Aprox. 10–13 minutos',open:'Leer el borrador',continue:'Continuar leyendo',previous:'Anterior',next:'Siguiente',after:'Después de la historia',finish:'Volver a la biblioteca',read:'Escuchar',stop:'Detener',night:'Noche',day:'Día',question:'Después de la historia',understanding:'Comprensión',reflect:'Para reflexionar',reflectText:'¿Cuál de las tres melodías te ha sorprendido más y por qué?',beyond:'Más allá de la leyenda · En preparación',sources:'Fuentes y lecturas complementarias',sourceNote:'Borrador literario original basado en una tradición medieval irlandesa, pendiente de revisión editorial.',correct:'¡Correcto!',wrong:'No exactamente. Prueba otra respuesta.',return:'Volver al relato'}};
const cultural={
en:[{title:'Editorial note',text:'This chapter is a literary draft, not a final publication. The cultural notes, character references and further reading will be developed after the story has been approved. Its central episode derives from Cath Maige Tuired (The Second Battle of Mag Tuired).'}],
es:[{title:'Nota editorial',text:'Este capítulo es un borrador literario, no una publicación definitiva. Prepararemos las notas culturales, las fichas de personajes y las lecturas complementarias después de aprobar la narración. El episodio central procede de Cath Maige Tuired (La segunda batalla de Mag Tuired).'}]};
const quiz={
en:[{q:'What did the Fomorians take?',a:['The Dagda’s harp and its keeper Uaithne.','The Dagda’s cauldron.','Lugh’s sword.'],correct:0},{q:'How did the harp return?',a:['Ogma climbed the wall.','The Dagda called it by its old names.','Bres returned it.'],correct:1},{q:'What happened during the third melody?',a:['Everyone danced.','The hall caught fire.','The Fomorians fell asleep.'],correct:2}],
es:[{q:'¿Qué se llevaron los fomorianos?',a:['El arpa del Dagda y a Uaithne, su custodio.','El caldero del Dagda.','La espada de Lugh.'],correct:0},{q:'¿Cómo regresó el arpa?',a:['Ogma trepó por la pared.','El Dagda la llamó por sus antiguos nombres.','Bres la devolvió.'],correct:1},{q:'¿Qué provocó la tercera melodía?',a:['Todos bailaron.','El salón comenzó a arder.','Los fomorianos se quedaron dormidos.'],correct:2}]};
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
const [en,es]=await Promise.all(['en','es'].map(l=>fetch('editorial/03-dagdas-harp.'+l+'.md').then(r=>{if(!r.ok)throw Error('Unable to fetch story');return r.text()})));
pages.en=parse(en);pages.es=parse(es);
if(!pages.en.length||!pages.es.length)throw Error('Empty story');
page=Math.min(page,pages[lang].length);
render();
}
function save(){localStorage.setItem('okcm-dagda-page-'+lang,String(page))}
function stop(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function illustratedPage(index){return false}
function scene(){
const ornaments=['assets/ornament-knot-small.webp','assets/ornament-triskele.webp','assets/ornament-oval.webp','assets/ornament-diamond.webp'];
return {src:ornaments[page%ornaments.length],alt:'',decor:true};
}
function go(v){stop();view=v;render();window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true})}
function intro(){return '<section class="salmon-opening"><div style="display:grid;place-items:center;min-height:240px;background:#eee4cf;border-radius:7px"><img src="assets/ornament-triskele.webp" alt="" style="max-width:200px;max-height:200px;object-fit:contain"></div><div class="mini-label">03 · '+t().minutes+' · '+(lang==='es'?'BORRADOR':'DRAFT')+'</div><h1>'+t().title+'</h1><p>'+t().desc+'</p><button class="button" data-action="read">'+t().open+' →</button></section>'}
function reader(){
const n=pages[lang].length;
const beyond=page===n;const p=beyond?null:pages[lang][page];const sc=scene();
const body=beyond?cultural[lang].map(x=>'<section class="beyond-note"><h3>'+safe(x.title)+'</h3><p>'+safe(x.text)+'</p></section>').join(''):p.paras.map(x=>'<p>'+safe(x)+'</p>').join('');
const heading=beyond?t().beyond:p.title;
const img='<div class="page-image '+(sc.decor?'decorative':'')+'" style="--scene-image:url(&quot;'+sc.src+'&quot;)"><img src="'+sc.src+'" alt="'+safe(sc.alt)+'" loading="lazy"><div class="image-caption">'+safe(heading)+'</div></div>';
return '<div class="reader-wrap salmon-reader '+(night?'night':'')+'" style="--font-scale:'+fontScale+'"><div class="reader-tools"><div class="left"><a class="tool" href="index.html">'+t().back+'</a><span class="mini-label">03 · '+t().title+'</span></div><div class="right"><button class="tool" data-action="smaller">A−</button><button class="tool" data-action="larger">A+</button><button class="tool" data-action="theme">'+(night?t().day:t().night)+'</button><button class="tool" data-action="speak">'+t().read+' ▶</button><button class="tool" data-action="stop">■ '+t().stop+'</button></div></div><article class="spread">'+img+'<div class="page-text"><div class="folio">'+t().title+' · '+(page+1)+' / '+(n+1)+'</div><h2>'+safe(heading)+'</h2><div class="prose" id="spokenText">'+body+'</div></div></article><nav class="reader-navigation"><button class="button secondary" data-action="prev" '+(page===0?'disabled':'')+'>← '+t().previous+'</button><span class="page-count">'+(page+1)+' / '+(n+1)+'</span><button class="button" data-action="next">'+(page===n?t().after:page===n-1?t().beyond:t().next)+' →</button></nav></div>';
}
function questions(){return '<section class="qa"><button class="tool" data-action="read">'+t().return+'</button><h2>'+t().question+'</h2><h3>'+t().understanding+'</h3>'+quiz[lang].map((q,i)=>'<fieldset class="question"><legend>'+(i+1)+'. '+safe(q.q)+'</legend>'+q.a.map((a,j)=>'<label class="choice"><input type="radio" name="q'+i+'" value="'+j+'"> '+safe(a)+'</label>').join('')+'<p class="feedback" id="feedback'+i+'" aria-live="polite"></p></fieldset>').join('')+'<aside><h3>'+t().reflect+'</h3><p>'+t().reflectText+'</p></aside><a class="button" href="index.html">'+t().finish+'</a></section>'}
function bibliography(){
document.getElementById('sourceSummary').textContent=t().sources;
document.getElementById('sourceList').innerHTML='<h3>'+t().title+'</h3><p><a href="https://celt.ucc.ie/" target="_blank" rel="noopener">UCC CELT — Cath Maige Tuired (The Second Battle of Mag Tuired)</a></p><p>'+t().sourceNote+'</p>';
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
