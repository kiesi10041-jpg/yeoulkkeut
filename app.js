'use strict';
const $=id=>document.getElementById(id),K=YK,D=K.D,KEY='janhyang-run-v610',META='janhyang-memory-v610';
let run=null,meta=K.emptyMeta(),playing=false,readingChoices=false,lastNode=null,noticeTimer,storageFailure=false,drawerReturn=null;
const safeText=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function backupBroken(key){try{const raw=localStorage.getItem(key);if(raw!==null)localStorage.setItem(key+'-recovery-'+Date.now(),raw);}catch{}}
function load(){try{const m=localStorage.getItem(META);if(m)meta=K.validateMeta(JSON.parse(m));}catch{storageFailure=true;backupBroken(META);}try{const r=localStorage.getItem(KEY);if(r)run=K.validateRun(JSON.parse(r));}catch{storageFailure=true;backupBroken(KEY);run=null;}applyPreferences();}
function save(){try{localStorage.setItem(META,JSON.stringify(meta));if(run)localStorage.setItem(KEY,JSON.stringify(run));return true;}catch{toast('저장 공간을 사용할 수 없습니다. 설정에서 기록을 내보내 주세요.');return false;}}
function toast(s){$('notice').textContent=s;$('notice').classList.add('shown');clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('notice').classList.remove('shown'),3800);}
function applyPreferences(){if($('titleSound')){$('titleSound').textContent=meta.preferences.sound?'소리 켜짐 · 끄기':'소리 꺼짐 · 켜기';$('titleSound').setAttribute('aria-pressed',String(meta.preferences.sound));}document.body.classList.toggle('large',!!meta.preferences.large);document.body.classList.toggle('reduce',!!meta.preferences.reduce);}
function home(){clearErosion();interference.stop();clearPresentation();playing=false;lastNode=null;document.body.classList.remove('choosing','erosion-high','mood-broadcast','mood-approach');$('visualEcho').hidden=true;$('game').hidden=true;$('titleScreen').hidden=false;$('continueButton').hidden=!run;$('continueButton').textContent=run?.ending?'마지막 결말 보기':'이어하기';$('endCount').textContent=meta.ends.length+' / '+Object.keys(D.endings).length;$('newButton').textContent=meta.ends.length?'다시 시작하기 →':'처음 시작하기 →';audio.stop();if($('drawer').open)$('drawer').close();$('newButton').focus();}
function start(){run=K.fresh();K.capture(run);save();resume();}
function resume(){if(!run)return;if(run.journey){const j=K.clone(run.journey);K.returnToStory(run,meta);if(j.node===run.node){run.page=K.lines(run).length-1;K.choose(run,meta,j.id);}save();}playing=true;readingChoices=false;$('titleScreen').hidden=true;$('game').hidden=false;lastNode=null;render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;if(!run.ending)$('nextLine').focus();else $('again').focus();}
function currentMood(){return run?.ending?'quiet':D.nodes[run?.node]?.mood||'quiet';}
function render(){if(!playing||!run)return;if(run.explore){renderExploration();return;}$('game').classList.remove('exploring');$('propPreview')?.remove();$('sceneTools')?.remove();applyPreferences();K.observe(run);K.reception(run);renderEncounter();const n=D.nodes[run.node],readingLines=K.lines(run),ending=run.ending&&D.endings[run.ending],changed=lastNode!==run.node;
 document.body.classList.toggle('erosion-high',run.erosion>=65&&!ending);for(const mood of ['broadcast','approach'])document.body.classList.toggle('mood-'+mood,!ending&&n.mood===mood);
 const art='assets/'+(ending?(run.flags.includes('twoTaps')&&ending.memoryArt||ending.art):n.art);if($('sceneImage').getAttribute('src')!==art)$('sceneImage').src=art;$('sceneImage').alt=ending?ending.title:n.place;$('sceneImage').style.objectPosition=n.focal||'center';
 $('character').hidden=!!ending||!n.portrait||['nara-scene.webp','flood-rescue.webp','pier-rest.webp'].includes(n.art);if(n.portrait)$('character').src='assets/'+n.portrait;
 $('creature').hidden=!!ending||!(n.monster||n.creature);if(n.monster||n.creature)$('creature').src='assets/'+(n.creature||'hand.webp');
 $('visualEcho').hidden=!!ending||run.erosion<25||meta.preferences.reduce;
 $('placeLabel').textContent=ending?'해솔리 · 결말':n.place;$('sceneTitle').textContent=ending?ending.title:n.place;$('chapterLabel').textContent=ending?'베타 본편의 끝':n.chapter||run.chapterTitle||'해솔리 · 04:17';
 $('moodLabel').textContent=ending?'이 선택이 남긴 것':({signal:'수신 중',broadcast:'방송이 들린다',approach:'문밖에 누군가 있다',silence:'지금은 조용하다',coast:'바다 쪽으로',shelter:'잠시 머무는 곳',quiet:'가까이서 살펴본다'}[n.mood]||'현장');
 $('erosionLabel').textContent='침식 '+run.erosion+'%';$('erosionLabel').title='이전 방송을 재생하거나 교신할수록 쌓입니다.';
 drawCast(!!ending);updateStatus(!!ending);
 document.body.classList.toggle('choosing',!ending&&run.page===readingLines.length-1);$('readingControls').hidden=!!ending;$('actionLabel').hidden=!ending&&run.page<readingLines.length-1;$('actionLabel').textContent=ending?'이후 선택':'행동 선택';$('choices').hidden=true;$('skipSeen').hidden=true;
 if(ending){$('propPreview')?.remove();interference.stop();$('lineWrap').innerHTML='<p class="endingNumber">ENDING '+(Object.keys(D.endings).indexOf(run.ending)+1)+' / '+Object.keys(D.endings).length+'</p><div class="endingText">'+[...ending.text,...(D.endingExtra?.(run)||[])].map(t=>'<p>'+safeText(t)+'</p>').join('')+'</div><p class="endingLead">남은 의문<br>'+safeText(ending.lead)+'</p>';$('choices').hidden=false;$('choices').innerHTML=(run.checkpoint?'<button id="retryChapter">이번 장부터 다시 선택</button>':'')+'<button id="again">다른 선택으로 다시 시작</button><button id="endHome">시작 화면으로</button>';if($('retryChapter'))$('retryChapter').onclick=()=>{run=K.retry(run);save();lastNode=null;render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;};$('again').onclick=start;$('endHome').onclick=home;audio.scene('quiet');updateReadingHint();return;}
 const l=readingLines[run.page];playSceneBeat(l);const faces={'나래':'nara.webp','서진':'seojin.webp','도윤':'doyun.webp','해원':'haewon.webp','수호':'suho.webp','윤서':run.flags.includes('yunseoMet')?'operator.webp':null};if(faces[l.who]&&!['nara-scene.webp','flood-rescue.webp','pier-rest.webp'].includes(n.art)){$('character').src='assets/'+faces[l.who];$('character').hidden=false;}const isPlayer=l.who==='나',kind=l.who?'speech '+(isPlayer?'player':l.who==='교신 상대'||l.who==='수신기'?'receiver':''):'narration';$('lineWrap').innerHTML=communicationLine(l)||'<article class="line '+kind+'">'+(l.who?speakerHeader(l.who):'')+'<p>'+emphasize(l.text)+'</p></article>';
 $('pageLabel').textContent=(run.page+1)+' / '+readingLines.length;$('previousLine').disabled=run.page===0;$('nextLine').textContent='다음 →';$('nextLine').hidden=run.page===readingLines.length-1;$('readingControls').classList.toggle('atChoices',run.page===readingLines.length-1);
 if(run.page===readingLines.length-1){$('choices').hidden=false;$('choices').innerHTML=K.available(run,meta).map(c=>'<button data-choice="'+safeText(c.id)+'">'+(c.puzzle?'<small class="actionType">직접 살피기</small>':'')+safeText(c.label)+'</button>').join('');$('choices').querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>choose(b.dataset.choice));}
 $('skipSeen').hidden=!meta.seen.includes(run.node)||run.page===readingLines.length-1;
 if(changed){$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;lastNode=run.node;audio.scene(n.mood);if(n.encounter)audio.fx(({hand:'knock',paper:'bell',water:'water',signal:'tune',cloth:'knock'})[n.encounter.kind]);else if(n.mood==='broadcast'&&run.node!=='bell')audio.fx('bell');}else if(readingChoices){$('actionPane').scrollTop=0;readingChoices=false;}updateStatus();renderSceneTools();renderProp();updateReadingHint();interference.sync();
}
function playSceneBeat(line){
 if(!line.beat)return;run.playedBeats??=[];const key=run.node+':'+line.beat;if(run.playedBeats.includes(key))return;run.playedBeats.push(key);save();audio.fx(line.beat==='short-bell'?'shortBell':'bell');
}
let arrivalTimer=null,encounterKey=null;
function clearPresentation(clearArrival=true){$('encounterFX')?.remove();$('encounterCue')?.remove();$('game').removeAttribute('data-encounter');$('game').removeAttribute('data-pressure');$('game').removeAttribute('data-figure');encounterKey=null;if(clearArrival){clearTimeout(arrivalTimer);$('arrivalCaption')?.remove();}}
function showArrival(from,to,fromPlace){
 clearTimeout(arrivalTimer);$('arrivalCaption')?.remove();if(!K.W.places[to])return;
 const label=document.createElement('div');label.id='arrivalCaption';label.setAttribute('role','status');label.innerHTML='<small>'+safeText(fromPlace||K.W.places[from]?.name||'')+' →</small><strong>'+safeText(D.nodes[run.node].place||K.W.places[to].name)+'</strong>';$('stage').append(label);
 arrivalTimer=setTimeout(()=>label.remove(),2600);
}
function renderEncounter(){
 const spec=!run.ending&&!run.explore&&D.nodes[run.node].encounter;
 if(!spec){clearPresentation(false);return;}
 const changed=encounterKey!==run.node;encounterKey=run.node;$('game').dataset.encounter=spec.kind;$('game').dataset.figure=spec.figure?'yes':'no';$('game').dataset.pressure=run.page===K.lines(run).length-1?'decision':'approach';
 let fx=$('encounterFX');if(!fx){fx=document.createElement('div');fx.id='encounterFX';fx.setAttribute('aria-hidden','true');$('game').append(fx);}
 if(changed){fx.className='encounterFX '+spec.kind;fx.innerHTML=(['hand','cloth'].includes(spec.kind)?'<img class="intrudingHand" src="assets/hand.webp" alt="">':spec.kind==='paper'?(spec.figure?'<img class="intrudingFigure" src="assets/school-warden.webp" alt="">':'')+'<i class="paperEdge"></i>':'')+'<div class="encounterVeil"></div>';}
 let cue=$('encounterCue');if(!cue){cue=document.createElement('p');cue.id='encounterCue';$('lineWrap').before(cue);}cue.textContent=spec.label;
}
function updateReadingHint(){
 const pane=$('dialoguePane');let hint=$('dialogueScrollHint');if(!hint){hint=document.createElement('span');hint.id='dialogueScrollHint';hint.textContent='아래로 더 읽기 ↓';hint.hidden=true;pane.append(hint);const check=()=>{hint.hidden=pane.scrollHeight-pane.clientHeight<=24||pane.scrollHeight<=pane.clientHeight+pane.scrollTop+6;};pane.addEventListener('scroll',check);pane._readingHintCheck=check;}requestAnimationFrame(()=>pane._readingHintCheck());
}
function puzzlePanel(choiceId){
 const scroll=$('drawer').open&&$('drawer').classList.contains('workbenchDrawer')?$('drawer').scrollTop:0;
 const p=K.puzzle(run);if(!p)return;const q=p.state;let html='',title='';
 if(p.id==='school'){title='명부와 번호표';html='<div class="proofDesk '+(q.attempts?'underPressure':'')+'"><div class="ledgerCopy"><small>현관에서 남긴 사본</small><h3>들어온 사람</h3><p>12 · 17 · 23</p><span>지우지 않고 옆에 적어 둔 숫자</span></div><p class="puzzlePrompt">지닌 번호표와 명부에서 떨어진 종이다. 사본과 대조해 세 장을 고른다.</p><div class="numberTray">'+[12,17,23,28].map(v=>'<button data-token="'+v+'" class="numberToken '+(q.selected.includes(v)?'selected':'')+'" aria-pressed="'+q.selected.includes(v)+'"><i></i><b>'+v+'</b><small>'+(q.selected.includes(v)?'내밀 종이':'번호표')+'</small></button>').join('')+'</div><p class="puzzleFeedback" role="status">'+safeText(q.feedback||'형체가 종이를 기다리고 있다.')+'</p><button id="puzzleSubmit" class="primary puzzleCommit" '+(q.selected.length!==3?'disabled':'')+'>고른 종이 세 장을 말없이 내민다</button></div>';}
 if(p.id==='water'){title='창고 문 앞';html='<div class="waterWorkbench"><div class="waterDiagram"><div class="waterChamber"><span>창고 안</span><i style="height:'+q.inside*23+'%"></i><b>'+q.inside+'칸</b></div><div class="pressureDoor"><span>닫힌 문</span><b>│</b></div><div class="waterChamber outside"><span>바깥 얕은 곳</span><i style="height:'+q.outside*23+'%"></i><b>'+q.outside+'칸</b></div></div><div class="pipeState"><span class="pipeWheel '+(q.open?'opened':'')+'" aria-hidden="true"><svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="currentColor" stroke-width="3"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="5"/><path d="M24 6v13m0 10v13M6 24h13m10 0h13"/></svg></span><div>회색 우회관 <b>'+(q.open?'열림':'닫힘')+'</b><small>관은 바깥의 얕은 배수구로 이어져 있다.</small></div></div><div class="waterActions"><button data-puzzle-action="open" '+(q.open?'disabled':'')+'>회색 마개를 조금 푼다</button><button data-puzzle-action="watch" '+(!q.open?'disabled':'')+'>물 흐르는 방향과 수위를 본다</button><button data-puzzle-action="close" '+(!q.open?'disabled':'')+'>회색 마개를 다시 잠근다</button></div><p class="puzzleFeedback" role="status">'+safeText(q.feedback||'문 양쪽 벽에 같은 간격의 수위 자국이 있다.')+'</p><button id="puzzleSubmit" class="primary puzzleCommit">문 손잡이를 천천히 당긴다</button></div>';}
 if(p.id==='handoff'){title='도착지로 보낼 인계서';const fields=[['incident','이동 중 이상 발화',['yes','목격한 적 있음'],['no','목격한 적 없음']],['current','나래의 현재 응답',['steady','휴식 후 주변 변화에 맞춰 응답함'],['uncertain','응답이 아직 불안정함']],['line','외부 출력선',['off','중계실과 자료실 모두 분리 확인'],['unknown','남은 연결이 있거나 확인하지 못함']]];html='<div class="handoffPaper"><small>해솔리 부두 · 도착지 인계</small><h3>내가 확인한 내용</h3><p>받는 사람은 이 종이를 보고 자리와 도움을 준비한다.</p>'+fields.map(([key,label,...opts])=>'<fieldset><legend>'+label+'</legend>'+opts.map(([v,t])=>'<label><input type="radio" name="'+key+'" value="'+v+'" '+(q[key]===v?'checked':'')+'><span>'+t+'</span></label>').join('')+'</fieldset>').join('')+'<details class="witnessNotes"><summary>내가 본 내용을 떠올린다</summary><p>나래는 이동 중 방송 문장을 반복했다.</p><p>'+(run.flags.includes('naraStabilized')?'대기소에서 쉰 뒤, 해원이 발을 멈추자 나래도 신발 소리가 멎었다고 말했다.':'연결은 끊었지만, 나래는 아직 앞서 나눈 말을 제대로 잇지 못했다.')+'</p><p>중계실 외부 출력: '+(run.flags.includes('outsideIsolated')?'분리 확인':'확인하지 못함')+'<br>자료실 외부 출력: '+(run.flags.includes('archiveIsolated')?'분리 확인':'확인하지 못함')+'</p></details><button id="puzzleSubmit" class="puzzleCommit" '+(!q.incident||!q.current||!q.line?'disabled':'')+'>이 내용에 서명하고 출항을 요청한다</button></div>';}
 openDrawer(title,html);$('drawer').classList.add('workbenchDrawer');$('drawer').scrollTop=scroll;
 $('drawerBody').querySelectorAll('[data-token]').forEach(b=>b.onclick=()=>{K.interact(run,'toggle',b.dataset.token);audio.fx('paper');save();puzzlePanel(choiceId);});
 $('drawerBody').querySelectorAll('[data-puzzle-action]').forEach(b=>b.onclick=()=>{K.interact(run,b.dataset.puzzleAction);if(b.dataset.puzzleAction==='watch')audio.fx('water');else audio.fx('valve');save();puzzlePanel(choiceId);});
 $('drawerBody').querySelectorAll('input[type=radio]').forEach(b=>b.onchange=()=>{K.interact(run,'set',{key:b.name,value:b.value});audio.fx('paper');save();const draft=K.puzzle(run).state;$('puzzleSubmit').disabled=!draft.incident||!draft.current||!draft.line;});
 $('puzzleSubmit').onclick=()=>{const result=K.interact(run,'submit');save();if(!result?.ready){if(p.id==='school')audio.fx('bell');puzzlePanel(choiceId);return;}audio.fx(p.id==='school'?'bell':p.id==='water'?'water':'paper');$('drawer').close();choose(result.route||choiceId);};
}
function communicationLine(line){
 const incoming=['수신기','교신 상대'].includes(line.who),outgoing=line.channel==='transmit',broadcast=['교내 방송','안내 방송','진료 안내','녹음된 목소리','윤서의 기록'].includes(line.who);
 if(!incoming&&!outgoing&&!broadcast)return '';
 const label=outgoing?'보낸 질문':broadcast?'현장 방송':'문자 수신',source=broadcast?line.who:'수신기 · R17';
 return '<article class="line transmission '+(outgoing?'transmit':broadcast?'localBroadcast':'')+'"><div class="transmissionHead">'+(!broadcast?'<img src="assets/message-terminal.webp" class="transmissionDevice" alt="휴대용 수신기">':'<span class="broadcastIcon" aria-hidden="true">◉</span>')+'<div><strong>'+safeText(source)+'</strong><small>'+label+'</small></div><span class="transmissionDirection">'+(outgoing?'TX':broadcast?'PA':'RX')+'</span></div><div class="transmissionDisplay"><div class="transmissionReadout"><span>'+(broadcast?'스피커 출력':'CH 04 · '+label)+'</span><span aria-hidden="true">▂▄▆</span></div><p>'+emphasize(line.text)+'</p></div></article>';
}
function speakerHeader(who){
 const faces={'나래':'nara.webp','서진':'seojin.webp','도윤':'doyun.webp','해원':'haewon.webp','수호':'suho.webp','윤서':run.flags.includes('yunseoMet')?'operator.webp':null};
 const radio=['교신 상대','수신기','교내 방송','안내 방송','윤서의 기록','진료 안내','녹음된 목소리'].includes(who),player=who==='나',face=faces[who];
 return '<div class="speakerHeader">'+(face?'<span class="speakerFaceFrame"><img class="speakerFace" src="assets/'+face+'" alt="'+safeText(who)+'의 얼굴"></span>':'<span class="speakerSymbol '+(radio?'isRadio':'')+'" aria-hidden="true">'+(player?'나':radio?'◉':'?')+'</span>')+'<div><strong class="who">'+safeText(who)+'</strong></div></div>';
}
function emphasize(t){return safeText(t).replace(/(번호만|이름 대신 번호|먼저|이름을|입술이|이전 방송|소리를 꺼 줘|날짜를 물어봐|전원을 내리면)/g,'<strong>$1</strong>');}
function choose(id){const c=K.available(run,meta).find(c=>c.id===id);if(c?.puzzle&&!run.flags.includes(c.puzzle)){puzzlePanel(id);return;}const fromNode=run.node,from=K.region(run),fromPlace=D.nodes[run.node].place;if(!K.choose(run,meta,id))return;if(!run.ending&&K.region(run)!==from)showArrival(from,K.region(run),fromPlace);audio.action(id,c,fromNode,run.node,from,K.region(run));readingChoices=false;save();render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;if(run.ending)$('again').focus();else $('nextLine').focus();}
$('previousLine').onclick=()=>{if(!run||run.page===0)return;run.page--;save();render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;};
$('nextLine').onclick=()=>{if(!run)return;if(K.next(run,meta)){save();render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;}else{readingChoices=true;render();$('choices').querySelector('button')?.focus();}};
$('skipSeen').onclick=()=>{if(!meta.seen.includes(run.node))return;run.page=K.lines(run).length-1;save();render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;};
function openDrawer(title,html){interference.cancel();if(!$('drawer').open)drawerReturn=document.activeElement;$('drawer').classList.remove('receiverDrawer','workbenchDrawer');$('drawerTitle').textContent=title;$('drawerBody').innerHTML=html;if(!$('drawer').open)$('drawer').showModal();$('drawer').scrollTop=0;$('closeDrawer').focus();}
$('closeDrawer').onclick=()=>$('drawer').close();$('drawer').addEventListener('close',()=>{if(drawerReturn?.isConnected)drawerReturn.focus();interference.sync();});$('drawer').addEventListener('click',e=>{if(e.target===$('drawer')){const r=$('drawer').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('drawer').close();}});
function records(){let html='<p class="drawerIntro">결말에서 알게 된 사실은 다음 시작에서도 남습니다. 주인공이 이전 일을 기억하는 것은 아닙니다. 알아낸 사실에 따라 시도할 수 있는 행동이 늘어납니다.</p>';
 html+='<h3>직접 본 것 · 이번 진행</h3>'+(K.observations(run).length?K.observations(run).map(o=>'<article class="recordEntry physicalEvidence"><small>'+safeText(o.place)+'</small><h3>'+safeText(o.title)+'</h3><p>'+safeText(o.text)+'</p>'+({ticket:'ticket17',rules:'note',request:'note',haewon:'photo',entry:'ledger'}[o.id]?'<button data-view-prop="'+({ticket:'ticket17',rules:'note',request:'note',haewon:'photo',entry:'ledger'}[o.id])+'">물건 살펴보기</button>':'')+'</article>').join(''):'<p class="drawerIntro">아직 직접 확인해 남긴 내용이 없습니다.</p>')+'<h3>현장에서 남긴 기록</h3>'+(run?Object.entries(D.documents||{}).filter(([flag])=>run.flags.includes(flag)).map(([,d])=>'<article class="recordEntry"><h3>'+safeText(d.title)+'</h3><p>'+safeText(d.text).replace(/\n/g,'<br>')+'</p></article>').join(''):'')+'<h3>알게 된 사실</h3>'+(meta.knowledge.length?meta.knowledge.map(k=>'<div class="recordEntry"><h3>'+safeText(D.knowledge[k])+'</h3></div>').join(''):'<p class="drawerIntro">아직 남은 기록이 없다.</p>');html+='<h3>첫 번째 밤의 결말</h3>'+Object.entries(D.endings).map(([id,e],i)=>meta.ends.includes(id)?'<article class="recordEntry"><h3>'+String(i+1).padStart(2,'0')+' · '+safeText(e.title)+'</h3><p>'+safeText(e.lead)+'</p><button data-end="'+id+'">결말 다시 읽기</button></article>':'<article class="recordEntry locked"><h3>'+String(i+1).padStart(2,'0')+' · 아직 보지 못한 결말</h3></article>').join('');
 if(run){html+='<h3>이번에 남긴 대화</h3>'+run.chat.map(c=>'<article class="recordEntry"><h3>'+safeText(c.q)+'</h3><p>'+safeText(c.a)+'</p></article>').join('');}
 openDrawer('남은 기록',html);$('drawerBody').querySelectorAll('[data-view-prop]').forEach(b=>b.onclick=()=>propPanel(b.dataset.viewProp));$('drawerBody').querySelectorAll('[data-end]').forEach(b=>b.onclick=()=>{const e=D.endings[b.dataset.end];openDrawer(e.title,'<img class="endingImage" src="assets/'+e.art+'" alt="'+safeText(e.title)+'"><div class="endingText">'+e.text.map(t=>'<p>'+safeText(t)+'</p>').join('')+'</div><button id="backRecords">기록으로</button>');$('backRecords').onclick=records;});}
function settings(){openDrawer('설정','<p class="drawerIntro">소리를 켜지 않아도 모든 선택과 단서를 확인할 수 있습니다.</p>'+[['sound','소리 켜기','음악과 효과음 · 새 방송 수신음'],['interferenceSound','미확인 신호 소리','간헐적 잡음·숨소리 같은 질감 · 미확인 문자는 계속 표시'],['vibration','수신 진동','지원하는 기기에서 새 방송 도착 시 짧게 진동'],['reduce','움직임 줄이기','반복 빛 변화·등장 애니메이션·침식 효과 끄기'],['large','큰 글자','대사와 방송을 크게 표시']].map(([id,label,sub])=>'<div class="settingRow"><label for="pref-'+id+'">'+label+'<small>'+sub+'</small></label><input type="checkbox" id="pref-'+id+'" '+(meta.preferences[id]?'checked':'')+'></div>').join('')+[['music','배경음'],['effects','효과음']].map(([id,label])=>'<div class="settingRow"><label for="pref-'+id+'">'+label+' <output id="level-'+id+'">'+meta.preferences[id]+'%</output></label><input id="pref-'+id+'" type="range" min="0" max="100" step="5" value="'+meta.preferences[id]+'"></div>').join('')+'<div class="menuActions"><button id="exportSave">진행·결말 기록 내보내기</button><label for="importSave">기록 불러오기<input id="importSave" type="file" accept="application/json,.json"></label>'+(playing?'<button id="toHome">저장하고 시작 화면으로</button>':'')+'<p class="drawerIntro">이 베타의 기록만 불러올 수 있습니다. 이전 버전 진행은 별도로 보관되며 자동 변환하지 않습니다.</p></div>');
 for(const id of ['sound','interferenceSound','vibration','reduce','large'])$('pref-'+id).onchange=e=>{meta.preferences[id]=e.target.checked;applyPreferences();if(id==='interferenceSound'&&!e.target.checked)interference.quiet();if(id==='sound'){if(e.target.checked){audio.unlock();if(playing)audio.scene(currentMood(),true);}else audio.stop();}save();if(playing)render();};
 for(const id of ['music','effects'])$('pref-'+id).oninput=e=>{meta.preferences[id]=Number(e.target.value);$('level-'+id).textContent=e.target.value+'%';audio.volume();save();};
 $('exportSave').onclick=()=>{const blob=new Blob([JSON.stringify({format:'janhyang-beta-v610',run,meta},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='janhyang-beta-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
 $('importSave').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>1000000)throw Error();const x=JSON.parse(await f.text());if(x.format!=='janhyang-beta-v610')throw Error();const m=K.validateMeta(x.meta),r=x.run?K.validateRun(x.run):null;openDrawer('불러올 기록 확인','<p>결말 '+m.ends.length+'개 · '+(r?'진행 기록 있음':'진행 기록 없음')+'</p><p>현재 베타 기록을 이 파일로 교체합니다.</p><div class="menuActions"><button id="confirmImport" class="primary">이 기록으로 교체</button><button id="cancelImport">취소</button></div>');$('cancelImport').onclick=settings;$('confirmImport').onclick=()=>{meta=m;run=r;save();applyPreferences();home();toast('기록을 불러왔습니다.');};}catch{toast('베타 기록 파일을 읽을 수 없습니다. 기존 기록은 유지됩니다.');}};
 if($('toHome'))$('toHome').onclick=()=>{save();home();};
}
function mapPanel(){
 const W=K.W,at=K.region(run),goal=run.journey?.target;
 const edges=Object.entries(W.places).flatMap(([id,p])=>p.links.filter(to=>id<to).map(to=>'<line x1="'+p.x+'" y1="'+p.y+'" x2="'+W.places[to].x+'" y2="'+W.places[to].y+'"/>')).join('');
 let html='<p class="drawerIntro">'+(goal?'가는 중: <strong>'+safeText(W.places[goal].name)+'</strong> · 이어진 길을 골라 이동하세요.':'현재 위치: <strong>'+safeText(W.places[at].name)+'</strong> · 주변을 둘러볼 때 사용하는 지도입니다.')+'</p><div class="villageMap"><img class="villageMapArt" src="assets/village-map.webp" alt="해솔리의 대합실, 광장, 학교와 해안 길을 그린 지도"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="coastShape" d="M97 0Q55 5 90 48T99 100H100V0Z"/>'+edges+'</svg>';
 for(const [id,p]of Object.entries(W.places)){const enabled=p.links.includes(at)&&K.canTravel(run,id);html+='<button class="mapPlace '+(id===at?'current':'')+' '+(id===goal?'destination':'')+'" style="left:'+p.x+'%;top:'+p.y+'%" data-travel="'+id+'" '+(!enabled?'disabled':'')+'>'+safeText(p.name)+(id===at?'<small>현재 위치</small>':id===goal?'<small>목적지</small>':run.visitedPlaces.includes(id)?'<small>다녀온 곳</small>':'')+'</button>';}
 html+='</div><p class="mapAvailability">'+(D.nodes[run.node].encounter&&!run.explore?'지금은 현장 상황에서 벗어날 수 없습니다.':K.W.regions[run.node]==='shelter'&&!run.flags.includes('doorPassed')?'현관을 나간 뒤 주변을 둘러볼 수 있습니다.':'')+'</p><p class="mapLegend">이야기 속 이동은 선택 후 바로 이어집니다. 지도에서는 연결된 주변 장소를 따로 둘러볼 수 있습니다.</p>';
 if(run.explore||run.journey)html+='<button id="returnStory" class="wideButton">하던 곳으로 돌아간다 · '+safeText(W.places[W.regions[run.node]].name)+'</button>';
 openDrawer('해솔리 지도',html);
 $('drawerBody').querySelectorAll('[data-travel]').forEach(b=>b.onclick=()=>{if(!K.travel(run,meta,b.dataset.travel))return;audio.movement(K.region(run));save();$('drawer').close();lastNode=null;render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;});
 if($('returnStory'))$('returnStory').onclick=()=>{K.returnToStory(run,meta);save();$('drawer').close();lastNode=null;render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;};
}
function peoplePanel(){
 const names=K.W.present(run,K.region(run));const html='<p class="drawerIntro">지금 함께 있거나 이 장소에서 만날 수 있는 사람입니다. 인물을 누르면 대화합니다.</p><div class="peopleGrid">'+names.map(name=>{const p=K.W.people[name];return '<button class="personCard" data-person="'+name+'"><img src="assets/'+p.art+'" alt=""><span><strong>'+name+'</strong><small>'+safeText(p.intro)+'</small></span></button>';}).join('')+'</div>'+(!names.length?'<p>아직 함께 있는 사람이 없습니다. 문밖의 목소리부터 확인해 볼 수 있습니다.</p>':'');
 openDrawer('함께 있는 사람',html);$('drawerBody').querySelectorAll('[data-person]').forEach(b=>b.onclick=()=>personPanel(b.dataset.person));
}
function personPanel(name,topic){
 const person=K.W.people[name];if(!person||!K.W.present(run,K.region(run)).includes(name))return;
 const reply=topic?K.talk(run,name,topic):null;if(reply)save();
 let html='<div class="personFocus"><img src="assets/'+person.art+'" alt="'+name+'"><div><p class="eyebrow">지금 이곳에서</p><h3>'+name+'</h3><p>'+safeText(person.intro)+'</p></div></div>';
 if(reply)html+='<div class="personalDialogue">'+reply.map(l=>'<div class="talkLine '+(l.who==='나'?'player':'')+'">'+speakerHeader(l.who)+'<p>'+safeText(l.text)+'</p></div>').join('')+'</div>';
 html+='<div class="personTopics">'+person.topics.map(([id,label])=>'<button data-topic="'+id+'">'+safeText(label)+'</button>').join('')+'</div><button id="backPeople" class="quiet wideButton">다른 동료 보기</button>';
 openDrawer(name,html);$('drawerBody').querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>personPanel(name,b.dataset.topic));$('backPeople').onclick=peoplePanel;
}
function drawCast(ending=false){
 const names=K.W.present(run,K.region(run));$('castStrip').innerHTML=names.map(name=>'<button data-cast-person="'+name+'" aria-label="'+name+'와 대화"><img src="assets/'+K.W.people[name].art+'" alt=""><span>'+name+'</span></button>').join('');$('castStrip').hidden=ending||!names.length;
 $('castStrip').querySelectorAll('[data-cast-person]').forEach(b=>b.onclick=()=>personPanel(b.dataset.castPerson));$('peopleCount').textContent=names.length||'';
}
function renderExploration(){$('propPreview')?.remove();interference.stop();clearPresentation(false);
 const at=K.region(run),p=K.W.places[at],spot=p.spots.find(s=>s[0]===run.explore.note),names=K.W.present(run,at);
 document.body.classList.remove('choosing','mood-broadcast','mood-approach');applyPreferences();$('game').classList.add('exploring');
 $('sceneImage').src='assets/'+p.art;$('sceneImage').alt=p.name;$('sceneImage').style.objectPosition='center';$('sceneTitle').textContent=p.name;$('placeLabel').textContent=p.name;$('chapterLabel').textContent=run.journey?'가는 중 · '+K.W.places[run.journey.target].name:'주변을 둘러보는 중';$('creature').hidden=true;
 $('character').hidden=!names.length;if(names.length)$('character').src='assets/'+K.W.people[names[0]].art;drawCast();
 $('visualEcho').hidden=run.erosion<25||meta.preferences.reduce;document.body.classList.toggle('erosion-high',run.erosion>=65);$('erosionLabel').textContent='침식 '+run.erosion+'%';$('moodLabel').textContent=spot?'가까이 살펴본 것':'현장';
 $('lineWrap').innerHTML='<article class="line narration"><p>'+safeText(spot?spot[2]:p.text)+'</p></article>';$('readingControls').hidden=true;$('actionLabel').hidden=false;$('actionLabel').textContent='주변 살피기';$('skipSeen').hidden=true;$('choices').hidden=false;$('choices').dataset.kind='explore';
 $('choices').innerHTML=p.spots.map(([id,label])=>'<button data-world-spot="'+id+'">'+label+(run.worldNotes.includes(at+':'+id)?'<small>남겨 둔 기록 다시 보기</small>':'')+'</button>').join('')+(run.journey?'<button id="continueJourney" class="primary">지도에서 이동을 이어간다</button>':'<button id="resumeStory">하던 곳으로 돌아간다</button>');
 $('choices').querySelectorAll('[data-world-spot]').forEach(b=>b.onclick=()=>{const s=K.inspectPlace(run,b.dataset.worldSpot);if(!s)return;run.explore.note=s[0];if(/종이|기록|명부|점검표/.test(s[0]))audio.fx('paper');save();renderExploration();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;});
 if($('continueJourney'))$('continueJourney').onclick=mapPanel;if($('resumeStory'))$('resumeStory').onclick=()=>{K.returnToStory(run,meta);save();lastNode=null;render();$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;};
 if(lastNode!=='explore:'+at){audio.scene(p.mood);lastNode='explore:'+at;$('dialoguePane').scrollTop=0;$('actionPane').scrollTop=0;}updateStatus();renderSceneTools();renderProp();updateReadingHint();interference.sync();
}
function updateStatus(ending=false){
 const n=D.nodes[run.node],level=run.erosion<25?'안정':run.erosion<65?'간섭':'위험';$('erosionLabel').textContent='침식 '+run.erosion+'% · '+level;$('erosionLabel').dataset.level=level;$('erosionLabel').style.setProperty('--erosion',run.erosion+'%');
 updateErosion(ending);
 const key='broadcast:'+run.node,has=!!n.broadcast&&!ending&&!run.explore;run.broadcastRead??=[];run.broadcastAlerted??=[];const unread=has&&!run.broadcastRead.includes(key);$('radioButton').classList.toggle('unread',unread);$('radioBadge').hidden=!unread;$('broadcastStatus').textContent=unread?'새 방송 도착 · 수신기 확인':has?'수신 기록 보관 중':'';
 if(unread&&!run.broadcastAlerted.includes(key)){run.broadcastAlerted.push(key);save();if(!D.nodes[run.node].encounter)audio.fx('receive');if(meta.preferences.vibration&&navigator.vibrate)try{navigator.vibrate([100,70,100]);}catch{}}
}
function receiverPanel(tab='current'){
 if(!run||run.ending){toast('지금 새로 받은 안내는 없습니다.');return;}
 const n=D.nodes[run.node],played=run.asked.includes('replay:'+run.node),questions=(n.questions||[]).filter(q=>!run.asked.includes(run.node+':'+q.id)),chat=run.chat.filter(c=>c.node===run.node);
 let content='';
 if(tab==='previous')content=n.previous&&!run.explore?(played?'<small>보관 방송 · 재생 완료</small><p>'+safeText(n.previous)+'</p>':'<p>이전 방송 1건</p><button id="replayBroadcast" class="deviceAction">재생하기 <small>침식 +12 · 한 번만</small></button>'):'<p class="deviceEmpty">이 장소에서 보관한 이전 방송이 없습니다.</p>';
 else if(tab==='questions')content=(!run.explore?questions.map(q=>'<button class="deviceAction" data-question="'+q.id+'">'+safeText(q.q)+'<small>침식 +'+q.cost+'</small></button>').join(''):'')+((!questions.length||run.explore)&&!chat.length?'<p class="deviceEmpty">지금 보낼 질문이 없습니다.</p>':'')+chat.slice().reverse().map(c=>'<article class="deviceExchange"><small>받은 답</small><p>'+safeText(c.a)+'</p><details><summary>보낸 질문</summary><p>'+safeText(c.q)+'</p></details></article>').join('');
 else {const message=K.reception(run);content=(message?.broken?'<small class="receptionDamage">문자 일부 끊김</small>':'')+'<p class="receivedText">'+safeText(run.explore?'새 수신 없음.':message?.text||'새 방송이 없습니다.')+'</p>';}
 if(tab==='current')content+=interference.history();
 const html='<section class="receiverDevice"><div class="receiverVisual"><img class="receiverHardware" src="assets/message-terminal.webp" alt="넓은 문자 화면과 세 개의 버튼이 있는 휴대용 수신 단말기"><div class="receiverScreen"><div class="channelReadout"><span>CH 04 · '+({current:'수신',previous:'보관',questions:'교신'}[tab]||'수신')+'</span><span>침식 '+run.erosion+'%</span></div><div class="deviceContent" tabindex="0" aria-label="수신기 문자 화면">'+content+'</div><small id="deviceScrollHint" hidden>아래로 밀어 계속 읽기 ↓</small></div><button class="physicalTab plateTab '+(tab==='current'?'active':'')+'" data-device-tab="current" aria-pressed="'+(tab==='current')+'">수신</button><button class="physicalTab leverTab '+(tab==='previous'?'active':'')+'" data-device-tab="previous" aria-pressed="'+(tab==='previous')+'">이전 방송</button><button class="physicalTab dialTab '+(tab==='questions'?'active':'')+'" data-device-tab="questions" aria-pressed="'+(tab==='questions')+'">교신 <small>'+(questions.length?'새 질문 '+questions.length:chat.length?'답신':'')+'</small></button></div></section>';
 run.broadcastRead??=[];const key='broadcast:'+run.node;const freshReception=!!n.broadcast&&!run.explore&&tab==='current'&&!run.broadcastRead.includes(key);if(freshReception){run.broadcastRead.push(key);audio.fx('static');interference.defer();}save();updateStatus();openDrawer('수신기',html);$('drawer').classList.add('receiverDrawer');const screen=$('drawerBody').querySelector('.deviceContent'),hint=$('deviceScrollHint');const updateHint=()=>{hint.hidden=screen.scrollHeight<=screen.clientHeight+screen.scrollTop+3;};screen.addEventListener('scroll',updateHint);requestAnimationFrame(updateHint);
 $('drawerBody').querySelectorAll('[data-device-tab]').forEach(b=>b.onclick=()=>{audio.fx('switch');receiverPanel(b.dataset.deviceTab);});
 $('drawerBody').querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{if(!K.ask(run,meta,b.dataset.question))return;interference.defer();audio.fx('static');save();render();receiverPanel('questions');$('drawerBody').querySelector('.deviceContent').scrollTop=0;});
 if($('replayBroadcast'))$('replayBroadcast').onclick=()=>{if(!K.replay(run))return;interference.defer();audio.fx('tune');save();render();receiverPanel('previous');};
 interference.sync();
}
function renderSceneTools(){
 $('sceneTools')?.remove();const key=run.explore?K.region(run):run.node;
 const specs={schoolPatrol:['','현관 안내를 가까이 본다','school'],schoolHold:['','현관 안내를 가까이 본다','school'],storeLevel:['','문과 배수관을 살핀다','water'],pumpOverview:['','수문과 배관을 살핀다','water'],marketNarrow:['','발 디딜 곳을 살핀다','market'],marketTrap:['','발 디딜 곳을 살핀다','market'],manifestDesk:['','함께 온 사람을 본다','people'],boardingPlan:['','나래와 먼저 이야기한다','people']};
 const spec=specs[key];if(!spec||run.ending)return;const button=document.createElement('button');button.id='sceneTools';button.className='sceneTool';button.textContent=spec[1];button.onclick=()=>inspectScene(spec[2]);$('stage').append(button);
}
function inspectScene(kind){
 let html='';
 if(kind==='school')html='<div class="paperCloseup"><small>현관에서 읽은 종이</small><h3>출입 안내</h3><p>수업 중에는 <strong>이름을 부르지 않습니다.</strong></p><p>출입할 때 들어온 인원과 나갈 인원을 적습니다.</p><p>명부를 고칠 때에는 원본을 남깁니다.</p><div class="punchedNumbers"><span>12</span><span>17</span><span>23</span></div></div><p class="drawerIntro">종이는 실제 현관에 남아 있었다. 번호표와 같은 세 숫자가 적혀 있다.</p>';
 if(kind==='water')html='<div class="pipeCloseup"><svg viewBox="0 0 520 270" role="img" aria-label="바다 수문과 창고의 작은 우회관은 별개로 연결되어 있다"><rect x="10" y="20" width="120" height="210" rx="6" fill="#1a3440"/><text x="70" y="52">바다</text><rect x="300" y="20" width="200" height="160" rx="6" fill="#303b3b"/><text x="400" y="52">창고</text><path d="M130 100H300" stroke="#a76557" stroke-width="22"/><circle cx="215" cy="100" r="27" fill="#6e312c" stroke="#c9907b" stroke-width="4"/><path d="M198 83l34 34m0-34l-34 34" stroke="#e5c8aa" stroke-width="5"/><path d="M400 180v55H180" stroke="#89999b" stroke-width="14" fill="none"/><circle cx="400" cy="210" r="16" fill="#78878a" stroke="#d8ded6" stroke-width="3"/><text x="213" y="156">바다 쪽 큰 수문</text><text x="283" y="265">회색 우회관 · 바깥 얕은 곳으로</text></svg></div><p class="drawerIntro">회색 관은 창고 바닥 높이에서 내려간다. 바다 쪽 굵은 관의 손잡이는 따로 있다.</p>';
 if(kind==='market')html='<div class="pathCloseup"><div class="routeFloor"><span>실제 바닥</span><i></i></div><div class="routeBoard"><span>들어 올릴 수 있는 판자</span></div><div class="routeCrates"><span>쌓인 상자</span></div></div><p class="drawerIntro">흰 선은 판자 아래로 이어진다. 상자 위로 올라가는 선은 없다.</p>';
 if(kind==='people'){peoplePanel();return;}
 openDrawer('가까이 살펴보기',html);
}

const propNames={photo:'서진이 건넨 사진',note:'나래의 점검표',ticket17:'17번 번호표',ticket45:'수호의 45번 번호표',ledger:'학교 명부와 번호표',tickets:'함께 지닌 번호표'};
function propHTML(id,side='front'){
 const paper=body=>'<div class="physicalPaper">'+body+'</div>';
 const ticket=n=>paper('<small>해솔리 · 대기표</small><b class="ticketNumber">'+String(n).padStart(2,'0')+'</b><span>접을 때 번호를 가리지 마세요</span>');
 const memoryKnown=run.flags.includes('photoRead')||K.observations(run).some(o=>o.id==='haewon');
 if(id==='photo')return side==='back'?paper('<small>사진 뒷면</small><p>약품 전달 뒤<br>학교 현관에서 대기</p><p class="writtenTime">도착 04:51</p>'+(memoryKnown?'<hr><small>서진이 별지에 적은 시각</small><p>03:50 · 비 오기 전</p>':'') ):'<figure class="heldPhoto"><img src="assets/haewon-photo.webp" alt="짧은 검은 머리의 해원. 노란 우비를 입고 검은 약 가방을 메고 있다."><figcaption>해원 · 서진이 가져온 사진</figcaption></figure>';
 if(id==='note'){const revealed=run.node==='note'||run.flags.includes('note');return paper('<small>방송실 점검표</small><p>호명에는 번호만.</p><p>긴 종이 울리면 이동.</p><p class="'+(revealed?'':'waterObscured')+'">'+(revealed?'내가 먼저 읽으면,<br>소리를 꺼 줘.':'물에 번진 글씨')+'</p>');}
 if(id==='ledger')return paper('<small>'+(run.node==='schoolGate'?'현관 명부':'현관에서 남긴 사본')+'</small><h3>들어온 사람</h3><div class="ledgerNumbers '+(run.flags.includes('schoolProof')?'punched':'')+'"><b>12</b><b>17</b><b>23</b></div><p>원본은 지우지 않음</p>')+'<div class="propTickets">'+[12,17,23].map(ticket).join('')+'</div>';
 if(id==='tickets')return '<div class="propTickets">'+[17,12,23,8,...(run.flags.includes('joinedSuho')?[45]:[])].map(ticket).join('')+'</div><p class="drawerIntro">해원에게는 번호표가 없다.</p>';
 return ticket(id==='ticket45'?45:17)+(id==='ticket17'&&run.flags.includes('doorPassed')?paper('<small>문밖에서 받은 접수증</small><b class="receiptNumber">17</b><span>번호표 뒤에 겹쳐 둔 종이</span>'):'');
}
function renderProp(){
 $('stage').classList.remove('hasProp');$('propPreview')?.remove();if(!run||run.ending||run.explore)return;const n=D.nodes[run.node],line=K.lines(run)[run.page],id=line.prop||n.prop;if(!id)return;
 const b=document.createElement('button');b.id='propPreview';b.setAttribute('aria-label',propNames[id]+' 확대해서 살펴보기');b.innerHTML=(id==='photo'&&line.propSide!=='back'?'<img src="assets/haewon-photo.webp" alt="해원의 사진">':'<span class="propMiniPaper">'+(id==='photo'?'사진 뒷면':id==='note'?'점검표':id==='ledger'?'12 · 17 · 23':id==='ticket45'?'45':id==='tickets'?'번호표':'17')+'</span>')+'<small>'+propNames[id]+' · 확대</small>';b.onclick=()=>propPanel(id,line.propSide||'front');$('stage').append(b);$('stage').classList.add('hasProp');if($('sceneTools'))$('sceneTools').hidden=true;$('character').hidden=true;
}
function propPanel(id,side='front'){
 openDrawer(propNames[id],'<div class="propInspection">'+propHTML(id,side)+'</div>'+(id==='photo'&&(run.node==='familyPhoto'||run.flags.includes('photoRead')||K.observations(run).some(o=>o.id==='haewon'))?'<button id="flipPhoto" class="wideButton">'+(side==='front'?'뒷면 보기':'앞면 보기')+'</button>':''));if($('flipPhoto'))$('flipPhoto').onclick=()=>propPanel(id,side==='front'?'back':'front');
}
let erosionRun=null,erosionLast=null,erosionTimer=null;
function clearErosion(){$('stage').classList.remove('hasProp');clearTimeout(erosionTimer);$('erosionGrowth')?.remove();$('erosionChange')?.remove();$('erosionLabel').classList.remove('erosionSurge','erosionRecover');$('erosionLabel').removeAttribute('data-delta');document.body.removeAttribute('data-erosion-band');$('game').style.removeProperty('--growth');erosionRun=null;erosionLast=null;}
function updateErosion(ending=false){
 if(!playing||!run||ending){clearErosion();return;}const value=run.erosion,band=value<25?0:value<45?1:value<65?2:value<85?3:4;
 document.body.dataset.erosionBand=String(band);$('game').style.setProperty('--growth',Math.max(0,(value-15)/85).toFixed(3));$('game').style.setProperty('--growth-scale',String(1.42-value*.0042));
 let image=$('erosionGrowth');if(!image){image=document.createElement('img');image.id='erosionGrowth';image.src='assets/erosion-growth.webp';image.alt='';image.setAttribute('aria-hidden','true');$('stage').append(image);}image.hidden=value<16;
 const gauge=$('erosionLabel');gauge.setAttribute('aria-label','침식 '+value+'퍼센트 · '+(band===0?'안정':band<3?'간섭':'위험')+' · 상태 설명 열기');
 if(erosionRun===run&&erosionLast!==null&&value!==erosionLast){const diff=value-erosionLast;clearTimeout(erosionTimer);gauge.classList.remove('erosionSurge','erosionRecover');void gauge.offsetWidth;gauge.classList.add(diff>0?'erosionSurge':'erosionRecover');$('erosionChange')?.remove();const change=document.createElement('span');change.id='erosionChange';change.textContent=(diff>0?'+':'')+diff;gauge.append(change);gauge.dataset.delta=change.textContent;erosionTimer=setTimeout(()=>{gauge.classList.remove('erosionSurge','erosionRecover');gauge.removeAttribute('data-delta');$('erosionChange')?.remove();},1500);}
 erosionRun=run;erosionLast=value;
}

const audio={
 current:null,ctx:null,key:null,tracks:new Set(),voices:new Set(),buffers:new Map(),timer:null,started:0,duckUntil:0,epoch:0,
 unlock(){if(!meta.preferences.sound)return;this.epoch++;try{this.ctx??=new(window.AudioContext||window.webkitAudioContext)();this.ctx.resume().catch(()=>{});}catch{}},
 profile(mood){const place=run?K.region(run):null;return run?.ending?(['together','shared','anchor'].includes(run.ending)?'dawn':'room'):run&&!D.nodes[run.node].encounter&&({school:'school',reservoir:'water',archive:'archive',pier:'dawn'})[place]||({shelter:'room',coast:'coast',approach:'threat',signal:'signal',broadcast:'signal',silence:'silence',quiet:'room'})[mood]||'room';},
 scene(mood,force=false){
  if(!playing||!meta.preferences.sound||document.hidden){this.stop();return;}
  const profile=this.profile(mood);this.mood=mood;if(profile===this.key&&!force)return;
  this.key=profile;this.started=performance.now();for(const t of this.tracks)t._target=0;
  if(profile==='silence'){this.current=null;this.beginMix();return;}
  const t=new Audio('assets/audio/'+profile+'.mp3?v=audio-710');t.loop=true;t.volume=0;t._mix=0;t._target=1;this.current=t;this.tracks.add(t);
  t.play().catch(()=>{if(this.current===t)toast('소리를 재생하려면 설정에서 소리를 다시 켜 주세요.');});this.beginMix();
 },
 beginMix(){if(this.timer)return;this.timer=setInterval(()=>this.mix(),80);},
 mix(){
  const age=(performance.now()-this.started)/1000;
  // Slow breathing levels, quiet gaps in the score, and a lower bed under physical sounds.
  const danger=!!run&&!run.ending&&!!D.nodes[run.node].encounter;
  const breath=.77+.13*Math.sin(age/8.7)+.07*Math.sin(age/17.3);
  const duck=performance.now()<this.duckUntil?.58:1;
  const target=.48*meta.preferences.music/100*breath*(danger?1:.82)*duck;
  for(const t of this.tracks){t._mix+=(t._target-t._mix)*.055;const wanted=target*Math.sin(Math.PI*.5*t._mix);t.volume=Math.min(1,Math.max(0,t.volume+(wanted-t.volume)*.19));if(!t._target&&t._mix<.008){t.pause();this.tracks.delete(t);}}
  if(!this.tracks.size){clearInterval(this.timer);this.timer=null;}
 },
 volume(){this.mix();if(this.bus&&this.ctx)this.bus.gain.setTargetAtTime(meta.preferences.effects/100,this.ctx.currentTime,.08);},
 stop(){
  clearInterval(this.timer);this.timer=null;for(const t of this.tracks){t.pause();}this.tracks.clear();this.current=null;this.key=null;
  if(this.ctx){const now=this.ctx.currentTime;for(const v of this.voices){try{v.g.gain.cancelScheduledValues(now);v.g.gain.setTargetAtTime(.0001,now,.025);v.source.stop(now+.16);}catch{}}const epoch=++this.epoch;setTimeout(()=>{if(this.epoch===epoch)this.ctx?.suspend?.().catch(()=>{});},200);}
 },
 setup(){
  if(this.bus)return;const c=this.ctx;this.bus=c.createGain();this.bus.gain.value=meta.preferences.effects/100;this.bus.connect(c.destination);
  const impulse=c.createBuffer(2,Math.floor(c.sampleRate*1.65),c.sampleRate);let seed=417;for(let ch=0;ch<2;ch++){const a=impulse.getChannelData(ch);for(let i=0;i<a.length;i++){seed=(Math.imul(seed,1664525)+1013904223)|0;a[i]=(seed/2147483648)*Math.exp(-i/c.sampleRate*5)*.24;}}
  this.reverb=c.createConvolver();this.reverb.buffer=impulse;const wet=c.createGain();wet.gain.value=.20;this.reverb.connect(wet);wet.connect(this.bus);
 },
 noise(seconds){const c=this.ctx,key=Math.ceil(seconds*10);if(this.buffers.has(key))return this.buffers.get(key);const b=c.createBuffer(1,Math.ceil(c.sampleRate*seconds),c.sampleRate),a=b.getChannelData(0);let seed=key*417;for(let i=0;i<a.length;i++){seed=(Math.imul(seed,1664525)+1013904223)|0;a[i]=seed/2147483648;}this.buffers.set(key,b);return b;},
 fx(kind,variant=0){
  if(!playing||!meta.preferences.sound||document.hidden||meta.preferences.effects===0)return;if(!['interference','whisper'].includes(kind))interference.quiet();this.unlock();if(!this.ctx)return;this.setup();
  const c=this.ctx,t=c.currentTime;this.bus.gain.setTargetAtTime(meta.preferences.effects/100,t,.04);this.duckUntil=performance.now()+1100;
  const voice=(source,at,d,level,attack=.018,filter=null,wet=true)=>{
   const g=c.createGain();g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(level,at+Math.min(attack,d*.25));g.gain.exponentialRampToValueAtTime(.0001,at+d);source.connect(filter||g);if(filter)filter.connect(g);g.connect(this.bus);if(wet)g.connect(this.reverb);
   const v={source,g,kind};this.voices.add(v);source.onended=()=>{source.disconnect();filter?.disconnect();g.disconnect();this.voices.delete(v);};source.start(at);source.stop(at+d+.06);
  };
  const noise=(at,d,level,f=900,type='bandpass',q=.7)=>{const b=c.createBufferSource();b.buffer=this.noise(d+.1);const filter=c.createBiquadFilter();filter.type=type;filter.frequency.value=f;filter.Q.value=q;voice(b,at,d,level,.025,filter);};
  const tone=(f,at,d,level,type='sine',end=f)=>{const o=c.createOscillator();o.type=type;o.frequency.setValueAtTime(f,at);o.frequency.exponentialRampToValueAtTime(end,at+d);voice(o,at,d,level);};
  if(kind.startsWith('step')){
   const wet=kind==='step-wet',wood=kind==='step-wood';for(let i=0;i<3;i++){const at=t+i*.43+(i===1?.035:0);noise(at,wet?.48:.28,wet?.10:.065,wet?650:wood?450:1450,'lowpass');tone(wood?106:wet?67:82,at,.19,.032,'sine',wood?68:46);if(wet)noise(at+.08,.38,.047,2100);}
  }else if(kind==='door'){
   noise(t,.18,.09,2200);tone(175,t+.08,.9,.025,'triangle',105);noise(t+.12,1.25,.045,600);tone(61,t+1.05,.36,.065,'sine',42);noise(t+1.05,.3,.08,420,'lowpass');
  }else if(kind==='paper'){
   noise(t,.3,.065,2300);noise(t+.13,.38,.045,3500);
  }else if(kind==='valve'){
   noise(t,.75,.07,1400);tone(165,t+.04,.7,.017,'triangle',93);tone(390,t+.14,.8,.009,'sine',240);
  }else if(kind==='water'){
   noise(t,1.8,.12,620,'lowpass');noise(t+.14,1.4,.05,1800);tone(49,t,.95,.018);
  }else if(kind==='interference'||kind==='whisper'){
   const color=Math.abs(variant)%500,offset=.19+(Math.abs(variant)%9)*.02;noise(t,.9,.024,kind==='whisper'?850+color:1900+color);noise(t+offset,.88,.014,kind==='whisper'?550+color:2800+color);if(kind==='whisper')noise(t+.65,.64,.012,1400+color);
  }else if(kind==='static'){
   // Only a freshly received message calls this. No receiver-open or tab loop.
   noise(t,.72,.065,1900);noise(t+.18,.55,.032,3200);tone(920,t+.07,.45,.006,'sine',680);
  }else if(kind==='shortBell'){tone(523.25,t,.55,.034);tone(523.25,t+.65,.55,.031);
  }else if(kind==='bell'){
   for(const [f,v,d] of [[523.25,.052,2.8],[1051,.018,2.1],[1477,.009,1.5]])tone(f,t,d,v);
  }else if(kind==='knock'||kind==='tap'){
   for(const at of [t,t+(kind==='tap'?.28:.41)]){noise(at,.13,.045,780,'lowpass');tone(kind==='tap'?145:80,at,.24,.045,'sine',kind==='tap'?99:49);}
  }else if(kind==='receive'){
   tone(660,t,.30,.014);tone(440,t+.17,.42,.012);
  }else if(kind==='tune'){
   tone(220,t,.5,.018,'sine',370);
  }else if(kind==='switch'){
   noise(t,.09,.02,1900,'lowpass');tone(120,t,.11,.012);
  }
 },
 movement(region){this.fx(({shelter:'step-wood',school:'step-wood',archive:'step-wood',pier:'step-wood',reservoir:'step-wet'})[region]||'step-stone');},
 action(id,choice,from,to,oldRegion,newRegion){
  if(id==='tap'){this.fx('tap');return;}if(id==='off'){this.fx('switch');return;}
  const text=choice?.text||choice?.label||'';
  if(/문을 (열|밀|당|닫)|문고리|빗장을/.test(text)){this.fx('door');return;}
  if(oldRegion!==newRegion||/걸어|이동|올라간|내려간|건너|따라간|빠져나|나선다|들어간/.test(text))this.movement(newRegion);
 }
};
// A single cancellable opportunity, only after reading or while the current receiver sits idle.
const interference={timer:null,hideTimer:null,key:null,pauseUntil:0,
 allowed(){
  if(!playing||!run||document.hidden||!K.interference.canSchedule(run))return false;
  if(!$('drawer').open&&$('propPreview'))return false;
  if(D.nodes[run.node].broadcast&&!run.broadcastRead?.includes('broadcast:'+run.node))return false;
  if($('drawer').open)return $('drawer').classList.contains('receiverDrawer')&&!!$('drawerBody').querySelector('[data-device-tab="current"].active')&&!$('drawerBody').querySelector('details[open]');
  const lines=K.lines(run),line=lines[run.page];return run.page===lines.length-1||(!line.who&&line.text.length>=50);
 },
 sync(){
  if(!this.allowed()){this.cancel();return;}
  const key=run.node;if(this.timer&&this.key===key)return;this.cancel();this.key=key;
  const reading=run.page<K.lines(run).length-1;const delay=Math.max((reading?10000:6000)+Math.random()*8000,K.interference.wait(run),this.pauseUntil-Date.now());
  const fire=()=>{
   this.timer=null;if(this.key!==key||run?.node!==key||!this.allowed())return;
   if(audio.voices.size||Date.now()<this.pauseUntil){this.timer=setTimeout(fire,1200);return;}
   const entry=K.interference.attempt(run);save();if(entry)this.show(entry);
  };
  this.timer=setTimeout(fire,delay);
 },
 cancel(){clearTimeout(this.timer);this.timer=null;this.key=null;this.clearNotice();},
 clearNotice(){clearTimeout(this.hideTimer);this.hideTimer=null;$('interferenceNotice')?.remove();$('stage').classList.remove('hasInterference');},
 quiet(){if(!audio.ctx)return;const t=audio.ctx.currentTime;for(const v of audio.voices)if(['interference','whisper'].includes(v.kind)){try{v.g.gain.cancelScheduledValues(t);v.g.gain.setTargetAtTime(.0001,t,.025);v.source.stop(t+.15);}catch{}}},
 stop(){this.cancel();this.quiet();},
 defer(ms=3500){this.pauseUntil=Date.now()+ms;this.cancel();},
 history(){const entries=K.interference.entries(run);return entries.length?'<details class="unverifiedArchive"><summary>미확인 신호 · 최근 '+entries.length+'건</summary>'+entries.map(e=>'<article class="unverifiedEntry"><small>'+safeText(e.place)+' · 출처 미확인</small><p>'+safeText(e.text)+'</p></article>').join('')+'</details>':'';},
 show(entry){
  if(!playing||!run||run.ending||run.explore||document.hidden)return;
  this.clearNotice();if(meta.preferences.interferenceSound)audio.fx(entry.kind==='carrier'?'interference':'whisper',[...(entry.id||'')].reduce((n,c)=>n+c.charCodeAt(0),0));
  if($('drawer').open&&$('drawer').classList.contains('receiverDrawer')){
   const screen=$('drawerBody').querySelector('.deviceContent');if(!screen)return;
   const scroll=screen.scrollTop;screen.querySelector('.receiverEcho')?.remove();
   const echo=document.createElement('aside');echo.className='receiverEcho';echo.setAttribute('role','status');echo.dataset.signal=entry.erosion>=65?'clear':'rough';echo.innerHTML='<small>출처 미확인</small><p>'+safeText(entry.text)+'</p>';screen.querySelector('.unverifiedArchive')?.remove();screen.append(echo);screen.insertAdjacentHTML('beforeend',this.history());screen.scrollTop=scroll;
  }else if(!$('drawer').open){
   const note=document.createElement('aside');note.id='interferenceNotice';note.setAttribute('role','status');note.setAttribute('aria-live','polite');note.dataset.signal=entry.erosion>=65?'clear':'rough';note.innerHTML='<small><i></i> 수신기 · 미확인 신호</small><p>'+safeText(entry.text)+'</p>';$('stage').append(note);$('stage').classList.add('hasInterference');this.hideTimer=setTimeout(()=>this.clearNotice(),6500);
  }
 }
};
$('newButton').onclick=()=>{if(run&&!run.ending){openDrawer('새로 시작할까요?','<p>현재 진행은 처음으로 돌아갑니다. 발견한 결말과 사실은 유지됩니다.</p><div class="menuActions"><button id="confirmNew" class="primary">진행을 처음부터 시작</button><button id="cancelNew">이어하기로 돌아가기</button></div>');$('confirmNew').onclick=()=>{$('drawer').close();audio.unlock();start();};$('cancelNew').onclick=()=>$('drawer').close();}else{audio.unlock();start();}};
$('continueButton').onclick=()=>{audio.unlock();resume();};$('titleRecords').onclick=records;$('titleSettings').onclick=settings;$('homeButton').onclick=()=>{save();home();};$('menuButton').onclick=settings;$('radioButton').onclick=()=>receiverPanel();$('mapButton').onclick=()=>run&&mapPanel();$('peopleButton').onclick=()=>run&&peoplePanel();$('recordButton').onclick=records;$('textSize').onclick=()=>{meta.preferences.large=!meta.preferences.large;applyPreferences();save();};
window.addEventListener('keydown',e=>{if(!playing||$('drawer').open||['INPUT','BUTTON'].includes(e.target.tagName))return;if(e.key==='ArrowRight'){e.preventDefault();$('nextLine').click();}if(e.key==='ArrowLeft'){e.preventDefault();$('previousLine').click();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){interference.stop();audio.stop();}else if(playing){if(meta.preferences.sound){audio.unlock();audio.scene(currentMood(),true);}interference.sync();}});
load();home();if(storageFailure)setTimeout(()=>toast('일부 저장을 읽지 못했습니다. 원본은 그대로 보관됩니다. 설정에서 기록을 확인해 주세요.'),500);

window.JanhyangReady=true;

$('erosionLabel').onclick=()=>openDrawer('침식 상태','<p class="drawerIntro">현재 침식 '+run.erosion+'%</p><p>0–24% 안정 · 25–64% 간섭 · 65–100% 위험</p><p>이전 방송을 재생하거나 수신기에 질문하면 올라갑니다. 비용은 누르기 전에 표시됩니다. 읽기·지도 이동·기록 확인만으로는 올라가지 않습니다.</p><p>수치가 높아질수록 현장 화면에 간섭이 나타납니다. 휴식이나 수신기를 끄는 행동이 나오는 장면에서는 침식을 낮출 수 있습니다. 침식이 높으면 끊기던 수신 문장이 매끈하게 보일 수 있습니다. 문장이 또렷하다는 것만으로 따르지 말고, 기록 메뉴에 남긴 직접 본 내용과 비교하세요. 수치는 동료의 정체를 판정하는 결과가 아닙니다.</p>');

window.addEventListener('resize',()=>{if(playing&&run)updateReadingHint();});

$('titleSound').onclick=()=>{meta.preferences.sound=!meta.preferences.sound;save();applyPreferences();};
