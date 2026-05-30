# ⚙️ Setup

## 📋 Requirements

- Node.js `20.x`
- npm
- Docker Desktop, if you want to use the containerized workflow

## 📥 Install dependencies

```bash
npm install
```

## ▶️ Run locally

Start the development server:

```bash
npm run start --env=dev
```

Alternative alias:

```bash
npm run start:local --env=dev
```

Watch build:

```bash
npm run watch --env=dev
```

Local URL:

- `http://localhost:4200`

## 🌍 Environment files

The main environment files are:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

`angular.json` currently defines these main configurations:

- `dev`
- `prod`

Current intent:

- `dev`: local development against `http://localhost:3000/api/v1`
- `prod`: production deployment configuration

## 🛠️ Useful commands

- `npm run lint`
- `npm run format`
- `npm run test`
- `npm run test:coverage`
- `npm run build`
- `npm run preview`
- `npm run deploy`

## 📝 Notes

- the project uses standalone Angular bootstrapping, not `AppModule`
- production assets are emitted under `dist/sergio-asensio-cv/browser`
- if Docker is used, the final SPA is served through Nginx
