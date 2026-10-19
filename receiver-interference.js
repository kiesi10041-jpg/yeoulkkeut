/* Optional, context-bound receiver interference. Never changes plot, evidence or erosion. */
(function(root){
const D=root.YKData,N=D.nodes;
const event=(id,nodes,text,extra={})=>({id,nodes:nodes.split(' '),text,...extra});
const events=[
 event('hatchLate','hatch','걸쇠를 풀지 마세요.'),
 event('hatchUseful','hatch','문밖 소리가 멎을 때까지 기다리세요.'),
 event('pierWait','closedPier','배가 보이면 타면 됩니다.'),
 event('pierUseful','closedPier','계단 아래는 아직 물속입니다.'),
 event('photoTime','familyPhoto','지금도 그 시각이야?'),
 event('photoVoice','familyPhoto','사진 뒤에는 쓰지 마세요.'),
 event('clinicCall','treatment clinicRadio','08번, 안에서 기다리세요.'),
 event('clinicUseful','treatment clinicRadio','다친 쪽 손은 쓰지 마세요.'),
 event('warehouseEmpty','haewonAccount pumpDrain','아직 한 사람 남아 있어요.'),
 event('warehouseUseful','haewonAccount pumpDrain','문 안을 한 번 더 비춰 보세요.'),
 event('lightEnough','lightCheck departureRecord','불이 켜졌으면 끝난 겁니다.'),
 event('lightEcho','lightCheck departureRecord','그 말, 당신이 먼저 했어요.'),
 event('tapeAlone','archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside','17번도 혼자 나갑니다.',{minErosion:40}),
 event('tapeUseful','archiveDesk archiveReply archiveMap archiveOutside','재생되는 쪽과 밖으로 나가는 쪽은 다릅니다.'),
 event('tapeListening','archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside','나는 아직 듣고 있어.'),
 event('naraLeave','quietShelter quietWalk naraAfterRest','다 두고 가도 됩니다.',{flag:'naraHurried'}),
 event('naraRest','quietShelter naraAfterRest','이제 안 잡고 있어도 돼.',{flag:'naraDisconnected'}),
 event('naraCounting','quietWalk naraAfterRest','한 명 빼고 세면 맞아요.',{flag:'naraDisconnected'}),
 event('manifestLate','harborReturn manifestDesk manifestPeople manifestSignal','한 줄만 지우면 빨리 나갈 수 있어요.'),
 event('manifestUseful','manifestDesk manifestPeople manifestSignal','번호가 없는 사람도 같은 배에 탑니다.',{flag:'haewonRescued'}),
 event('pierName','harborReturn manifestDesk manifestPeople manifestSignal','이름으로 불러도 될까요?'),
 event('genericQuestion','closedPier familyPhoto treatment clinicRadio lightCheck departureRecord archiveRoom archiveMap archiveOutside quietShelter naraAfterRest manifestDesk manifestSignal','아직 거기 있어?'),
 event('speakForYou','archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside quietShelter quietWalk naraAfterRest manifestDesk manifestSignal','17번은 동행을 원하지 않습니다.',{minErosion:65}),
 event('ownReply','archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside quietShelter quietWalk naraAfterRest manifestDesk manifestSignal','네. 그렇게 하겠습니다.',{minErosion:65}),
 event('memoryClaim','archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside quietShelter quietWalk naraAfterRest manifestDesk manifestSignal','당신이 부탁한 대로 했어요.',{minErosion:45}),
 event('carrierAir','hatch closedPier familyPhoto treatment clinicRadio haewonAccount pumpDrain lightCheck departureRecord archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside quietShelter quietWalk naraAfterRest harborReturn manifestDesk manifestPeople manifestSignal','문자 없이 표시등만 잠깐 켜졌다.',{kind:'carrier'}),
 event('carrierScratch','hatch closedPier familyPhoto treatment clinicRadio haewonAccount pumpDrain lightCheck departureRecord archiveRoom archiveLabel archiveDesk archiveReply archiveMap archiveOutside quietShelter quietWalk naraAfterRest harborReturn manifestDesk manifestPeople manifestSignal','빈 수신 칸에 짧은 선이 스쳤다.',{kind:'carrier'})
];
const byId=Object.fromEntries(events.map(e=>[e.id,e]));
function eligible(r){return !!r&&!r.ending&&!r.explore&&!r.flags.includes('channelPaused')&&r.flags.includes('doorPassed')&&!N[r.node].encounter&&events.some(e=>e.nodes.includes(r.node));}
const initial=()=>({checked:[],used:[],entries:[],chapterCounts:{},count:0,lastAt:0});
function state(r){return r.interference??=initial();}
function candidates(r){return events.filter(e=>e.nodes.includes(r.node)&&(!e.flag||r.flags.includes(e.flag))&&r.erosion>=(e.minErosion||0)&&!(r.interference?.used||[]).includes(e.id));}
function wait(r,now=Date.now()){return Math.max(0,Math.min(70000,70000-((now)-(r.interference?.lastAt||0))));}
function canSchedule(r){if(!eligible(r))return false;const q=r.interference;return !q||(!q.checked.includes(r.node)&&q.count<12&&(q.chapterCounts[r.chapterTitle||'night']||0)<2&&candidates(r).length>0);}
function attempt(r,{now=Date.now(),random=Math.random}={}){
 if(!canSchedule(r)||wait(r,now)>0)return null;
 const q=state(r);q.checked.push(r.node);
 if(random()>=.36)return null;
 const pool=candidates(r);if(!pool.length)return null;
 const pick=Math.min(pool.length-1,Math.floor(Math.max(0,random())*pool.length)),e=pool[pick];
 const entry={id:e.id,node:r.node,place:N[r.node].place,text:e.text,kind:e.kind||'text',erosion:r.erosion,at:now};
 q.used.push(e.id);q.entries.push(entry);q.entries=q.entries.slice(-6);q.count++;q.lastAt=now;const chapter=r.chapterTitle||'night';q.chapterCounts[chapter]=(q.chapterCounts[chapter]||0)+1;
 return entry;
}
root.validateInterference=r=>{
 const q=r.interference;if(q===undefined)return;
 const strings=a=>Array.isArray(a)&&a.every(v=>typeof v==='string');
 if(!q||typeof q!=='object'||Array.isArray(q)||!strings(q.checked)||q.checked.length>Object.keys(N).length||!q.checked.every(id=>N[id])||new Set(q.checked).size!==q.checked.length||!strings(q.used)||q.used.length>12||!q.used.every(id=>byId[id])||new Set(q.used).size!==q.used.length||!Array.isArray(q.entries)||q.entries.length>6||!Number.isInteger(q.count)||q.count<0||q.count>12||q.count!==q.used.length||!Number.isFinite(q.lastAt)||q.lastAt<0||!q.chapterCounts||typeof q.chapterCounts!=='object'||Array.isArray(q.chapterCounts)||Object.values(q.chapterCounts).some(v=>!Number.isInteger(v)||v<0||v>2)||Object.values(q.chapterCounts).reduce((a,b)=>a+b,0)!==q.count)throw Error('미확인 수신 기록이 올바르지 않습니다.');
 for(const e of q.entries)if(!e||!byId[e.id]||!q.used.includes(e.id)||!byId[e.id].nodes.includes(e.node)||e.text!==byId[e.id].text||!['text','carrier'].includes(e.kind)||e.kind!==(byId[e.id].kind||'text')||typeof e.place!=='string'||!Number.isFinite(e.erosion)||e.erosion<0||e.erosion>100||e.erosion<(byId[e.id].minErosion||0)||!Number.isFinite(e.at)||e.at<0)throw Error('미확인 수신 내용이 올바르지 않습니다.');
};
const mount=root.mountGamePlay;root.mountGamePlay=K=>{mount(K);K.interference={eligible,canSchedule,wait,attempt,entries:r=>(r?.interference?.entries||[]).slice().reverse()};};
D.build='7.4.0';
})(globalThis);
