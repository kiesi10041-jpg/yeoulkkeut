/* 8.5 — review-driven continuity and hands-on original-input revision. */
(function(root){
'use strict';
const D=root.YKData,N=D.nodes,E=D.endings,W=root.YKWorld;
D.build='8.5.0-revision';
const set=(id,i,text)=>{N[id].lines[i].text=text;};
// Silent submission never creates a spoken voice record.
N.passed.lines[0]={who:'',text:'번호표를 문틈에 대자 접수판이 움직인다. 밀려 나온 접수증에는 17이 찍혀 있다. 손이 문밖으로 빠진 뒤 나래가 문을 연다.',unless:'voiceTaken'};
N.passed.lines.splice(1,0,{who:'',text:'“17번입니다.” 내가 대답하자 접수판이 움직인다. 접수증에 17이 찍힌다. 손이 빠진 뒤 나래가 문을 연다.',if:'voiceTaken'});
set('shelfSlip',0,'문을 밀자 선반 모서리가 내려앉는다. 금속 통이 굴러온다. 안쪽 남자가 숨을 삼키며 몸을 뒤로 뺀다. 통이 문틈에 걸렸다. 손잡이는 더 움직이지 않는다.');
set('shelfSlip',3,'나래가 문을 붙든다. 서진이 복도 벽에 기대 있던 접이식 의자를 가져와 편다. 부러진 지지대는 문 바로 안쪽에 있다. 의자를 그 밑에 넣을지, 문을 더 밀지 아직 정하지 못했다.');
set('shelfSlip',4,'통이 다시 움직여요. 문부터 잡아 주세요. 손 뺄 틈이 아직 안 나요.');
N.shelfSlip.choices.find(c=>c.id==='brace').label='의자를 지지대 아래에 넣고 통을 고정한다';
N.shelfSlip.choices.find(c=>c.id==='force').label='문을 더 밀어 통이 빠질 틈을 만든다';
set('pumpDrain',0,'압력계 바늘이 낮은 쪽으로 움직인다. 도윤이 펌프 스위치 덮개를 열고, 오른손으로 누를 곳을 가리킨다.');
set('pumpDrain',2,'창고 바닥의 물이 얕아진다. 물에 잠겼던 가방 끈이 드러난다. 해원이 다가가려 하자 서진이 손을 잡는다. 아직 배수구로 물이 흐른다.');
set('pumpDrain',4,'물 멎으면 같이 가지러 가자. 끈 보이니까 찾을 수 있겠네.');
set('pumpDrain',7,'물 빠지는 동안 해도 돼요. 펌프는 여기서 멈추면 되고요. 공구 가방 좀 부탁드릴게요.');
set('archiveCable',4,'검은 출력선 두 가닥에 표시 테이프를 붙인다. 전원선에는 표시하지 않는다. 도윤이 접속함을 잡아 주는 동안 연결된 단자의 모양을 종이에 옮긴다. 선은 아직 꽂혀 있다.');
set('archiveCable',6,'수호가 명찰 끈을 풀어 손에 쥔다. 분리한 선에 달아 두겠다고 한다. 해원은 메모를 받아 자기 가방에 넣는다.');
set('archivePlayback',0,'외부 출력선 두 가닥을 뽑는다. 분리 사유를 적은 종이와 수호의 명찰을 선에 묶은 뒤 방 안의 작은 스피커만 켠다. “45번은 혼자 대피합니다.” 같은 문장이 숨 쉬는 틈도 없이 반복된다.');
set('archivePlayback',3,'방송실에서도 그랬어. 문장이 끝날 때까지 마이크를 못 놓겠더라. 끄고 나서야 내가 왜 그러고 있나 했어.');
set('archiveLabel',4,'제 번호도 맞았어요. 23번이면 동생을 찾을 수 있다는 말을 믿었죠. 번호가 맞는다고 뒤의 말까지 맞는 건 아니었는데.');
set('archiveReply',1,'수호가 방금 남긴 문장을 재생한다. “저 혼자 남겠다고 한 적 없어요.” 그 말을 적고 밑줄을 긋는다. 도윤이 빠져 있는 외부 출력선을 확인한다.');
set('archiveReply',5,'수호가 가방에서 지도를 꺼낸다. 나래가 시장 천막 이야기를 하자 펼치던 손을 멈춘다. “어느 쪽 천막이요?”');
D.relayOriginal='부두 계단 침수. 이동 안내 보류. 배수 요청 전달';
set('relayInput',0,'41번 요청 원본에는 “'+D.relayOriginal+'”이라고 적혀 있다. 서명은 선장의 번호다. 이동 보류라는 말에 지운 흔적은 없다.');
const relayFact='41번 원본: “'+D.relayOriginal+'”. 출력에서 “침수”와 “이동 안내 보류”가 빠졌다. 42번은 작업 기록 없이 완료로 찍혔다.';
set('relayCompare',0,'41번 원본을 출력 옆에 놓는다. “'+D.relayOriginal+'”. 출력은 계단으로 이동하라는 말뿐이다. 42번 배수 요청에는 작업 기록 없이 완료 도장만 찍혔다.');
N.relayCompare.lines[0].observation.text=relayFact;D.observationDefinitions.relay.text=relayFact;
set('relayCompare',1,'이동 보류가 빠졌네요. 배수해 달라는 걸 벌써 끝났다고 찍었고요.');
set('schoolPass',2,'형체가 내민 종이에 구멍 셋을 뚫는다. 번호가 적힌 윗부분은 뜯어 명부에 묶고, 구멍 난 아래쪽은 문턱에 놓는다. 종소리가 교실 안으로 멀어진다.');
set('schoolPass',3,'아래쪽은 돌려주네요. 그거 챙기고 가죠.');
set('schoolPass',8,'서진이 돌려받은 출입 확인 조각을 접어 챙긴다. 제출한 번호 부분은 형체의 명부에 남았다. 교실 안에서는 아직 종이 울린다.');
N.schoolPass.lines[8].unless='schoolMarked';
// The player is still trapped when the escape choice appears.
set('marketTrap',2,'서진이 해원을 뒤로 물린다. 도윤이 건넨 판자를 나래가 발뒤꿈치 쪽에 댄다. 상자는 계속 기울고 있다. 앞쪽 천 사이에는 밝은 틈이 보인다.');
set('marketTrap',4,'손 뻗어 봐. 여기서 잡아 줄게.');
set('marketTrap',5,'뒤꿈치에 판자 끝이 닿는다. 앞의 밝은 틈은 몸 하나가 지나갈 만큼 넓다. 어깨에 붙은 천이 숨을 들이쉴 때마다 따라 움직인다.');
N.marketTrap.choices.find(c=>c.id==='safe').label='뒤의 판자를 딛고 나래의 손을 잡는다';
N.marketTrap.choices.find(c=>c.id==='inside').label='앞쪽 밝은 틈으로 몸을 밀어 넣는다';
N.marketCross.lines.unshift({who:'',text:'판자를 딛고 뒤로 빠져나온다. 나래가 손을 놓은 뒤에도 소매의 흰 자국이 남아 있다.',if:'marketSlip'});
N.nara.choices.find(c=>c.id==='paper').label='같이 가기로 하고 점검표를 펼친다';
N.nara.choices.find(c=>c.id==='radio').label='함께 출발하기 전에 수신기로 밖을 묻는다';
const present=W.present;W.present=(r,p)=>present(r,p).filter(x=>(x!=='나래'||r.node!=='nara'||r.flags.includes('naraAgreed'))&&(x!=='도윤'||r.node!=='doyunStory'||(root.YK?.lines(r)||[]).slice(0,r.page+1).some(l=>l.who==='도윤'&&l.text.includes('도윤입니다'))));
// A false clinical call leaves an injury to treat instead of an NPC undoing the choice.
set('clinicCall',4,'카트가 문 쪽으로 굴러온다. 거즈 대신 이름표가 실려 있다. 문고리를 놓으려는데 손바닥이 달라붙는다. 서진이 도윤의 팔을 잡는다.');
set('clinicCall',6,'전원선 빠져 있어. 저 숫자 누가 켠 거야?');
set('clinicCall',7,'손바닥을 떼자 피부가 따갑다. 문고리에 묻은 검은 가루가 손금에 남는다. 문밖 배달함에는 물과 거즈가 보인다.');
N.clinicCall.choices[0].label='손을 씻을 물과 거즈를 배달함에서 꺼낸다';N.clinicCall.choices[0].erosion=6;
N.treatment.lines.push({who:'',text:'진료소 문고리에 붙었던 손을 물로 씻는다. 손금의 검은 가루는 닦였지만 벌겋게 벗겨진 자리는 거즈로 덮는다. 수신기를 쥘 때마다 쓰리다.',if:'falseClinicCall'});
// Short recovery scenes keep the concrete clue, introductions and consent.
N.doyunStory.lines=[N.doyunStory.lines[0],N.doyunStory.lines[1],
 {who:'도윤',text:'도윤입니다. 부두 설비 보다가 학교 전원 확인하러 왔어요. 손이 이래서…… 공구 가방 좀 들어 주실래요?'},
 {who:'서진',text:'아까 그 노란 우비 입은 애요. 어디로 갔어요?'},
 {who:'도윤',text:'약 놓고 측면 현관으로 나갔어요. 부족한 약은 진료소에서 받는다고 했고요. 저도 거기서 붕대 좀 구해야겠어요.'},
 {who:'',text:'도윤이 배달표를 내민다. “진료소 이동 예정.” 도착 확인 칸은 비어 있다. 서진이 사진 뒤의 시각과 나란히 놓고 접어 챙긴다.'},
 {who:'나',text:'진료소까지 같이 가요. 손잡이 돌리는 건 제가 할게요.'},
 {who:'나래',text:'우리 이제 계속 같이 다닐 것 같은데, 말 편하게 해도 돼요?'},
 {who:'나',text:'네. 저도요.'},
 {who:'나래',text:'응. 그럼 내가 뒤에서 따라오는지 볼게.'}
];
N.haewonAccount.lines=[N.haewonAccount.lines[0],N.haewonAccount.lines[2],
 {who:'해원',text:'안에 있으면 방송 안 들린댔어요. 조용하긴 했는데…… 문을 안 열어 줬어요.'},
 N.haewonAccount.lines[3],
 {who:'도윤',text:'창고에 차음재가 있어요. 문 닫으면 밖의 소리는 안 들리죠.'},
 {who:'해원',text:'나올 때 무릎 부딪혔어요.'},
 {who:'',text:'서진이 해원의 바짓단을 걷어 상처를 본다. 아이는 서진 소매를 잡은 채 조작실로 따라온다.'},
 N.haewonAccount.lines[12]
];
set('naraConnection',4,'두 기기를 잇는 선을 집어 든다. 녹음기의 불빛이 깜박일 때 나래의 입술도 움직인다. 도윤이 접속부를 잡아 준다. 아직 선은 연결돼 있다.');
delete N.naraConnection.lines[4].observation;delete N.naraConnection.lines[4].beat;
set('naraConnection',6,'시장 밖. 그런데 자꾸 대기 인원이라고 말하게 돼. 내가 왜 이러지.');
N.naraConnection.lines=N.naraConnection.lines.filter(l=>!['pausedForNara','naraHurried'].includes(l.if));
N.naraConnection.choices.find(c=>c.id==='rest').label='연결을 끊고 바람을 피할 곳에서 쉰다';
E.alone.lead='다음 회차에는 중계실에서 항구 공용 안내 출력을 먼저 추적할 수 있다. 연결을 분리한 뒤 나래가 말하는 순서를 비교해 보자.';
E.attendance.text[0]='찾는 아이의 이름을 말하는 순간 복도 스피커가 마지막 음절을 이어 읽는다. 명부에는 그 아이가 아니라 말한 사람의 번호, 17이 찍힌다. 서진이 붙잡은 내 팔에서 감각이 빠져나간다.';
E.attendance.cause='이름을 말한 내 번호 17이 명부의 빈자리에 등록됐다.';
// Source investigation: a concrete recording fault with a testable, limited resolution.
N.sourceApproach.lines=[
 {who:'',text:'덮개 안에는 녹음 원본과 자동 안내 출력이 따로 있다. 원본 묶음의 첫 기록은 04:17. 선장이 남긴 이동 보류 요청이다. 그 뒤 입력은 비어 있는데 출력 기록만 계속 늘어났다.'},
 {who:'나래',text:'04시 17분에 멈춘 건 시계가 아니라 이쪽 기록이었네.'},
 {who:'',text:'원본은 문장 끝까지 재생된다. 옆 출력 기록에서는 보류가 빠진 자리를 접수 완료 신호가 메운다. 새로 대답할 때마다 그 목소리도 출력 묶음에 붙어 있다.'},
 {who:'나',text:'우리가 대답하면 확인했다고 남긴 거야. 이름을 왜 묻는지도……'},
 {who:'나래',text:'내가 맡겠다고 한 적 없는 방송도 내 목소리였어.'},
 {who:'',text:'안쪽 호출 단자는 학교 양호실로, 굵은 출력 단자는 마을 스피커로 이어진다. 두 선은 아직 연결돼 있다. 작은 시험 버튼 아래에는 외부 출력에 주의하라는 낡은 표지가 남아 있다.'}
];
N.sourceSocket.lines=[
 {who:'',text:'덮개 안에 원본 요청과 자동 출력이 나란히 걸려 있다. 전등 전원은 다른 쪽이다. 호출선만 따로 시험할 수 있다.'},
 {who:'나래',text:'학교 문 아직 닫혀 있을까. 안쪽 사람한테 직접 물어보자.'},
 {who:'',text:'41번 원본: “'+D.relayOriginal+'”. 자동 출력: “부두 계단으로 이동하십시오.”'},
 {who:'나',text:'시험할 문장하고 보낼 선을 먼저 골라야겠어.'}
];
N.sourceSocket.choices.find(c=>c.id==='record').label='시험한 원본과 지금 확인한 내용을 남긴다';
E.anchor.text=[
 '굵은 출력선을 뽑은 자리에 묶어 두고, 학교 호출선에 새 기록을 보낸다. “17번입니다. 부두 계단은 물이 빠졌습니다. 학교 쪽 문은 열렸나요?”',
 '“양호실 문 열렸어요. 안에 한 분 더 있어요.” 잠깐 뒤 문이 열리는 소리가 난다. 스피커에서 하던 말이 아니라, 방금 한 질문의 답이다. 나래가 들은 시각과 장소를 적는다.',
 '처음 입력된 04:17 요청은 지우지 않는다. 보류가 사라진 출력도 옆에 남긴다. 무엇이 말을 바꿨는지는 아직 모르지만, 이 목소리들을 동의의 증거로 넘기지는 않을 수 있다. 나래가 녹음을 멈춘다. 이번에는 손이 바로 떨어진다.'
];
E.anchor.lead='원본·출력 대조와 학교의 응답을 남겼다. 다음 회차에는 마지막 조사에서 장소별 호출 기록을 따로 남길 수 있다.';
E.shared.lead='중계실에서 분리한 출력과 별개로 계단 아래 입력함에 불이 남아 있었다. 원본 입력 경로를 확인하려면 먼저 회선을 조사해야 한다.';
E.registered.text[2]='번호표 뒷면이 젖는다. 비어 있던 종이에서 새 글씨가 배어 나온다. “내일이라고 하면 날짜를 물어봐.” 달력을 한 장 더 뜯어도 날짜는 바뀌지 않는다.';
E.called.text[2]='문 너머에서 내 목소리가 대답한다. “여기 있어요.” 입술을 꽉 다물어도 멎지 않는다. 나래가 나를 보다가 문밖을 돌아본다. 문고리가 안쪽으로 돌아간다.';
E.attendance.text[0]='내 이름의 마지막 음절을 복도 스피커가 이어 읽는다. 명부의 빈 줄에 17이 찍힌다. 서진이 붙잡은 팔에서 감각이 빠져나간다.';
E.attendance.text[1]='빈 의자 하나가 나를 향해 돌아선다. 한 걸음 물러서려는데 발이 의자 쪽으로 간다. 나래가 17번 표를 흔들어도 형체는 종이 대신 내 얼굴 자리를 짚는다. 내 이름만 출석으로 남았다.';
E.collapse.text[1]='도윤을 불러도 답이 없다. 서진이 빗자루를 밀어 넣지만 통에 막힌다. 꺼내 둔 의자는 부러진 지지대에 닿지 못한 채 문 앞에 놓여 있다.';
E.rushed.art='ending-handoff.webp';
N.boardingPlan.choices.find(c=>c.id==='bypass').label='일반 접수로 바꿔 이상 없음에 서명하고 출항한다';
E.carry.text[0]='일반 접수로 바꾸자 뒤칸 분리 대기는 취소된다. 나래도 일행과 함께 내린다. “이상 없음.” 내가 서명한 종이를 받은 담당자가 무전기로 대기 차량을 부른다.';
E.called.cause='문 앞에서 이름을 말했고, 문밖에 같은 목소리가 남았다.';
E.registered.cause='날짜를 확인하지 않은 채 다음 배 접수를 기다렸다.';
E.alone.cause='연락처를 남기고 나래보다 먼저 떠났다.';
E.shared.cause='나래와 계단에 남아 다음 배를 기다리기로 했다.';
E.carry.cause='증상이나 남은 신호를 인계하지 못한 채 육지에 닿았다.';
E.anchor.cause='원본과 출력을 대조하고 호출선을 시험한 뒤 기록을 남겼다.';
E.together.cause='증상을 숨기지 않고 배치·연결·인계 응답을 확인했다.';
E.rushed.cause='함께 탈출했지만 노출 이력을 일반 접수에 남기지 않았다.';
E.attendance.cause='학교의 빈 명부에 내 이름으로 응답했다.';
E.collapse.cause='받침을 넣기 전에 문을 더 밀어 선반이 무너졌다.';
E.flood.cause='물의 유입을 막지 못해 학교 쪽 배관과 돌아갈 계단이 침수됐다.';
E.fold.cause='뒤의 판자 대신 천 안쪽 밝은 틈으로 들어갔다.';
N.sourceSocket.choices.find(c=>c.id==='stop').flags=['sourceStopped','originIsolated'];
D.endingCause=r=>r.ending==='attendance'&&r.flags.includes('schoolCorrectionFailed')?'명부 정정을 두 번 실패했고 형체가 17번을 대기자로 옮겼다.':r.ending==='rushed'&&r.trail.some(t=>t.node==='crossingIncident'&&t.id==='pushOn')?'승선 중 자리가 어긋났는데도 멈추지 않고 출항했다.':r.ending==='shared'&&r.flags.includes('sourceStopped')?'원본 시험을 중단하고 공용 출력을 분리한 채 나래와 남았다.':r.ending==='carry'&&r.flags.includes('selfSignalLeaked')?'내 목소리가 겹치는데도 신호를 가두지 못한 채 출항했다.':E[r.ending].cause;
D.observationDefinitions.origin={id:'origin',title:'04:17 원본과 학교의 직접 응답',place:N.sourceSocket.place,text:''};
// Narrator person is consistent; quoted characters can still address one another as 너.
function firstPerson(text){let quote=false;return text.split(/([“”])/).map(s=>{if(s==='“'){quote=true;return s;}if(s==='”'){quote=false;return s;}return quote?s:s.replace(/너희/g,'일행').replace(/너는/g,'나는').replace(/너를/g,'나를').replace(/너와/g,'나와').replace(/너에게|네게/g,'내게').replace(/네가/g,'내가').replace(/네(?=\s)/g,'내').replace(/너(?=[, .!?]|$)/g,'나');}).join('');}
for(const n of Object.values(N)){for(const a of [n.lines,n.revisitLines])for(const l of a||[])if(!l.who)l.text=firstPerson(l.text);}
for(const e of Object.values(E))e.text=e.text.map(firstPerson);
const endingText=D.endingText;D.endingText=r=>{let text;
if(r.ending==='attendance'&&r.flags.includes('schoolCorrectionFailed'))text=['취소 도장이 두 번째 표를 누른다. 빈 줄에 17번이 찍힌다. 형체는 내가 대답하기도 전에 지운 자리로 내 번호를 옮긴다.','문 너머에서 손이 유리를 두드린다. 두드려 돌려주지만 소리는 건너가지 않는다.'];
else if(r.ending==='rushed'&&r.trail.some(t=>t.node==='crossingIncident'&&t.id==='pushOn'))text=[
 '선장이 밧줄을 푼다. '+(r.flags.includes('doyunStairs')?'도윤이 높은 발판에서 내려오다 주저앉는다. 다친 손의 붕대가 풀렸다. ':'')+(r.flags.includes('childSeparated')?'해원이 닫힌 칸의 문을 두드린다. 서진이 흔들리는 통로를 건너 아이를 안는다. 가방 하나가 부두에 남았다.':'서진이 해원의 손을 잡고 낮은 의자 옆으로 비킨다.'),
 '육지에 닿아 '+(r.flags.includes('doyunStairs')?'도윤의 손을 먼저 치료해 달라고 한다.':'해원과 떨어졌던 경위를 먼저 설명한다.')+' 모두 내렸지만 배가 움직이기 전 멈출 수 있었던 순간이 자꾸 떠오른다.'
];
else if(r.ending==='shared'&&r.flags.includes('sourceStopped'))text=['굵은 공용 출력선을 뽑아 고정하고 입력함 덮개를 닫는다. 새 녹음은 남기지 않았다. 나래와 계단에 돌아오니 배가 떠난 자리에 물결만 남았다.',...E.shared.text.slice(1)];
else text=r.ending==='anchor'?(r.flags.includes('privateOriginRecord')?[E.anchor.text[0],'학교와 창고의 호출 기록을 따로 남긴다. 한 곳의 대답을 마을 전체의 동의로 묶지 않는다. 학교에서는 문이 열렸다고, 창고에서는 대기 인원이 없다고 각각 응답한다.',E.anchor.text[2]]:E.anchor.text):endingText(r);return text.map(firstPerson);};
const endingExtra=D.endingExtra;D.endingExtra=r=>(endingExtra(r)||[]).map(firstPerson);
const mount=root.mountGamePlay;
root.mountGamePlay=K=>{mount(K);
const emptyMeta=K.emptyMeta;K.emptyMeta=()=>({...emptyMeta(),endRecords:{}});
const validateMeta=K.validateMeta;K.validateMeta=m=>{const out=validateMeta(m);m.endRecords??={};const arts=new Set(Object.values(E).flatMap(e=>[e.art,e.memoryArt].filter(Boolean)));if(!m.endRecords||typeof m.endRecords!=='object'||Array.isArray(m.endRecords)||Object.entries(m.endRecords).some(([id,x])=>!Object.hasOwn(E,id)||!m.ends.includes(id)||!x||!Array.isArray(x.text)||x.text.length>30||x.text.some(t=>typeof t!=='string'||t.length>4000)||typeof x.cause!=='string'||x.cause.length>1000||!arts.has(x.art)))throw Error('결말 기록의 형식이 올바르지 않습니다.');return out;};
const add=(r,f)=>{if(!r.flags.includes(f))r.flags.push(f);};
K.naraState=r=>r.node==='naraConnection'&&!r.ending?{tapped:r.flags.includes('naraTapped'),removed:r.flags.includes('naraCableRemoved')||r.flags.includes('naraDisconnected')}:null;
K.naraReply=r=>!K.naraState(r)?.removed?'':r.flags.includes('naraHurried')?'아까 팔 당겼을 때…… 네가 누군지도 잠깐 몰랐어. 다음엔 먼저 불러 줘.':r.flags.includes('pausedForNara')?'기다려 줬네. 내가 멈춘 줄도 몰랐는데.':'지금은 안 들려.';
K.naraAct=(r,action)=>{const q=K.naraState(r);if(!q||r.page<K.lines(r).length-1||q.removed)return false;
if(action==='tap'){if(q.tapped)return false;add(r,'naraTapped');return true;}
if(action!=='unplug')return false;add(r,'naraCableRemoved');r.observations??=[];if(!r.observations.some(x=>x.id==='disconnect'))r.observations.push({...D.observationDefinitions.disconnect,text:'짧은 연결선을 직접 빼자 나래의 발화가 멎었다. '+(q.tapped?'두 번 두드렸을 때는 잠깐 시선만 돌아왔다. ':'')+'손목의 선은 남았다.'});return true;};
const fieldAct=K.fieldAct;K.fieldAct=(r,a)=>{const out=fieldAct(r,a);const q=r.fieldState?.sea;if(out&&r.node==='pumpSeaView'&&a==='open'&&q&&!q.committed)q.feedback=q.wrong===1?'물살이 발목을 친다. 도윤이 계단 한 칸 위로 물러난다. 배관 소리가 커졌다.':'물이 두 번째 발판을 덮는다. 학교 쪽 관 이음매에서 물줄기가 샌다. 도윤이 난간을 붙잡는다.';return out;};
K.origin=r=>r.node==='sourceSocket'&&!r.ending?{input:r.flags.includes('originHold')?'hold':r.flags.includes('originMove')?'move':null,line:r.flags.includes('originLocal')?'local':r.flags.includes('originPublic')?'public':null,isolated:r.flags.includes('originIsolated'),tested:r.flags.includes('originPrepared'),failed:r.flags.includes('originFailed')}:null;
K.originAct=(r,action)=>{const q=K.origin(r);if(!q||r.page<K.lines(r).length-1||q.tested)return false;
if(action==='isolate'){if(q.isolated)return false;add(r,'originIsolated');return true;}
if(['hold','move','local','public'].includes(action)){const pair=['hold','move'].includes(action)?['originHold','originMove']:['originLocal','originPublic'];r.flags=r.flags.filter(f=>!pair.includes(f));add(r,({hold:'originHold',move:'originMove',local:'originLocal',public:'originPublic'})[action]);return true;}
if(action!=='test'||!q.input||!q.line)return false;
if(!q.isolated||q.input!=='hold'||q.line!=='local'){if(!q.failed)r.erosion=Math.min(100,r.erosion+6);add(r,'originFailed');return {ok:false};}
add(r,'originPrepared');add(r,'outsideIsolated');r.observations??=[];if(!r.observations.some(x=>x.id==='origin'))r.observations.push({...D.observationDefinitions.origin,text:'04:17의 원본에는 이동 보류가 있었고 자동 출력에서 빠졌다. 공용 출력을 분리하고 양호실 호출을 시험하자 지금 문이 열리는 소리와 응답을 들었다.'});return {ok:true};};
const departure=K.departure;K.departure=r=>{const q=departure(r);if(!q)return q;const roles=r.puzzles.crew?.committed&&r.puzzles.crew.roles;if(roles&&!q.nara&&!q.doyun&&!q.child&&!r.flags.includes('departureRevising')){q.nara=r.flags.includes('naraFront')?'front':'rear';q.doyun=r.flags.includes('doyunStairs')?'stairs':'rail';q.child=r.flags.includes('childSeparated')?'separate':'family';q.call=!!r.flags.includes('handoffReady');}return q;};
const prepare=K.prepare;K.prepare=(r,a)=>{const q=K.departure(r);if(a==='revise')add(r,'departureRevising');const ok=prepare(r,a);if(ok&&q?.nara&&q?.doyun&&q?.child)r.flags=r.flags.filter(f=>f!=='departureRevising');return ok;};
K.retryDecision=r=>r.ending&&r.lastDecision?K.validateRun(K.clone(r.lastDecision)):null;
const validate=root.validateContact;root.validateContact=r=>{validate(r);if(r.lastDecision!==undefined){if(!r.lastDecision||r.lastDecision.ending||r.lastDecision.lastDecision||!D.nodes[r.lastDecision.node])throw Error('마지막 선택 기록이 올바르지 않습니다.');K.validateRun(K.clone(r.lastDecision));}};
const choose=K.choose;K.choose=(r,m,id)=>{const from=r.node;let snapshot=null;const c=K.available(r,m).find(x=>x.id===id);if(c&&[c.to,c.routeByFlag?.yes,c.routeByFlag?.no].some(x=>x?.startsWith('end:'))){snapshot=K.clone(r);delete snapshot.lastDecision;}if(from==='naraConnection'&&['rest','walk'].includes(id)&&!K.naraState(r).removed)return false;if(from==='sourceSocket'&&['record','private'].includes(id)&&!r.flags.includes('originPrepared'))return false;const ok=choose(r,m,id);if(ok&&r.ending&&snapshot)r.lastDecision=snapshot;if(ok&&r.ending){m.endRecords??={};m.endRecords[r.ending]={text:[...D.endingText(r),...D.endingExtra(r)],cause:D.endingCause(r),art:r.flags.includes('twoTaps')&&E[r.ending].memoryArt||E[r.ending].art};}if(ok&&from==='nara'&&['paper','radio'].includes(id))add(r,'naraAgreed');return ok;};
};
})(globalThis);
