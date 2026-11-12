const bibliographyLabels={
  en:{title:'Sources & Further Reading',story:'The Children of Lir',sources:'Sources',reading:'Further reading',note:'These references provide historical and cultural context. Both versions of the story are original retellings, not reproductions of these texts.'},
  es:{title:'Fuentes y lecturas complementarias',story:'Los hijos de Lir',sources:'Fuentes consultadas',reading:'Para saber más',note:'Estas referencias aportan contexto histórico y cultural. Las versiones inglesa y española son adaptaciones originales, no reproducciones de estos textos.'}
};
function updateBibliography(){
  const b=bibliographyLabels[lang];
  for(const [id,key] of [['bibliographyTitle','title'],['bibliographyStory','story'],['bibliographySources','sources'],['bibliographyReading','reading'],['bibliographyNote','note']]){
    document.getElementById(id).textContent=b[key];
  }
}
const copy={
  en:{title:'Of Kings, Curses and Mist',titleLine1:'Of Kings,',titleLine2:'Curses and Mist',author:'Created and curated by David Martín Guerrero',date:'First published 7 November 2026',creditsToggle:'About the work and AI assistance',creditsNote:'Original literary retellings of traditional Irish legends, developed and reviewed under the editorial direction of David Martín Guerrero. AI tools have assisted with writing, translation, and the creation of original illustrations. The underlying legends belong to Irish oral and literary tradition.',subtitle:'Where Ancient Ireland Comes Alive',type:'An illustrated collection of Irish myths & legends',enter:'Enter the collection',library:'The library',intro:'An invitation to discover the heroes, enchantments and extraordinary stories of Ireland.',open:'Open this legend',soon:'More legends are on their way',read:'Read the story',back:'Library',previous:'Previous',next:'Next',finish:'After the story',contents:'The Children of Lir',description:'Four siblings, one terrible enchantment, and a song that survives the centuries.',minutes:'Approx. 9–11 min',readAloud:'Read aloud',stop:'Stop',larger:'A+',smaller:'A−',night:'Night',day:'Day',questionTitle:'After the Story',understanding:'Understanding',reflect:'Think about it',reflection:'Fionnuala could not remove the spell. What could she still choose to do for her brothers?',culture:'Behind the Legend',cultureText:'This is an original modern adaptation of Oidheadh Chloinne Lir, traditionally grouped among Ireland’s Three Sorrows of Storytelling. Lough Derravaragh lies in County Westmeath; the Sea of Moyle separates Ireland and Scotland, while Erris and Inis Gluaire belong to the western part of the tale. Some details differ among traditional versions. The personalities and some dialogue are creative additions.',returnBook:'Return to the story',correct:'Correct!',tryAgain:'Not quite. Try another answer.',complete:'You have reached the end of the first legend.'},
  es:{title:'De reyes, maldiciones y niebla',titleLine1:'De reyes,',titleLine2:'maldiciones y niebla',author:'Creado y dirigido por David Martín Guerrero',date:'Primera publicación: 7 de noviembre de 2026',creditsToggle:'Sobre la obra y el uso de IA',creditsNote:'Adaptaciones literarias originales de leyendas tradicionales irlandesas, desarrolladas y revisadas bajo la dirección editorial de David Martín Guerrero. Se han utilizado herramientas de inteligencia artificial como apoyo para la redacción, la traducción y la creación de ilustraciones originales. Las leyendas de partida forman parte de la tradición oral y literaria irlandesa.',subtitle:'Donde la Irlanda ancestral cobra vida',type:'Una colección ilustrada de mitos y leyendas irlandesas',enter:'Entrar en la colección',library:'La biblioteca',intro:'Una invitación a descubrir héroes, encantamientos e historias extraordinarias de Irlanda.',open:'Abrir esta leyenda',soon:'Próximamente, nuevas leyendas',read:'Leer la historia',back:'Biblioteca',previous:'Anterior',next:'Siguiente',finish:'Después de la historia',contents:'Los hijos de Lir',description:'Cuatro hermanos, un terrible encantamiento y una canción que sobrevive a los siglos.',minutes:'Aprox. 9–11 min',readAloud:'Escuchar',stop:'Detener',larger:'A+',smaller:'A−',night:'Noche',day:'Día',questionTitle:'Después de la historia',understanding:'Comprensión',reflect:'Para reflexionar',reflection:'Fionnuala no podía romper el hechizo. ¿Qué podía seguir haciendo por sus hermanos?',culture:'Detrás de la leyenda',cultureText:'Esta es una adaptación literaria original de Oidheadh Chloinne Lir, relato que suele incluirse entre los Tres grandes pesares de la narración irlandesa. El lago Derravaragh está en el condado de Westmeath; el mar de Moyle separa Irlanda de Escocia, y Erris e Inis Gluaire forman parte del escenario occidental. Algunos detalles varían entre versiones tradicionales. Las personalidades y varios diálogos son aportaciones creativas.',returnBook:'Volver al relato',correct:'¡Correcto!',tryAgain:'No exactamente. Prueba otra respuesta.',complete:'Has llegado al final de la primera leyenda.'}
};
const culturalSection={"en":{"title":"Beyond the Legend","paragraphs":["Lough Derravaragh, where the children first became swans, is a real lake in County Westmeath. The Sea of Moyle and the western coast of Mayo are real places too. The story belongs to legend, but its landscapes belong to Ireland.","Fionnuala cannot break the spell or save her brothers from every storm. She can still shelter them, sing to them and remain by their side. Her heroism is not about defeating an enemy. It is about caring for those she loves, even when she cannot change their fate.","The ending brings together two worlds: the magic of the Tuatha Dé Danann and the Christian faith symbolised by the bell. The spell ends, but the lost years do not return. Is this a peaceful ending, a sad one, or both?","This tale is one of Ireland’s Three Sorrows of Storytelling, alongside the stories of the Children of Tuireann and the Children of Uisneach. They are linked by tragedy, rather than by a single shared plot."]},"es":{"title":"Más allá de la leyenda","paragraphs":["El lago Derravaragh, donde los hermanos se convierten en cisnes, existe de verdad, en el condado de Westmeath. También son reales el mar de Moyle y la costa de Mayo. La historia es legendaria, pero sus paisajes pertenecen a Irlanda.","Fionnuala no puede romper el hechizo ni proteger siempre a sus hermanos de las tormentas. Sin embargo, puede cobijarlos, cantarles y quedarse a su lado. Su heroísmo no consiste en derrotar a nadie, sino en cuidar de quienes ama, incluso cuando no puede cambiar su destino.","El desenlace reúne dos mundos: la magia de los Tuatha Dé Danann y la fe cristiana, simbolizada por la campana. El hechizo termina, pero nadie les devuelve los años perdidos. ¿Es un final feliz, triste o ambas cosas?","Esta historia pertenece a las Tres Grandes Tristezas de la tradición irlandesa, junto a las de los hijos de Tuireann y los hijos de Uisneach. Las une la tragedia, aunque cuentan aventuras diferentes."]}};
const quiz={en:[
  {q:'Why did Aoife turn the children into swans?',a:['They refused to visit Bodb Dearg.','She was jealous of the affection they received.','She wanted to protect them from a storm.'],correct:1},
  {q:'Which order did the swans follow during the enchantment?',a:['Erris → Derravaragh → Moyle','Moyle → Erris → Derravaragh','Derravaragh → Moyle → Erris'],correct:2},
  {q:'What caused the final transformation back into human form?',a:['Lairgnen seized the four swans after the prophecy was fulfilled.','Lir found a new magical wand.','They sang the same song for nine hundred years.'],correct:0}],
  es:[
  {q:'¿Por qué convirtió Aoife a los niños en cisnes?',a:['Porque se negaron a visitar a Bodb Dearg.','Porque sentía celos del cariño que recibían.','Porque quería protegerlos de una tormenta.'],correct:1},
  {q:'¿En qué orden transcurrieron los tres períodos del encantamiento?',a:['Erris → Derravaragh → Moyle','Moyle → Erris → Derravaragh','Derravaragh → Moyle → Erris'],correct:2},
  {q:'¿Qué provocó la transformación final en seres humanos?',a:['Lairgnen agarró a los cuatro cisnes después de cumplirse la profecía.','Lir encontró otra vara mágica.','Los hermanos cantaron durante novecientos años.'],correct:0}]
};
const app=document.getElementById('app');const language=document.getElementById('language');let lang=localStorage.getItem('okcm-language')==='es'?'es':'en';language.value=lang;
let view='home',page=Math.max(0,Math.min(6,Number(localStorage.getItem('okcm-page')||0))),fontScale=Number(localStorage.getItem('okcm-font')||1),night=false,sections={en:[],es:[]},turnDirection='';
const escapeHTML=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function parseStory(md){const body=md.split(/\n## 1\. /)[1]?.split('\n---\n')[0]||'';return ('## 1. '+body).split(/\n(?=## [1-6]\. )/).map(chunk=>{const [head,...lines]=chunk.trim().split('\n');return {title:head.replace(/^## [1-6]\. /,''),paragraphs:lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean)}})}
async function loadStories(){try{const res=await Promise.all(['en','es'].map(code=>fetch(`editorial/01-children-of-lir.${code}.md`).then(r=>{if(!r.ok)throw Error('Story unavailable');return r.text()})));sections.en=parseStory(res[0]);sections.es=parseStory(res[1]);sections.en.push(culturalSection.en);sections.es.push(culturalSection.es)}catch(err){app.innerHTML='<div class="qa">Unable to load the story / No se ha podido cargar la historia.</div>';throw err}}
function t(){return copy[lang]}function savePage(){localStorage.setItem('okcm-page',String(page))}function setView(next){stopSpeech();view=next;render();window.scrollTo({top:0,behavior:'instant'});app.focus({preventScroll:true})}
function home(){return `<section class="hero"><div class="hero-content"><p class="eyebrow">${t().type}</p><h1>${t().titleLine1}<br>${t().titleLine2}</h1><em>${t().subtitle}</em><p class="hero-byline">${lang==='es'?'Un proyecto de':'A project by'} <strong>David Martín Guerrero</strong></p><button class="button gold" data-action="library">${t().enter} &rarr;</button></div></section>`}
function library(){return `<section class="library"><div class="library-intro"><p class="eyebrow" style="color:#856e3d">${t().title}</p><h2>${t().library}</h2><p>${t().intro}</p></div><div class="book-grid"><article class="book-card"><img src="assets/children-of-lir-lake.webp" alt="Four white swans on a misty lake"><div class="book-card-content"><div class="mini-label">01 · ${t().minutes}</div><h3>${t().contents}</h3><p>${t().description}</p><button class="button" data-action="read">${page>0?t().read+' · '+Math.round(page/7*100)+'%':t().open} &rarr;</button></div></article><article class="book-card"><img src="assets/salmon-cover.webp" alt="${lang==='es'?'Salmón plateado emergiendo del río Boyne':'Silver salmon leaping from the River Boyne'}"><div class="book-card-content"><div class="mini-label">02 · ${lang==='es'?'Aprox. 12–15 min':'Approx. 12–15 min'}</div><h3>${lang==='es'?'El salmón del conocimiento':'The Salmon of Knowledge'}</h3><p>${lang==='es'?'Un joven aprendiz, un poeta y un don inesperado.':'A young apprentice, a poet and an unexpected gift.'}</p><a class="button" href="salmon.html" style="display:block;text-align:center;text-decoration:none">${t().open} →</a></div></article><article class="book-card"><img src="assets/dagda-harp-returns-4x5.webp" alt="The Dagda calls his flying harp back" onerror="this.onerror=null;this.src=\'assets/ornament-triskele.webp\'"><div class="book-card-content"><div class="mini-label">03 · ${lang==='es'?'Borrador editorial':'Editorial draft'}</div><h3>${lang==='es'?'El arpa del Dagda':"The Dagda's Harp"}</h3><p>${lang==='es'?'El arpa robada y las tres melodías.':'A stolen harp and three extraordinary melodies.'}</p><a class="button" href="dagda.html" style="display:block;text-align:center;text-decoration:none">${lang==='es'?'Leer el borrador':'Read the draft'} →</a></div></article></div><p style="text-align:center;margin:2rem auto"><a class="button" href="world.html" style="display:inline-block;text-decoration:none">${lang==='es'?'El mundo detrás de las leyendas':'The World Behind the Legends'} →</a></p></section>`}
const sceneImages=[
  ['children-of-lir-family.webp','Lir with his four children by their home'],
  ['children-of-lir-transformation.webp','Aoife casts the spell upon Lir’s four children'],
  ['children-of-lir-reunion.webp','Lir recognises the four swans at Lough Derravaragh'],
  ['children-of-lir-moyle.webp','Four swans endure the storm on the Sea of Moyle'],
  ['children-of-lir-ruins.webp','Four swans return to their ruined family home'],
  ['children-of-lir-last-song.webp','The four aged siblings beside the monk and chapel'],
  ['children-of-lir-lake.webp','Four white swans on Lough Derravaragh']
];
function pageImage(){return 'assets/'+sceneImages[page][0]}
function reader(){const s=sections[lang][page];if(!s)return '<div class="qa">Story not available.</div>';const headings=lang==='es'?['Un paisaje real','El heroísmo de cuidar','Dos mundos se encuentran','Las tres grandes tristezas']:['A real landscape','The courage to care','Two worlds meet','The Three Sorrows'];const paragraphs=page===6?s.paragraphs.map((p,i)=>`<section class="cultural-note"><h3>${escapeHTML(headings[i])}</h3><p>${escapeHTML(p)}</p></section>`).join(''):s.paragraphs.map(p=>`<p>${escapeHTML(p)}</p>`).join('');return `<div class="reader-wrap ${night?'night':''}" data-turn="${turnDirection}" style="--font-scale:${fontScale}"><div class="reader-tools"><div class="left"><button class="tool" data-action="library">← ${t().back}</button><span class="mini-label">01 · ${t().contents}</span></div><div class="right"><button class="tool" data-action="smaller" aria-label="Smaller text">${t().smaller}</button><button class="tool" data-action="larger" aria-label="Larger text">${t().larger}</button><button class="tool" data-action="theme" aria-pressed="${night}">${night?t().day:t().night}</button><button class="tool" data-action="speak">${t().readAloud} ▶</button><button class="tool" data-action="stop">■ ${t().stop}</button></div></div><article class="spread" aria-live="polite"><div class="page-image" style="--scene-image:url(&quot;${pageImage()}&quot;)"><img src="${pageImage()}" alt="${sceneImages[page][1]}"><div class="image-caption">${escapeHTML(s.title)}</div></div><div class="page-text"><div class="folio">${t().contents} · ${page+1} / 7</div><h2>${escapeHTML(s.title)}</h2><div class="prose" id="spokenText">${paragraphs}</div></div></article><nav class="reader-navigation"><button class="button secondary" data-action="prev" ${page===0?'disabled':''}>← ${t().previous}</button><span class="page-count">${page+1} / 7</span><button class="button" data-action="next">${page===6?t().back:page===5?t().finish:t().next} →</button></nav><p class="status">${lang==='en'?'Original scene illustrations; visual consistency is under review.':'Ilustraciones originales por escena; seguimos revisando la continuidad visual.'}</p></div>`}
function questions(){return `<section class="qa"><button class="tool" data-action="read">← ${t().returnBook}</button><h2>${t().questionTitle}</h2><p>${t().complete}</p><h3>${t().understanding}</h3>${quiz[lang].map((q,i)=>`<fieldset class="question"><legend>${i+1}. ${q.q}</legend>${q.a.map((a,j)=>`<label class="choice"><input type="radio" name="q${i}" value="${j}"> ${a}</label>`).join('')}<p class="feedback" id="feedback${i}" aria-live="polite"></p></fieldset>`).join('')}<aside><h3>${t().reflect}</h3><p>${t().reflection}</p></aside><button class="button" data-action="cultural">${lang==='es'?'Leer: Más allá de la leyenda':'Read: Beyond the Legend'} →</button></section>`}
function render(){updateBibliography();document.documentElement.lang=lang;document.title=t().title+' — '+t().subtitle;document.getElementById('brandTitle').textContent=t().title;document.getElementById('footerAuthor').textContent=t().author;document.getElementById('footerDate').textContent=t().date;document.getElementById('creditToggle').textContent=t().creditsToggle;document.getElementById('creditNote').textContent=t().creditsNote;document.getElementById('footerCredit').textContent=t().type;app.innerHTML=view==='home'?home():view==='library'?library():view==='reader'?reader():questions()}
function stopSpeech(){if('speechSynthesis' in window)window.speechSynthesis.cancel()}
// Web Speech does not expose a reliable gender property. Prefer familiar male
// voice names in the requested language, then fall back to a local voice.
const maleVoiceNames={
  en:/\b(daniel|oliver|arthur|george|thomas|james|aaron|rory|reed|eddy|alex|fred|nathan|gordon|liam|ryan|male)\b/i,
  es:/\b(jorge|diego|pablo|álvaro|alvaro|enrique|antonio|carlos|juan|mario|raúl|raul|manuel|male|masculina|masculino)\b/i
};
function narratorVoice(code){
  const available=window.speechSynthesis.getVoices();
  const matching=available.filter(voice=>voice.lang.toLowerCase().startsWith(code+'-'));
  const localePriority=code==='es'?['es-es','es-mx']:['en-ie','en-gb','en-us'];
  const priority=voice=>{
    const locale=voice.lang.toLowerCase();
    const index=localePriority.indexOf(locale);
    return index<0?localePriority.length:index;
  };
  const preferred=matching.filter(voice=>maleVoiceNames[code].test(voice.name));
  return (preferred.length?preferred:matching).sort((a,b)=>priority(a)-priority(b))[0]||null;
}
function speak(){
  if(!('speechSynthesis' in window))return;
  stopSpeech();
  const section=sections[lang][page];
  if(!section)return;
  const utter=new SpeechSynthesisUtterance(section.title+'. '+section.paragraphs.join(' '));
  const voice=narratorVoice(lang);
  if(voice){utter.voice=voice;utter.lang=voice.lang}
  else utter.lang=lang==='es'?'es-ES':'en-IE';
  utter.rate=.88;
  utter.pitch=.96;
  window.speechSynthesis.speak(utter);
}
function turnPage(direction){
  if(view!=='reader')return;
  turnDirection=direction;
  if(direction==='next'){
    if(page===6){setView('library');return}if(page===5){setView('quiz');return}
    page++;
  }else if(direction==='prev'){
    if(page===0)return;
    page--;
  }
  savePage();
  setView('reader');
}
let touchStart=null;
document.addEventListener('touchstart',e=>{
  if(view!=='reader'||e.touches.length!==1||!e.target.closest('.spread')){touchStart=null;return}
  const touch=e.touches[0];
  touchStart={x:touch.clientX,y:touch.clientY};
},{passive:true});
document.addEventListener('touchcancel',()=>{touchStart=null},{passive:true});
document.addEventListener('touchend',e=>{
  if(!touchStart||e.changedTouches.length!==1){touchStart=null;return}
  const touch=e.changedTouches[0],dx=touch.clientX-touchStart.x,dy=touch.clientY-touchStart.y;
  touchStart=null;
  // Preserve ordinary vertical reading and avoid accidental short swipes.
  if(Math.abs(dx)<70||Math.abs(dx)<Math.abs(dy)*1.35)return;
  turnPage(dx<0?'next':'prev');
},{passive:true});
document.addEventListener('click',e=>{const control=e.target.closest('[data-action]');if(!control)return;switch(control.dataset.action){case'library':setView('library');break;case'cultural':page=6;savePage();setView('reader');break;case'read':setView('reader');break;case'next':turnPage('next');break;case'prev':turnPage('prev');break;case'larger':fontScale=Math.min(1.55,+(fontScale+.1).toFixed(2));localStorage.setItem('okcm-font',fontScale);render();break;case'smaller':fontScale=Math.max(.9,+(fontScale-.1).toFixed(2));localStorage.setItem('okcm-font',fontScale);render();break;case'theme':night=!night;render();break;case'speak':speak();break;case'stop':stopSpeech();break}});
document.addEventListener('change',e=>{if(!e.target.matches('input[type=radio]'))return;const i=Number(e.target.name.slice(1)),answer=Number(e.target.value);document.getElementById('feedback'+i).textContent=answer===quiz[lang][i].correct?t().correct:t().tryAgain});
language.addEventListener('change',e=>{lang=e.target.value;localStorage.setItem('okcm-language',lang);stopSpeech();render()});document.getElementById('homeButton').addEventListener('click',()=>setView('home'));loadStories().then(render);
