/* Shared contextual reference cards for chapters I and II.
   Chapter prose remains unchanged; only its first on-page mentions are enhanced. */
(function(){
'use strict';
const terms={
lir:[['tuatha',['Tuatha Dé Danann']],['lir',['Lir']],['aobh',['Aobh']],['fionnuala',['Fionnuala']],['aodh',['Aodh']],['fiachra',['Fiachra']],['conn',['Conn']],['aoife',['Aoife']],['bodb',['Bodb Dearg']],['derravaragh',['Derravaragh']],['moyle',['Moyle']],['erris',['Erris']],['inis',['Inis Gluaire']],['lairgnen',['Lairgnen']],['deoch',['Deoch']]],
salmon:[['boyne',['Boyne']],['fionn',['Fionn']],['finegas',['Finegas']],['salmon',['Salmon of Knowledge','salmón del conocimiento']]]
};
const cards={
en:{
tuatha:['Tuatha Dé Danann','A supernatural people of Irish legend, associated with magic, extraordinary skills and ancient struggles over Ireland.'],
lir:['Lir','A figure of the Tuatha Dé Danann and father of four children whose lives are transformed by a terrible enchantment.'],
aobh:['Aobh','Lir’s first wife and mother of Fionnuala, Aodh, Fiachra and Conn.'],
aoife:['Aoife','Lir’s second wife, whose jealousy leads her to cast the spell upon his children.'],
fionnuala:['Fionnuala','Lir’s eldest child; after the transformation, she looks after her three brothers through centuries of exile.'],
aodh:['Aodh','A son of Lir, enchanted into a swan alongside his brothers and sister.'],
fiachra:['Fiachra','One of Lir’s four children, who shares the swans’ long journey.'],
conn:['Conn','The youngest of Lir’s children, sheltered by Fionnuala during their exile.'],
bodb:['Bodb Dearg','A prominent king of the Tuatha Dé Danann in the traditions surrounding Lir’s family.'],
derravaragh:['Lough Derravaragh','A real lake in County Westmeath and the first place of exile for the enchanted children.'],
moyle:['Sea of Moyle','The waters between Ireland and Scotland, where the swans endure fierce storms.'],
erris:['Erris','A coastal region of County Mayo associated with the children’s later wanderings.'],
inis:['Inis Gluaire','An island off County Mayo associated with the ending of the tale; also called Inishglora.'],
lairgnen:['Lairgnen','A figure linked to the prophecy that brings the enchantment to its conclusion.'],
deoch:['Deoch','A woman whose wish to have the swans plays a part in the end of their story.'],
boyne:['River Boyne','A real river in eastern Ireland, associated in legend with poetic inspiration and hidden knowledge.'],
fionn:['Fionn mac Cumhaill','A celebrated hero of the Fenian Cycle; this tale describes how he acquires extraordinary knowledge as a boy.'],
finegas:['Finegas','The poet and teacher of young Fionn, who has waited seven years for the Salmon of Knowledge.'],
salmon:['Salmon of Knowledge','A legendary fish whose wisdom passes to Fionn when he accidentally tastes it.']
},
es:{
tuatha:['Tuatha Dé Danann','Pueblo sobrenatural de la mitología irlandesa, asociado con la magia, las artes y las antiguas disputas por Irlanda.'],
lir:['Lir','Figura de los Tuatha Dé Danann y padre de cuatro hijos cuyas vidas quedan marcadas por un terrible hechizo.'],
aobh:['Aobh','Primera esposa de Lir y madre de Fionnuala, Aodh, Fiachra y Conn.'],
aoife:['Aoife','Segunda esposa de Lir, cuyos celos la llevan a hechizar a sus cuatro hijos.'],
fionnuala:['Fionnuala','La mayor de los hijos de Lir, que cuida de sus tres hermanos durante siglos de destierro.'],
aodh:['Aodh','Hijo de Lir transformado en cisne junto a sus hermanos.'],
fiachra:['Fiachra','Uno de los cuatro hijos de Lir, que comparte el largo viaje de los cisnes.'],
conn:['Conn','El menor de los hijos de Lir, protegido por Fionnuala durante el destierro.'],
bodb:['Bodb Dearg','Rey destacado de los Tuatha Dé Danann en las tradiciones relacionadas con la familia de Lir.'],
derravaragh:['Lago Derravaragh','Lago real del condado de Westmeath donde comienza el destierro de los niños encantados.'],
moyle:['Mar de Moyle','Aguas entre Irlanda y Escocia donde los cisnes resisten fuertes tormentas.'],
erris:['Erris','Región costera del condado de Mayo vinculada a las últimas andanzas de los hermanos.'],
inis:['Inis Gluaire','Isla frente a la costa de Mayo, asociada al desenlace de la leyenda; también llamada Inishglora.'],
lairgnen:['Lairgnen','Personaje relacionado con la profecía que pone fin al encantamiento.'],
deoch:['Deoch','Mujer cuyo deseo de poseer los cisnes interviene en el desenlace del relato.'],
boyne:['Río Boyne','Río real del este de Irlanda, vinculado en la mitología con la inspiración poética y el saber oculto.'],
fionn:['Fionn mac Cumhaill','Célebre héroe del ciclo feniano; este relato cuenta cómo adquiere un conocimiento extraordinario siendo niño.'],
finegas:['Finegas','Poeta y maestro de Fionn, que lleva siete años esperando al salmón del conocimiento.'],
salmon:['Salmón del conocimiento','Pez legendario cuya sabiduría pasa a Fionn cuando el muchacho lo prueba por accidente.']
}};
const clean=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const expression=form=>new RegExp('(?<![\\p{L}\\p{N}])'+form.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'(?![\\p{L}\\p{N}])','iu');
function highlight(raw,language,chapter,story,page,paragraph){
 const matches=[];
 for(const [id,forms] of terms[chapter]||[]){
  const active=forms.map(x=>({form:x,match:expression(x).exec(raw)})).find(x=>x.match);
  if(!active)continue;
  let prior=false;
  outer:for(let i=0;i<=page;i++){
   const arr=story[i]||[];
   for(let j=0;j<(i===page?paragraph:arr.length);j++){
    if(forms.some(f=>expression(f).test(arr[j]))){prior=true;break outer}
   }
  }
  if(!prior)matches.push({id,start:active.match.index,text:active.match[0]});
 }
 matches.sort((a,b)=>a.start-b.start);
 let pos=0,result='';
 for(const m of matches){
  if(m.start<pos)continue;
  result+=clean(raw.slice(pos,m.start));
  result+='<button type="button" class="myth-term" data-myth-card="'+m.id+'" aria-label="'+clean(m.text)+' — '+(language==='es'?'ver ficha':'view reference card')+'">'+clean(m.text)+'</button>';
  pos=m.start+m.text.length;
 }
 return result+clean(raw.slice(pos));
}
function dialog(language){
 return '<dialog class="myth-dialog" id="mythDialog" aria-labelledby="mythHeading"><div class="myth-dialog-inner"><button type="button" class="myth-dismiss" data-myth-close aria-label="'+(language==='es'?'Cerrar':'Close')+'">×</button><div class="myth-eyebrow">'+(language==='es'?'EL MUNDO DETRÁS DE LAS LEYENDAS':'THE WORLD BEHIND THE LEGENDS')+'</div><h3 id="mythHeading"></h3><p id="mythDescription"></p><a id="mythFull" class="myth-full" href="world.html">'+(language==='es'?'Ver en la enciclopedia completa':'View full encyclopedia entry')+' →</a></div></dialog>';
}
let getLanguage=()=>document.documentElement.lang==='es'?'es':'en';
function bind(languageProvider){
 getLanguage=languageProvider;
 if(document.documentElement.dataset.mythEvents)return;
 document.documentElement.dataset.mythEvents='1';
 document.addEventListener('click',e=>{
  const term=e.target.closest('[data-myth-card]');
  if(term){
   const language=getLanguage(),data=cards[language]?.[term.dataset.mythCard],dlg=document.getElementById('mythDialog');
   if(!data||!dlg)return;
   dlg.querySelector('#mythHeading').textContent=data[0];dlg.querySelector('#mythDescription').textContent=data[1];
   dlg.querySelector('#mythFull').href='world.html#'+encodeURIComponent(term.dataset.mythCard);
   dlg.addEventListener('close',()=>{if(term.isConnected)term.focus()},{once:true});
   dlg.showModal();dlg.querySelector('[data-myth-close]').focus();return;
  }
  if(e.target.closest('[data-myth-close]')){document.getElementById('mythDialog')?.close();return}
  if(e.target.id==='mythDialog')e.target.close();
 });
}
window.MythCards={highlight,dialog,bind};
})();
