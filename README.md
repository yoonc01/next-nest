# next-nest 모노레포

pnpm 워크스페이스를 사용한 Next.js + NestJS 모노레포 프로젝트입니다.

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

### 1. 의존성 설치

```bash
pnpm install
```

모든 워크스페이스의 의존성을 설치합니다.

### 2. 앱 생성

#### Next.js 앱 생성
```bash
cd apps
pnpm create next-app web
cd ..
```

#### NestJS 앱 생성
```bash
cd apps
npx @nestjs/cli new api
cd ..
```

### 3. 공유 패키지 생성

```bash
cd packages
mkdir ui && cd ui
pnpm init
cd ../..
```

## 주요 명령어

### 패키지 설치

```bash
# 루트에 개발 도구 설치 (전체 프로젝트 공용)
pnpm add -Dw <package-name>

# 특정 워크스페이스에 패키지 설치
pnpm add <package-name> --filter <workspace-name>

# 예시: web 앱에 react-query 설치
pnpm add react-query --filter web
```

### 스크립트 실행

```bash
# 모든 워크스페이스에서 빌드
pnpm -r run build

# 특정 워크스페이스에서 dev 서버 실행
pnpm --filter web run dev
pnpm --filter api run start:dev

# 모든 dev 서버 병렬 실행
pnpm -r --parallel run dev
```

### 워크스페이스 간 의존성

```bash
# packages/ui를 apps/web에서 사용
pnpm add @myorg/ui --filter web --workspace
```

### 유용한 관리 명령어

```bash
# 워크스페이스 목록 확인
pnpm -r list

# 특정 패키지가 어디서 사용되는지 확인
pnpm why <package-name>

# 사용하지 않는 의존성 제거
pnpm prune

# 의존성 업데이트
pnpm -r update
```

## 명령어 옵션 설명

- `-r`, `--recursive`: 모든 워크스페이스에서 실행
- `-w`, `--workspace-root`: 루트 워크스페이스에 설치
- `--filter <name>`: 특정 워크스페이스만 선택
- `--parallel`: 명령어를 병렬로 실행
- `-D`: devDependencies로 설치
- `--workspace`: 워크스페이스 내부 패키지 사용

## 개발 워크플로우 예시

```bash
# 1. 프로젝트 클론 후 의존성 설치
pnpm install

# 2. 프론트엔드 개발 서버 실행
pnpm --filter web run dev

# 3. 백엔드 개발 서버 실행 (다른 터미널)
pnpm --filter api run start:dev

# 4. 모든 프로젝트 빌드
pnpm -r run build

# 5. 특정 앱에 패키지 추가
pnpm add axios --filter api
```

## 기술 스택

- **패키지 매니저**: pnpm (workspace)
- **프론트엔드**: Next.js
- **백엔드**: NestJS
- **개발 도구**: TypeScript, ESLint, Prettier
