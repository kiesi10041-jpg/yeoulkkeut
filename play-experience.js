(function(root){
const D=root.YKData,N=D.nodes;
N.schoolPatrol.lines.push({who:'',text:'명부의 아래 모서리에서 종이 한 장이 빠진다. 28번이다. 현관에서 남긴 사본에는 없던 숫자다. 너는 지닌 번호표와 떨어진 종이를 함께 펼친다.'});
N.schoolPatrol.choices.find(c=>c.id==='show').puzzle='schoolProof';
N.schoolHold.choices.find(c=>c.id==='show').puzzle='schoolProof';
N.schoolPatrol.choices.find(c=>c.id==='show').label='번호표와 명부를 펼친다';N.schoolHold.choices[0].label='번호표와 명부를 펼친다';
N.storeLevel.choices.find(c=>c.id==='gray').puzzle='pressureReady';N.storeLevel.choices.find(c=>c.id==='gray').label='배수관과 수위를 직접 살핀다';
N.boardingPlan.choices.find(c=>c.id==='declare').puzzle='handoffReady';N.boardingPlan.choices.find(c=>c.id==='declare').label='도착지에 보낼 인계서를 작성한다';
N.rescueHaewon.lines[0]={who:'',text:'창고 안과 바깥의 물높이가 나란해졌다. 회색 마개를 다시 잠근 뒤 도윤이 손잡이를 천천히 움직인다. 아까처럼 문을 밀어 내는 물은 없다. 서진이 안쪽의 발 디딜 곳부터 확인한다.'};
N.bolt.lines[2].text='실례지만 누구세요?';N.bolt.lines[3].text='나래예요. 여기 방송실에서 일했어요. 불이 켜지길래 누가 계신 줄 알았어요.';
for(const l of N.closedPier.lines)if(l.who==='나'&&l.text==='돌아가는 길은 없어?')l.text='돌아가는 길은 없어요?';for(const l of N.squareArrival.lines)if(l.who==='나'&&l.text==='어느 쪽이 학교야?')l.text='어느 쪽이 학교예요?';
N.nara.lines.push({who:'나래',text:'혹시 제가 멍하니 있으면, 책상 두 번만 두드려 주세요. 방송실에서 이어폰 끼고 일할 때 그렇게 불렀거든요.'},{who:'나',text:'두 번이요? 알겠어요.'});
N.naraConfession.lines.push({who:'나래',text:'아까 부탁한 거 기억하지? 두 번. 말이 안 들려도 그건 알아들을 것 같아.'});
N.outerCheck.lines.splice(-1,0,{who:'',text:'선실 창에 나래의 손이 비친다. 손끝은 움직이지 않는다. 너는 대합실 책상 앞에서 들었던 부탁을 떠올린다.'});
N.outerCheck.choices.unshift({id:'tap',label:'난간을 두 번 두드리고 나래를 기다린다',to:'outerCheck',unless:'twoTaps',flags:['twoTaps']});
N.outerCheck.revisitLines=[{who:'',text:'난간을 두 번 두드린다. 나래가 고개를 든다. 바로 말을 잇지 않고, 내가 보고 있는 창 쪽을 함께 본다.'},{who:'나래',text:'응. 여기 있어.'},{who:'',text:'나래가 난간을 두 번 두드려 돌려준다. 선장은 그 소리가 끝난 뒤 밧줄을 집어 든다.'}];
N.storeLevel.lines[4]={who:'',text:'아이가 가방 끈을 풀고 선반에 오른다. 문 양옆의 수위 자국은 높이가 다르다. 회색 관은 창고에서 얕은 배수구 쪽으로 내려가고, 빨간 손잡이 뒤의 굵은 관은 바다 쪽으로 이어진다.'};
N.storeLevel.lines[5]={who:'도윤',text:'두 관이 어디로 가는지 먼저 봐요. 저는 이쪽 문 잡고 있을게요.'};
N.storeLevel.lines[N.storeLevel.lines.length-1]={who:'',text:'환기구 너머에서 두 번 두드리는 소리가 난다. 해원은 선반 위를 가리킨다. 문 아래로 새는 물은 아직 세다.'};
D.endings.together.text=[
'배가 부두를 밀어낸다. 서진은 해원의 젖은 신발을 벗겨 옆에 놓고, 도윤은 다친 손이 흔들리지 않게 의자에 몸을 기댄다. 선장은 인계서를 운전석 옆에 끼워 둔다. 나래가 앉을 뒤칸도 비워 두었다.',
'나래는 닫힌 수신기를 한 번 보고 창밖으로 눈을 돌린다. “우리가 나가면, 여긴 누가 남아?” 너는 바로 대답하지 못한다. 마을의 불빛은 아직 보인다. 너희가 적어 둔 종이와 윤서에게 남긴 연락도 그곳에 있다.',
'육지에 닿자 담당자가 나래에게 혼자 걸을 수 있는지 묻는다. 내가 입을 열기 전에 나래가 대답한다. “천천히 가면 돼요.” 나는 옆에서 보폭을 맞춘다. 멀리 스피커가 보이지만, 지금은 사람마다 다른 목소리가 들린다.'
];
D.endings.together.memoryArt='ending-two-taps.webp';
D.endingExtra=r=>!r.flags.includes('twoTaps')?[]:r.ending==='together'?['배가 움직이자 나래가 네 옆 난간을 두 번 두드린다. 대합실에서 배운 작은 신호다. 이번에는 네가 고개를 들고 대답한다. “응. 여기 있어.”']:[];
D.build='7.0.0';
function mount(K){
 function puzzle(r){r.puzzles??={};const id=['schoolPatrol','schoolHold'].includes(r.node)?'school':r.node==='storeLevel'?'water':r.node==='boardingPlan'?'handoff':null;if(!id)return null;r.puzzles[id]??=id==='school'?{selected:[],attempts:0}:id==='water'?{inside:3,outside:1,open:false}:{};return {id,state:r.puzzles[id]};}
 function interact(r,action,value){if(r.ending||r.explore)return false;const p=puzzle(r);if(!p)return false;const q=p.state;
 if(p.id==='school'){if(action==='toggle'&&[12,17,23,28].includes(Number(value))){const v=Number(value);q.selected=q.selected.includes(v)?q.selected.filter(x=>x!==v):q.selected.length<3?[...q.selected,v]:q.selected;return true;}if(action==='submit'){q.attempts++;const ok=q.selected.length===3&&[12,17,23].every(v=>q.selected.includes(v));q.feedback=ok?'형체가 종을 내리고 문 옆으로 물러선다.':'형체의 손끝이 종이 위 세 칸을 천천히 짚는다. 종소리는 멎지 않는다.';if(ok&&!r.flags.includes('schoolProof'))r.flags.push('schoolProof');return {ready:ok};}}
 if(p.id==='water'){if(action==='open'&&!q.open){q.open=true;q.inside=Math.max(q.outside,q.inside-1);return true;}if(action==='watch'&&q.open){q.inside=Math.max(q.outside,q.inside-1);return true;}if(action==='close'&&q.open){q.open=false;return true;}if(action==='submit'){const ok=q.inside===q.outside&&!q.open;q.feedback=ok?'문 아래로 밀려 나오던 물이 잦아든다. 도윤이 손잡이를 천천히 움직인다.':q.open?'작은 관으로 물이 흐르고 있다. 마개를 연 채 문을 당길 수는 없다.':'손잡이는 아직 무겁다. 문 양쪽의 수위 자국이 다르다.';if(ok&&!r.flags.includes('pressureReady'))r.flags.push('pressureReady');return {ready:ok};}}
 if(p.id==='handoff'){const allowed={incident:['yes','no'],current:['steady','uncertain'],line:['off','unknown']};if(action==='set'&&value&&allowed[value.key]?.includes(value.value)){q[value.key]=value.value;return true;}if(action==='submit'){if(!Object.keys(allowed).every(k=>allowed[k].includes(q[k])))return {ready:false};const expected={incident:'yes',current:r.flags.includes('naraStabilized')?'steady':'uncertain',line:r.flags.includes('outsideIsolated')&&r.flags.includes('archiveIsolated')?'off':'unknown'};const honest=Object.keys(expected).every(k=>q[k]===expected[k]);r.handoffDraft={...q};if(honest&&!r.flags.includes('handoffReady'))r.flags.push('handoffReady');return {ready:true,route:honest?'declare':'bypass'};}}
 return false;
 }
 K.puzzle=puzzle;K.interact=interact;
}
root.mountGamePlay=mount;if(typeof module!=='undefined')module.exports=mount;
})(globalThis);
