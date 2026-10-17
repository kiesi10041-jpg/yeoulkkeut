(function(root){
const places={
 shelter:{name:'대합실',art:'hall.webp',mood:'shelter',x:14,y:17,links:['square'],text:'벤치가 늘어선 대합실이다. 현관 안쪽 빗장은 네가 밀어 열었던 위치에 남아 있다. 문밖으로 나가면 광장이다.',spots:[['bench','번호표 걸이','17번이 빠진 자리에 물방울이 맺혀 있다. 남은 종이를 뒤집자 대합실 문은 안쪽에서 열라는 문장이 보인다. 밖에서 기다릴 사람에게는 보이지 않는 글씨다.'],['clock','멎은 시계','4시 17분. 초침은 움직이지 않지만 네 수신기의 숫자는 계속 바뀐다. 시계 아래에는 건전지 교체 날짜가 적혀 있다. 날짜의 마지막 두 자리가 물에 번졌다.']]},
 square:{name:'마을 광장',art:'town.webp',mood:'coast',x:35,y:29,links:['shelter','school','clinic','market','pier'],text:'대합실과 학교, 바다로 가는 길이 갈라진다. 게시판의 종이 화살표 아래로 오래된 벽 표시가 보인다. 돌아오는 길을 찾으려면 이 광장을 기억해 둘 수 있다.',spots:[['map','벽의 지도','바다 쪽은 부두, 담장을 따라가면 학교다. 진료소와 시장은 서로 반대쪽 골목에 있다. 지도 위에는 손글씨로 길이 잠기면 광장으로 돌아오라고 적혀 있다.'],['bus','정류장 쪽지','막차 시간표 옆에 “번호만 듣고 태우지 마세요. 앞에 있는 사람도 봐 주세요.”라는 쪽지가 붙어 있다. 접힌 구석에는 작은 손바닥 그림이 있다.']]},
 school:{name:'학교',art:'school.webp',mood:'quiet',x:20,y:53,links:['square','clinic','reservoir'],text:'체육관 현관과 잠긴 정문이 보인다. 안쪽에서는 의자 끄는 소리가 가끔 난다. 현관 글씨를 읽으려면 밖에서도 손전등을 비출 수 있다.',spots:[['notice','현관의 안내','수업 중에는 이름을 부르지 않습니다. 출입할 때 들어온 인원과 나갈 인원을 적습니다. 명부를 고칠 때에는 원본을 남깁니다.'],['hinge','양호실 쪽 창','창 너머 복도에서 문 하나의 경첩만 은색으로 반짝인다. 먼 쪽 교실에서 두드림이 따라오지만, 먼저 시작된 소리는 저 문 쪽이다.']]},
 clinic:{name:'진료소',art:'clinic.webp',mood:'shelter',x:53,y:50,links:['square','school','reservoir'],text:'유리문 옆에 외부 배달함이 달려 있다. 안쪽 접수 기계가 켜졌다 꺼진다. 처마 밑에서는 비를 피할 수 있다.',spots:[['delivery','외부 배달함','접수용 문과 별도로 응급 처치 칸이 있다. 작은 창으로 밀봉된 물품을 볼 수 있다. 호출을 받지 않아도 밖에서 인수할 수 있는 구조다.'],['plug','전원선','문틈으로 보이는 접수 기계의 전원선이 뽑혀 있다. 순번 숫자는 아직 켜져 있다. 손잡이를 잡지 않고 처마 아래로 물러난다.']]},
 reservoir:{name:'배수시설',art:'reservoir.webp',mood:'coast',x:31,y:75,links:['school','clinic','relay'],text:'바다 쪽 수문과 학교 뒤 수로가 만나는 곳이다. 창고의 낮은 환기구가 입구 오른쪽에 있다. 물높이 자국은 벽에 남아 있다.',spots:[['water','물높이 자국','노란 선 아래가 젖어 있다. 창고 문 밑에는 안쪽에서 바깥쪽으로 물이 조금씩 샌다. 문을 크게 열면 안의 물부터 나올 높이다.'],['pipe','회색 우회관','작은 관이 창고에서 바깥 얕은 배수구로 이어진다. 바다 쪽 큰 손잡이와는 떨어져 있다. 관 위에 분필로 이 방 먼저라고 적혀 있다.']]},
 relay:{name:'해안 중계실',art:'relay.webp',mood:'signal',x:57,y:81,links:['reservoir','archive'],text:'창문 너머로 학교와 부두가 함께 보인다. 방송선이 건물 안으로 모인다. 벽에 기대면 안쪽에서 재생기가 멎는 소리를 들을 수 있다.',spots:[['wires','창밖 배선','전등으로 내려가는 선과 스피커로 가는 선이 창틀 아래에서 갈라진다. 같은 전원에 붙어 있어도 내려가는 곳은 다르다.'],['sign','교신 메모','“제가 본 것은 접수 화면입니다. 현장은 보이지 않습니다.” 근무 번호 아래에 반복해서 적혀 있다. 종이 옆에는 빈 컵이 두 개 놓여 있다.']]},
 archive:{name:'방송 자료실',art:'archive.webp',mood:'quiet',x:77,y:70,links:['relay','market'],text:'시장 보행로 지도가 창문 안쪽에 붙어 있다. 선반에는 녹음 테이프가 놓여 있다. 문을 열지 않아도 작은 재생기의 반복음이 들린다.',spots:[['route','보행로 지도','흰 선이 매대 아래로 이어진다. 공사 물자 구역에는 사선이 그려져 있다. 지도 끝에는 걸어 본 사람의 번호가 적혀 있다.'],['socket','외부 출력','재생기에서 벽으로 들어가는 선이 보인다. 작은 스피커를 끈 뒤에도 이 선이 꽂혀 있다면 밖으로 소리가 나갈 수 있다.']]},
 market:{name:'새벽 시장',art:'market.webp',mood:'coast',x:76,y:38,links:['square','archive','pier'],text:'천을 씌운 매대와 물자 상자가 통로를 좁힌다. 바닥의 흰 선은 바다 쪽으로 이어진다. 천 아래에서 손짓이 보여도 길의 끝은 보이지 않는다.',spots:[['floor','바닥의 흰 선','흰 선은 상자 위로 올라가지 않는다. 매대 판자 아래에서도 같은 높이로 이어진다. 판자를 들어 받치면 바닥 길을 넓힐 수 있다.'],['cloth','천 아래','천이 들렸다 내려앉는다. 손은 보이는데 발은 보이지 않는다. 밖으로 나올 수 있느냐고 물어도, 조용하니 들어오라는 말만 돌아온다.']]},
 pier:{name:'부두',art:'pier.webp',mood:'coast',x:68,y:13,links:['square','market'],text:'작은 배의 불빛이 보인다. 계단의 붉은 물높이 선과 난간을 확인할 수 있다. 대피소가 보인다고 지금 배에 오를 수 있는 것은 아니다.',spots:[['line','계단의 붉은 선','물높이를 볼 수 있도록 계단 옆에 표시가 새겨져 있다. 길이 열렸는지는 이 선 아래로 물이 내려갔는지 보아야 한다.'],['rope','배의 밧줄','배와 부두 사이에 밧줄이 두 줄 걸려 있다. 승객이 기다리는 동안에도 선장은 한 줄을 손에서 놓지 않는다. 스피커가 출항을 말해도 배는 아직 묶여 있다.']]}
};
const groups={shelter:'arrival look bolt nara paper advice door waiting',square:'passed lane hatch room date bell concern note squareArrival familyPhoto mapChoice wrongLane',school:'schoolGate ledgerWarning classroomHall echoClass schoolPatrol schoolHold schoolPass doyunDoor shelfSlip braceShelf doyunStory',clinic:'clinicArrival clinicCall deliveryBox yellowButton treatment clinicRadio',reservoir:'reservoirArrival storeDoor storePressure storeLevel floodWarning rescueHaewon haewonAccount pumpOverview pumpSeaView pumpBackflow pumpAir pumpDrain',relay:'relayArrival relayRoom relayDesk relayInput relayOutput relayCompare powerPanel signalSurge lightCheck naraConfession yunseoChoice departureRecord',archive:'archiveApproach archiveRoom archiveLabel archiveDesk archiveConsent archiveCable archivePlayback archiveReply archiveMap archiveExit archiveLoop archiveOutside',market:'marketArrival marketVoice marketNarrow marketTrap marketCross hurryNara naraConnection quietShelter quietWalk naraAfterRest',pier:'closedPier harborReturn captainReport manifestDesk manifestPeople manifestSignal boardingPlan outerCheck lastWaiting sourceApproach sourceSocket'};
const regions={};for(const [place,ids]of Object.entries(groups))for(const id of ids.split(' '))regions[id]=place;
const people={
 '나래':{flag:'metNara',art:'nara.webp',home:'shelter',intro:'방송실에서 일했다. 지금은 함께 움직인다.',topics:[['now','지금 괜찮은지 묻는다'],['paper','점검표를 함께 본다']]},
 '서진':{flag:'joinedSeojin',art:'seojin.webp',home:'square',intro:'해원을 찾다가 합류했다. 수첩과 사진을 지닌다.',topics:[['family','해원 이야기를 묻는다'],['photo','가족사진을 다시 본다']]},
 '도윤':{flag:'joinedDoyun',art:'doyun.webp',home:'school',intro:'배수시설 근무자. 다친 손을 고정했다.',topics:[['hand','손은 어떤지 묻는다'],['route','지금 길을 함께 본다']]},
 '해원':{flag:'haewonRescued',art:'haewon.webp',home:'reservoir',intro:'약품 배달을 나왔다가 창고에서 나왔다.',topics:[['bag','가방을 함께 확인한다'],['sound','지금 들리는 소리를 묻는다']]},
 '수호':{flag:'joinedSuho',art:'suho.webp',home:'archive',intro:'자기 목소리가 담긴 녹음을 자료실에 남겼다.',topics:[['choice','지금 하고 싶은 일을 묻는다'],['off','수신기를 꺼 둘지 묻는다']]},
 '윤서':{flag:'yunseoMet',art:'operator.webp',home:'relay',intro:'교신과 방송 출력을 나눠 확인하는 근무자.',topics:[['limits','지금 확인할 수 있는 것을 묻는다'],['rest','잠깐 쉬었는지 묻는다']]}
};
function present(r,place){return Object.keys(people).filter(n=>{const p=people[n];if(!r.flags.includes(p.flag))return false;if(n==='윤서'&&!r.flags.includes('yunseoJoined'))return place==='relay';return true;});}
function dialogue(r,name,topic){const f=x=>r.flags.includes(x);const pair=(a,b)=>[{who:'나',text:a},{who:name,text:b}];
 if(name==='나래'&&topic==='now')return f('naraStabilized')?pair('지금도 다른 말 들려?','지금은 네 말만. 아까처럼 멈추면, 네가 여기 있다고 한 번만 말해 줘.'):f('naraDisconnected')?pair('조금 더 쉴래?','응. 안 들린다고 괜찮은 건 아닌 것 같아. 내가 먼저 가자고 해도 한 번만 더 물어봐 줘.'):pair('잠깐 쉬었다 갈까요?','문만 확인하고요. 닫히는 소리 들으니까 자꾸 뒤를 보게 되네요.');
 if(name==='나래')return pair(f('familiarNara')?'점검표는 내가 들고 있을까?':'점검표 좀 다시 볼 수 있어요?',f('familiarNara')?'응. 마지막 줄, 지우지 말아 줘. 내가 괜찮다고 우겨도.':'네. 번호로 답하라는 줄은 제가 쓴 거예요. 아래 젖은 부분은 밝은 데서 같이 봐요.');
 if(name==='서진'&&topic==='family')return f('haewonRescued')?pair('해원이는 어때요?','자꾸 가방부터 만져요. 약 잘못 전했다고 혼날 줄 알았나 봐요. 그냥 옆에 있을게요, 지금은.'):pair('동생 찾으면 뭐부터 하고 싶어요?','혼내려고 했는데요. 지금은…… 얼굴부터 보고요. 실제로 앞에 있는지, 그거부터.');
 if(name==='서진')return pair('사진 다시 봐도 돼요?','여기요. 우비는 노란색이고 왼손 검지에 반창고 있어요. 제가 찍은 사진이에요. 뒷면 시각만 보지는 말아 주세요.');
 if(name==='도윤'&&topic==='hand')return pair('가방은 제가 들까요?','아, 또 이 손으로 들려고 했네요. 부탁드릴게요. 걸을 수는 있어요. 못 하는 건 먼저 말할게요.');
 if(name==='도윤')return pair('이쪽 길 기억나요?','기억은 나요. 그래도 같이 바닥 봅시다. 오늘도 그대로라고 말할 자신은 없어서요.');
 if(name==='해원'&&topic==='bag')return pair('가방 안은 괜찮아?','메모 주머니는 안 젖었어요. 약은 다시 확인받아야 할 것 같고요. 가방 놓고 나와도 된다고 말해 줘서 고마워요.');
 if(name==='해원')return pair('지금은 무슨 소리 들려?','발소리요. 제 것 말고도요. 이번에는 앞에서 걸어가는 사람 보면서 들으려고요.');
 if(name==='수호'&&topic==='choice')return pair('지금은 어떻게 하고 싶어요?','같이 걷고 싶어요. 누가 대신 정해 준 말처럼 들려도, 지금 제가 하는 말은 그거예요.');
 if(name==='수호')return pair('잠깐 수신기 꺼 둘까요?','네. 혼자 있을 땐 못 놓겠더니 지금은 괜찮네요. 대신 뒤처지면 불러 주세요.');
 if(name==='윤서'&&topic==='limits')return pair('지금도 현장은 안 보여요?','네. 같이 나온 곳 말고는요. 화면에 완료라고 뜨면 무슨 완료인지 먼저 물을게요.');
 return pair('잠깐 쉬었어요?','컵만 세 번 채웠어요. 한 모금도 안 마셨네요. 이거 마시고, 아는 데까지만 얘기할게요.');
}
const api={places,regions,people,present,dialogue};root.YKWorld=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
