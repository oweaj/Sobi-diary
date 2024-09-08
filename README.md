# 📒 씀 | Sobi-diary

수입 및 지출 내역을 입력하면 그 바탕으로 총 내역 및 세부 지출 내역의 정보를 시각화한 웹 어플리케이션 입니다.

배포 URL : [https://handal-sobi.web.app](https://handal-sobi.web.app)

---

## 🛠️ 사용 기술

### Front

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white">
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-black?style=flat-square&logo=ReactRouter&logoColor=CA4245">
<img src="https://img.shields.io/badge/chart.js-F5788D.svg?style=flat-square&logo=chart.js&logoColor=white">
</p>

### Database or Deploy

<img src="https://img.shields.io/badge/Firebase-orange?style=flat-square&logo=firebase&logoColor=#FFCA28">

---

### 💻 실행 방법

```
1. 저장소 복제
$ git clone https://github.com/oweaj/Sobi-diary.git

2. 종속성 설치
$ npm install

3. 프로젝트 실행
$ npm run dev
```

---

## 🔍 전체 주요 기능

### 1) Login

<img width="427" alt="스크린샷 2023-12-29 오후 10 48 37" src="https://github.com/oweaj/sobi-diary/assets/101049520/4ce7483d-f486-461a-9fdb-faaf5076608b">

- 구글 계정을 사용하여 OAuth 인증을 통해 로그인을 할 수 있습니다.
- Firebase onAuthStateChanged로 사용자 인증 상태를 감지합니다.

<br>

### 2) Main

<img width="429" alt="스크린샷 2023-12-29 오후 11 16 08" src="https://github.com/oweaj/sobi-diary/assets/101049520/fd4184a0-3288-4d72-b2ee-9b988a929ddd">

- 메인 페이지로 내역을 입력하면 내역 리스트와 수입 및 지출에 대한 총 합산이 보여집니다.
- 수입 및 지출 내역의 버튼으로 필터가 가능하고 입력한 내역이 있으면 삭제가 가능합니다.
- 입력한 소비 내역이 없으면 소비 차트를 볼 수 없습니다.

<br>

### 2-1) Modal

![ezgif com-optimize](https://github.com/oweaj/sobi-diary/assets/101049520/9c4be750-6d17-48af-af86-8ad4580ce155)

- 메인 페이지의 하단 추가 버튼을 누르게 되면 열리는 모달로 수입 및 지출 내역 추가를 할 수 있습니다.
- 지출을 선택하면 세부 지출 버튼이 나오게 되며 선택한 세부 지출에 따른 소비 차트가 보여지게 됩니다.
- 금액은 구분하기 쉽게 천단위 마다 콤마를 표기하였고 입력은 숫자만 8자 이하(1억 미만)로 지정했습니다.

<br>

### 3) Chart

- 수입 및 지출 내역들을 입력한 상태

  <img width="431" alt="스크린샷 2023-12-30 오전 12 56 53" src="https://github.com/oweaj/sobi-diary/assets/101049520/b8e05526-2b56-4f1c-9322-6e66c061f7a1">

<br>

- 입력한 데이터를 바탕으로 총 합산 내역과 지출 세부 내역의 비율을 차트로 시각화

  <img width="431" alt="스크린샷 2023-12-30 오전 12 57 10" src="https://github.com/oweaj/sobi-diary/assets/101049520/5da8bb4b-22c8-4fab-b9c7-5ff146d734db">

---

### Firebase Database

- 위에서 예시로 입력한 user-diary 컬렉션의 저장된 문서 중 하나

<img width="234" alt="스크린샷 2023-12-30 오전 1 04 41" src="https://github.com/oweaj/sobi-diary/assets/101049520/25939565-f1ce-485d-ad5b-962b1b13ce69">

---

### Update

- [자동 배포화 hosting 설정](https://velog.io/@oweaj/Firebase-deploy)
- [수입 및 지출 데이터 추가 후 데이터 type별 list 갱신 수정](https://github.com/oweaj/Sobi-diary/blob/main/src/hooks/useGetDoc.tsx)
