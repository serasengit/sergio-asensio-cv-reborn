# Sergio Asensio CV Reborn

Frontend for Sergio Asensio's personal CV application.

This Angular web application is designed to present professional profile, experience, education, publications, and skills in a navigable, responsive, and bilingual format. The app uses standalone components, global state with NgRx, translations with `ngx-translate`, and Docker packaging to serve the build with Nginx.

## ℹ️ Summary

- Runtime: Node.js + TypeScript
- Frontend framework: Angular 21
- UI: Angular Material, CDK, Bootstrap 5, and Font Awesome
- State management: NgRx Store
- Internationalization: `@ngx-translate/core`
- Testing: Karma + Jasmine
- Code quality: ESLint + Prettier
- Deployment: Docker + Nginx + Cloudflare Workers Assets

## 🗂️ Main structure

- `src/app/core/`: base layout, routes, interceptors, models, resolvers, and tokens
- `src/app/features/`: main functional modules of the application
- `src/app/shared/`: reusable components and utilities
- `src/app/store/`: global state, actions, reducers, and selectors
- `src/app/styles/`: shared SCSS styles
- `src/assets/i18n/`: translation files `es.json` and `en.json`
- `src/assets/img/`: images and visual assets
- `src/environments/`: environment configuration
- `docker/`: Nginx configuration and additional Compose files

## ✅ Requirements

- Node.js `20.x`
- npm
- Docker Desktop, if containerization is required

## 🌱 Available environments

The active project configurations are defined in:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

### 📋 `dev` configuration

- Environment type: `Development`
- Backend API: `http://localhost:3000/api/v1`
- `production`: `false`

### 📋 `prod` configuration

- Environment type: `Production`
- Backend API: `https://sergio-asensio-cv-/api/v1`
- `production`: `true`

Note: `angular.json` currently defines the build and serve configurations as `dev` and `prod`.

## 🚀 Development startup

Installation:

```bash
npm install
```

Start the frontend locally:

```bash
npm run start --env=dev
```

Equivalent alias:

```bash
npm run start:local --env=dev
```

Watch mode:

```bash
npm run watch --env=dev
```

Local URL:

- `http://localhost:4200`

## 📦 Available scripts

### 🛠️ Development

- `npm run start --env=dev`
  Starts the Angular dev server using the `dev` configuration.

- `npm run start:local --env=dev`
  Alias for local startup.

- `npm run watch --env=dev`
  Builds in watch mode using the selected configuration.

- `npm run prestart --env=dev`
  Runs `lint` and then triggers a build before startup.

### 🏗️ Build

- `npm run build`
  Generates the build using Angular's default configuration, currently `prod`.

- `npx ng build --configuration dev`
  Generates a development build.

- `npx ng build --configuration prod`
  Generates a production build.

### 🐳 Docker

- `docker compose build release`
  Builds the Angular compilation image.

- `docker compose --profile app build nginx`
  Builds the final image served by Nginx.

- `npm run dockerize --env=dev --service=app`
  Runs Docker Compose using the main file and the environment-specific override file.

### ✨ Quality

- `npm run lint`
  Runs ESLint with auto-fix enabled.

- `npm run lint-fix`
  Runs ESLint on the source code.

- `npm run format`
  Formats the code with Prettier.

### 🧪 Tests

- `npm run test`
  Runs the unit test suite with Karma.

- `npm run test:coverage`
  Runs the tests and generates coverage output.

### ☁️ Publishing

- `npm run preview`
  Launches a preview with Wrangler using the assets generated in `dist/sergio-asensio-cv/browser`.

- `npm run deploy`
  Deploys the application with Wrangler.

## 🧪 Testing

Project tests live next to the related components and services:

- `src/**/*.spec.ts`

Run:

```bash
npm run test
```

Coverage:

```bash
npm run test:coverage
```

## 🧩 Main functional modules

- `introduction`
- `curriculum`

Inside `curriculum`, the CV is organized into several sections:

- `personal-data`
- `profile`
- `education`
- `languages`
- `software-tools`
- `work-experience`
- `training-courses`
- `certifications`
- `publications`

## 🌍 Languages

The application currently supports:

- Spanish (`es`)
- English (`en`)

Language selection is persisted in `localStorage`, and if no previous value exists, the app tries to resolve it from the browser language.

## 🧭 Main routes

- `/introduction`
- `/curriculum`

The root route redirects to `introduction`.

## 🧭 Import aliases

```ts
@core/*      -> src/app/core/*
@features/*  -> src/app/features/*
@shared/*    -> src/app/shared/*
@app/*       -> src/app/*
```

## ⚙️ Angular CLI commands

If you need to generate artifacts with Angular CLI:

```bash
npx ng generate component component-name
npx ng generate service service-name
```

## 📝 Notes

- the app uses `bootstrapApplication` and standalone components, without `AppModule`
- the production build generates assets in `dist/sergio-asensio-cv/browser`
- translations are located in `src/assets/i18n/`
- the main router loads `HomeComponent` and resolves the active module before rendering child views
- `wrangler.jsonc` is prepared to serve the SPA from Cloudflare using `not_found_handling: "single-page-application"`
