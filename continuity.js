/* Narrative pass: observed facts, local consequences and received-text interference. */
(function(root){
const D=root.YKData,N=D.nodes,S=(who,text,extra={})=>({who,text,...extra});
const edit=(id,index,text)=>{if(!N[id]?.lines[index])throw Error(id+':'+index);N[id].lines[index].text=text;};
const flag=(id,choice,value)=>{const c=N[id].choices.find(c=>c.id===choice);c.flags=[...new Set([...(c.flags||[]),value])];};
N.arrival.lines=[
 S('','막차가 끊긴 뒤, 너는 첫 배를 기다리러 대합실에 들어왔다. 젖은 신발 밑으로 물이 고인다. 벽시계는 4시 17분에 멈춰 있다.'),
 S('','접수대의 17번 번호표를 집어 든다. 옆에는 작은 문자 수신기와 쪽지가 있다. “방송이 안 들리면 가져가세요. 반납은 부두에서.”'),
 S('','문손잡이가 돌지 않는다. 수신기를 들자 문자 한 줄이 들어온다.'),
 S('수신기','현관문이 잠겼으면 안쪽 빗장을 확인하세요. 바깥 손잡이는 움직이지 않습니다.')];
N.look.lines=[S('','문 옆을 비추자 손잡이 위에 작은 빗장이 보인다. 접수대에서 여기까지 네 젖은 발자국이 이어져 있다. 번호표는 이미 주머니에 넣었다.'),S('나','빗장이었구나. 밖에서 잠근 게 아니네.')];
N.bolt.lines=[S('','빗장을 밀자 문이 손바닥만큼 열린다. 밖에서 여자가 물러선다. 운동화 끝에서 물이 떨어진다.'),S('여자','아, 계셨네요. 문이 안 열려서요.'),S('나','실례지만 누구세요?'),S('여자','나래예요. 여기 방송실에서 일했어요. 불 켜진 거 보고 왔어요.')];
flag('bolt','name','introducedByNumber');flag('bolt','ask','askedOutside');
N.nara.lines=[
 S('나래','번호 받으셨네요. 전 12번이에요.',{if:'introducedByNumber'}),
 S('나래','저도 부두로 가려던 참이에요. 골목 방송이 자꾸 반복돼서 이쪽으로 돌아왔어요.',{if:'askedOutside'}),
 S('나래','배 쪽에 불은 켜져 있어요. 혼자 가기엔 좀 그래서…… 같이 가실래요?'),
 S('','나래가 접힌 점검표를 내민다. 열쇠 꾸러미에 방송실이라고 쓴 납작한 표지가 달려 있다.'),
 S('나래','이건 제가 적었어요. 밖에서 성함 물으면 번호만 말해요. 이름을 말한 뒤로 연락이 끊긴 사람이 있어요.'),
 S('','수신기가 짧게 울린다. 나래는 소리가 끝났는데도 빈 벤치 쪽을 본다. 네가 부르자 뒤늦게 돌아본다.'),
 S('나래','미안해요. 귀에 방송이 남아서요. 또 이러면 가까운 데 두 번만 두드려 주세요. 방송실에서 그렇게 불렀거든요.'),
 S('나','두 번이요? 알겠어요.')];
edit('paper',1,'나래가 현관 너머를 본다. 점검표를 접으려던 손이 멎는다. “잠깐만요. 누가 또 왔어요.”');
edit('passed',2,'너는 접수증을 번호표 뒤에 겹쳐 넣는다. 둘 다 17번이다. 나래가 부두 쪽 골목을 가리키고 네가 먼저 문밖을 살핀다.');
flag('lane','still','waitedForLongBell');flag('lane','hatch','usedHatch');
N.bell.lines.unshift(S('','담장에 등을 붙이고 기다린다. 짧은 종이 두 번, 조금 뒤 다시 두 번. 담장 너머에서 무엇인가 끌리다 멎는다.',{if:'waitedForLongBell',beat:'short-bell'}),S('나래','아직요. 끝날 때까지.',{if:'waitedForLongBell'}));
N.bell.lines.find(l=>l.text.startsWith('긴 종이 울린다.')).beat='long-bell';
N.hatch.lines[2]=S('나','방금 수신기로 물어봤어요. 여기 아래로 들어오라고 했어요.',{if:'shelterAsked'});
N.hatch.lines.splice(3,0,S('나','문 아래가 열려 있길래 봤어요. 걸쇠에 손이 닿아서요.',{unless:'shelterAsked'}));
N.hatch.lines.find(l=>l.who==='나래'&&l.text.startsWith('맞는 말도')).text='열리긴 하네요. 여기서 종 멎을 때까지만 있어요.';
N.note.choices.find(c=>c.id==='cabinet').label='중계함이 표시된 곳으로 가 본다';
flag('note','cabinet','soughtCabinet');
N.closedPier.lines.push(S('','점검표에 적힌 중계함은 쇠문 안쪽 계단 아래에 있다. 물이 찬 계단에는 발을 디딜 곳이 없다. 너는 표지판의 위치만 다시 적는다.',{if:'soughtCabinet'}));
// Introductions and speech register follow what has actually happened.
N.doyunStory.place='학교 뒤 · 바깥 벤치';
N.doyunStory.lines.unshift(S('','측면 현관으로 나와 남자를 벤치에 앉힌다. 복도 종소리는 문이 닫히자 작아진다.'),S('도윤','이제 이름 말해도 되겠죠. 도윤입니다. 선장님이 저 찾고 계셨어요?'));
for(const id of ['doyunDoor','shelfSlip','braceShelf'])for(const l of N[id].lines)if(l.who==='도윤')l.who='남자';
edit('archivePlayback',6,'네. 여기까지 들었어요. 이제 수호 씨 말 남겨요.');
edit('archiveLabel',2,'저도 기억 안 나는 데가 있어요. 그래도 그 말대로 하지는 말아요.');
edit('archiveMap',5,'응. 막히면 돌아오자.');
// Replace repeated explanations with concrete reactions, without removing physical clues.
const rewrites={
 closedPier:{8:'너는 수신기 화면을 돌려 본다. “부두로 이동하십시오.” 그 아래에는 새 문자가 없다. 나래가 잠긴 문에 손전등을 비춘다.'},
 wrongLane:{5:'너희가 골목을 벗어날 때 뒤에서 발소리가 겹친다. 광장에 닿자 하나가 멎는다. 서진은 돌아보지 않고 체육관 쪽으로 걷는다.'},
 ledgerWarning:{5:'서진이 다시 적은 세 번호 옆에 도착 시각을 쓴다. 너는 지우개를 주머니에 넣는다. 복도 끝 의자가 한 번 더 끌린다.'},
 schoolPass:{5:'문 아래로 나온 손에는 왼손 붕대가 보인다. “종이 젖어요. 조금만 들어요.” 너는 종이 끝을 올린다. 이번에는 뒤쪽 교실에서 같은 말이 돌아오지 않는다.'},
 yellowButton:{4:'서진은 메모를 사진 뒤에 끼운다. “만나면 이걸 왜 썼는지 물어봐야겠어요.” 나래가 단추를 마른 천에 싸서 건넨다.',7:'서진이 단추를 주머니에 넣고 응급 처치 칸 앞에 선다. 작은 창 안쪽의 포장은 뜯기지 않았다.'},
 storePressure:{4:'도윤이 팔꿈치를 문에서 떼고 다친 손을 가슴 쪽으로 당긴다. 서진은 안쪽 기침이 잦아들 때까지 문에 귀를 대고 기다린다.',5:'나래가 네 손목을 잡는다. “또 당기지 말고. 옆에서 보자.”',6:'창고 옆 낮은 환기구로 돌아간다. 안쪽에서 서진을 찾는 소리가 난다.'},
 rescueHaewon:{9:'해원이 문턱을 넘는다. 서진은 손을 잡은 채 다시 사람을 센다. 다섯. 창고 벽의 접수 화면에도 다섯이 떠 있다. 문을 열기 전부터 떠 있던 숫자다.'},
 haewonAccount:{7:'해원은 약 가방이 있던 물 쪽을 본다. 서진이 아이 턱 밑의 젖은 우비 끈을 풀어 준다. 가방을 찾으러 돌아가겠다는 말은 하지 않는다.',9:'도윤이 환기구에 마지막으로 불을 비춘다. 선반은 비었다. 해원이 서진의 소매를 당기며 조작실 쪽으로 함께 걷는다.'},
 relayDesk:{5:'윤서가 펜을 내려놓고 나래 쪽으로 물컵을 민다. 나래는 컵을 잡지 못하고 두 손을 무릎 사이에 넣는다. 창밖의 부두 계단은 아직 어둡다.'},
 relayCompare:{0:'41번 원본에는 “배수 확인 뒤 이동”이라고 적혀 있다. 출력에는 앞의 여섯 글자가 없다. 42번 배수 요청 옆에는 작업 기록 없이 완료 도장만 찍혔다.',2:'이 말만 보면 지금 가도 되는 줄 알겠네.',6:'윤서가 배전반 열쇠를 건넨다. 도윤이 공구를 집으려다 왼손을 보고 내려놓는다. 너는 대신 가방을 든다.'},
 archiveApproach:{8:'수호가 재생기에서 한 발 물러선다. 나래는 자기 점검표를 접어 주머니 깊이 넣는다. 둘은 서로를 잠깐 보지만 먼저 묻지는 않는다.'},
 archiveRoom:{4:'나래가 점검표를 만지다 손을 뗀다. 수호는 재생 버튼 위에 올렸던 손가락을 무릎에 문지른다.',7:'수호가 처음 꺼냈다는 테이프를 작업대에 놓는다. 종이 방송문도 옆으로 끌어온다. 재생 버튼에는 아직 손대지 않는다.'},
 archiveLabel:{3:'수호가 번호표를 테이프 옆에 댄다. 45와 45. 잠시 맞춰 보더니 번호표를 뒤집어 놓는다. “목소리도 제 거 같아서요.”'},
 archivePlayback:{7:'수호가 정지 버튼을 누른 채 기다린다. 너희가 아무 말도 하지 않자, 잠깐 뒤에야 손을 뗀다. 밖의 스피커에서는 소리가 나지 않는다.'},
 archiveReply:{1:'수호가 방금 남긴 문장을 한 번 재생한다. “현재 제 선택이 아닙니다.” 그 대목에서 종이에 밑줄을 긋는다. 도윤은 빠져 있는 외부 출력선을 다시 가리킨다.',5:'수호가 지도를 가방에 넣는다. 나래가 시장의 천 아래로 들어가지 말라고 말하자, 그는 가방 지퍼를 닫다 말고 한 번 더 묻는다. “천이요?”'},
 archiveOutside:{0:'문밖으로 나온 수호가 숨을 길게 내쉰다. 주머니의 번호표를 꺼냈다가 넣는다. 해원이 그 옆에 서서 뒤따라 나오는 사람을 센다.',6:'닫힌 문 안에서 “대기 장소를 변경하지 않습니다”라는 말이 한 번 더 들린다. 수호는 걸음을 멈추지만 문 쪽으로 돌아가지는 않는다.'},
 marketArrival:{5:'수신기에 “대피자를 지나치지 마십시오”라는 문자가 뜬다. 손짓하던 것은 그대로 천 아래에 있다. 해원이 서진의 옷자락을 잡는다.'},
 marketNarrow:{3:'옆 매대의 판자 아래로 흰 선이 보인다. 판자를 조금 들자 바닥도 같이 드러난다. 상자 위쪽은 천에 가려져 있다.',5:'도윤이 판자 아래에 받침을 밀어 넣는다. 왼손이 닿자 표정이 굳어 오른손으로 바꾼다. 천 아래의 손짓이 빨라진다.'},
 hurryNara:{3:'도윤이 길을 막는다. “잠깐요. 걸으면서도 계속 같은 말 하잖아요.”',4:'나래의 발은 네가 당긴 쪽으로 움직이는데, 입은 출구 반대쪽을 향해 안내를 잇는다. 너는 팔을 놓고 벽 옆에 앉힌다.',6:'선장 쪽으로 손전등을 두 번 흔든다. 부두에서 불빛이 돌아온다. 너는 나래 앞에 쪼그려 앉아 수신기를 가리킨다.'},
 quietShelter:{0:'대기소 안에는 스피커가 없다. 너희는 수신기를 끄고 가방에 넣는다. 해원이 젖은 신발을 벗어 문 옆에 가지런히 놓는다.',3:'“판자는 세워 놨어. 다들 지나왔고.” 네가 말하자 나래는 눈을 감고 잠깐 입술을 움직인다.',6:'나래가 주먹을 편다. 손목의 선은 남아 있지만 열쇠는 더 부딪히지 않는다. 해원이 벗은 신발을 발끝으로 밀자 나래가 그쪽을 본다.'},
 quietWalk:{0:'나래 옆에 보폭을 맞춘다. 두 번쯤 걷다가 멈추면 해원도 앞에서 기다린다. 누구도 서두르라고 하지 않는다.',3:'나래는 사람을 짚어 세다 자기 앞에서 손을 멈춘다. 다시 세면서 네 얼굴을 확인한다.',6:'계단 아래에서 선장이 문을 잡고 기다린다. 나래는 손가락을 아직 접지 못했다. 너는 선장에게 쉬지 않고 걸어왔다고 먼저 말한다.'},
 naraAfterRest:{4:'해원이 발을 멈춘다. 나래가 문 쪽을 보며 “신발 소리도 멎었네”라고 말한다. 서진이 아이의 벗은 신발을 들어 보인다.',5:'발화는 멎었다고 적을게요. 손목 선은 아직 남아 있고요.',6:'나래가 네가 적은 줄 밑에 덧쓴다. “여기 오기 전 일은 중간이 기억나지 않음.” 펜을 돌려주려다 자기 번호도 적는다.'},
 harborReturn:{5:'선장이 명부를 내민다. 서진은 해원 자리부터 찾고, 도윤은 다친 손을 종이 밖으로 빼 놓는다. 나래가 마지막 빈줄에 손가락을 댄다.'},
 manifestDesk:{0:'선장이 인원표와 노출표를 나란히 놓는다. 인원표 옆에는 도윤의 부상과 도착 뒤 필요한 처치를 적을 칸도 있다.',6:'선장이 펜 두 자루를 놓는다. 도윤은 부상 칸을 자기 쪽으로 당기고, 너는 나머지 두 장을 편다.'},
 manifestPeople:{6:'선장은 적힌 번호를 읽으며 눈앞의 사람을 센다. 마지막에 서진이 해원을 앞으로 부른다. 빈 번호 칸 옆에도 표시가 하나 생긴다.',8:'나래가 자기 번호 옆에 짧게 선을 긋는다. “됐어.” 펜을 놓으면서도 그 칸을 한 번 더 본다.'},
 manifestSignal:{0:'장치 전원, 연결선, 반복 발화. 세 칸 옆에 기록할 자리가 있다. 도윤이 분리해 둔 케이블을 꺼내 선장에게 보여 준다.'},
 boardingPlan:{4:'해원과 서진이 앞칸 의자에 앉는다. 나래는 뒤칸 문 앞에서 네가 오는지 기다린다. 선장은 밧줄을 걸어 둔 채 펜을 내민다.',5:'일반 접수 양식에는 “이상 없음”이 미리 인쇄돼 있다. 노출 인계서는 빈칸 세 개다. 선장이 말한다. “인계로 가면 답을 기다려야 해요. 일반 접수는 바로 나가고요.”'},
 outerCheck:{4:'수신기에 새 자동 안내가 뜬다. “신속한 탑승을 위해 상태 확인을 생략하십시오.” 선장은 자기 무전기에 받은 응답 번호를 적고 있다. 두 문장이 같은 자리에서 너를 기다린다.',8:'배 안에서 해원이 너희를 본다. 선장은 아직 밧줄에 손대지 않는다. 나래가 먼저 네 옆에 선다.'},
 sourceApproach:{5:'수신기에 이름 인증을 요구하는 창이 뜬다. 나래가 중계함 덮개를 연다. 화면이 달린 쪽은 네 손 안의 수신기뿐이다.'},
 sourceSocket:{3:'도면에서 전등 선을 찾는다. 입력 단자 쪽과는 갈라져 있다. 너는 전원 스위치 대신 비어 있는 재생 선을 집는다.'}
};
for(const [id,rows]of Object.entries(rewrites))for(const [i,text]of Object.entries(rows))edit(id,Number(i),text);
N.paper.lines[1].who='';N.storePressure.lines[5].who='';
flag('marketCross','pause','pausedForNara');
N.naraConnection.lines.push(S('나래','기다려 줬네. 내가 멈춘 줄도 몰랐는데.',{if:'pausedForNara'}),S('나래','아까 팔 당겼을 때…… 네가 누군지도 잠깐 몰랐어. 다음엔 먼저 불러 줘.',{if:'naraHurried'}));
N.haewonAccount.lines.push(S('해원','문 열릴 때 무릎 부딪혔어요.',{if:'storeSlip'}),S('서진','아직 아파? 바지 좀 걷어 봐.',{if:'storeSlip'}));
N.schoolPass.lines.push(S('서진','지웠던 것도 밑에는 남아 있었네요. 그 종이는 제가 들게요.',{if:'ledgerErased'}));flag('schoolGate','erase','ledgerErased');
// Concrete reminders never label a person as genuine or false.
const facts={
 arrival:[1,'ticket','접수대에서 받은 것','17번 번호표. 수신기는 부두에서 반납하라는 쪽지와 함께 있었다.'],
 paper:[0,'rules','나래의 점검표','호명에는 번호만. 긴 종이 울리면 이동. 마지막 줄은 젖어 있었다.'],
 note:[0,'request','점검표의 마지막 줄','“내가 먼저 읽으면, 소리를 꺼 줘.” 아래에 중계함 위치가 적혀 있었다.'],
 schoolGate:[4,'entry','학교 현관 명부','나래 12 · 나 17 · 서진 23. 세 사람의 번호표를 꺼내 명부와 함께 보았다.'],
 classroomHall:[6,'hinge','복도에서 본 문','양호실 경첩만 은색. 먼저 들린 세 번의 두드림은 그쪽에서 시작됐다.'],
 familyPhoto:[6,'haewon','서진이 보여 준 해원의 모습','노란 우비, 약 가방, 왼손 검지의 작은 반창고. 사진과 서진의 설명을 함께 확인했다.'],
 storeLevel:[4,'pipes','창고의 두 관','회색 관은 얕은 배수구로, 굵은 관은 바다로 이어졌다. 문 안쪽 물이 더 높았다.'],
 relayCompare:[0,'relay','같은 요청 번호의 원본과 출력','41번: 원본의 “배수 확인 뒤”가 출력에서 빠졌다. 42번: 작업 기록 없이 완료 도장이 있었다.'],
 archiveDesk:[0,'output','자료실 재생기 뒤','작은 스피커와 벽으로 들어가는 공용 출력선은 별개였다.'],
 naraConnection:[4,'disconnect','나래의 장치를 분리한 뒤','케이블을 빼자 입술이 두 번 더 움직이고 발화가 멎었다. 손목의 선은 남아 있었다.'],
 naraAfterRest:[4,'rest','대기소에서 나눈 말','나래가 방금 한 말을 기억했다. 해원이 발을 멈추자 신발 소리가 멎었다고 말했다.']
};
D.observationDefinitions={};for(const [node,[i,id,title,text]]of Object.entries(facts)){const o={id,title,text,place:N[node].place};D.observationDefinitions[id]=o;N[node].lines[i].observation=o;}
const childSeen={id:'childSeen',title:'환기구에서 본 아이',text:'노란 우비, 왼손 검지 반창고. 약 가방 끈을 풀고 선반으로 올라갔다.',place:N.storeLevel.place};D.observationDefinitions.childSeen=childSeen;N.storeLevel.lines[0].observation=childSeen;
// The incoming text can look cleaner as erosion deepens. Physical notes remain unchanged.
N.door.reception={clear:'원활한 접수를 위해 질문에 답하십시오. 성함을 말씀하시면 접수가 완료됩니다.',broken:'원활한 접수를 위해 질문에 답하십시오. 성…함을 말씀하… 접수가 완료됩니다.'};
N.marketArrival.broadcast='대피자를 지나치지 마십시오. 천 아래에서 대기하십시오.';
N.marketArrival.reception={clear:N.marketArrival.broadcast,broken:'대피자를 지나치지 마십시오. 천 아…래에서 대…기하십시오.'};
N.boardingPlan.broadcast='일반 접수로 전환하십시오. 노출 기록은 도착 뒤 제출할 수 있습니다.';
N.boardingPlan.reception={clear:N.boardingPlan.broadcast,broken:'일반 접수로 전환하십시오. 노출 기…록은 도착 뒤 제…출할 수 있습니다.'};
N.archiveExit.broadcast='45번은 대기 장소를 변경하지 않습니다.';
N.archiveExit.reception={clear:N.archiveExit.broadcast,broken:'45번은 대기 장소를 변…경하지 않습…니다.'};
// Repeat play offers another question, not a protagonist with knowledge they never gained.
N.room.choices.find(c=>c.id==='date').requires=undefined;
N.room.lines.push(S('','탁상 달력의 오늘 칸이 어제 날짜에 멈춰 있다. 그 아래 날짜를 여러 번 덧쓴 자국이 보인다.'));
D.endings.carry.text=[
 '나래는 뒤칸에 앉지 않고 너희와 함께 내린다. “이상 없음.” 네가 서명한 종이를 받은 담당자는 무전기를 들어 대기 차량을 부른다.',
 '나래가 입을 다문다. 선실 무전기에서 말이 이어진다. “다음 안내까지 자리를 지켜 주십시오.” 육지 항구의 스피커도 같은 간격으로 켜진다. 길을 건너던 사람들이 동시에 멈춘다.',
 '서진이 해원을 품에 안는다. 도윤이 무전기를 끄려 뛰어가지만 맞은편 정류장의 전광판에도 같은 문장이 뜬다. 너는 손 안의 종이를 구긴다. 여기에 적을 수 있었던 말들이 아직 기억난다.'
];
D.endings.rushed.text=[
 '배는 조용히 육지에 닿는다. 나래가 부축을 거절하고 두 걸음 걷다가 멈춘다. 담당자는 이상 없음이라고 적힌 서류를 보고 대기 줄 뒤를 가리킨다.',
 '“잠깐만요.” 네가 다시 부른다. 나래의 손목을 본 담당자가 빈 의자를 가져온다. 나래는 앉으면서 네게 묻는다. “그거, 안 적었어?”',
 '새 종이를 받아 처음부터 설명한다. 기다리는 동안 나래는 네 쪽을 보지 않는다. 항구의 방송이 끝나자, 그제야 자기 이름을 말한다.'
];
D.endings.collapse.text=[
 '선반을 다시 밀자 금속 통이 문틈으로 굴러온다. 도윤이 짧게 소리를 지른다. 모두 물러났을 때 안쪽 받침이 완전히 주저앉는다.',
 '문을 불러도 답이 없다. 서진이 빗자루를 밀어 넣지만 끝이 더 들어가지 않는다. 네 발 옆에는 펴지 않은 접이식 의자가 그대로 놓여 있다.'
];
D.endings.attendance.text=[
 '네가 이름을 말하자 복도 스피커가 마지막 음절을 이어 읽는다. 서진이 네 팔을 잡는다. 명부에 한 줄이 늘어나는 동안, 잡힌 팔의 감각이 멀어진다.',
 '문이 열린다. 빈 의자 하나가 복도로 돌아선다. 서진의 입은 움직이는데 네 이름은 스피커에서만 들린다. 나래가 네 번호표를 들어 보인다. 종이는 이제 아무 반응도 하지 않는다.'
];
N.nara.lines.splice(4,0,S('','열쇠 옆에는 작은 녹음기가 매달려 있다. 나래의 개인 수신기와 짧은 선으로 이어져 있다. 재생 불이 한 번 반짝이다 꺼진다.'));
N.naraConnection.lines[0].text='나래가 개인 수신기의 버튼을 반복해 누른다. 화면은 꺼져 있다. 그런데 옆에 매달린 녹음기에는 재생 불이 켜져 있다. 두 기기를 잇는 짧은 선이 주머니 밖으로 나와 있다.';
N.naraConnection.lines[2].text='이쪽 녹음기는 아직 돌아가요. 계속 남겨야 하는 거예요? 선 빼도 될까요?';
N.lane.lines[0].beat='short-bell';
N.outerCheck.lines.find(l=>l.text.includes('대합실 책상 앞')).text='선실 창에 나래의 손이 비친다. 손끝은 움직이지 않는다. 대합실에서 들었던 부탁이 떠오른다.';
D.endings.alone.text=[
 '밧줄이 풀리기 직전 나래가 연락 번호를 다시 읽어 준다. 너는 맞다고 대답한다. 배가 움직이자 마지막 두 자리는 들리지 않는다. 종이에는 남아 있다.',
 '해원은 서진의 어깨에 기대 잠든다. 도윤은 창밖을 보다가 나래가 탔느냐고 묻는다. 네가 고개를 젓자 그는 빈 뒤칸 문을 닫는다.',
 '육지에서 종이에 적힌 번호로 연락한다. 아직 다음 배를 기다린다는 답이 온다. 너는 내렸다고, 이 번호로 다시 받겠다고 남긴다. 전송 표시가 뜬 뒤에도 한동안 화면을 끄지 못한다.'
];
D.endings.shared.text=[
 '배가 떠난 뒤 계단에는 너와 나래만 남는다. 선장이 남긴 종이에 다음 배의 예정 시각과 비상 대기소 주소가 적혀 있다. 나래가 종이를 접어 열쇠와 다른 주머니에 넣는다.',
 '손목의 선은 그대로다. 나래는 벤치에 앉아 네가 앉을 자리를 손으로 턴다. “배 못 오면 저기로 가자.” 방금 넣은 종이를 가리키고, 너는 대기소가 보이는 골목을 확인한다.',
 '바다 쪽에서 방송이 돌아온다. 나래가 입을 여는 순간 네 손이 멈춘다. “춥다.” 네가 들은 말은 그 한마디다. 너는 가방에서 마른 옷을 꺼낸다.'
];
D.endings.flood.text=[
 '화면이 완료로 바뀐다. 바닥 물은 줄지 않는다. 학교 쪽 배관에서 깨지는 소리가 나고, 서진이 되돌아오다 계단 위에서 멈춘다. 문 아래까지 물이 차 있다.',
 '도윤이 손잡이에 매달린다. 다친 손이 풀리면서 몸이 아래로 꺾인다. 너는 팔을 잡지만 발을 디딜 곳이 사라진다. 물 위로 떠오른 수신기에는 완료라는 두 글자만 밝다.'
];
N.pumpDrain.lines.push(S('','조작실을 나와 창고 앞을 다시 지난다. 물이 빠진 바닥에서 서진이 약 가방을 건져 올린다. 약 봉투는 젖었지만 안쪽 방수 주머니의 메모는 마른 채다. 해원이 가방을 받아 지퍼부터 닫는다.'));
N.manifestPeople.lines.splice(1,0,S('','수호가 자기 번호표를 나란히 놓는다. 45번. 선장은 인원표에 새 줄을 긋고, 해원은 그 옆에 의자를 하나 더 당긴다.',{if:'joinedSuho'}));
N.marketCross.lines[0].text='서진과 해원이 먼저 지나가고 도윤이 그 뒤를 따른다. 앞사람들이 건너간 것을 보고 나래 쪽으로 몸을 돌린다. 나래는 판자를 잡은 자세로 멈춰 있다.';
N.marketCross.lines.splice(1,0,S('','수호가 마지막으로 선을 넘어온다. 뒤쪽 천을 보고 뒷걸음치던 그가 나래를 보자 발을 멈춘다.',{if:'joinedSuho'}));
N.haewonAccount.lines[0].text='학교 방송에서 제 이름이 나왔어요. 언니는 번호로만 답하랬는데. 그래서 처음엔 대답 안 했어요.';
N.clinicArrival.lines[3].text='처치실 안쪽에서 카트를 미는 소리가 난다. 네가 문을 조금 열자 소리가 멎는다. 현관 옆 외부 배달함의 작은 창 안에는 노란 단추가 보인다. 서진이 사진 속 우비를 손가락으로 짚는다.';
N.naraConfession.lines.find(l=>l.text.includes('단말기 탓')).text='수신기 탓이라고 하면 편하지. 그런데 스피커로 내보낸 목소리는 내 거였어.';
D.endings.alone.title='남겨 둔 자리';
N.manifestSignal.lines[3].text='나래가 종이 위의 반복 발화라는 글씨를 손끝으로 가린다. 도윤이 케이블을 뺀 시각을 옆에 적자, 잠깐 가렸던 손을 뗀다.';
N.manifestSignal.lines.splice(4,0,S('도윤','대기소에서 쉬었어요. 그 뒤에는 새로 한 말에도 대답했고요. 손목은 아직 그대로고요.',{if:'naraStabilized'}),S('도윤','선 뺀 뒤에 바로 걸어왔어요. 발화는 멎었는데, 쉬고 나서 반응은 아직 못 봤어요.',{unless:'naraStabilized'}));
const previousExtra=D.endingExtra;
D.endingExtra=r=>[
 ...(previousExtra?.(r)||[]),
 ...(r.ending==='together'&&r.flags.includes('joinedSuho')?['수호가 가져온 지도에 육지 항구를 작게 덧그린다. “여긴 제가 걸어 보고 그린 거예요.” 해원이 옆에 신발 두 짝을 그려 넣는다.']:[]),
 ...(r.ending==='together'&&r.flags.includes('naraHurried')?['나래가 계단 앞에서 팔을 내민다. 네가 잡으려 하자 잠깐 기다리라는 손짓을 한다. 발 디딜 곳을 찾은 뒤, 이번에는 먼저 네 손을 잡는다.']:[]),
 ...(r.ending==='shared'&&r.flags.includes('diagram')?['너는 방재 창고에서 본 도면의 중계함 위치를 종이 구석에 옮긴다. 나래가 물기가 마른 뒤 같이 가 보자고 말한다.']:[])
];

// Props are revealed at the paragraph where a person actually shows them.
N.schoolGate.lines[4].text='서진이 명부에 펜을 대려다 멈춘다. 빈칸인 줄 알았던 곳에 12, 17, 23이 적혀 있다. 나래가 자기 번호표를 꺼낸다. 서진도 주머니에서 23번 표를 꺼내 나란히 놓는다.';
N.schoolGate.lines[5].text='저희 번호인데…… 누가 적었죠?';
N.schoolGate.lines[6].text='일단 지우지는 말죠. 옆에 적을게요.';
N.familyPhoto.lines[1].text='서진이 사진 옆에 손목시계를 놓는다. 시계는 4시 31분, 사진 뒤에는 4시 51분이 적혀 있다. 서진이 사진을 뒤집었다가 다시 본다. 숫자는 그대로다.';
N.familyPhoto.lines[6].text='서진이 빈 종이에 3시 50분이라고 적는다. 사진과 함께 접어 넣으려다 얼굴 쪽을 다시 보여 준다. 노란 우비와 검은 가방. “왼손 검지에 반창고도 붙였어요. 나가기 전에 제가 붙여 줬거든요.”';
N.shelfSlip.lines[5].text='남자가 손을 빼내려다 멈춘다. 붕대에 핏물이 더 번진다. 서진이 자기 가방에서 마른 천을 꺼내 문틈으로 밀어 넣는다.';
N.pumpAir.lines[4].text='회색 레버를 조금 열자 배관에서 공기가 샌다. 압력계가 내려가며 소리도 작아진다. 스피커에서 따라오던 잡음은 그 크기 그대로 남는다.';
N.relayRoom.lines[0].text='낡은 녹음기와 수신 화면이 같은 책상에 놓여 있다. 윤서는 한쪽 귀에만 이어폰을 꽂았다. 문을 닫자 이어폰을 빼고 너희 쪽으로 돌아선다.';
N.departureRecord.lines[3].text='네. 도착하면 이 종이부터 보여 주세요. 제 근무 번호도 적어 둘게요.';
N.lastWaiting.lines[0].text='나래가 난간 안쪽에 앉는다. 서진은 해원에게 담요를 덮어 주고, 도윤은 선장에게 다음 배를 부탁한다. 선장이 명부를 펴 남을 사람의 줄에 표시한다.';
N.lastWaiting.lines[2].text='나래가 꺼진 수신기를 가방 안쪽으로 밀어 넣는다. 네가 벤치 옆에 서자 앉을 자리를 조금 비켜 준다.';
N.lastWaiting.lines[4].text='너는 쪽지에 적힌 대기소를 가리킨다. 골목 끝 비상등이 보인다. 나래도 고개를 들어 그 불빛을 확인한다.';
N.archiveMap.lines[0].text='수호가 지도를 펼친다. 시장 통로에는 흰 선이, 물자가 쌓인 곳에는 사선이 그어져 있다. 모서리에 오늘 날짜와 45번이 적혀 있다.';
N.archiveMap.lines[3].text='수호가 마지막 매대에 손가락을 댄다. “여긴 좀 좁아요.” 도윤이 그 옆 판자 표시를 짚는다. 해원이 두 사람 사이로 지도를 들여다본다.';
N.arrival.lines[1].prop='ticket17';N.look.prop='ticket17';N.passed.prop='ticket17';
N.nara.lines.find(l=>l.text.includes('점검표를 내민다')).prop='note';N.paper.prop='note';N.note.prop='note';
N.squareArrival.lines[N.squareArrival.lines.length-1].prop='photo';N.familyPhoto.prop='photo';N.familyPhoto.lines[0].propSide='back';N.familyPhoto.lines[1].propSide='back';
N.familyPhoto.choices[0].flags=[...(N.familyPhoto.choices[0].flags||[]),'photoRead'];
N.schoolGate.lines[4].prop='ledger';N.schoolPatrol.prop='ledger';N.schoolHold.prop='ledger';N.schoolPass.prop='ledger';N.archiveLabel.prop='ticket45';N.manifestPeople.prop='tickets';
const mountPrevious=root.mountGamePlay;
root.mountGamePlay=K=>{
 mountPrevious(K);
 K.observe=r=>{if(!r||r.ending||r.explore)return;const l=K.lines(r)[r.page];if(l?.observation){r.observations??=[];if(!r.observations.some(o=>o.id===l.observation.id))r.observations.push({...l.observation});}};
 K.observations=r=>(r?.observations||[]).filter(o=>D.observationDefinitions[o.id]);
 K.reception=r=>{const n=N[r.node];if(r.ending||!n.broadcast||r.explore)return null;r.receptions??={};if(!r.receptions[r.node]){const broken=!!n.reception&&r.erosion<65;r.receptions[r.node]={text:n.reception?(broken?n.reception.broken:n.reception.clear):n.broadcast,broken};}return r.receptions[r.node];};
 const next=K.next,choose=K.choose,ask=K.ask;
 K.next=(r,m)=>{K.observe(r);const ok=next(r,m);if(ok)K.observe(r);return ok;};
 K.choose=(r,m,id)=>{K.observe(r);K.reception(r);const ok=choose(r,m,id);if(ok){K.observe(r);K.reception(r);}return ok;};
 K.ask=(r,m,id)=>{const node=r.node,ok=ask(r,m,id);if(ok&&node==='lane'&&id==='shelter'&&!r.flags.includes('shelterAsked'))r.flags.push('shelterAsked');return ok;};
};
D.build='7.2.0';
})(globalThis);
