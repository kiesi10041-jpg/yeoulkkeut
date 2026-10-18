/* Committed actions: physical evidence and the receiver may disagree. */
(function(root){
const D=root.YKData,N=D.nodes,W=root.YKWorld,S=(text,extra={})=>({who:'',text,...extra});
D.build='7.5.0';
N.schoolPatrol.lines=N.schoolPatrol.lines.filter(l=>!l.text.startsWith('명부의 아래 모서리'));
N.schoolPatrol.lines[4]=S('양호실 문틈에서 작은 종이가 나온다. “말하지 말고 보여 주세요.” 형체가 명부를 펼친다. 네 손에는 번호표가 있고, 바닥에는 명부에서 빠진 28번 종이가 놓여 있다.');
N.schoolHold.lines[1]=S('문 아래로 나온 손이 종이를 두드린다. 형체가 그쪽으로 고개를 돌린다. 종이가 다시 문 안으로 끌려 들어간다.');
N.schoolHold.lines[3]=S('너는 서진의 팔을 붙잡는다. 형체가 빈 세 칸을 내민다. 바닥의 종이는 아직 아무도 줍지 않았다.');
for(const id of ['schoolPatrol','schoolHold']){
 delete N[id].prop;N[id].signalCue='school';N[id].broadcast='출입표 세 장을 제출하십시오. 28번을 포함하십시오.';N[id].reception={clear:N[id].broadcast,broken:'출입표 세 장… 28번을 포함하십시오.'};
 const show=N[id].choices.find(c=>c.id==='show');show.unless='schoolMisfiled';
 N[id].choices.push({id:'misfile',label:'접수된 명부를 본다',to:'schoolMismatch',flag:'schoolMisfiled'});
}
const scene=(id,place,lines,choices)=>{N[id]={place,art:'school.webp',mood:'approach',creature:'school-warden.webp',encounter:{kind:'paper',figure:true,label:'제출한 번호가 명부에 남았다.'},lines,choices};W.regions[id]='school';};
scene('schoolMismatch','학교 · 한 칸 밀린 자리',[
 S('형체가 세 장을 꿰어 명부 안에 넣는다. 돌려받으려고 손을 뻗자 금속 자가 네 손등을 친다. 28번 옆에 젖은 도장이 찍힌다.'),
 S('문이 닫힌다. 유리 너머에서 나래가 손잡이를 누른다. 네 옆에 있던 자리는 비었다.',{if:'schoolMissing12'}),
 S('나래와 서진이 문 너머에서 돌아본다. 너도 문을 밀어 보지만 손잡이가 손을 통과한다. 유리에는 네 모습만 없다.',{if:'schoolMissing17'}),
 S('서진의 가방이 발치에 떨어진다. 유리 너머에서 서진이 문을 두드린다. 소리는 들리지 않는다.',{if:'schoolMissing23'}),
 S('28번이 적힌 칸 아래로 검은 물이 번진다. 손등에도 같은 자국이 올라온다. 너는 현관에 남겨 둔 원본을 돌아본다.'),
 S('명부 밑에서 쪽지가 나온다. “정정은 원본과 함께. 원본이 없으면 보증인 표를 남길 것.” 형체가 네 17번 번호표에 자를 댄다.')
],[{id:'retrieve',label:'현관 원본을 가지러 돌아간다',to:'schoolRetrieve'}, {id:'pledge',label:'내 17번 번호표를 보증으로 남긴다',to:'schoolPass',flags:['schoolMarked','schoolDebtResolved','schoolProof','patrolPassed'],erosion:18}]);
scene('schoolRetrieve','학교 · 정정 접수',[
 S('복도 끝까지 돌아가 현관 명부를 떼어 온다. 종이 뒷면에는 못에 걸렸던 구멍이 남아 있다. 형체는 원본을 받침대에 놓고 네가 낸 세 장을 옆에 펼친다.'),
 S('빠진 사람의 번호는 빈 줄에 눌려 있다. 형체가 취소 도장을 내민다. 어느 표를 빼야 할지 네가 짚어야 한다.'),
 S('유리 너머에서 손바닥이 움직인다. 너는 도장 손잡이를 잡는다.')
],[{id:'amend',label:'접수표 한 장을 취소한다',to:'schoolPass',puzzle:'schoolAmended',unless:'schoolCorrectionFailed',flags:['patrolPassed']},{id:'correctionFail',label:'명부에 남은 이름을 본다',to:'end:attendance',flag:'schoolCorrectionFailed'}]);
N.schoolPass.lines.forEach(l=>{if(!l.if)l.unless='schoolMisfiled';});
N.schoolPass.lines.unshift(S('취소선 아래에서 빠졌던 번호가 되살아난다. 문이 벌어지고, 떨어졌던 가방을 다시 집어 든다. 손등의 자국은 씻어도 지워지지 않는다.',{if:'schoolCorrected'}),S('형체가 네 번호표를 명부에 묶는다. 그제야 문이 열린다. 너는 빈 주머니를 더듬는다. 명부 안에서 17번 종이가 천천히 흔들린다.',{if:'schoolMarked'}));
N.schoolPass.lines.push(S('문 안쪽에서 붕대를 감은 손이 나온다. 종이가 젖는다며 끝을 들어 달라고 한다. 너는 한 손으로 종이를 올리고 다른 손으로 문을 받친다.',{if:'schoolMisfiled'}));
N.powerPanel.lines=[S('배전반의 두 손잡이에는 위쪽 비상등, 아래쪽 송신기라는 표지가 붙어 있다. 선은 덮개 뒤에서 서로 엇갈린다.'),{who:'도윤',text:'덮개부터 열어 봐요. 전원은 아직 내리지 말고요.'},{who:'나래',text:'내가 밖에서 볼게. 켜지면 말할게.'},{who:'윤서',text:'송신기 차단은 제가 잡고 있어요.'},S('수신기 표시등이 켜진다. 도윤이 손전등을 넘겨준다. 덮개의 나사는 이미 풀려 있다.')];
N.powerPanel.choices[0].label='배전반 덮개를 연다';N.powerPanel.choices[0].puzzle='circuitReady';N.powerPanel.choices[1].label='덮개를 열지 않고 상단을 켠다';
N.powerPanel.signalCue='circuit';N.powerPanel.broadcast='비상등 복구: 상단 스위치를 켜십시오.';N.powerPanel.reception={clear:N.powerPanel.broadcast,broken:'비상등 복구… 상단… 켜십시오.'};
N.powerPanel.questions[0].a='설비 등록표에는 상단이 비상등으로 기록되어 있습니다.';
N.archiveExit.signalCue='archive';
N.markedCrossing={place:'자료실 · 뒤늦은 호명',art:'archive.webp',mood:'approach',lines:[S('문턱을 넘자 수신기에 17번이 뜬다. 학교에서 맡긴 번호다. 주머니에는 돌려받은 표가 없다.'),{who:'수신기',text:'17번 보증인을 인계하십시오.'},S('작은 창 안에서 네 목소리가 대답한다. “네, 혼자 갑니다.” 나래가 네 손목을 잡는다.'),{who:'나래',text:'지금 한 말 아니지?'},S('네가 입을 열기도 전에 창 쪽에서 발소리가 난다. 너희와 같은 걸음 수다.')],choices:[{id:'hold',label:'나래 손을 잡고 모두 나갈 때까지 문을 받친다',to:'archiveOutside',flags:['schoolEchoHandled'],erosion:6},{id:'follow',label:'내 목소리가 난 창으로 간다',to:'archiveLoop',flags:['schoolEchoHandled'],erosion:12}]};W.regions.markedCrossing='archive';
const oldExtra=D.endingExtra;D.endingExtra=r=>[...(oldExtra?.(r)||[]),...(r.flags.includes('schoolMarked')&&r.ending==='together'?['육지에 닿아 주머니를 뒤진다. 학교에 두고 온 17번은 없다. 수신기를 끄고도 한동안 번호를 부르는 소리가 들린다.']:[])];
D.endingText=r=>r.flags.includes('schoolCorrectionFailed')&&r.ending==='attendance'?['취소 도장이 두 번째 표를 누른다. 빈 줄에 네 이름이 올라온다. 형체는 네가 말하기를 기다리지 않았다. 네가 지운 자리로 너를 옮겨 적었을 뿐이다.','문 너머에서 손이 유리를 두드린다. 이제는 네 쪽 소리가 건너가지 않는다.']:D.endings[r.ending].text;
const mount=root.mountGamePlay;
root.mountGamePlay=function(K){mount(K);const puzzle=K.puzzle,interact=K.interact,choose=K.choose;
 const add=(r,...f)=>{for(const v of f)if(!r.flags.includes(v))r.flags.push(v);},hurt=(r,v)=>r.erosion=Math.min(100,r.erosion+v);
 K.puzzle=r=>{if(r.node==='schoolRetrieve'){r.puzzles.school??={selected:[],attempts:0};return {id:'amend',state:r.puzzles.school};}if(r.node==='powerPanel'){r.puzzles.circuit??={selected:null};return {id:'circuit',state:r.puzzles.circuit};}return puzzle(r);};
 K.interact=(r,action,value)=>{
 if(r.ending||r.explore||r.page<K.lines(r).length-1)return false;
 const p=K.puzzle(r);if(!p)return false;const q=p.state;
 if(p.id==='school'){
  if(q.committed)return false;
  if(action!=='submit')return interact(r,action,value);
  if(q.selected.length!==3||new Set(q.selected).size!==3)return {ready:false};
  q.committed=true;q.attempts++;
  if([12,17,23].every(v=>q.selected.includes(v))){add(r,'schoolProof');return {ready:true};}
  add(r,'schoolMisfiled','schoolMissing'+[12,17,23].find(v=>!q.selected.includes(v)));hurt(r,12);return {ready:true,route:'misfile'};
 }
 if(p.id==='amend'){
  if(r.flags.includes('schoolCorrectionFailed')||r.flags.includes('schoolAmended'))return false;
  if(action==='toggle'&&[12,17,23,28].includes(Number(value))){q.withdraw=Number(value);return true;}
  if(action==='submit'){
   if(!q.withdraw)return {ready:false};
   if(q.withdraw===28){add(r,'schoolAmended','schoolCorrected','schoolDebtResolved','schoolProof');return {ready:true,route:'amend'};}
   q.correctionAttempts=(q.correctionAttempts||0)+1;hurt(r,8);q.feedback='도장을 찍은 칸이 빈다. 유리 너머 손이 더 멀어졌다. 형체가 도장을 한 번 더 네 앞으로 민다.';q.withdraw=null;
   if(q.correctionAttempts>=2){add(r,'schoolCorrectionFailed');return {ready:true,route:'correctionFail'};}return {ready:false};
  }return false;
 }
 if(p.id==='circuit'){
  if(q.committed)return false;
  if(action==='toggle'&&['upper','lower'].includes(value)){q.selected=value;return true;}
  if(action==='submit'&&q.selected){q.committed=true;add(r,'circuitReady');return {ready:true,route:q.selected};}return {ready:false};
 }
 return interact(r,action,value);
 };
 K.choose=(r,m,id)=>{if(r.node==='schoolRetrieve'&&r.flags.includes('schoolCorrectionFailed')&&id!=='correctionFail')return false;if(r.node==='powerPanel'&&r.puzzles.circuit?.committed)id=r.puzzles.circuit.selected;const from=r.node,ok=choose(r,m,id);if(ok&&from==='archiveExit'&&r.node==='archiveOutside'&&r.flags.includes('schoolMarked')&&!r.flags.includes('schoolEchoHandled')){r.node='markedCrossing';r.page=0;}return ok;};
 const present=W.present;W.present=(r,place)=>present(r,place).filter(n=>!r.flags.includes('schoolMisfiled')||r.flags.includes('schoolDebtResolved')||!((n==='나래'&&r.flags.includes('schoolMissing12'))||(n==='서진'&&r.flags.includes('schoolMissing23'))));
};
})(globalThis);
