import { useState } from 'react';

const regionData = {
  서울: {
    programs: [
      {
        name: '안심 집수리 보조사업',
        target: '사용승인 후 10년 이상 저층주택 (단독·다가구·다세대·연립)',
        who: '① 주거취약가구: 기초수급자·차상위·한부모가족 등 중위소득 이하\n② 반지하 주택\n③ 주택성능개선지원구역 내 20년 이상 주택',
        amount:
          '① 주거취약가구: 공사비 80%, 최대 1,200만원\n② 반지하: 공사비 50%, 최대 600만원 (빗물 유입 방지 시설 등)\n③ 지원구역: 공사비 50%, 최대 1,200만원',
        works: '단열·방수·창호·설비, 침수·화재 안전시설, 빗물 유입 방지 시설',
        note: '보조사업: 통상 4월경 신청 (자치구별 상이) / 융자사업: 예산 소진 시까지 상시 접수\n\n[위반건축물 기준]\n① 건축물대장에 위반건축물로 표기된 주택은 지원 불가\n② 예외: 불법건축물 기준이 해소(양성화)된 옥탑방 — 단, 건축물대장에 양성화 사실이 명확히 기재된 경우에 한함\n③ 반지하 주택: 건축물대장·현황이 지하층이어야 하며, 창고 등 비주거 용도 사용 시 제외',
        apply: '주택 소재 자치구 담당부서 / 집수리닷컴(jibsuri.seoul.go.kr)',
        url: 'https://jibsuri.seoul.go.kr',
        color: 'blue',
      },
      {
        name: '안심 집수리 융자 지원',
        target: '사용승인 후 20년 이상 저층주택 (서울 전 지역)',
        who: '주택 소유자 (소득 제한 없음)',
        amount: '최대 6,000만원(단독) / 연 0.7% 고정금리',
        works: '지붕·외벽·단열·창호·도배·장판·설비 등 전반',
        note: '공시가격 9억원 이상·재개발구역 주택 제외. 최근 3~5년 내 유사 지원 수혜자 신청 불가. 지방세 체납 시 탈락',
        apply: '관할 자치구 담당부서 / 집수리닷컴',
        url: 'https://jibsuri.seoul.go.kr',
        color: 'green',
      },
    ],
    contact:
      '서울주거포털 집수리닷컴 (jibsuri.seoul.go.kr) / 서울시 주택정책과 ☎ 02-120',
    tip: '집수리닷컴에서 찾아가는 무료 상담 신청 가능. 공사업체 선정 전 상담 필수',
  },
  경기: {
    programs: [
      {
        name: '소규모 노후주택 집수리 지원',
        target:
          '단독주택: 사용승인 20년 이상\n소규모 공동주택(빌라 등): 15년 이상',
        who: '도내 전 지역 소유자\n우선순위: 주거취약계층 > 반지하 > 중위소득 100% 이하',
        amount:
          '공사비 90% 지원 (자부담 10%)\n• 단독주택: 최대 1,200만원\n• 공동(공용부): 최대 1,600만원\n• 공동(전유): 최대 500만원\n※ 기초수급자 등 취약계층: 자부담 면제(100% 지원)',
        works:
          '지붕·외벽·단열·방수공사, 경관개선(담장·대문), 방범창 등 안전시설',
        note: '제외: 공시가격 9억원 이상, 재개발구역. 2025년 194개 지역 추진. 시·군별 일정 상이',
        apply: '해당 시·군 도시재생·주택 담당부서',
        url: 'https://www.gg.go.kr',
        color: 'purple',
      },
    ],
    contact: '경기도청 도시재생과 ☎ 031-8008-3800 / 각 시·군 담당부서',
    tip: "'찾아가는 집수리 기술자문' 서비스 활용 가능. 불법 건축물·세금 체납 시 지원 불가",
  },
  인천: {
    programs: [
      {
        name: '남동구 — 마을주택관리소 사업',
        target: '사용승인 후 20년 이상 경과 주택',
        who: '중위소득 50~70% 이하 (수급자·장애인·국가유공자 등 우선)',
        amount: '가구당 최대 500만원',
        works: '지붕·외벽·단열·창호·내부 마감 등',
        note: '남동구 거주 확인 필수. 타 구는 해당 구청에 별도 확인',
        apply: '인천 남동구청 주택과',
        url: 'https://www.namdong.go.kr',
        color: 'orange',
      },
      {
        name: '중구 — 저층주거지 재생사업',
        target: '월남촌 사랑마을 등 특정 구역 내 20년 이상 노후 주택',
        who: '해당 구역 주택 소유자',
        amount:
          '공사비 80% 지원\n• 단독주택: 최대 1,200만원\n• 공동주택 공용부: 최대 1,600만원',
        works: '지붕·외벽·단열·창호 등',
        note: '구역 지정 여부 사전 확인 필수. 구역 외는 주거급여 수선유지급여 활용',
        apply: '인천 중구청 도시재생과',
        url: 'https://www.icjung.go.kr',
        color: 'teal',
      },
    ],
    contact: '인천시 주택정책과 ☎ 032-440-4749 / 해당 자치구청 주택·도시재생과',
    tip: '재생사업 구역 여부는 인천시 도시재생지원센터 또는 해당 구청에 문의. 구별 지원 조건 상이',
  },
  부산: {
    programs: [
      {
        name: '희망의 집수리 사업',
        target: '저소득 주거 취약가구 노후 주택',
        who: '중위소득 60% 이하 가구 (반지하 우선 지원)',
        amount: '도배·장판·단열 등 18개 항목 수리 지원',
        works: '도배·장판·단열·창호·설비 등 18개 항목',
        note: '반지하 주택 우선 지원. 구·군별 예산 배정 상이, 조기 신청 권장',
        apply: '부산시 각 구·군 건축·주택 담당부서',
        url: 'https://www.busan.go.kr',
        color: 'red',
      },
    ],
    contact: '부산시 도시주택국 ☎ 051-888-3700',
    tip: '청년모두家(공공임대 임대료 지원), 청년 중개보수·이사비(최대 40만원) 지원도 별도 확인',
  },
  대구: {
    programs: [
      {
        name: '노후 공동주택 공용시설 수리비 지원 (북구)',
        target: '사용검사 후 10년 이상, 20세대 미만 소규모 공동주택',
        who: '북구 소재 입주자대표회의',
        amount: '공용시설 수리비 70% 지원',
        works: '옥상·담장·주차장·복도·경로당 등 공용부분',
        note: '20세대 이상 단지형 아파트 및 타 구는 해당 구청에 별도 확인',
        apply: '대구 북구청 도시재생·주택과',
        url: 'https://www.daegu.go.kr',
        color: 'indigo',
      },
    ],
    contact: '대구시 도시주택국 ☎ 053-803-6500 / 해당 구청 주택과',
    tip: '도시재생뉴딜사업 구역 내 추가 지원 가능. 해당 구청에 구역 포함 여부 확인',
  },
  세종대전: {
    programs: [
      {
        name: '주거취약가구 수리 지원',
        target: '노후 주택 (연수 기준 지자체 별도 확인)',
        who: '중위소득 80% 이내 주거 취약가구',
        amount: '가구당 최대 400만원 이내',
        works: '창호·단열·난방 등 집수리 (생활 필수 항목 위주)',
        note: '세종·대전 공통 기준. 지자체별 세부 조건 상이하므로 해당 구청·동사무소 확인 필수',
        apply: '해당 시청·구청·동 행정복지센터',
        url: 'https://www.gov.kr',
        color: 'teal',
      },
    ],
    contact: '세종시청 ☎ 044-300-3114 / 대전시청 ☎ 042-120',
    tip: "정부24 '보조금24' 메뉴에서 본인 인증 후 지역별 혜택 통합 조회 가능",
  },
  농어촌: {
    programs: [
      {
        name: '농촌주택개량사업 저금리 융자',
        target: '농어촌 지역 노후 주택',
        who: '농촌 주택 소유자·귀농·귀촌 예정자',
        amount:
          '신축: 최대 2억5천만원 / 증·개축·대수선: 최대 1억5천만원\n연 2% (청년 1.5%) 저금리\n※ 취득세 최대 280만원 감면 (~2027년 말)',
        works: '주택 신축·증축·개축·리모델링 전반',
        note: '취득세 감면 혜택 2027년 12월 31일까지. 귀농귀촌종합센터 상담 권장',
        apply: '농림축산식품부 / 해당 지역 농협',
        url: 'https://www.returnfarm.com',
        color: 'green',
      },
      {
        name: '농촌 빈집 철거 보조금',
        target: '1년 이상 방치된 농촌 빈집',
        who: '빈집 소유자 (전국)',
        amount: '일반: 최대 300만원 / 슬레이트(석면) 지붕: 최대 400만원',
        works: '건물 철거, 석면·슬레이트 안전 처리 포함',
        note: '지자체 지정 업체 사용 의무. 사전 신청 후 진행 필수',
        apply: '해당 읍·면·동 사무소 또는 시·군청 농촌개발과',
        url: 'https://www.gov.kr',
        color: 'yellow',
      },
      {
        name: '슬레이트 지붕 철거 지원 (전국)',
        target: '슬레이트(석면) 지붕 주택 — 소규모 주택 우선',
        who: '전국 슬레이트 지붕 건물 소유자',
        amount: '주택 기준 최대 700만원 한도 내 철거비 지원',
        works: '석면 슬레이트 철거 및 안전 처리',
        note: '반드시 지자체 신청 후 지정 업체 사용. 자의적 철거 시 지원 불가',
        apply: '환경부 / 해당 시·군·구 환경부서',
        url: 'https://www.me.go.kr',
        color: 'gray',
      },
    ],
    contact: '귀농귀촌종합센터 ☎ 1899-9097 / 각 읍·면·동 사무소',
    tip: '그린리모델링 이자지원(창호·단열 공사 이자 국가 지원)은 전국 공통 — 에너지공단 ☎ 1588-6106 문의',
  },
};

const docsData = [
  {
    category: '주택 수리·리모델링 지원',
    subtitle: '서울·경기·인천 등 집수리 보조금·융자',
    icon: '🔨',
    color: 'blue',
    groups: [
      {
        title: '기본 서류',
        items: [
          { text: '지원 신청서 (해당 기관 양식)', required: true },
          { text: '개인정보 수집·이용 동의서', required: true },
          { text: '신분증 사본 (주민등록증 또는 운전면허증)', required: true },
        ],
      },
      {
        title: '소유 및 자격 증빙',
        items: [
          { text: '건축물대장 (위반건축물 여부 확인)', required: true },
          { text: '등기사항전부증명서 (소유자 확인)', required: true },
          { text: '지방세 완납 증명서 ⚠ 체납 시 지원 불가', required: true },
          {
            text: '기초생활수급자·차상위·한부모 증명서 (해당자 — 가점·자부담 면제)',
            required: false,
          },
        ],
      },
      {
        title: '공사 관련 서류',
        items: [
          {
            text: '공사 계획서 및 견적서 (수리 항목·예상 비용 내역)',
            required: true,
          },
          { text: '공사 전 현장 사진 (수리 필요 부위)', required: true },
          {
            text: '입주자(구분소유자) 동의서 — 공동주택 공용부 수리 시: 2/3 이상 동의',
            required: false,
          },
          {
            text: '소유주(임대인) 동의서 — 임차인이 신청할 경우 필수',
            required: false,
          },
        ],
      },
    ],
    tip: '대부분의 서류는 공고일 이후 발급분만 인정됩니다. 신청 전 발급 시기를 반드시 확인하세요.',
    warnings: [
      {
        title: '위반건축물 (서울 기준)',
        body: '건축물대장에 위반건축물로 표기된 주택은 원칙적으로 지원 불가. 단, 양성화된 옥탑방은 건축물대장에 양성화 사실이 명확히 기재된 경우에 한해 신청 가능.',
      },
      {
        title: '반지하 주택 요건',
        body: "건축물대장 및 실제 현황이 '지하층'이어야 함. 창고 등 비주거 용도로 사용 중인 경우 제외.",
      },
      {
        title: '중복 지원 제한',
        body: '최근 3~5년 이내 주거급여 수선유지급여 등 유사 공공 지원을 받은 경우 신청 제한.',
      },
      {
        title: '지방세 체납',
        body: '지방세 체납 시 지원 탈락 — 사전 납부 완료 후 납세완납증명서 제출 필수.',
      },
    ],
  },
  {
    category: '청년·신혼부부 주거비·이사비 지원',
    subtitle: '부산·대구 등 주거비·중개보수·이사비 지원',
    icon: '🏡',
    color: 'green',
    groups: [
      {
        title: '가족 및 주거 확인',
        items: [
          { text: '주민등록등본 (세대원 구성·주소지 확인)', required: true },
          {
            text: '가족관계증명서(상세) (부모·배우자 관계 확인)',
            required: true,
          },
          {
            text: '임대차계약서 사본 (확정일자 날인된 계약서 또는 공공임대 계약서)',
            required: true,
          },
        ],
      },
      {
        title: '소득 및 자격 증빙',
        items: [
          { text: '건강보험 자격득실확인서 (최근 3개월분)', required: true },
          {
            text: '건강보험료 납부확인서 (소득 검증·맞벌이 여부 확인)',
            required: true,
          },
          {
            text: '혼인관계증명서(상세) — 신혼부부 전세임대료 지원 시 필수',
            required: false,
          },
        ],
      },
      {
        title: '지출 증빙 (이사비 지원 시)',
        items: [
          {
            text: '이사비·중개보수 계좌이체 내역 또는 현금영수증',
            required: true,
          },
          { text: '이사비 영수증', required: true },
          { text: '본인 명의 통장 사본 (지원금 수령용)', required: true },
        ],
      },
    ],
    tip: '건강보험 납부확인서는 최근 3개월분을 요구하는 경우가 많으므로 신청 직전 발급하세요.',
  },
  {
    category: '농어촌 빈집 정비·주택 개량',
    subtitle: '전국 공통 — 농촌 빈집 철거·개량 융자',
    icon: '🌾',
    color: 'yellow',
    groups: [
      {
        title: '빈집 철거 지원',
        items: [
          {
            text: '건축물대장 및 등기사항전부증명서 (소유자 확인)',
            required: true,
          },
          { text: '제적등본·가족관계증명서 — 소유자 사망 시', required: false },
          {
            text: '상속인 전원 동의서·위임장·인감증명서 — 소유자 사망 시',
            required: false,
          },
          {
            text: '과세 자료 또는 소유 사실 확인서 — 무허가 건물 소유 증빙 대체',
            required: false,
          },
        ],
      },
      {
        title: '농지 취득 및 주택 개량 융자',
        items: [
          {
            text: '농업경영계획서 (직업·영농 경력·영농 거리 기재 + 재직증명서 등 증빙)',
            required: true,
          },
          {
            text: '재산세 과세 증명서(전국 단위) — 무주택·1세대2주택 제외 확인',
            required: true,
          },
          { text: '귀농·귀촌 확인서 (해당자)', required: false },
        ],
      },
    ],
    tip: '소유자가 사망한 경우 상속인 전원의 동의·인감이 필요합니다. 상속 정리를 먼저 완료하거나 법무사 조력을 받는 것을 권장합니다.',
  },
  {
    category: '그린리모델링 및 기타',
    subtitle: '에너지 성능 개선 공사·대리 신청',
    icon: '♻️',
    color: 'teal',
    groups: [
      {
        title: '그린리모델링 — 정산 서류 (공사 완료 후)',
        items: [
          { text: '세금계산서 (공사비)', required: true },
          { text: '준공검사조서', required: true },
          { text: '공사 전·후 사진 대지', required: true },
          { text: '자재 납품확인서', required: true },
        ],
      },
      {
        title: '대리 신청 시 추가 서류',
        items: [
          { text: '위임장 (위임자 자필 서명)', required: true },
          { text: '위임자 신분증 사본', required: true },
          { text: '수임자(대리인) 신분증 원본', required: true },
        ],
      },
    ],
    tip: '그린리모델링은 공사 완료 후 정산 서류가 매우 까다롭습니다. 공사 전·중·후 사진을 단계별로 촬영해 두세요.',
  },
];

const checklistData = {
  기본서류: {
    icon: '📋',
    color: 'blue',
    items: [
      {
        id: 'd1',
        text: '등기사항전부증명서 (갑구·을구 전체) — 방문 당일 최신본',
        critical: true,
      },
      {
        id: 'd2',
        text: '건축물대장 (일반·집합) — 용도·면적·위반건축물 여부',
        critical: true,
      },
      { id: 'd3', text: '토지등기사항전부증명서', critical: true },
      {
        id: 'd4',
        text: '토지이용계획확인원 — 용도지역·도시계획시설 저촉 여부',
        critical: false,
      },
      { id: 'd5', text: '지적도 (토지 경계·접도 확인)', critical: false },
      {
        id: 'd6',
        text: '공시지가 확인 (국토부 공시지가 열람)',
        critical: false,
      },
    ],
  },
  권리관계: {
    icon: '⚖️',
    color: 'red',
    items: [
      {
        id: 'r1',
        text: '근저당·저당권 설정 여부 및 채권최고액 확인',
        critical: true,
      },
      { id: 'r2', text: '가압류·가처분·가등기 존재 여부', critical: true },
      { id: 'r3', text: '전세권·지상권·지역권 설정 여부', critical: true },
      {
        id: 'r4',
        text: '임차인 존재 시: 전입신고일·확정일자·보증금 금액',
        critical: true,
      },
      { id: 'r5', text: '경매개시결정 여부 (등기부 확인)', critical: true },
      {
        id: 'r6',
        text: '재건축·재개발 구역 편입 여부 (정비사업정보시스템)',
        critical: false,
      },
    ],
  },
  건물상태: {
    icon: '🏠',
    color: 'orange',
    items: [
      { id: 'b1', text: '외벽·지붕 균열·누수·박리 흔적 확인', critical: true },
      {
        id: 'b2',
        text: '지하실·반지하 침수 흔적 (벽면 수위 자국)',
        critical: true,
      },
      { id: 'b3', text: '창호 단열 상태 (결로·곰팡이 흔적)', critical: false },
      { id: 'b4', text: '배관·수도·보일러 상태 (녹물·소음)', critical: false },
      { id: 'b5', text: '전기 배선·분전함 노후화 여부', critical: false },
      { id: 'b6', text: '불법 증·개축 여부 (건축물대장 대조)', critical: true },
      {
        id: 'b7',
        text: '석면·슬레이트 지붕 여부 (노후 건물)',
        critical: false,
      },
    ],
  },
  주변환경: {
    icon: '🗺️',
    color: 'green',
    items: [
      {
        id: 'e1',
        text: '도로 접도 조건 확인 (건축허가 가능 폭 4m 이상)',
        critical: true,
      },
      {
        id: 'e2',
        text: '대중교통 접근성 (버스·지하철 도보 거리)',
        critical: false,
      },
      {
        id: 'e3',
        text: '혐오시설 인근 여부 (쓰레기 처리장·장례식장 등)',
        critical: false,
      },
      { id: 'e4', text: '소음원 확인 (간선도로·철도·공장)', critical: false },
      {
        id: 'e5',
        text: '일조권·채광 (남향 여부, 주변 건물 높이)',
        critical: false,
      },
      {
        id: 'e6',
        text: '주변 신규 개발 계획 (호재·악재 판단)',
        critical: false,
      },
      {
        id: 'e7',
        text: '학군·편의시설 (마트·병원·학교) 거리',
        critical: false,
      },
    ],
  },
  점유확인: {
    icon: '👥',
    color: 'purple',
    items: [
      {
        id: 'o1',
        text: '현재 거주자 확인 (세입자인지 소유자인지)',
        critical: true,
      },
      {
        id: 'o2',
        text: '임대차계약서 원본 확인 (계약기간·보증금·월세)',
        critical: true,
      },
      {
        id: 'o3',
        text: '전입세대 열람원 확인 (실제 거주자 수)',
        critical: true,
      },
      {
        id: 'o4',
        text: '명도 일정 협의 (잔금일 기준 이사 완료 확인)',
        critical: true,
      },
      {
        id: 'o5',
        text: '관리비 체납 여부 (공동주택 관리사무소 문의)',
        critical: false,
      },
      { id: 'o6', text: '공과금·재산세 체납 여부 확인', critical: false },
    ],
  },
  가격협상: {
    icon: '💰',
    color: 'yellow',
    items: [
      { id: 'p1', text: '국토부 실거래가 최근 3년 비교 분석', critical: true },
      { id: 'p2', text: '공시지가 대비 매도호가 비율 확인', critical: false },
      {
        id: 'p3',
        text: '리모델링·수리 예상 비용 감안한 실질 가격 산정',
        critical: false,
      },
      { id: 'p4', text: '인근 동일 면적 급매물 비교', critical: false },
      {
        id: 'p5',
        text: '매도자 매도 사유·급매 여부 파악 (협상 레버리지)',
        critical: false,
      },
      {
        id: 'p6',
        text: '지원사업 해당 시 수리비 지원금 감안한 수익 계산',
        critical: false,
      },
    ],
  },
};

const REGION_KEYS = Object.keys(regionData);
const SECTION_KEYS = Object.keys(checklistData);
const COLOR_MAP = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    tag: 'bg-blue-600',
    text: 'text-blue-800',
    badge: 'bg-blue-100 text-blue-700',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-300',
    tag: 'bg-green-600',
    text: 'text-green-800',
    badge: 'bg-green-100 text-green-700',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    tag: 'bg-purple-600',
    text: 'text-purple-800',
    badge: 'bg-purple-100 text-purple-700',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    tag: 'bg-orange-600',
    text: 'text-orange-800',
    badge: 'bg-orange-100 text-orange-700',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-300',
    tag: 'bg-red-600',
    text: 'text-red-800',
    badge: 'bg-red-100 text-red-700',
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-300',
    tag: 'bg-indigo-600',
    text: 'text-indigo-800',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    tag: 'bg-yellow-600',
    text: 'text-yellow-800',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-300',
    tag: 'bg-teal-600',
    text: 'text-teal-800',
    badge: 'bg-teal-100 text-teal-700',
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    tag: 'bg-gray-600',
    text: 'text-gray-800',
    badge: 'bg-gray-100 text-gray-700',
  },
};

const SECTION_COLORS = {
  기본서류: 'blue',
  권리관계: 'red',
  건물상태: 'orange',
  주변환경: 'green',
  점유확인: 'purple',
  가격협상: 'yellow',
};

export default function App() {
  const [tab, setTab] = useState('support');
  const [selectedRegion, setSelectedRegion] = useState('서울');
  const [checks, setChecks] = useState({});
  const [propertyType, setPropertyType] = useState('주택');

  const toggleCheck = (id) =>
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalItems = SECTION_KEYS.reduce(
    (a, k) => a + checklistData[k].items.length,
    0
  );
  const checkedItems = Object.values(checks).filter(Boolean).length;
  const progress = Math.round((checkedItems / totalItems) * 100);

  const criticalUnchecked = SECTION_KEYS.reduce((acc, k) => {
    return (
      acc +
      checklistData[k].items.filter((i) => i.critical && !checks[i.id]).length
    );
  }, 0);

  const region = regionData[selectedRegion];

  return (
    <div
      style={{
        fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif",
      }}
      className="min-h-screen bg-gray-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-5">
        <h1 className="text-2xl font-bold">🏠 부동산 매수 도우미</h1>
        <p className="text-blue-200 text-sm mt-1">
          2026년 기준 · 지원금 확인 + 구비서류 + 임장 체크리스트
        </p>
      </div>

      {/* Tab */}
      <div className="flex bg-white border-b border-gray-200 shadow-sm">
        <button
          onClick={() => setTab('support')}
          className={`flex-1 py-3 text-sm font-bold transition-all ${
            tab === 'support'
              ? 'border-b-4 border-blue-600 text-blue-700 bg-blue-50'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          🏛️ 지역별 집수리 지원금
        </button>
        <button
          onClick={() => setTab('docs')}
          className={`flex-1 py-3 text-sm font-bold transition-all ${
            tab === 'docs'
              ? 'border-b-4 border-green-600 text-green-700 bg-green-50'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          📋 구비 서류
        </button>
        <button
          onClick={() => setTab('checklist')}
          className={`flex-1 py-3 text-sm font-bold transition-all ${
            tab === 'checklist'
              ? 'border-b-4 border-orange-500 text-orange-700 bg-orange-50'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          ✅ 임장 체크리스트
        </button>
      </div>

      {/* Support Tab */}
      {tab === 'support' && (
        <div className="p-4 max-w-2xl mx-auto">
          <p className="text-xs text-gray-500 mb-3 bg-yellow-50 border border-yellow-200 rounded p-2">
            ⚠️ 지원사업은 예산 소진 시 조기 마감됩니다. 반드시 해당 기관에 최신
            공고를 직접 확인하세요.
          </p>

          {/* Region Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {REGION_KEYS.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(r)}
                className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                  selectedRegion === r
                    ? 'bg-blue-700 text-white border-blue-700 shadow'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                }`}
              >
                {r === '농어촌' ? '🌾 ' : r === '세종대전' ? '🏛️ ' : '🏙️ '}
                {r}
              </button>
            ))}
          </div>

          {/* Programs */}
          <div className="space-y-4">
            {region.programs.map((prog, i) => {
              const c = COLOR_MAP[prog.color] || COLOR_MAP.blue;
              return (
                <div
                  key={i}
                  className={`rounded-xl border-2 ${c.border} ${c.bg} overflow-hidden shadow-sm`}
                >
                  <div
                    className={`${c.tag} text-white px-4 py-2 flex items-center justify-between`}
                  >
                    <span className="font-bold text-sm">{prog.name}</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">
                        대상 주택
                      </span>
                      <p className="text-sm text-gray-800 mt-0.5">
                        {prog.target}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">
                        신청 자격
                      </span>
                      <p className="text-sm text-gray-800 mt-0.5">{prog.who}</p>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${c.badge
                        .split(' ')[0]
                        .replace('text', 'bg')
                        .replace('-700', '-100')} border ${c.border}`}
                    >
                      <span className="text-xs font-bold text-gray-600">
                        💰 지원 금액
                      </span>
                      <p
                        className="text-sm font-bold mt-0.5 whitespace-pre-line"
                        style={{ color: '#1e3a5f' }}
                      >
                        {prog.amount}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">
                        지원 공사 범위
                      </span>
                      <p className="text-sm text-gray-800 mt-0.5">
                        {prog.works}
                      </p>
                    </div>
                    {prog.note && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                        <p className="text-xs text-amber-800">📌 {prog.note}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-500">
                          신청처:{' '}
                        </span>
                        <span className="text-xs text-gray-700">
                          {prog.apply}
                        </span>
                      </div>
                      <a
                        href={prog.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs px-3 py-1 rounded-full font-bold text-white ${c.tag} hover:opacity-80`}
                      >
                        사이트 →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact & Tip */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm font-bold text-blue-800 mb-1">📞 문의처</p>
            <p className="text-sm text-blue-900">{region.contact}</p>
          </div>
          {region.tip && (
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-bold text-green-800 mb-1">
                💡 활용 팁
              </p>
              <p className="text-sm text-green-900">{region.tip}</p>
            </div>
          )}

          {/* National Programs */}
          <div className="mt-4 bg-gray-800 rounded-xl p-4 text-white">
            <p className="font-bold text-sm mb-2">🇰🇷 전국 공통 지원사업</p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                • 주거급여 수선유지급여: 기준 중위소득 48% 이하 — 경보수 38만원
                / 중보수 702만원 / 대보수 1,241만원 (주민센터 신청)
              </p>
              <p>
                • 그린리모델링 이자지원: 창호·단열 공사비 대출 이자 국가 보전 →
                에너지공단 ☎ 1588-6106
              </p>
              <p>
                • 슬레이트 지붕 철거: 주택 기준 최대 700만원 → 해당 시·군·구
                환경부서 신청
              </p>
            </div>
          </div>

          {/* Pre-check warnings */}
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-bold text-sm text-red-800 mb-2">
              🚫 신청 전 필수 체크포인트
            </p>
            <div className="space-y-1.5 text-sm text-red-900">
              <p>
                ① <b>불법 건축물</b>: 무허가·위반건축물은 대부분 지원 제외 (서울
                양성화 옥탑방 예외)
              </p>
              <p>
                ② <b>중복 지원 금지</b>: 최근 3~5년 내 유사 공공 지원 수혜 시
                신청 불가
              </p>
              <p>
                ③ <b>세금 체납</b>: 지방세 체납 시 지원 탈락 — 사전 납부 완료
                필수
              </p>
            </div>
          </div>
          <div className="mt-3 mb-4 bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
            💡 <b>정부24 보조금24</b> 메뉴에서 본인 인증 후 지역별 혜택 통합
            조회 가능. 관할 <b>주민센터(행정복지센터)</b> 문의 시 신청 가능 여부
            즉시 확인.
          </div>
        </div>
      )}

      {/* Docs Tab */}
      {tab === 'docs' && (
        <div className="p-4 max-w-2xl mx-auto">
          <p className="text-xs text-gray-500 mb-3 bg-yellow-50 border border-yellow-200 rounded p-2">
            ⚠️ 공고일 이후 발급분만 인정되는 경우가 많습니다. 신청 전{' '}
            <b>정부24 보조금24</b> 또는 주민센터에서 최신 구비 서류 목록을
            확인하세요.
          </p>
          <div className="space-y-5">
            {docsData.map((section, si) => {
              const colorMap = {
                blue: {
                  header: 'bg-blue-700',
                  border: 'border-blue-300',
                  bg: 'bg-blue-50',
                  groupBg: 'bg-blue-100',
                  badge: 'bg-red-500',
                },
                green: {
                  header: 'bg-green-700',
                  border: 'border-green-300',
                  bg: 'bg-green-50',
                  groupBg: 'bg-green-100',
                  badge: 'bg-red-500',
                },
                yellow: {
                  header: 'bg-yellow-600',
                  border: 'border-yellow-300',
                  bg: 'bg-yellow-50',
                  groupBg: 'bg-yellow-100',
                  badge: 'bg-red-500',
                },
                teal: {
                  header: 'bg-teal-700',
                  border: 'border-teal-300',
                  bg: 'bg-teal-50',
                  groupBg: 'bg-teal-100',
                  badge: 'bg-red-500',
                },
              };
              const c = colorMap[section.color] || colorMap.blue;
              return (
                <div
                  key={si}
                  className={`rounded-xl border-2 ${c.border} overflow-hidden shadow-sm`}
                >
                  <div className={`${c.header} text-white px-4 py-3`}>
                    <div className="font-bold text-base">
                      {section.icon} {section.category}
                    </div>
                    <div className="text-xs opacity-80 mt-0.5">
                      {section.subtitle}
                    </div>
                  </div>
                  <div className={`${c.bg} p-4 space-y-4`}>
                    {section.groups.map((group, gi) => (
                      <div key={gi}>
                        <div
                          className={`text-xs font-bold px-2 py-1 rounded mb-2 inline-block ${c.groupBg} text-gray-700`}
                        >
                          {group.title}
                        </div>
                        <ul className="space-y-1.5">
                          {group.items.map((item, ii) => (
                            <li
                              key={ii}
                              className="flex items-start gap-2 text-sm text-gray-800"
                            >
                              <span className="mt-0.5 flex-shrink-0">
                                {item.required ? '🔴' : '🔵'}
                              </span>
                              <span>{item.text}</span>
                              {item.required && (
                                <span className="flex-shrink-0 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold self-start">
                                  필수
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {section.tip && (
                      <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs text-gray-700">
                        💡 {section.tip}
                      </div>
                    )}
                    {section.warnings && (
                      <div className="space-y-2 mt-1">
                        <p className="text-xs font-bold text-red-700">
                          🚫 신청 자격 제외 기준 (상세)
                        </p>
                        {section.warnings.map((w, wi) => (
                          <div
                            key={wi}
                            className="bg-red-50 border border-red-200 rounded-lg p-3"
                          >
                            <p className="text-xs font-bold text-red-800 mb-0.5">
                              ⚠ {w.title}
                            </p>
                            <p className="text-xs text-red-900">{w.body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 bg-gray-100 rounded-xl p-3 flex gap-4 text-xs text-gray-600">
            <span>
              🔴 <b>필수</b> 제출
            </span>
            <span>🔵 해당 시 제출</span>
          </div>

          {/* Quick links */}
          <div className="mt-3 mb-4 bg-blue-800 rounded-xl p-4 text-white text-sm">
            <p className="font-bold mb-2">📎 서류 발급 빠른 링크</p>
            <div className="space-y-1 text-blue-200 text-xs">
              <p>
                • 정부24 (정부24.com) —
                주민등록등본·가족관계증명서·건축물대장·지방세납세증명
              </p>
              <p>• 대법원 인터넷등기소 (iros.go.kr) — 등기사항전부증명서</p>
              <p>• 국민건강보험공단 (nhis.or.kr) — 자격득실확인서·납부확인서</p>
              <p>• 복지로 (bokjiro.go.kr) — 수급자·차상위 증명서</p>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Tab */}
      {tab === 'checklist' && (
        <div className="p-4 max-w-2xl mx-auto">
          {/* Progress */}
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-700">임장 진행률</span>
              <span className="font-bold text-blue-700">
                {checkedItems} / {totalItems}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background:
                    progress === 100
                      ? '#22c55e'
                      : progress > 60
                      ? '#3b82f6'
                      : '#f59e0b',
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{progress}% 완료</span>
              {criticalUnchecked > 0 ? (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                  🚨 필수 항목 {criticalUnchecked}개 미확인
                </span>
              ) : (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                  ✅ 필수 항목 모두 확인
                </span>
              )}
            </div>
          </div>

          {/* Property Type */}
          <div className="flex gap-2 mb-4">
            {['주택', '토지', '상가·오피스텔'].map((t) => (
              <button
                key={t}
                onClick={() => setPropertyType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                  propertyType === t
                    ? 'bg-orange-600 text-white border-orange-600'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {propertyType !== '주택' && (
            <div className="mb-3 bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-800">
              {propertyType === '토지'
                ? '🌿 토지 추가 확인: 지목·농취증 발급 가능 여부·개발행위허가 여부·임야 산지 구분·경사도 확인 필수'
                : '🏪 상가·오피스텔 추가 확인: 취득세 4.6%·부가세 환급 가능 여부·주택수 산입 여부·권리금 보호 여부'}
            </div>
          )}

          {/* Sections */}
          <div className="space-y-4">
            {SECTION_KEYS.map((sKey) => {
              const section = checklistData[sKey];
              const color = SECTION_COLORS[sKey];
              const c = COLOR_MAP[color];
              const done = section.items.filter((i) => checks[i.id]).length;
              return (
                <div
                  key={sKey}
                  className={`bg-white rounded-xl border-2 ${c.border} shadow-sm overflow-hidden`}
                >
                  <div
                    className={`${c.tag} text-white px-4 py-2.5 flex items-center justify-between`}
                  >
                    <span className="font-bold">
                      {section.icon} {sKey}
                    </span>
                    <span className="text-xs bg-white bg-opacity-30 px-2 py-0.5 rounded-full">
                      {done}/{section.items.length}
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                          checks[item.id] ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                            checks[item.id]
                              ? `${c.tag} border-transparent`
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {checks[item.id] && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <span
                            className={`text-sm ${
                              checks[item.id]
                                ? 'line-through text-gray-400'
                                : 'text-gray-800'
                            }`}
                          >
                            {item.text}
                          </span>
                          {item.critical && !checks[item.id] && (
                            <span className="ml-2 text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                              필수
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset */}
          <button
            onClick={() => setChecks({})}
            className="w-full mt-4 py-2.5 rounded-xl border-2 border-gray-300 text-gray-600 text-sm font-bold hover:bg-gray-100 transition-all"
          >
            🔄 전체 초기화
          </button>

          {/* Summary */}
          <div className="mt-4 bg-gray-800 text-white rounded-xl p-4 text-xs">
            <p className="font-bold mb-2">⚡ 계약 전 핵심 순서</p>
            <p className="text-gray-300">
              ① 등기부등본 확인 → ② 현장 임장 → ③ 대출 사전심사 → ④
              자금조달계획서 작성 → ⑤ 계약금 계좌이체 → ⑥ 30일 내 거래신고
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
