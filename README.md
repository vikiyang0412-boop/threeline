# 삼행시 생성기

Claude AI를 활용한 삼행시 자동 생성 웹 애플리케이션입니다.

## 기능

- 3글자 입력으로 창의적인 삼행시 자동 생성
- Claude Sonnet 4.5 API 연동
- 반응형 디자인 (모바일 지원)
- 실시간 로딩 애니메이션
- 깔끔하고 모던한 UI/UX

## 기술 스택

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Vercel Serverless Functions
- **AI**: Claude Sonnet 4.5 API (@anthropic-ai/sdk)
- **Deployment**: Vercel

## 프로젝트 구조

```
threeline/
├── .env                          # 환경변수 (로컬 개발용)
├── .gitignore                    # Git 제외 파일
├── package.json                  # 의존성 관리
├── README.md                     # 프로젝트 문서
├── public/
│   ├── index.html               # 메인 HTML
│   ├── styles.css               # 스타일시트
│   └── script.js                # 클라이언트 JavaScript
└── api/
    └── generate-threeline.js    # Vercel Serverless Function
```

## 로컬 개발

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env` 파일을 생성하고 Anthropic API 키를 추가하세요:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
# 또는
vercel dev
```

### 4. 브라우저 접속

```
http://localhost:3000
```

## Vercel 배포

### 1. GitHub에 푸시

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel 프로젝트 연결

1. [Vercel Dashboard](https://vercel.com/dashboard)에 접속
2. "New Project" 클릭
3. GitHub 저장소 연결
4. 프로젝트 Import

### 3. 환경변수 설정

Vercel 대시보드에서:
1. Settings → Environment Variables
2. 변수 추가:
   - **Key**: `ANTHROPIC_API_KEY`
   - **Value**: 실제 Anthropic API 키
   - **Environments**: Production, Preview, Development 모두 체크

### 4. 배포 완료

자동으로 배포되며, 제공된 URL로 접속할 수 있습니다.

## 사용 방법

1. 입력창에 3글자를 입력합니다 (한글, 영문, 숫자 모두 가능)
2. "삼행시 생성" 버튼을 클릭하거나 엔터키를 누릅니다
3. AI가 생성한 창의적인 삼행시를 확인합니다

## 보안

- API 키는 클라이언트에 노출되지 않습니다
- 모든 Claude API 호출은 Vercel Serverless Function을 통해 이루어집니다
- `.env` 파일은 Git에 커밋되지 않습니다 (`.gitignore`에 포함)

## 라이선스

MIT

## 문의

이슈나 제안사항이 있으시면 GitHub Issues를 통해 알려주세요.
