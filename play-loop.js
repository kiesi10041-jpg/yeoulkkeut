/* Direct actions replace narrated solutions. No real-time failure timers. */
(function(root){
const D=root.YKData,N=D.nodes,W=root.YKWorld;D.build='8.3.1-inspection';
N.arrival.audioProfile='silence';N.look.audioProfile='silence';N.bolt.audioProfile='silence';
N.door.lines[0].text='문 앞의 사람은 얼굴을 문틀 바깥에 둔 채 손만 내민다. 손에는 접수증이, 손목 뒤에는 작은 금속 접수판이 달려 있다. 젖은 바닥에 발자국은 보이지 않는다.';
D.endings.flood.title='차오른 물';D.endings.flood.text=['바닥의 물이 계단까지 밀려온다. 학교 쪽 배관에서 깨지는 소리가 나고, 서진이 되돌아오다 위층에서 멈춘다. 돌아갈 문 아래로도 물이 들어온다.','도윤이 손잡이에 매달린다. 다친 손이 풀리면서 몸이 아래로 꺾인다. 팔을 잡지만 발을 디딜 곳이 사라진다. 수신기가 물 위로 떠오른다. 잡으려던 손을 놓고 도윤의 옷깃을 움켜쥔다.'];
N.door.lines[2]={who:'',text:'나래가 손을 뻗다가 멈춘다. 문밖에서는 같은 질문만 돌아온다. 손목까지 들어왔는데도 문턱의 물은 흔들리지 않는다.'};
N.door.choices.find(c=>c.id==='number').puzzle='doorProof';N.door.choices.find(c=>c.id==='number').label='번호표를 내민다';
N.waiting.lines=[{who:'',text:'문고리를 붙들자 바깥에서도 잡는다. 문을 밀지는 않는다. 손잡이가 식을 때까지 같은 질문이 돌아온다.'},{who:'나래',text:'문은 제가 잡을게요. 주머니에 받은 거 있죠?'}];N.waiting.choices[0].puzzle='doorProof';
N.passed.lines.push({who:'',text:'문이 닫힌 뒤 수신기에서 17번이라는 말이 다시 들린다. 방금 말한 목소리와 끝의 숨까지 같다. 나래가 수신기를 내려다본다.',if:'voiceTaken'});
N.passed.choices[0].routeByFlag={flag:'voiceTaken',yes:'voiceAtGate',no:'lane'};
N.voiceAtGate={place:'대합실 밖 · 돌아온 목소리',art:'town.webp',mood:'signal',audioProfile:'silence',lines:[{who:'수신기',text:'17번입니다. 17번입니다.'},{who:'',text:'길 건너 창문이 열린다. 그 안에서도 같은 말이 난다. 나래가 발을 멈춘다. 수신기를 입 가까이 가져가자 말이 끊긴다.'},{who:'나래',text:'대답 기다리는 것 같은데요.'}],choices:[{id:'off',label:'수신 소리를 끄고 창문에서 멀어진다',to:'lane',flags:['voiceResolved','voiceCautious'],erosion:-4},{id:'reply',label:'누가 내 목소리를 틀었는지 묻는다',to:'voiceReply',flags:['voiceResolved','voiceAnswered'],erosion:8}]};W.regions.voiceAtGate='square';
N.voiceReply={place:'골목 · 한 번 더 남은 말',art:'town.webp',mood:'signal',audioProfile:'signal',lines:[{who:'나',text:'누가 틀었어요?'},{who:'수신기',text:'누가 틀었어요?'},{who:'',text:'맞은편 창문이 하나 더 열린다. 두 곳에서 마지막 말이 겹친다. 나래가 팔꿈치를 잡아 골목 안쪽으로 이끈다.'}],choices:[{id:'leave',label:'대답을 멈추고 나래와 이동한다',to:'lane'}]};W.regions.voiceReply='square';
N.lane.lines[1].text='여기서 소리 나면 벽 쪽으로 붙어요. 저 앞은 숨을 데가 없어요.';
N.pumpSeaView.lines=[{who:'',text:'창문 너머 수문이 열려 있다. 틈으로 들어오는 물이 안쪽 배관을 때릴 때마다 압력계가 튄다. 빨간 손잡이에 오래된 화살표가 새겨져 있다.'},{who:'해원',text:'저 문 보고 있을게요. 움직이면 말할게요.'},{who:'도윤',text:'제 왼손은 못 써요. 돌려 주실래요?'}];N.pumpSeaView.choices[0].puzzle='seaAligned';N.pumpSeaView.choices[0].label='수문 위치를 확인하고 다음 장치로 간다';N.pumpSeaView.choices.push({id:'flood',label:'범람한 통로를 본다',to:'end:flood',flag:'seaFailed'});
N.pumpAir.lines=[{who:'해원',text:'닫혔어요. 아래 틈도 안 보여요.'},{who:'',text:'도윤이 오른손으로 회색 레버를 조금 연다. 배관에서 숨 빠지는 소리가 난다. 바늘이 내려앉자 레버를 닫는다. 스피커 잡음만 그대로 남았다.'},{who:'도윤',text:'됐어요. 파란 손잡이, 천천히요.'}];
N.pumpAir.choices[0].label='파란 손잡이를 열고 펌프를 켠다';
N.mapChoice.lines=[{who:'',text:'벽의 낡은 표시는 체육관을, 그 위에 붙인 새 화살표는 창고 골목을 가리킨다. 서진이 두 방향을 번갈아 본다.'},{who:'서진',text:'아침에는 체육관 옆으로 다녔어요. 지금은 막았다는 건가……'},{who:'교신 상대',text:'임시 동선이 적용되어 있습니다. 현장 표지를 확인하십시오.'}];N.mapChoice.choices.find(c=>c.id==='gym').label='체육관 옆으로 간다';N.mapChoice.choices.find(c=>c.id==='paper').label='새 화살표 쪽으로 간다';
N.schoolPatrol.lines[2]={who:'',text:'나래가 소매를 잡는다. 입을 열려다 현관 쪽을 돌아본다.'};
N.schoolPatrol.questions??=[];N.schoolPatrol.questions.push({id:'help',q:'명부를 든 형체 앞에서 무엇을 내밀죠?',a:'현관에서 남긴 출입 기록을 확인하십시오. 회선에는 실제 입장 인원이 기록되어 있지 않습니다.',cost:6});
N.archiveExit.lines=[{who:'',text:'작은 창에서 수호의 목소리가 난다. “45번은 대기 장소를 변경하지 않습니다.” 방 안 재생기는 꺼져 있다.'},{who:'수호',text:'저 여기 있는데요.'},{who:'',text:'시장 쪽 문과 작은 창 사이에서 발을 멈춘다. 수호가 가방 끈을 고쳐 멘다.'}];N.archiveExit.choices[0].label='시장 쪽 문으로 나간다';N.archiveExit.choices[1].label='목소리가 난 작은 창으로 간다';
const fieldFacts={door:['doorMic','문밖 접수판의 작은 구멍'],sea:['seaMark','수문 손잡이의 각인'],trail:['trail','학교 화살표 아래의 흔적'],echo:['liveDoor','창 앞에서 직접 받은 대답']};for(const [id,[key,title]]of Object.entries(fieldFacts))D.observationDefinitions[key]={id:key,title,text:'',place:({door:N.door,sea:N.pumpSeaView,trail:N.mapChoice,echo:N.archiveExit})[id].place};
const mount=root.mountGamePlay;
root.mountGamePlay=K=>{mount(K);const add=(r,...flags)=>{for(const f of flags)if(!r.flags.includes(f))r.flags.push(f);};
 K.field=r=>{if(!r||r.ending||r.explore)return null;const id=['door','waiting'].includes(r.node)?'door':r.node==='pumpSeaView'?'sea':r.node==='mapChoice'?'trail':r.node==='archiveExit'?'echo':null;if(!id)return null;r.fieldState??={};r.fieldState[id]??=id==='sea'?{gap:3,wrong:0,inspected:false,committed:false}:{inspected:false,committed:false};return {id,state:r.fieldState[id]};};
 K.fieldAct=(r,action)=>{const p=K.field(r);if(!p||r.page<K.lines(r).length-1)return false;const q=p.state;if(q.committed)return false;
 if(action==='inspect'){if(q.inspected)return false;q.inspected=true;q.feedback=p.id==='door'?'손목 뒤 금속 접수판에 마이크 구멍이 있다. 질문이 들릴 때마다 붉은 점이 켜진다. 손은 종이가 들어갈 만큼 벌어져 있다.':p.id==='sea'?'잠금 화살표는 시계 방향이다. 창밖 물살은 바다에서 건물 안으로 밀려온다.':p.id==='trail'?'체육관 방향 바닥에 작은 운동화 자국이 이어진다. 노란 우비 실밥이 철망에 걸려 있다. 새 화살표 쪽에는 바퀴 자국만 있다.':'수호에게 문을 잡아 달라고 한다. 그가 먼저 손잡이를 잡는다. “열까요?” 창에서는 대기 장소를 바꾸지 않는다는 말만 돌아온다.';const fact=D.observationDefinitions[fieldFacts[p.id][0]];r.observations??=[];if(!r.observations.some(o=>o.id===fact.id))r.observations.push({...fact,text:q.feedback});return true;}
 if(p.id==='door'&&['paper','voice'].includes(action)){q.committed=true;add(r,'doorProof');if(action==='voice'){add(r,'voiceTaken');r.erosion=Math.min(100,r.erosion+8);}else add(r,'silentNumber');return {route:'number'};}
 if(p.id==='sea'){
  if(['close','open'].includes(action)){if(action==='close'&&q.gap===0)return false;q.gap=Math.max(0,Math.min(4,q.gap+(action==='close'?-1:1)));if(action==='open'){q.wrong++;r.erosion=Math.min(100,r.erosion+4);}q.feedback=q.gap===0?'해원이 손전등을 내린다. “틈 안 보여요. 물도 안 들어와요.”':action==='open'?'수문이 더 벌어진다. 바닥의 물이 학교 방향 배관으로 밀려간다. 도윤이 손잡이를 가리킨다. “반대요. 지금 더 들어와요.”':'수문이 조금 내려간다. 해원이 손전등을 틈에 맞춘다. “아직 열려 있어요.”';if(q.wrong>=3){q.committed=true;add(r,'seaFailed');return {route:'flood'};}return true;}
  if(action==='submit'){if(q.gap!==0)return false;q.committed=true;add(r,'seaAligned');return {route:'seal'};}
 }return false;
 };
};
// Two-way contact: information unavailable outside, then a physical response.
D.build='8.3.1-inspection';
N.manifestSignal.lines.push({who:'',text:'앞서 내뱉은 말이 바깥 스피커에서 한 번 더 돌아온다. 선장이 휴대기를 가리킨다. “그것도 여기에 적어 주세요. 제 무전기에는 연결하지 말고요.”',if:'voiceLeak'});
N.classroomHall.lines=[{who:'',text:'복도에 문이 세 개 남아 있다. 이름표는 모두 떨어졌다. 왼쪽 문에서는 세 번씩 두드리는 소리가 나고, 가운데 문 아래에는 가느다란 틈이 있다. 오른쪽 문은 걸레로 막혀 있다.'},{who:'서진',text:'안에 누구 있어요?'},{who:'',text:'대답 대신 수신기의 통화 표시등이 켜진다. 스피커에 숨소리가 한 번 걸린다. 문을 두드리던 소리가 멎는다.'}];
N.classroomHall.choices[0].puzzle='contactLocated';N.classroomHall.choices[0].label='반응을 확인한 문으로 간다';N.classroomHall.choices[1].label='두드리는 소리만 따라 왼쪽 문으로 간다';
N.doyunDoor.lines[0].text='확인한 문 아래로 작업복 소매와 붕대가 나온다. 문은 잠기지 않았지만 안쪽 선반에 걸려 있다. 남자가 입을 열려다 복도 안내를 보고 멈춘다.';
N.doyunDoor.lines[3].text='왼손이 끼었어요. 문 아래 받침부터 넣어 주세요. 더 밀면 선반이 내려앉아요.';
N.doyunDoor.lines[4].text='접이식 의자가 복도 벽에 기대 있다. 안쪽에서 금속이 구르는 소리가 난다. 선반 뒤는 틈이 좁아 보이지 않는다.';
N.braceShelf.lines=[{who:'',text:'의자를 밀어 넣자 선반이 멈춘다. 안쪽 남자가 손을 빼내지만 문을 조금 움직일 때마다 통이 구른다. 나래가 문을 붙든다.'},{who:'나래',text:'제가 잡을게요. 안에 뭐가 걸렸는지 물어봐 주세요.'},{who:'',text:'창틀 옆에 가위가 있다. 두꺼운 커튼 끝을 잘라 긴 띠를 만든다. 문틈으로는 통 손잡이만 보인다. 뒤쪽에서 수신기에 마찰음이 들어온다.'}];N.braceShelf.choices[0].puzzle='loadSecured';N.braceShelf.choices[0].label='고정한 통을 확인하고 문을 연다';
N.schoolPass.lines=N.schoolPass.lines.filter(l=>!l.text.includes('다른 근거가 생긴다')&&!l.text.includes('뒤쪽 교실에서 같은 말'));
N.echoClass.lines=[{who:'',text:'왼쪽 문 앞에 서자 두드림이 멎는다. 방 안에서는 방금 들은 숨소리만 반복된다. 불을 비춰도 의자들은 움직이지 않는다.'},{who:'서진',text:'밖에 서 있는 건 아는 걸까요?'},{who:'',text:'수신기의 통화 표시가 다시 깜박인다. 가운데 문 아래에서 작은 쇳소리가 난다.'}];N.classroomHall.choices.find(c=>c.id==='echo').unless='hallEchoSeen';N.echoClass.choices=[{id:'return',label:'복도로 물러나 통화 표시를 확인한다',to:'classroomHall',flags:['hallEchoSeen'],erosion:6}];
N.doyunStory.lines.unshift({who:'',text:'남자가 약 상자에서 낡은 수신기를 꺼낸다. 화면 한쪽 모서리가 눌려 있다. “이걸로 계속 불렀어요. 밖에서 받아 주셔서 다행이에요.”',if:'liveRescue'});
N.treatment.lines.push({who:'',text:'손바닥의 까진 곳에 약이 닿자 따갑다. 의자는 버텼지만, 통이 미끄러질 때 놓친 자국이 남았다.',if:'shelfScrape'});
for(const [id,title,place]of [['contactDoor','빛에 응답한 문',N.classroomHall.place],['loadAnchor','안쪽에서 확인한 선반 기둥',N.braceShelf.place]])D.observationDefinitions[id]={id,title,place,text:''};
const liveID=r=>r.node==='classroomHall'?'hall':r.node==='braceShelf'?'rescue':null;
root.validateContact=r=>{if(r.contactState!==undefined){if(!r.contactState||typeof r.contactState!=='object'||Array.isArray(r.contactState))throw Error('교신 상태가 올바르지 않습니다.');for(const [id,q]of Object.entries(r.contactState)){if(!['hall','rescue'].includes(id)||!q||typeof q!=='object'||typeof q.tuned!=='boolean'||typeof q.inspected!=='boolean'||typeof q.committed!=='boolean'||!['off','left','middle','right'].includes(q.beam)||!Array.isArray(q.log)||q.log.length>12||q.log.some(t=>typeof t!=='string'||t.length>1000)||!Array.isArray(q.heard)||q.heard.some(t=>typeof t!=='string')||!Array.isArray(q.errors)||q.errors.some(t=>!['left','right','handle'].includes(t))||q.feedback!==undefined&&typeof q.feedback!=='string'||q.reply!==undefined&&typeof q.reply!=='string'||q.anchor!==undefined&&typeof q.anchor!=='boolean'||q.secured!==undefined&&typeof q.secured!=='boolean')throw Error('교신 행동 기록이 올바르지 않습니다.');}}
 if(r.subjective!==undefined&&(!Array.isArray(r.subjective)||r.subjective.length>12||r.subjective.some(x=>!x||!D.nodes[x.node]||!['pending','ground','off','answer'].includes(x.state)||x.acknowledged!==undefined&&typeof x.acknowledged!=='boolean')))throw Error('침식 반응 기록이 올바르지 않습니다.');};
const previousMount=root.mountGamePlay;
root.mountGamePlay=K=>{previousMount(K);const flag=(r,f)=>{if(!r.flags.includes(f))r.flags.push(f);};const remember=(r,id,text)=>{r.observations??=[];if(!r.observations.some(x=>x.id===id))r.observations.push({...D.observationDefinitions[id],text});};
 K.contact=r=>{const id=liveID(r);if(!id||r.ending||r.explore)return null;r.contactState??={};r.contactState[id]??={tuned:false,inspected:false,committed:false,beam:'off',log:[],heard:[],errors:[]};return {id,state:r.contactState[id]};};
 K.contactAct=(r,action)=>{const p=K.contact(r);if(!p||p.state.committed)return false;const q=p.state;if(K.subjective(r)?.state==='pending')return false;
 if(action==='tune'){if(q.tuned)return false;q.tuned=true;r.flags=r.flags.filter(f=>f!=='channelPaused');r.erosion=Math.min(100,r.erosion+2);q.reply=p.id==='hall'?'……들리세요? 양호실 안이에요. 문이 안 열려요. 밖은 안 보입니다. 문 밑으로 불 좀 비춰 주세요.':'선반 뒤쪽은 제가 볼 수 있어요. 통 손잡이만 잡으면 옆으로 돌아요. 몸통을 감아서 뒤의 기둥에 묶어 주세요. 기둥 쪽은 제가 받을게요.';if(p.id==='rescue')q.anchor=true;q.feedback=p.id==='hall'?'문 안에서 불빛을 기다린다고 한다. 손전등을 켜고 세 문 아래의 틈을 본다.':'안쪽 사람이 띠를 받을 준비를 한다. 나래가 문을 붙든 채 기다린다.';q.log.push(q.reply);return true;}
 if(action==='check'&&q.tuned&&p.id==='hall'&&!q.heard.includes(q.beam)){q.heard.push(q.beam);q.reply=q.beam==='middle'?'불 들어왔어요. 제가 손으로 가릴게요. 지금요.':q.beam==='off'?'아직 어두워요. 불은 켜셨나요?':'여기는 불 안 들어와요. 옆 문인가 봐요. 왼쪽에서…… 제 목소리가 들리는데요.';q.feedback=q.beam==='middle'?'안쪽에서 빛을 가려 보겠다는 답이 온다. 손전등을 움직이지 않고 문 아래를 들여다본다.':'불이 들어오지 않는다는 답이 온다. 나래가 옆 문 아래를 가리킨다.';q.log.push(q.reply);return true;}
 return false;};
 const previousField=K.field,previousAct=K.fieldAct;
 K.field=r=>{const p=K.contact(r);return p?{...p,id:p.id}:previousField(r);};
 K.fieldAct=(r,action)=>{const p=K.contact(r);if(!p)return previousAct(r,action);const q=p.state;if(r.page<K.lines(r).length-1||q.committed||K.subjective(r)?.state==='pending')return false;
 if(p.id==='hall'){
 if(['left','middle','right','off'].includes(action)){if(q.beam===action)return false;q.beam=action;q.feedback=action==='off'?'손전등을 내린다. 복도 끝의 두드림이 다시 시작된다.':action==='middle'?'가운데 문 아래로 불빛을 밀어 넣는다. 문 안에서 무언가 움직인다.':'문틈으로 불을 비춘다. 왼쪽 문에서 아까와 같은 두드림이 난다.';if(['left','right'].includes(action)&&!q.errors.includes(action)){q.errors.push(action);r.erosion=Math.min(100,r.erosion+4);}return true;}
 if(action==='inspect'){q.inspected=true;if(q.beam==='middle'&&q.heard.includes('middle')){q.feedback='손전등은 켜져 있는데 문 아래 빛이 끊긴다. 다섯 손가락 그림자가 한 번 벌어졌다 오므라든다. 수신기에서 “다시 뗄게요”가 들리고 빛이 돌아온다.';q.committed=true;flag(r,'contactLocated');remember(r,'contactDoor',q.feedback);}else q.feedback='문 아래를 들여다본다. 안쪽에서 빛을 가리는 반응은 아직 없다. 수신기에는 통화 표시가 남아 있다.';return true;}}
 if(p.id==='rescue'){
 if(action==='handle'){if(q.errors.includes('handle'))return false;q.errors.push('handle');flag(r,'shelfScrape');r.erosion=Math.min(100,r.erosion+6);q.feedback='손잡이에 띠를 걸자 통이 옆으로 돌아간다. 문 가장자리에 손바닥이 쓸린다. 나래가 체중을 실어 문을 붙든다. “잠깐, 멈춰요.”';return true;}
 if(action==='body'){if(!q.anchor){q.feedback='몸통에는 띠를 걸 수 있지만 반대쪽을 묶을 자리가 보이지 않는다. 안쪽에서 통을 붙들고 있다.';return true;}q.secured=true;q.feedback='통 몸통을 감아 띠를 밀어 넣는다. 안쪽에서 기둥 뒤로 띠가 돌아 나온다. 당기자 통이 더 굴러오지 않는다.';return true;}
 if(action==='test'){if(!q.secured){q.feedback='문을 조금 움직이자 통이 다시 구른다. 나래가 문을 잡은 채 고개를 젓는다.';return true;}q.committed=true;flag(r,'loadSecured');flag(r,'liveRescue');remember(r,'loadAnchor','교신 상대가 뒤 기둥으로 띠를 돌려주었다. 몸통을 감아 고정한 뒤 문을 움직여도 통이 구르지 않았다.');return {route:'out'};}}
 return false;};
 K.subjective=r=>{if(!r||r.ending||r.explore)return null;r.subjective??=[];const old=r.subjective.find(x=>x.node===r.node);if(old)return old;if(r.erosion<35)return null;const important=['classroomHall','schoolPatrol','braceShelf','pumpSeaView','powerPanel','manifestPeople'].includes(r.node);if(!important||r.page<K.lines(r).length-1)return null;const entry={node:r.node,state:'pending'};r.subjective.push(entry);return entry;};
 K.resolveSubjective=(r,action)=>{const s=K.subjective(r);if(!s||s.state!=='pending'||!['ground','off','answer'].includes(action))return false;s.state=action;r.erosion=Math.max(0,Math.min(100,r.erosion+({ground:-3,off:-5,answer:8})[action]));if(action==='answer')flag(r,'voiceLeak');if(action==='off'){flag(r,'channelPaused');const p=K.contact(r);if(p)p.state.tuned=false;}return true;};
 const previousChoose=K.choose;K.resumeChosen=(r,m,id)=>{if(['door','waiting'].includes(r.node)&&id==='number')flag(r,'doorProof');if(r.node==='pumpSeaView'&&id==='seal')flag(r,'seaAligned');if(r.node==='classroomHall'&&id==='hinge')flag(r,'contactLocated');if(r.node==='braceShelf'&&id==='out')flag(r,'loadSecured');return previousChoose(r,m,id);};K.choose=(r,m,id)=>K.subjective(r)?.state==='pending'?false:previousChoose(r,m,id);
};
})(globalThis);
