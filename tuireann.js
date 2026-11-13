const app=document.getElementById('salmonApp');
const language=document.getElementById('language');
let lang=localStorage.getItem('okcm-language')==='es'?'es':'en';
language.value=lang;
let view='intro',page=Math.max(0,Number(localStorage.getItem('okcm-tuireann-page-'+lang)||0)),fontScale=Number(localStorage.getItem('okcm-font')||1),night=false;
let pages={en:[],es:[]};
const labels={
en:{book:'Of Kings, Curses and Mist',back:'Library',title:'The Children of Tuireann',desc:'Three brothers, a terrible debt and an extraordinary journey whose price keeps rising.',minutes:'Approx. 18–22 minutes',open:'Read the draft',continue:'Continue reading',previous:'Previous',next:'Next',after:'After the story',finish:'Return to the library',read:'Read aloud',stop:'Stop',night:'Night',day:'Day',question:'After the Story',understanding:'Understanding',reflect:'Think about it',reflectText:'When the brothers finally pay the fine, why does the ending still feel unresolved?',beyond:'Beyond the Legend',sources:'Sources & Further Reading',sourceNote:'Original retelling informed by public-domain editions of the Irish tale. Dialogues and interior responses are literary inventions. Editorial draft pending approval.',correct:'Correct.',wrong:'Not quite. Try another answer.',return:'Return to the reader'},
es:{book:'De reyes, maldiciones y niebla',back:'Biblioteca',title:'Los hijos de Tuireann',desc:'Tres hermanos, una deuda terrible y un viaje extraordinario cuyo precio no deja de crecer.',minutes:'Aprox. 18–22 minutos',open:'Leer el borrador',continue:'Continuar leyendo',previous:'Anterior',next:'Siguiente',after:'Después de la historia',finish:'Volver a la biblioteca',read:'Escuchar',stop:'Detener',night:'Noche',day:'Día',question:'Después de la historia',understanding:'Comprensión',reflect:'Para reflexionar',reflectText:'Cuando los hermanos terminan de pagar la compensación, ¿por qué el desenlace sigue resultando doloroso?',beyond:'Más allá de la leyenda',sources:'Fuentes y lecturas complementarias',sourceNote:'Adaptación original basada en ediciones de dominio público de la leyenda irlandesa. Los diálogos y las reacciones personales son recreaciones literarias. Borrador pendiente de aprobación.',correct:'¡Correcto!',wrong:'No exactamente. Prueba otra respuesta.',return:'Volver al relato'}};
const cultural={
en:[
{title:'One of the Three Sorrows',text:'The fate of the sons of Tuireann is traditionally counted among the Three Sorrows of Irish Storytelling, together with the Children of Lir and the fate of the sons of Uisneach. The three tales are distinct tragedies, not parts of one continuous plot.'},
{title:'What is an éraic?',text:'An éraic, or blood-fine, is a form of compensation for a killing in Irish tradition. Lugh names a seemingly modest list of objects, but their owners and guardians make the demands extraordinarily dangerous. His intervention in the brothers’ memory deepens the question of justice.'},
{title:'A world of magical treasures',text:'The golden apples, healing pigskin, fiery spear and sea-running horses belong to the wonder-filled geography of the traditional quest. In older retellings the brothers become hawks and then swans; Brian’s bravery and ingenuity are as central to the story as his guilt.'},
{title:'The tradition and our retelling',text:'The tale survives in later manuscript forms and public-domain editions, including those by P. W. Joyce and Richard O’Duffy. The structure of the quest, Cian’s transformation, Lugh’s spell of forgetting and the fatal final task are traditional elements. Our conversations, sensory details and selected scenes are original literary choices.'}
],
es:[
{title:'Una de las Tres Grandes Tristezas',text:'El destino de los hijos de Tuireann pertenece a las Tres Grandes Tristezas de la narración irlandesa, junto con los hijos de Lir y los hijos de Uisneach. Son tres tragedias distintas, no capítulos consecutivos de una misma historia.'},
{title:'¿Qué es una éraic?',text:'La éraic era una forma de compensación por una muerte en la tradición jurídica irlandesa. Lugh exige unos objetos que parecen sencillos de conseguir, pero sus dueños los convierten en tareas casi imposibles. El hechizo del olvido añade una dimensión inquietante a su exigencia de justicia.'},
{title:'Tesoros de un mundo extraordinario',text:'Las manzanas doradas, la piel curativa, la lanza ardiente y los caballos capaces de correr sobre el mar forman parte de la geografía maravillosa del relato tradicional. Los hermanos se transforman en halcones y después en cisnes: la astucia de Brian resulta tan importante como su culpabilidad.'},
{title:'La tradición y nuestra adaptación',text:'La historia se conserva en versiones manuscritas relativamente tardías y en ediciones antiguas de autores como P. W. Joyce y Richard O’Duffy. La transformación de Cian, los encargos, el olvido provocado por Lugh y el desenlace trágico proceden de esa tradición. Las conversaciones, impresiones y escenas elegidas son recreaciones literarias originales.'}
]};
const quiz={
en:[{q:'Why does Lugh demand a blood-fine?',a:['The brothers stole his chariot.','The brothers killed his father Cian.','They refused to fight the Fomorians.'],correct:1},{q:'How do the brothers escape the guardians of the golden apples?',a:['By changing from hawks into swans and diving into the sea.','By sailing away on a chariot.','By offering the healing skin.'],correct:0},{q:'What happens after the final task?',a:['Lugh forgives them and returns the skin.','They become kings in a distant land.','They are mortally wounded and Lugh will not lend the healing skin.'],correct:2}],
es:[{q:'¿Por qué exige Lugh una compensación?',a:['Porque los hermanos han robado su carro.','Porque han matado a su padre Cian.','Porque se niegan a luchar contra los fomorianos.'],correct:1},{q:'¿Cómo escapan los hermanos de las guardianas de las manzanas?',a:['Se transforman de halcones en cisnes y se sumergen en el mar.','Huyen montados en un carro.','Entregan la piel curativa.'],correct:0},{q:'¿Qué ocurre después de la última prueba?',a:['Lugh los perdona y les devuelve la piel.','Los hermanos se convierten en reyes.','Quedan heridos de muerte y Lugh se niega a prestarles la piel curativa.'],correct:2}]};
const safe=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const t=()=>labels[lang];

const mythTerms=[
['tuatha',['Tuatha Dé Danann']],['lugh',['Lugh']],['cian',['Cian']],['tuireann',['Tuireann']],['brian',['Brian']],['iuchar',['Iuchar']],['iucharba',['Iucharba']],['easal',['Easal']],['eraic',['éraic','blood-fine']],['muirthemne',['Muirthemne']],['miodhchaoin',['Miodhchaoin']]
];
const mythData={
en:{tuatha:['Tuatha Dé Danann','A supernatural people of Irish tradition, among whom Lugh and the sons of Tuireann are counted.'],lugh:['Lugh','A champion of many skills whose father Cian is killed by the brothers. He demands a blood-fine.'],cian:['Cian','Lugh’s father. He attempts to escape the three brothers by taking the shape of a pig.'],tuireann:['Tuireann','Father of Brian, Iuchar and Iucharba, who fears the price of their promise.'],brian:['Brian','Eldest of the three brothers, fierce, resourceful and responsible for their journey.'],iuchar:['Iuchar','One of the three sons of Tuireann; brother of Brian and Iucharba.'],iucharba:['Iucharba','The youngest of Tuireann’s three sons, who shares the dangerous quest.'],easal:['Easal','King of the Golden Pillars who chooses negotiation when the brothers demand his seven pigs.'],eraic:['Éraic','A payment or compensation demanded after a killing, sometimes called a blood-fine.'],muirthemne:['Muirthemne','A plain associated with the first encounter between Cian and the sons of Tuireann.'],miodhchaoin:['Miodhchaoin','Guardian of the hill where the brothers must give three cries.']},
es:{tuatha:['Tuatha Dé Danann','Pueblo sobrenatural de las leyendas irlandesas al que pertenecen Lugh y los hijos de Tuireann.'],lugh:['Lugh','Campeón de muchas habilidades, cuyo padre Cian muere a manos de los hermanos. Exige una compensación.'],cian:['Cian','Padre de Lugh. Intenta escapar de los tres hermanos transformándose en cerdo.'],tuireann:['Tuireann','Padre de Brian, Iuchar e Iucharba, que teme las consecuencias de la promesa de sus hijos.'],brian:['Brian','El mayor de los tres hermanos, decidido e ingenioso, y principal responsable del viaje.'],iuchar:['Iuchar','Uno de los tres hijos de Tuireann; hermano de Brian e Iucharba.'],iucharba:['Iucharba','El menor de los tres hijos de Tuireann, que comparte la peligrosa búsqueda.'],easal:['Easal','Rey de las Columnas de Oro que prefiere negociar cuando los hermanos reclaman sus siete cerdos.'],eraic:['Éraic','Compensación exigida por una muerte en la tradición irlandesa.'],muirthemne:['Muirthemne','Llanura relacionada con el primer encuentro entre Cian y los hijos de Tuireann.'],miodhchaoin:['Miodhchaoin','Guardián de la colina donde los hermanos deben dar tres gritos.']}
};
function markedParagraph(raw,paragraphIndex){
 const found=[];
 for(const [id,forms] of mythTerms){
  const form=forms.find(x=>raw.toLocaleLowerCase().includes(x.toLocaleLowerCase()));
  if(!form)continue;
  let earlier=false;
  outer:for(let i=0;i<=page;i++){
   const limit=i===page?paragraphIndex:pages[lang][i].paras.length;
   for(let j=0;j<limit;j++){
    if(forms.some(x=>pages[lang][i].paras[j].toLocaleLowerCase().includes(x.toLocaleLowerCase()))){earlier=true;break outer}
   }
  }
  if(!earlier)found.push({at:raw.toLocaleLowerCase().indexOf(form.toLocaleLowerCase()),len:form.length,id});
 }
 found.sort((a,b)=>a.at-b.at);
 let cursor=0,result='';
 for(const m of found){
  if(m.at<cursor)continue;
  result+=safe(raw.slice(cursor,m.at));
  const label=raw.slice(m.at,m.at+m.len);
  result+='<button type="button" class="myth-term" data-myth="'+m.id+'" aria-label="'+safe(label)+' — '+(lang==='es'?'ver ficha':'view reference card')+'">'+safe(label)+'</button>';
  cursor=m.at+m.len;
 }
 return result+safe(raw.slice(cursor));
}
function mythDialog(){
 return '<dialog id="mythDialog" class="myth-dialog" aria-labelledby="mythHeading"><div class="myth-dialog-inner"><button type="button" class="myth-dismiss" data-myth-close aria-label="'+(lang==='es'?'Cerrar':'Close')+'">×</button><div class="myth-eyebrow">'+(lang==='es'?'EL MUNDO DETRÁS DE LAS LEYENDAS':'THE WORLD BEHIND THE LEGENDS')+'</div><h3 id="mythHeading"></h3><p id="mythDescription"></p><a id="mythFull" class="myth-full" href="world.html">'+(lang==='es'?'Ver en la enciclopedia completa':'Read the full encyclopedia entry')+' →</a></div></dialog>';
}
function openMyth(id){
 const item=mythData[lang][id],dialog=document.getElementById('mythDialog');
 if(!item||!dialog)return;
 dialog.querySelector('#mythHeading').textContent=item[0];
 dialog.querySelector('#mythDescription').textContent=item[1];
 dialog.querySelector('#mythFull').href='world.html#'+id;
 dialog.showModal();
 dialog.querySelector('[data-myth-close]').focus();
}

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
const [en,es]=await Promise.all(['en','es'].map(l=>fetch('editorial/04-children-of-tuireann.'+l+'.md?v=1').then(r=>{if(!r.ok)throw Error('Unable to fetch story');return r.text()})));
pages.en=parse(en);pages.es=parse(es);
if(!pages.en.length||!pages.es.length)throw Error('Empty story');
page=Math.min(page,pages[lang].length);
render();
}
function save(){localStorage.setItem('okcm-tuireann-page-'+lang,String(page))}
function stop(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function illustratedPage(index){
const n=pages[lang].length;
if(index>=n)return false;
const item=pages[lang][index];
if(item.groupIndex===0)return index===0;
return false;
}
function scene(){
const items=pages[lang],item=items[page];
const ornaments=['assets/ornament-knot-small.webp','assets/ornament-triskele.webp','assets/ornament-oval.webp','assets/ornament-diamond.webp'];
return {src:ornaments[page%ornaments.length],alt:'',decor:true};
}

function go(v){stop();view=v;render();window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true})}
function intro(){
return '<section class="salmon-opening"><img src="assets/ornament-medallion.webp" alt="" style="object-fit:contain;background:#eee4cf;max-height:240px"><div class="mini-label">04 · '+t().minutes+' · '+(lang==='es'?'BORRADOR EN REVISIÓN':'EDITORIAL DRAFT')+'</div><h1>'+t().title+'</h1><p>'+t().desc+'</p><p class="qa">'+(lang==='es'?'Texto e ilustraciones aún pendientes de aprobación editorial. Las imágenes definitivas se elegirán después de revisar la narración.':'Text and artwork awaiting editorial approval. Final illustrations will follow the review of the narrative.')+'</p><button class="button" data-action="read">'+t().open+' →</button></section>';
}
function reader(){
const n=pages[lang].length;
const beyond=page===n;const p=beyond?null:pages[lang][page];const sc=scene();
const body=beyond?cultural[lang].map(x=>'<section class="beyond-note"><h3>'+safe(x.title)+'</h3><p>'+safe(x.text)+'</p></section>').join(''):p.paras.map((x,i)=>'<p>'+markedParagraph(x,i)+'</p>').join('');
const heading=beyond?t().beyond:p.title;
const img='<div class="page-image '+(sc.decor?'decorative':'')+'" style="--scene-image:url(&quot;'+sc.src+'&quot;)"><img src="'+sc.src+'" alt="'+safe(sc.alt)+'" onerror="this.onerror=null;this.src=\'assets/ornament-triskele.webp\'" loading="lazy"><div class="image-caption">'+safe(heading)+'</div></div>';
return '<div class="reader-wrap salmon-reader '+(night?'night':'')+'" style="--font-scale:'+fontScale+'"><div class="reader-tools"><div class="left"><a class="tool" href="index.html">'+t().back+'</a><span class="mini-label">04 · '+t().title+'</span></div><div class="right"><button class="tool" data-action="smaller">A−</button><button class="tool" data-action="larger">A+</button><button class="tool" data-action="theme">'+(night?t().day:t().night)+'</button><button class="tool" data-action="speak">'+t().read+' ▶</button><button class="tool" data-action="stop">■ '+t().stop+'</button></div></div><article class="spread">'+img+'<div class="page-text"><div class="folio">04 · '+t().title+' · '+(page+1)+' / '+(n+1)+'</div><h2>'+safe(heading)+'</h2><div class="prose" id="spokenText">'+body+'</div></div></article><nav class="reader-navigation"><button class="button secondary" data-action="prev" '+(page===0?'disabled':'')+'>← '+t().previous+'</button><span class="page-count">'+(page+1)+' / '+(n+1)+'</span><button class="button" data-action="next">'+(page===n?t().after:page===n-1?t().beyond:t().next)+' →</button></nav></div>'+mythDialog();
}
function questions(){return '<section class="qa"><button class="tool" data-action="read">'+t().return+'</button><h2>'+t().question+'</h2><h3>'+t().understanding+'</h3>'+quiz[lang].map((q,i)=>'<fieldset class="question"><legend>'+(i+1)+'. '+safe(q.q)+'</legend>'+q.a.map((a,j)=>'<label class="choice"><input type="radio" name="q'+i+'" value="'+j+'"> '+safe(a)+'</label>').join('')+'<p class="feedback" id="feedback'+i+'" aria-live="polite"></p></fieldset>').join('')+'<aside><h3>'+t().reflect+'</h3><p>'+t().reflectText+'</p></aside><a class="button" href="index.html">'+t().finish+'</a></section>'}
function bibliography(){
document.getElementById('sourceSummary').textContent=t().sources;
document.getElementById('sourceList').innerHTML='<h3>'+t().title+'</h3><h4>'+(lang==='es'?'Fuentes tradicionales':'Traditional sources')+'</h4><p><a href="https://www.gutenberg.org/files/38041/38041-h/38041-h.htm" target="_blank" rel="noopener">P. W. Joyce — Old Celtic Romances (1879), The Fate of the Children of Turenn</a></p><p><a href="https://archive.org/details/fateofchildrenof00sociiala" target="_blank" rel="noopener">Richard J. O’Duffy — Oidhe Chloinne Tuireann, The Fate of the Children of Tuireann</a></p><h4>'+(lang==='es'?'Para saber más':'Further reading')+'</h4><p><a href="https://catalogue.nli.ie/Record/vtls000138887" target="_blank" rel="noopener">National Library of Ireland — O’Duffy edition (1888)</a></p><p>'+t().sourceNote+'</p>';
}
function render(){document.documentElement.lang=lang;document.title=t().title+' — '+t().book;document.getElementById('brandTitle').textContent='✧ '+t().book;document.getElementById('credit').textContent=(lang==='es'?'Creado y dirigido por David Martín Guerrero · Adaptación original de una leyenda tradicional irlandesa, con apoyo de IA para el texto y las ilustraciones.':'Created and curated by David Martín Guerrero · Original literary retelling of Irish tradition, with AI assistance for text and illustrations.');bibliography();app.innerHTML=view==='intro'?intro():view==='reader'?reader():questions();}
function speak(){if(!('speechSynthesis'in window)||view!=='reader')return;stop();const n=pages[lang].length;const txt=page===n?cultural[lang].map(v=>v.title+'. '+v.text).join(' '):pages[lang][page].title+'. '+pages[lang][page].paras.join(' ');const u=new SpeechSynthesisUtterance(txt);u.lang=lang==='es'?'es-ES':'en-IE';u.rate=.88;speechSynthesis.speak(u)}
document.addEventListener('click',e=>{const term=e.target.closest('[data-myth]');if(term){openMyth(term.dataset.myth);return}if(e.target.closest('[data-myth-close]')){document.getElementById('mythDialog')?.close();return}if(e.target.id==='mythDialog'){e.target.close();return}});
document.addEventListener('click',e=>{const x=e.target.closest('[data-action]');if(!x)return;switch(x.dataset.action){case'read':go('reader');break;case'next':if(page===pages[lang].length){go('quiz')}else{page++;save();go('reader')}break;case'prev':if(page>0){page--;save();go('reader')}break;case'smaller':fontScale=Math.max(.9,Math.round((fontScale-.1)*100)/100);localStorage.setItem('okcm-font',fontScale);render();break;case'larger':fontScale=Math.min(1.55,Math.round((fontScale+.1)*100)/100);localStorage.setItem('okcm-font',fontScale);render();break;case'theme':night=!night;render();break;case'speak':speak();break;case'stop':stop();break}});
document.addEventListener('change',e=>{if(!e.target.matches('input[type=radio]'))return;const i=Number(e.target.name.slice(1));document.getElementById('feedback'+i).textContent=Number(e.target.value)===quiz[lang][i].correct?t().correct:t().wrong});
language.addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('okcm-language',lang);page=Math.min(Number(localStorage.getItem('okcm-tuireann-page-'+lang)||0),pages[lang].length);stop();render()});
let touchStart=null;
document.addEventListener('touchstart',e=>{if(view!=='reader'||!e.target.closest('.spread')||e.touches.length!==1){touchStart=null;return}touchStart={x:e.touches[0].clientX,y:e.touches[0].clientY}},{passive:true});
document.addEventListener('touchend',e=>{if(!touchStart||e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)<80||Math.abs(dx)<Math.abs(dy)*1.4)return;if(dx<0){if(page<pages[lang].length){page++;save();go('reader')}else go('quiz')}else if(page>0){page--;save();go('reader')}},{passive:true});
load().catch(err=>{app.innerHTML='<section class="qa">'+(lang==='es'?'No se pudo cargar la leyenda.':'Unable to load the story.')+'</section>';console.error(err)});
