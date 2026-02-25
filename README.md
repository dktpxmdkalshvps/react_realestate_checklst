# 🏠 2026년 부동산 매수 도우미

> **2026년 기준** 한국 부동산 거래 시 필요한 **지자체 집수리 지원금 조회 · 구비서류 안내 · 임장 체크리스트**를 하나의 데스크톱 앱으로 통합한 실무 가이드 도구입니다.

---

## 📌 목차

1. [프로젝트 목적](#-프로젝트-목적)
2. [기술 스택](#-기술-스택)
3. [핵심 기능](#-핵심-기능)
4. [화면 구성 (스크린샷)](#-화면-구성)
5. [설치 및 실행 방법](#-설치-및-실행-방법)
6. [프로젝트 구조](#-프로젝트-구조)
7. [데이터 구조 설계](#-데이터-구조-설계)
8. [개발 과정 및 이슈](#-개발-과정-및-이슈)
9. [향후 개선 방향](#-향후-개선-방향)
10. [참고 자료 및 출처](#-참고-자료-및-출처)

---

## 🎯 프로젝트 목적

### 배경

한국에서 부동산을 매수하거나 노후 주택을 수리하려는 실수요자는 다음과 같은 어려움에 직면합니다.

- **지자체마다 다른 지원사업**: 서울·경기·인천·부산·대구 등 지역별로 지원 금액, 자격 요건, 신청 기간이 모두 다르며, 한 곳에 정리된 정보를 찾기 어렵습니다.
- **복잡한 구비서류**: 사업 유형(집수리·청년 주거·농어촌 정비)에 따라 요구 서류가 다르고, 발급 시기 제한(공고일 이후 발급분)까지 고려해야 합니다.
- **임장 시 놓치기 쉬운 항목**: 등기부등본 권리분석, 유치권·법정지상권 같은 경매 특수권리, 불법 증축 여부 등 전문적 확인 사항들이 많습니다.
- **2026년 제도 변화**: 스트레스 DSR 3단계, 다주택자 양도세 중과 배제 종료(5월 9일), 자금조달계획서 가상자산 기재 의무화 등 새로운 규제가 다수 시행됩니다.

### 해결 방향

위 문제를 해결하기 위해 **세 가지 핵심 기능**을 하나의 앱에 통합했습니다.

```
지원금 정보 조회  ──►  구비서류 안내  ──►  임장 체크리스트
(어디서 얼마?)       (뭘 준비하지?)       (현장에서 확인할 것)
```

- 인터넷 연결 없이도 오프라인으로 동작하는 **로컬 데스크톱 앱**으로 구현
- 복잡한 설치 과정 없이 `python real_estate_app.py` 한 줄로 실행
- 전문 지식 없는 일반인도 이해할 수 있도록 **구조화된 카드 UI** 제공

---

## 🛠 기술 스택

| 구분 | 기술 | 버전 | 선택 이유 |
|------|------|------|-----------|
| 언어 | Python | 3.10+ | 빠른 개발, 풍부한 생태계, 크로스플랫폼 |
| GUI 프레임워크 | **PyQt6** | 6.x | Qt6 기반의 안정적 위젯, 고해상도(HiDPI) 지원, 상업적 이용 가능(GPL/LGPL) |
| 스타일링 | Qt StyleSheet (QSS) | — | CSS와 유사한 문법으로 컴포넌트별 세밀한 디자인 제어 |
| 외부 링크 | `webbrowser` (표준 라이브러리) | — | 별도 패키지 없이 OS 기본 브라우저 연동 |
| 데이터 | Python dict / list | — | DB 없이 앱 내 구조화 데이터로 관리, 수정·배포 용이 |
| 빌드(선택) | PyInstaller | 6.x | 단일 `.exe` 배포 파일 생성 |

### PyQt6를 선택한 이유

```
Tkinter    — 기본 내장이지만 디자인 한계, 레이아웃 유연성 부족
wxPython   — 네이티브 룩앤필이나 설치가 복잡
PySimpleGUI — 간단하지만 복잡한 레이아웃 구현 어려움
PyQt6      ✔ 풍부한 위젯, QSS 스타일링, QTabWidget·QScrollArea 등 완성된 컴포넌트
```

---

## 🔑 핵심 기능

### 탭 1 — 지역별 집수리 지원금

<img width="957" height="1020" alt="image" src="https://github.com/user-attachments/assets/daf09e38-8376-4e28-9547-0b1fe9a8d291" />


```
┌─────────────────────────────────────────┐
│  지역 선택: [서울 ▼]                      │
├─────────────────────────────────────────┤
│  ┌── 안심 집수리 보조사업 ─────────────┐  │
│  │  대상 주택  │ 10년 이상 저층주택   │  │
│  │  신청 자격  │ ①취약가구 ②반지하…  │  │
│  │  지원 금액  │ 최대 1,200만원       │  │
│  │  [🔗 사이트 바로가기]              │  │
│  └────────────────────────────────────┘  │
│  🇰🇷 전국 공통 지원사업 (하단 고정)       │
└─────────────────────────────────────────┘
```

- **7개 지역** 지원: 서울, 경기, 인천, 부산, 대구, 세종·대전, 농어촌
- 콤보박스 변경 시 **동적 카드 렌더링** (기존 위젯 삭제 → 신규 생성)
- 사업별 색상 테마 구분 (blue·green·orange·purple·red·teal·yellow·gray·indigo)
- 위반건축물 기준 3단계 상세 안내 (원칙 제외 / 양성화 옥탑방 예외 / 반지하 요건)
- **사이트 바로가기** 버튼 → 시스템 기본 브라우저로 해당 기관 홈페이지 오픈

#### 수록 지원사업 목록

| 지역 | 사업명 | 최대 지원액 |
|------|--------|------------|
| 서울 | 안심 집수리 보조 | 1,200만원 |
| 서울 | 안심 집수리 융자 | 6,000만원 (연 0.7%) |
| 경기 | 소규모 노후주택 집수리 | 1,600만원 (공용부) |
| 인천 남동구 | 마을주택관리소 | 500만원 |
| 인천 중구 | 저층주거지 재생 | 1,200만원 |
| 부산 | 희망의 집수리 | 18개 항목 현물 지원 |
| 대구 북구 | 공용시설 수리비 | 공사비 70% |
| 세종·대전 | 주거취약가구 수리 | 400만원 |
| 농어촌 | 주택개량 저금리 융자 | 2억5천만원 |
| 농어촌 | 빈집 철거 보조 | 400만원 |
| 전국 | 슬레이트 지붕 철거 | 700만원 |

---

### 탭 2 — 구비 서류

<img width="957" height="1020" alt="image" src="https://github.com/user-attachments/assets/10d66b0d-09a6-4fae-87cc-d435c6b35c5f" />

```

┌─ 주택 수리·리모델링 지원 ─────────────────┐
│  ▸ 기본 서류                               │
│    🔴 지원 신청서 (해당 기관 양식)  [필수]  │
│    🔴 개인정보 수집·이용 동의서     [필수]  │
│  ▸ 소유 및 자격 증빙                       │
│    🔴 건축물대장                   [필수]  │
│    🔵 취약계층 증명서              (해당시) │
│  🚫 신청 자격 제외 기준                    │
│    ⚠ 위반건축물 (서울 기준) — …           │
└────────────────────────────────────────────┘
```

- **4개 사업 유형**별 서류 안내: 주택 수리 / 청년·신혼부부 / 농어촌 빈집 / 그린리모델링
- 🔴 **필수** / 🔵 **해당 시** 제출 구분으로 한눈에 파악
- 사업 유형별 **신청 자격 제외 기준** 경고 박스 (빨간 프레임)
- 정부24·대법원 인터넷등기소·국민건강보험공단·복지로 **빠른 링크** 버튼 5개

---

### 탭 3 — 임장 체크리스트

<img width="957" height="1020" alt="image" src="https://github.com/user-attachments/assets/c8cb62e5-e15c-4546-b67b-4652f2e53a06" />

```

┌── 임장 진행률 ──────────────────────────────┐
│  ████████████░░░░░░░░  15 / 37             │
│  🚨 필수 항목 8개 미확인                    │
└──────────────────────────────────────────────┘

📋 기본서류  [3/6]
  ☑ 등기사항전부증명서 … ★필수
  ☑ 건축물대장 …        ★필수
  ☐ 토지이용계획확인원

⚖️ 권리관계  [0/6]
  ☐ 근저당·저당권 설정 여부 … ★필수
  ☐ 가압류·가처분·가등기 …    ★필수
  …
```

- **6개 섹션 37개 항목** 체크박스
- 상단 **진행률 바** 실시간 업데이트 (색상 변화: 주황 → 파랑 → 초록)
- **필수 항목(★)** 미완료 개수 실시간 카운트 표시
- **섹션별 완료 카운트** 헤더에 실시간 표시 (`3/6`)
- 체크 완료 항목 **취소선 + 회색** 처리
- **전체 초기화** 버튼 + 확인 다이얼로그
- 하단 계약 전 핵심 6단계 순서 안내

#### 체크리스트 섹션 구성

| 섹션 | 아이콘 | 항목 수 | 필수 항목 |
|------|--------|---------|----------|
| 기본서류 | 📋 | 6 | 3 |
| 권리관계 | ⚖️ | 6 | 5 |
| 건물상태 | 🏠 | 7 | 3 |
| 주변환경 | 🗺️ | 7 | 1 |
| 점유확인 | 👥 | 6 | 4 |
| 가격협상 | 💰 | 6 | 1 |

---

## 🖥 화면 구성
<img width="957" height="1020" alt="image" src="https://github.com/user-attachments/assets/ada118a8-979c-4cb7-9c07-6925239e3b7e" />

```
┌──────────────────────────────────────────────────────────┐
│  🏠  2026년 부동산 매수 도우미          [그라디언트 헤더] │
│  2026년 기준 · 지원금 확인 + 구비서류 + 임장 체크리스트  │
├──────────────────────────────────────────────────────────┤
│  🏛️ 지역별 집수리 지원금 │ 📋 구비 서류 │ ✅ 임장 체크  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   [ 탭별 콘텐츠 — 스크롤 가능 영역 ]                     │
│                                                          │
│   ┌─── 카드 UI ────────────────────────────────────┐    │
│   │ [컬러 헤더] 사업명                              │    │
│   │ 대상 주택   │ 내용                              │    │
│   │ 지원 금액   │ 내용 (강조박스)                   │    │
│   │ 주의사항    │ 내용                              │    │
│   │                          [🔗 사이트 바로가기]  │    │
│   └────────────────────────────────────────────────┘    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  상태바: ※ 지원사업은 예산 소진 시 조기 마감됩니다 …     │
└──────────────────────────────────────────────────────────┘
```

### 색상 테마 시스템

각 지원사업과 체크리스트 섹션은 고유한 색상 테마를 가집니다.

| 색상 | 적용 대상 | 배경색 | 테두리 |
|------|-----------|--------|--------|
| Blue | 서울 보조 / 기본서류 | `#DEEAF1` | `#2E75B6` |
| Green | 서울 융자 / 농촌주택개량 | `#E2EFDA` | `#70AD47` |
| Purple | 경기 집수리 | `#EAE3F5` | `#7030A0` |
| Orange | 인천 남동구 | `#FCE4D6` | `#ED7D31` |
| Teal | 인천 중구 / 세종대전 | `#D9F1F1` | `#009688` |
| Red | 부산 / 권리관계 | `#FDECEA` | `#C00000` |
| Indigo | 대구 북구 | `#E8EAF6` | `#3949AB` |
| Yellow | 농촌 빈집 / 가격협상 | `#FFF2CC` | `#FFB300` |

---

## ⚙ 설치 및 실행 방법

### 요구사항

| 항목 | 최소 사양 |
|------|-----------|
| Python | 3.10 이상 |
| OS | Windows 10+, macOS 12+, Ubuntu 20.04+ |
| 메모리 | 256 MB 이상 |
| 화면 해상도 | 1024 × 768 이상 권장 (1280 × 800+) |

---

### 방법 1 — 기본 실행 (권장)

```bash
# 1. 저장소 클론 또는 파일 다운로드
git clone https://github.com/yourname/real-estate-helper.git
cd real-estate-helper

# 2. 가상환경 생성 (권장)
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# 3. 의존성 설치
pip install PyQt6

# 4. 실행
python real_estate_app.py
```

---

### 방법 2 — 단일 파일 실행 (venv 없이)

```bash
pip install PyQt6
python real_estate_app.py
```

---

### 방법 3 — 실행 파일(.exe) 빌드 (Windows 배포용)

```bash
# PyInstaller 설치
pip install pyinstaller

# 단일 exe 파일 빌드
pyinstaller --onefile --windowed --name "부동산매수도우미" real_estate_app.py

# dist/ 폴더에 부동산매수도우미.exe 생성됨
```

> **macOS의 경우** `--windowed` 대신 `--windowed --osx-bundle-identifier com.yourname.realestate` 옵션을 추가하면 `.app` 번들로 생성됩니다.

---

### 운영체제별 폰트 설정

`Malgun Gothic`은 Windows 기본 한글 폰트입니다. macOS/Linux에서는 자동으로 대체 폰트가 적용되지만, 명시적으로 지정하려면 `main()` 함수의 폰트 설정 부분을 수정하세요.

```python
# real_estate_app.py → main() 함수

# Windows
font = QFont("Malgun Gothic", 10)

# macOS
font = QFont("Apple SD Gothic Neo", 10)

# Ubuntu / Linux
font = QFont("Noto Sans KR", 10)
# pip install fonts-noto-cjk  (사전 설치 필요)
```

---

### 의존성 목록 (`requirements.txt`)

```
PyQt6>=6.4.0
```

표준 라이브러리(`sys`, `webbrowser`)만 추가로 사용하므로 외부 패키지는 **PyQt6 하나**뿐입니다.

---

## 📁 프로젝트 구조

```
real-estate-helper/
│
├── real_estate_app.py        # 메인 앱 (단일 파일, 983줄)
├── requirements.txt          # 의존성 (PyQt6)
└── README.md                 # 이 문서
```

### 코드 내부 구조

```
real_estate_app.py
│
├── 색상 팔레트 (C, COLOR_THEME)          # 전역 색상 상수
│
├── 데이터 레이어
│   ├── REGION_DATA      dict[지역 → 프로그램 목록]
│   ├── DOCS_DATA        list[사업유형 → 서류 그룹]
│   ├── CHECKLIST_DATA   dict[섹션명 → 체크 항목]
│   ├── QUICK_LINKS      빠른 링크 튜플 목록
│   └── NATIONAL_PROGRAMS 전국 공통 사업 문자열 목록
│
├── 공통 헬퍼 함수
│   ├── make_label()        QLabel 팩토리
│   ├── make_card()         테두리 카드 프레임
│   ├── make_tip_box()      팁/경고 박스
│   ├── make_section_header() 색상 헤더 레이블
│   └── scrollable()        QScrollArea 래퍼
│
├── UI 컴포넌트 (QWidget 서브클래스)
│   ├── SupportTab          탭 1: 지원금 조회
│   │   ├── _build()
│   │   ├── _load_region()  콤보 변경 → 동적 렌더링
│   │   └── _make_program_card()
│   │
│   ├── DocsTab             탭 2: 구비 서류
│   │   ├── _build()
│   │   └── _make_section()
│   │
│   └── ChecklistTab        탭 3: 임장 체크리스트
│       ├── _build()
│       ├── _make_section()
│       ├── _update_progress()  체크 상태 → 진행률 실시간 계산
│       └── _reset()
│
└── MainWindow (QMainWindow)
    └── _build()  헤더 + QTabWidget + 상태바 조합
```

---

## 🏗 데이터 구조 설계

### REGION_DATA 스키마

```python
REGION_DATA = {
    "지역명": {
        "programs": [
            {
                "name":   str,   # 사업명
                "target": str,   # 대상 주택
                "who":    str,   # 신청 자격 (줄바꿈 허용)
                "amount": str,   # 지원 금액
                "works":  str,   # 지원 공사 범위
                "note":   str,   # 주의사항·신청 기간
                "apply":  str,   # 신청처
                "url":    str,   # 사이트 URL
                "color":  str,   # 카드 색상 테마 키
            },
            ...
        ],
        "contact": str,          # 대표 문의처
        "tip":     str,          # 활용 팁
    },
}
```

### DOCS_DATA 스키마

```python
DOCS_DATA = [
    {
        "category": str,
        "subtitle": str,
        "color":    str,
        "groups": [
            {
                "title": str,
                "items": [
                    {"text": str, "required": bool},
                    ...
                ],
            },
        ],
        "tip":      str,
        "warnings": [
            {"title": str, "body": str},   # 빈 리스트 가능
        ],
    },
]
```

### CHECKLIST_DATA 스키마

```python
CHECKLIST_DATA = {
    "섹션명": {
        "icon":  str,
        "items": [
            {
                "id":       str,   # 고유 식별자 (d1, r1, b1…)
                "text":     str,
                "critical": bool,  # True → ★필수 배지 표시
            },
        ],
    },
}
```

> **ID 네이밍 규칙**: `d` = 기본서류, `r` = 권리관계, `b` = 건물상태, `e` = 주변환경, `o` = 점유확인, `p` = 가격협상. 각 접두사 + 순번(`d1`, `d2`…).

---

## 🔧 개발 과정 및 이슈

### 1단계 — React → PyQt6 전환 설계

이 프로젝트는 원래 **React(JSX) 웹 앱**으로 먼저 구현된 후, 동일한 기능을 PyQt6 데스크톱 앱으로 포팅하는 방식으로 개발됐습니다.

```
[1차] React JSX 앱        →  브라우저에서 동작, 탭·카드·체크박스 UI
[2차] PyQt6 데스크톱 포팅  →  오프라인 실행, .exe 배포 가능
```

#### 전환 시 주요 매핑

| React / JSX | PyQt6 |
|-------------|-------|
| `useState` | 인스턴스 변수 + `_update_progress()` |
| `<div className="...">` | `QFrame` + QSS `setStyleSheet()` |
| `<button onClick>` | `QPushButton` + `.clicked.connect()` |
| `<input type="checkbox">` | `QCheckBox` + `.stateChanged.connect()` |
| `<select>` | `QComboBox` + `.currentTextChanged.connect()` |
| `<progress>` | `QProgressBar` |
| 동적 렌더링 (`map`) | 위젯 삭제 후 재생성 패턴 |
| Tailwind CSS 색상 | QSS `background`, `border`, `color` 직접 지정 |

---

### 이슈 1 — 한국어 폰트 렌더링

**문제**: PyQt6 기본 설정에서 한국어 텍스트가 깨지거나 가독성이 낮은 폰트로 렌더링됨.

**원인**: Qt가 시스템 기본 폰트(`MS Shell Dlg 2`, `Segoe UI`)를 사용하며, 한글 글리프가 없을 경우 임의 폴백 폰트 적용.

**해결**:
```python
# main() 진입점에서 전역 폰트 강제 지정
app = QApplication(sys.argv)
font = QFont("Malgun Gothic", 10)  # Windows 한글 기본 폰트
app.setFont(font)
```

모든 `make_label()`, `make_section_header()` 등 헬퍼 함수에서도 `QFont("Malgun Gothic", size)` 를 명시적으로 지정해 개별 위젯에서도 폰트가 보장되도록 처리.

---

### 이슈 2 — QScrollArea 안 QFrame 배경색 투과

**문제**: `QScrollArea` 안에 `QFrame`을 넣었을 때, `setStyleSheet()`로 배경색을 지정해도 부모의 흰색 배경이 비쳐 카드 색상이 제대로 표시되지 않음.

**원인**: Qt의 스타일시트 상속 및 팔레트 우선순위 문제. `QScrollArea`가 기본적으로 자식 위젯에 자신의 팔레트를 전파함.

**해결**: `QFrame`의 스타일시트에 명시적으로 클래스 선택자를 사용하고, `QScrollArea` 자체 배경을 고정.

```python
# 카드 프레임
frame.setStyleSheet(
    f"QFrame {{ background:{bg}; border:2px solid {border}; "
    f"border-radius:{radius}px; padding:{padding}px; }}"
)

# 스크롤 영역
scroll.setStyleSheet(
    "QScrollArea { border: none; background: #F5F7FA; }"
)
```

**핵심 포인트**: `QFrame { ... }` 처럼 중괄호를 쓰는 **클래스 선택자 문법**을 사용해야 자식 위젯으로 스타일이 전파되지 않음. 클래스 선택자 없이 `background: red;`만 쓰면 하위 `QLabel`까지 배경이 적용되는 의도치 않은 캐스케이딩이 발생.

---

### 이슈 3 — 콤보박스 변경 시 동적 위젯 재생성

**문제**: 지역 선택 콤보박스를 변경할 때, 기존 카드 위젯들이 메모리에서 제거되지 않고 레이아웃에 중첩됨.

**원인**: Qt에서 `layout.addWidget()`으로 추가한 위젯은 레이아웃에서 `takeAt()`으로 제거해도 실제 위젯 객체는 힙에 남아있음.

**해결**: `takeAt()` 후 반드시 `deleteLater()`를 호출.

```python
def _load_region(self, region_name):
    # 기존 위젯 완전 제거
    while self.content_layout.count():
        item = self.content_layout.takeAt(0)
        if item.widget():
            item.widget().deleteLater()   # ← 이 호출이 없으면 메모리 누수

    # 새 카드 생성 후 추가
    for prog in REGION_DATA[region_name]["programs"]:
        self.content_layout.addWidget(self._make_program_card(prog))
```

---

### 이슈 4 — QProgressBar 색상 동적 변경

**문제**: 진행률에 따라 프로그레스바 색상을 초록/파랑/주황으로 동적으로 바꾸려 했으나, `setStyleSheet()`를 재호출해도 색상이 바뀌지 않는 경우 발생.

**원인**: Qt의 스타일 캐싱. 한 번 적용된 스타일시트가 다음 `setStyleSheet()` 호출 시 캐시에서 재사용될 수 있음.

**해결**: 매번 **전체 스타일시트 문자열**을 새로 생성해서 교체. 청크 색상만 바꾸는 게 아니라, 배경 스타일까지 포함한 완전한 QSS 문자열을 재할당.

```python
chunk_color = "#4CAF50" if pct == 100 else "#2196F3" if pct > 60 else "#FF9800"
self.progress_bar.setStyleSheet(
    "QProgressBar { border-radius:6px; background:#E0E0E0; }"
    f"QProgressBar::chunk {{ border-radius:6px; background:{chunk_color}; }}"
)
```

---

### 이슈 5 — 섹션별 완료 카운트 레이블 참조 관리

**문제**: 체크박스를 클릭할 때 해당 섹션의 헤더 카운트 레이블(`3/6`)을 업데이트하려면, 나중에 생성된 레이블 위젯의 참조를 어딘가에 보관해야 함.

**해결**: `ChecklistTab` 인스턴스에 딕셔너리로 레이블 참조를 저장.

```python
# _make_section() 에서
self.section_count_labels = getattr(self, "section_count_labels", {})
count_lbl = make_label(...)
self.section_count_labels[section_name] = count_lbl  # 참조 저장

# _update_progress() 에서
for section_name, data in CHECKLIST_DATA.items():
    lbl = self.section_count_labels.get(section_name)
    if lbl:
        sec_done = sum(
            1 for item in data["items"]
            if self.checks.get(item["id"], QCheckBox()).isChecked()
        )
        lbl.setText(f"{sec_done}/{len(data['items'])}")
```

---

### 이슈 6 — 데이터 정확도 관리 (개발 외적 이슈)

**문제**: 지자체 지원사업 정보는 버전에 따라 지속적으로 수정됐습니다. 초기 버전에서 잘못된 정보가 발견됐습니다.

| 항목 | 초기 버전 (잘못된 정보) | 수정 후 (정확한 정보) |
|------|------------------------|----------------------|
| 대구 북구 | "8세대 이상" | "20세대 미만" |
| 슬레이트 지붕 | "철거비 전액" | "최대 700만원" |
| 서울 보조 신청 시기 | "4월경" | "보조: 4월 / 융자: 상시" |
| 경기 공동주택 기준 | "20년 이상" | "단독 20년 / 빌라 15년" |
| 세종 지원 항목 | "도배·장판" | "창호·단열·난방" |

**해결 방향**: 데이터를 코드 상단에 독립적인 Python dict/list로 분리하여, UI 코드를 건드리지 않고 데이터만 수정할 수 있는 구조로 설계.

---

### 개발 시간 분배

```
데이터 수집·검증     ████████████░░░░░░░░  40%
UI 설계·구현        ████████████████░░░░  45%
버그 수정·테스트    ████░░░░░░░░░░░░░░░░  10%
문서화              █░░░░░░░░░░░░░░░░░░░   5%
```

---

## 🚀 향후 개선 방향

### 단기 (다음 버전)

- [ ] **지역 추가**: 광주·울산·강원·제주 등 미수록 지역 지원사업 추가
- [ ] **검색 기능**: 지원금·서류 탭에 키워드 검색 필드 추가
- [ ] **체크리스트 저장/불러오기**: JSON 파일로 진행 상태 저장 (`QSettings` 또는 직접 파일 I/O)
- [ ] **인쇄 기능**: 체크리스트를 PDF/프린터로 출력 (`QPrinter` + `QPrintDialog`)

### 중기

- [ ] **자동 업데이트 알림**: 정부24 API 또는 RSS 피드 연동으로 신규 공고 알림
- [ ] **경매 권리분석 보조**: 말소기준권리 계산기, 인수/소멸 분류 도구
- [ ] **수익률 계산기**: 매입가·수리비·지원금·예상 임대료 입력 → ROI 자동 계산
- [ ] **다크 모드**: QSS 테마 전환 기능

### 장기

- [ ] **DB 연동**: SQLite 또는 Firebase로 데이터 중앙 관리 및 자동 동기화
- [ ] **모바일 앱**: Kivy 또는 BeeWare로 iOS/Android 포팅
- [ ] **지도 연동**: 카카오맵 API 연동으로 임장 물건 핀 표시

---

## 📚 참고 자료 및 출처

| 구분 | 출처 |
|------|------|
| 서울 안심 집수리 | 서울주거포털 집수리닷컴 (jibsuri.seoul.go.kr) |
| 경기 집수리 지원 | 경기도청 도시재생과 (gg.go.kr) |
| 인천 지원사업 | 인천시청 주택정책과 (incheon.go.kr) |
| 부산 희망의 집수리 | 부산시청 도시주택국 (busan.go.kr) |
| 대구 공용시설 지원 | 대구시청 도시주택국 (daegu.go.kr) |
| 농촌주택개량사업 | 농림축산식품부 / 귀농귀촌종합센터 (returnfarm.com) |
| 슬레이트 지붕 철거 | 환경부 (me.go.kr) |
| 주거급여 수선유지급여 | 복지로 (bokjiro.go.kr) |
| 부동산 거래 제도 | 국토교통부 (molit.go.kr) |
| 실거래가 조회 | 국토부 실거래가 공개시스템 (rt.molit.go.kr) |
| PyQt6 공식 문서 | https://www.riverbankcomputing.com/static/Docs/PyQt6/ |
| Qt6 QSS 가이드 | https://doc.qt.io/qt-6/stylesheet.html |

---


> ⚠️ **면책 조항**: 본 앱에 수록된 지자체 지원사업 정보는 2026년 2월 기준으로 작성됐습니다. 예산 소진, 제도 변경 등에 따라 실제 지원 내용이 다를 수 있습니다. 최종 신청 전 반드시 관할 주민센터 또는 정부24(gov.kr)에서 최신 공고를 확인하시기 바랍니다.
