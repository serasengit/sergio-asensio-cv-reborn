# 🚀 Sergio Asensio CV Reborn

Personal portfolio and CV web application built with Angular, designed to present Sergio Asensio's profile, professional experience, technical background, and personal projects in a responsive and bilingual format.

It combines standalone Angular components, NgRx state management, Angular Material, Bootstrap, `ngx-translate`, and Cloudflare-ready deployment tooling to deliver a polished SPA focused on navigation, readability, and maintainability.

## ⚡ Quick Start

Requirements:

- Node.js `20.x`
- npm
- Docker Desktop, if you want to run the containerized setup

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm run start --env=dev
```

Alternative local alias:

```bash
npm run start:local --env=dev
```

Watch mode:

```bash
npm run watch --env=dev
```

Local URL:

- `http://localhost:4200`

## 🗂️ Project Structure

Main areas:

- `src/app/core`: layout shell, routes, resolvers, interceptors, shared models, and tokens
- `src/app/features`: functional sections such as introduction, curriculum, and personal projects
- `src/app/shared`: reusable components, dialogs, pipes, and utilities
- `src/app/store`: NgRx actions, reducers, and selectors
- `src/app/styles`: shared SCSS theme and utility styles
- `src/assets/i18n`: translation files for Spanish and English
- `src/assets/img`: images and visual assets
- `docker`: Nginx and Compose-related deployment files

Detailed documentation is split into focused files:

- [docs/setup.md](docs/setup.md): requirements, environments, installation, and local startup
- [docs/architecture.md](docs/architecture.md): `core/features/shared/store`, shell navigation, and module flow
- [docs/i18n.md](docs/i18n.md): translations, language persistence, and key conventions
- [docs/testing.md](docs/testing.md): unit testing setup, scope, and validation workflow
- [docs/deployment.md](docs/deployment.md): Docker, Nginx, Wrangler, and Cloudflare SPA deployment notes
- [docs/troubleshooting.md](docs/troubleshooting.md): common local, build, and responsive UI issues

Current feature modules:

- `introduction`
- `curriculum`
- `personal-projects`

Inside `curriculum`, the CV is organized into:

- `personal-data`
- `profile`
- `education`
- `languages`
- `software-tools`
- `work-experience`
- `training-courses`
- `certifications`
- `publications`

## 🧰 Stack

The application is built with:

- Angular 21
- TypeScript
- Angular Material and CDK
- Bootstrap 5
- Font Awesome
- NgRx Store and Effects
- `@ngx-translate/core`
- Karma and Jasmine
- ESLint and Prettier
- Wrangler for Cloudflare deployment

## 🧭 Navigation Model

The app uses a shell-style navigation model:

- top-level sections are managed through application state
- the active module is resolved before rendering
- the side navigation adapts to the selected module and device size
- the curriculum section uses left-side module selection to scroll to content sections

Current main routes:

- `/introduction`
- `/curriculum`
- `/personal-projects`

The root route redirects to `introduction`.

## 🌍 Environments

The active environment configuration is defined in:

- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

Available configurations in `angular.json`:

- `dev`
- `prod`

Current environment intent:

- `dev`: local development against `http://localhost:3000/api/v1`
- `prod`: production deployment configuration

## 🛠️ Scripts

Development:

- `npm run start --env=dev`
- `npm run start:local --env=dev`
- `npm run watch --env=dev`
- `npm run prestart --env=dev`

Build:

- `npm run build`
- `npx ng build --configuration dev`
- `npx ng build --configuration prod`

Quality:

- `npm run lint`
- `npm run lint-fix`
- `npm run format`

Tests:

- `npm run test`
- `npm run test:coverage`

Deployment:

- `npm run preview`
- `npm run deploy`
- `npm run dockerize --env=dev --service=app`

## 🧪 Testing

Tests live next to the corresponding code:

- `src/**/*.spec.ts`

Run the suite:

```bash
npm run test
```

Run coverage:

```bash
npm run test:coverage
```

## 🌐 Internationalization

The application currently supports:

- Spanish (`es`)
- English (`en`)

Translations are stored in:

- `src/assets/i18n/es.json`
- `src/assets/i18n/en.json`

Language selection is persisted locally and falls back to browser language detection when needed.

## ☁️ Deployment Notes

- the app uses standalone components and `bootstrapApplication`, without `AppModule`
- production assets are generated in `dist/sergio-asensio-cv/browser`
- Docker packaging is prepared to serve the built SPA with Nginx
- `wrangler.jsonc` is configured for Cloudflare SPA delivery using `not_found_handling: "single-page-application"`

## 🧩 Import Aliases

```ts
@core/*      -> src/app/core/*
@features/*  -> src/app/features/*
@shared/*    -> src/app/shared/*
@app/*       -> src/app/*
```

## 📝 Notes

- the project includes a dedicated `personal-projects` section to showcase public GitHub repositories
- the UI is built around a reusable top/left navigation shell
- translations, responsive behavior, and modular structure are treated as first-class concerns
- the app is intended both as a portfolio product and as a maintainable frontend reference structure

## License

The source code of this project is licensed under the [MIT License](LICENSE).

This repository is intended as a personal portfolio and resume website.

All personal content, including curriculum vitae files, personal data, texts,
images, branding, and professional experience descriptions, remains the
property of Sergio Asensio and may not be copied, reused, redistributed,
or used for impersonation without explicit permission.
