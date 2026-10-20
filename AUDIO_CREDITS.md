# 잔향 04:17 — 음악 크레딧과 게임용 편집

'Sanctuary' by Scott Buckley – released under CC-BY 4.0. www.scottbuckley.com.au
'Incantation' by Scott Buckley – released under CC-BY 4.0. www.scottbuckley.com.au
'Undertow' by Scott Buckley – released under CC-BY 4.0. www.scottbuckley.com.au

원곡과 저작자: Scott Buckley. 라이선스: https://creativecommons.org/licenses/by/4.0/

- Sanctuary 원곡: https://www.scottbuckley.com.au/library/sanctuary/
- Incantation 원곡: https://www.scottbuckley.com.au/library/incantation/
- Undertow 원곡: https://www.scottbuckley.com.au/library/undertow/
- 사용 안내: https://www.scottbuckley.com.au/library/using-this-music/

## 이번 게임에서 변경한 내용

게임용 구간 발췌·EQ·음량 조정·교차 연결·페이드를 적용한 편집본이며, 원곡의 악기별 재편곡이나 작곡가의 공식 리믹스가 아니다. 완성된 MP3를 편집했으며 특정 악기·보컬을 분리하지 않았다. 44.1kHz 스테레오 MP3 112kbps로 인코딩했다.

| 파일 | 원곡 구간 | 게임 편집 길이 | 처리와 용도 |
|---|---|---|---|
| sanctuary.mp3 | 00:00–01:20 | 76초 | 앞뒤 4초를 교차 연결한 반복 구간. 인코딩 경계 클릭을 줄이는 50ms 가장자리 처리. 65Hz 이하·7.2kHz 이상 완화, 2.6kHz -2dB. 탐색 장면 사이에 이어 재생. |
| incantation.mp3 | 00:06–00:30 | 24초 | 초반의 낮은 강도 구간. 4.5kHz 이상 완화, 2초 진입·6초 종료. 위협·미확인 신호에서 한 번 재생. |
| undertow.mp3 | 00:00–01:44 | 104초 | 초반부 발췌. 8kHz 이상 완화, 2초 진입·6초 종료. 모든 결말에서 낮게 시작, 표시 후 최소 8초가 지나고 마지막 문단이 화면 안에 들어오면 서서히 상승. |

MP3 출력 측정: Sanctuary -21.44 LUFS / -3.48 dBTP, Incantation -24.08 LUFS / -7.42 dBTP, Undertow -21.73 LUFS / -3.71 dBTP. 실제 게임은 사용자 볼륨·효과음 순간 감쇠·장면 전환 페이드를 추가 적용하므로 이보다 낮게 들린다. 음량의 주기적인 흔들림은 제거했다.

음악은 Web Audio GainNode로 조절하고 미지원 환경에서는 HTMLAudio 볼륨 조절로 돌아간다. 숨긴 탭·시작 화면에서는 정지한다. ‘잠깐 재생’은 기존 18~34초 제한을 유지하며, 위협·엔딩곡은 ‘계속 재생’ 설정에서도 무한 반복하지 않는다. 발소리·문·수신음은 별도 효과음이다.

자동 파형·디코딩·브라우저 재생 검사는 실제 iPhone의 음향 출력이나 음악의 분위기 적합성에 대한 청취 평가를 대신하지 않는다.
