# 🧱 Architecture

## 🗂️ Main structure

The application is split into four main areas:

- `src/app/core`: shell, routes, resolvers, models, tokens, interceptors, and shared navigation concerns
- `src/app/features`: feature-level UI and logic such as `introduction`, `curriculum`, and `personal-projects`
- `src/app/shared`: reusable UI pieces and utilities such as dialogs and pipes
- `src/app/store`: NgRx actions, reducers, and selectors for app-level state

Supporting frontend structure:

- `src/app/styles`: theme and shared SCSS utilities
- `src/assets/i18n`: translation sources
- `src/assets/img`: static images

## 🏠 App shell

The UI is built around a shell-style layout:

- `HomeComponent` hosts the shell
- `SidenavContainer` coordinates top navigation, left navigation, routing, and language changes
- the active module is stored in NgRx state
- the curriculum section controls left-side sections through app state and scroll behavior

This gives the app a more product-like structure than a simple static landing page.

## 🧭 Navigation model

Top-level navigation is state-aware:

- the top module is selected through the app store
- the left-side navigation changes depending on the active section
- the resolver maps the current route back to the active module

Current top-level sections:

- `introduction`
- `curriculum`
- `personal-projects`

## 🧩 Feature model

Feature code is grouped by responsibility:

- `introduction`: landing and profile overview
- `curriculum`: CV sections such as experience, education, and publications
- `personal-projects`: public GitHub project showcase

`curriculum` is the deepest feature and acts as a composite page made of several standalone sections.

## 🗃️ State management

NgRx is used for app-level coordination:

- device type
- language
- top modules
- active top module
- left modules
- active left module
- spinner visibility
- sidenav visibility

This keeps shell behavior and navigation state explicit and testable.

## 🎨 UI stack

The frontend combines:

- Angular standalone components
- Angular Material
- Bootstrap utility/layout classes
- Font Awesome icons
- `ngx-translate` for bilingual content

## 📝 Notes

- this repo is both a portfolio application and a reusable frontend reference
- the `personal-projects` page reflects the same documentation mindset used in the base app repositories
