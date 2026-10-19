# v6.0 이미지 제작 기록

내장 image_gen 도구를 사용했습니다. 새 이미지 2개를 프로젝트의 assets/title.webp와 assets/nara-scene.webp에 WebP로 저장했습니다. 나래 장면은 기존 인물 초상을 얼굴·의상 참고로 사용했습니다. 나머지 현장·인물·엔딩 이미지는 이전 프로젝트에서 재사용했습니다. 새 이미지가 전체 게임의 모든 에셋을 대체하지는 않습니다.

## 시작 배경

Use case: illustration-story. Asset type: title screen background for an original Korean coastal folk horror game called Yeoulkkeut, no lettering. Scene: a small contemporary South Korean fishing village at 4:17 am, wet narrow concrete lane leading down to an empty harbor, modest low houses, a weathered village public-address loudspeaker on a utility pole, fishing floats and one warm window, distant sea mist, blue-grey dawn with a muted amber safety lamp. Painterly realistic cinematic game background, detailed tactile surfaces, restrained unnerving atmosphere, no monster, no people, no blood, no visual infection, no Chinese architecture, no pagodas, no legible text, no interface, no watermark. Wide landscape composition, important harbor and loudspeaker in center-safe area for mobile crop, darker left lower third for HTML title overlay.

## 나래 장면

Use case: compositing. Asset type: cinematic in-game scene, wide landscape for Korean coastal horror. Reference image is ONLY identity and costume reference for Nara: preserve her recognizable Korean face, short dark hair and worn dark field jacket, do not copy portrait background. Place Nara at the right third of a modest contemporary South Korean harbor waiting room, seated near a damp doorway, looking at a small brass keyring held motionless between her fingers; her lips are barely parted as if about to repeat a broadcast, expression confused and concerned rather than evil. An old wall-mounted public address speaker and stopped wall clock are in soft focus; empty wooden benches, worn pale mint paint, blue-grey predawn light, small amber bulb. Painterly realistic cinematic game background matching restrained Korean coastal horror. Main subject visible in center-safe crop. No blood, no monster transformation, no text, no letters, no interface, no watermark. This is a subtle story clue image, not a jump scare.

## v6.2 전용 장면

내장 imagegen으로 세 장면 생성 후 WebP 변환. 창고의 해원은 노란 우비와 약품 가방을 유지하며 중복 외투를 제거하는 후속 편집을 적용했다. 시장 이미지는 판자 아래 흰 선과 상자 위의 잘못된 길을 구분하고, 부두 이미지는 케이블을 분리한 뒤 쉬는 나래를 묘사한다.

## v7.4 생성 이미지 · built-in imagegen

- assets/haewon-photo.webp: 기존 assets/haewon.webp를 인물 동일성 참고로 사용. 프롬프트: "Use case: identity-preserve. Game prop: a candid photograph of Haewon before the horror events, matching the Korean young female character in the reference: same facial identity, short black bob, mustard yellow raincoat and dark medicine satchel. Landscape 3:2 photo, waist up outside a Korean coastal clinic on an ordinary overcast day, calm slight smile, clean raincoat. Her left hand casually grips the satchel strap near her chest, small beige bandage on LEFT INDEX finger, natural anatomy. Medium realistic painted photographic style matching reference, muted nostalgic colors. This is the actual photograph content, full bleed, no hands holding photo, no frame, no text, no watermark, no additional people. Preserve identity and recognizable coat/bag; avoid horror injuries or new badges." 결과 사진에는 반창고가 뚜렷하지 않아, 대사에서는 사진 속 우비·가방과 서진이 별도로 설명하는 반창고를 구분함.
- assets/prop-paper.webp: "Use case: product-mockup. Asset for a Korean coastal horror game, a SINGLE flat old cream paper sheet scanned straight from above, fills entire portrait canvas with absolutely no surrounding desk, no perspective. Subtle paper fibres, softened worn edges, two fold creases one horizontal one vertical, faint water tide mark only in the lower right quarter, blank empty light cream center for readable HTML text. Realistic physical paper texture muted aged ivory, no writing, numbers, symbols, typography, hands, clips, shadows or other objects. Not a UI mockup. The game will crop this same paper texture onto number tickets and a handwritten maintenance note."
- assets/erosion-growth.webp: "Use case: stylized-concept. Asset type: transparent screen-edge infection overlay for a grounded Korean psychological horror game. Wide landscape 3:2 PNG, actual transparent background, center 65 percent completely transparent. Fine damp black organic filaments, salt-stained translucent gray film and branching veinlike fibres creeping inward from LEFT and RIGHT and bottom edges. Small dense clusters confined to corners, asymmetric, realistic material texture with subtle dull cold green highlights, no glowing neon. Absolutely no people, hands, faces, eyes, text, symbols, user interface, solid background, checkerboard pattern or full-screen black fill. The artwork must feather smoothly into genuine transparent alpha toward the empty center. This is an overlay on existing artwork, not a new background." 중앙 알파 0 확인. 리사이즈와 WebP 압축으로 게임에 포함.

## RC1 사건 이미지 — built-in image_gen

제작 방식: 기본 image_gen. 원본은 생성 결과로 보관하고 프로젝트에는 WebP 인코딩 파일을 사용함. 기존 나래·도윤 초상을 인물 참고로 사용.

- `assets/school-separated.webp`: 한국 해안 공포 게임의 폐교 복도, 기존 나래의 얼굴과 남색 작업복 유지, 철망 유리문 안쪽에서 손바닥을 대고 바깥을 보는 나래, 바깥 손과 문손잡이, 새벽 청록 그림자와 교실의 작은 황색 조명. 중앙에 인물 배치, 글자·UI·유혈 없음.
- `assets/school-pledge.webp`: 젖은 학교 명부에 낡은 빈 종이표를 검은 실로 묶는 길고 창백한 손, 반대편에서 표를 놓는 사람 손, 작은 황동 종, 낡은 책상, 새벽 청록과 약한 황색 조명. 글자·숫자·얼굴·유혈 없음. 정확한 번호는 별도 소품 화면의 실제 글자로 표시.
- `assets/nara-wrist.webp`: 기존 나래의 남색 작업복과 건강한 손, 나무 벤치 위 열쇠와 분리한 녹음기 케이블, 손과 소매에 드리운 배선 같은 초자연적 그림자, 차가운 새벽과 대기소 조명, 글자·UI 없음. 손상이나 상처를 보여 주는 그림이 아님.
- `assets/ferry-interruption.webp`: 부두에 묶인 작은 한국 연안 대피선 내부, 공용 안내 스피커를 바라보는 나래, 높은 발판 옆 오른손으로 버티는 도윤과 왼손 붕대, 기존 인물의 얼굴·작업복 유지, 창밖의 부두와 계류 줄, 청록 새벽과 선실의 황색 조명, 글자·UI·침몰·유혈 없음.


## SCENE_ART.md 통합 기록

# 이동·장면 연출용 이미지 제작

내장 imagegen으로 생성한 두 이미지를 WebP로 변환해 프로젝트에 통합함.

- assets/village-map.webp: 해솔리의 위치와 길을 보여 주는 지도 배경. 장소명·길·버튼은 코드로 표시함.
- assets/school-warden.webp: 학교 대본의 종·명부·종이 얼굴에 맞춘 형체. 전체 신체를 보존하고 투명도를 유지해 저장함.

## 지도 프롬프트

Use case: illustration-story. Asset type: illustrated background for an interactive map in an original Korean coastal horror game. Portrait 4:5, straight overhead cartographic drawing on aged blue-grey waterproof field paper, contemporary small South Korean fishing village in predawn darkness. Coast and sea occupy far right fifth, small harbor and pier upper right near x70% y13%. Modest waiting hall upper left x14% y17%, central public square x36% y30%, school buildings left center x18% y52%, clinic center x48% y49%, drainage works lower left x31% y75%, small relay shack bottom center x57% y81%, archive building lower right x77% y70%, covered market upper right x76% y38%. Thin weathered paths connect these landmarks in a plausible village street network. Most important use clear large empty paper areas around landmarks for interactive Korean labels to be added by code. Hand drawn restrained ink and watercolor, precise architectural silhouettes, low saturation graphite, desaturated teal sea and faint amber windows. Mood mysterious, not a fantasy world map. NO text, NO letters, NO numbers, NO map pins, NO UI buttons, NO modern navigation app graphics, NO Chinese architecture, NO characters, NO monsters, NO decorative compass rose, NO watermark.

## 학교 형체 프롬프트

Use case: illustration-story. Asset type: transparent full-body antagonist sprite for a Korean folk-horror narrative game. One unnervingly tall, narrow humanlike school attendance keeper, contemporary Korean rural school setting, wearing a weathered dark grey caretaker coat and trousers, standing in three quarter frontal view. The head has no visible human face: a SMALL pale attendance slip hangs where its face should be, completely blank and unlettered, suspended by thread. A small old brass handbell hangs beside the paper from one elongated hand. The other hand holds an OPEN worn attendance ledger against its chest, blank faint columns with no legible writing. Long thin fingers, uncomfortable stillness, crooked posture, ordinary worn shoes. Restrained painterly realistic game illustration, cold grey and pale paper, subtle dull brass. IMPORTANT this is a distinct attendance-keeper creature tied to a no-speaking school rule; NOT a zombie, not a gas mask, not a mouth speaker, not a muscular monster. Entire body and fingers and bell visible, centered with breathing room, no ground, isolated on genuine transparent background, no scenery, no gore, no text, no watermark.


## MESSAGE_TERMINAL_ART.md 통합 기록

# 문자 수신 단말기 제작

내장 imagegen으로 넓은 문자 화면과 세 개의 키가 있는 단말기를 생성하고 assets/message-terminal.webp에 RGBA WebP로 통합함. 화면 내용과 버튼 이름은 이미지에 굽지 않고 코드로 표시함. 기기 외곽을 자르지 않고 전체 비율을 유지함. 사건 기록은 기본 메뉴에만 남김.

## 생성 프롬프트

Use case: product-mockup. Asset type: game interface background plate, exactly frontal portable TEXT MESSAGE RECEIVER, no antenna and no walkie talkie parts. Portrait 4:5 composition, the COMPLETE wide rectangular device including all four rounded corners inside the canvas with 4% breathing room, transparent background. A compact thick field data terminal with weathered dark blue-grey painted steel and rubber corners, four small screws, small amber indicator at upper right. One very LARGE absolutely blank deep green flat LCD window occupying x10% to90% and y11% to73%, straight aligned rectangular screen, NO text or symbols inside because live accessible text will be overlaid by code. Along the bottom three equal wide tactile rectangular keys with blank unlettered dark brass keycaps, each centered at x23%,50%,77%, from y80% to92%. NO knob, NO antenna, NO microphone, NO speaker grille, NO side handles, NO additional controls, NO labels, NO logo, NO letters, NO watermark. Detailed realistic painterly game prop, consistent subtle aged materials for Korean coastal horror, practical readable silhouette, restrained edge lighting, no dramatic black background, no human hands, no scenery. All device edges must be fully visible.


# v8.3 제작 이미지와 지시문

제작: 기본 제공 image_gen. 기존 수문 UI를 대체하는 프로젝트용 이미지. 첫 수문 그림을 기준으로 상태 변형을 생성했으며, 글자·UI는 이미지에서 제외했다. 원본 1536×1024를 게임에서 쓸 1440×960 WEBP로 변환했다.

- assets/sluice-open.webp: “Straight-on inspection view of a rusted green steel vertical seawater sluice gate between concrete piers, gate raised with wide visible bottom opening, sea rushing toward camera. Red handwheel at right with mechanical spindle. Grounded Korean coastal pump station; cold teal gray, photographic painted horror-game detail. No people, monsters, writing or interface.”
- assets/sluice-moving.webp: 원본 편집. “Preserve camera, side walls, wheel, lighting and corrosion. Lower the same steel gate vertically so the opening is visibly narrower. Sea water still pushes toward camera with reduced flow. Same physical location; no new objects or text.”
- assets/sluice-narrow.webp: 원본 편집. “Lower the entire gate until the bottom edge is near 72 percent of the image height. Cover most of the sea view with matching steel, leaving a narrow low stream under the gate. Keep camera, concrete walls and red wheel position.”
- assets/sluice-closed.webp: 원본 편집. “Lower the gate all the way onto the bottom seal. No gap, no visible sea or horizon through the doorway. Inflow has stopped. Wet concrete and shallow still puddles remain, with no rushing current. Preserve exact framing and machinery.”
- assets/clue-paper.webp: “Full-bleed blank offwhite 1990s office paper, orthographic top down, fine cellulose fibers, soft central fold, blue-gray damp tidemarks concentrated in lower quarter and outer corners. Quiet upper central area for black Korean text to be typeset later. No letters, numbers, symbols, sketches, props or medieval parchment.”

적용: 수문 위치 값 3~4는 열림, 2는 하강 중, 1은 좁은 틈, 0은 닫힘. 각인·단서 문구·번호·천공 상태는 게임 데이터로 표시한다. 새 질감은 기존 prop-paper.webp를 대체하며, 오래된 주소가 캐시에 남지 않도록 clue-paper.webp로 이름을 바꿨다.
