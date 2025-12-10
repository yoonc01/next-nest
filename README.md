# next-nest 모노레포

pnpm 워크스페이스를 사용한 Next.js + NestJS 모노레포 프로젝트입니다.

## 학습 노트

프로젝트 진행 중 학습한 내용을 정리했습니다:

- [Next.js Route Handler의 `request`와 `params` 이해하기](https://github.com/yoonc01/next-nest/pull/1) - request 객체와 params의 차이, 내부 구현 원리
- [Server Actions vs API Routes 완벽 가이드](https://github.com/yoonc01/next-nest/pull/2) - RPC vs REST, Progressive Enhancement, Form의 가치, 선택 기준

- [NestJS 핵심 개념과 Post CRUD API 구현](https://github.com/yoonc01/next-nest/pull/3) - IoC, 의존성 주입, NestJS 아키텍처 구조
- [모노레포에서 Nest API + Prisma + Docker 환경 세팅](https://github.com/yoonc01/next-nest/pull/4) - pnpm workspace, Prisma config, Docker Postgres 트러블슈팅

---

## 프로젝트 구조

```
next-nest/
├── apps/               # 애플리케이션들
│   ├── web/           # Next.js 프론트엔드
│   └── api/           # NestJS 백엔드
├── packages/          # 공유 패키지들
│   └── ui/            # 공유 UI 컴포넌트
├── package.json
└── pnpm-workspace.yaml
```

## 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev              # 모든 앱 동시 실행
pnpm dev:web          # Next.js만 실행
pnpm dev:api          # NestJS만 실행

# 빌드
pnpm build
```

### Backend 준비 절차

1. **필수 도구**  
   - Node.js LTS (20.x)  
   - pnpm 10+  
   - Docker & Docker Compose

2. **환경 변수**  
   - `cd apps/api && cp .env.example .env`로 예제 파일을 복사한 뒤, 필요하면 값을 수정하세요.

3. **PostgreSQL 컨테이너 실행**  
   ```bash
   cd apps/api
   docker compose up -d        # 최초 실행
   # 문제가 생기면 docker compose down -v 로 볼륨 포함 정리
   ```

4. **Prisma 스크립트**  
   루트에서 실행하면 `apps/api` 패키지에 한정되어 동작합니다.
   ```bash
   pnpm api:prisma:migrate     # prisma migrate dev
   pnpm api:prisma:generate    # prisma generate
   pnpm api:prisma:studio      # prisma studio
   ```

## 기술 스택

- **패키지 매니저**: pnpm (workspace)
- **프론트엔드**: Next.js
- **백엔드**: NestJS
- **개발 도구**: TypeScript, ESLint, Prettier
