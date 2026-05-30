# 🩺 Troubleshooting

## 🔤 `ng build` fails because of font inlining

Symptom:

- Angular build fails while trying to retrieve Material Icons or Google Fonts

Cause:

- the environment blocks outbound internet access during the font inlining step

Notes:

- this is an environment issue, not usually a code issue
- unit tests can still pass even when this happens

## 📱 Toolbar icons are not all visible on mobile

Current approach:

- the top toolbar uses a more compact mobile mode
- some right-side links are grouped in a `more` menu
- top modules are collapsed on mobile to avoid horizontal overflow

If the issue returns:

- check mobile breakpoints in `sidenav-top-menu.component.scss`
- verify the left-side toolbar section is not consuming all available width
- confirm icon buttons are not inheriting oversized padding

## 🌐 Translation key does not appear

Checklist:

- confirm the key exists in both `en.json` and `es.json`
- confirm the key path used in the template matches the JSON structure
- verify the value is user-facing text and not expected HTML content

## 🧭 Active module is wrong after navigation

Checklist:

- verify the route path exists in `home.route.ts`
- confirm the module exists in the app store module definitions
- check the active-module resolver and `findModuleByUrl`

## 🗂️ Personal projects content does not render as expected

Checklist:

- confirm the project entry exists in `personal-projects.component.ts`
- confirm translation content exists under `personal_projects_page.projects.<code>`
- verify the icon condition or any future icon mapping matches the project code

## 💡 General advice

- run the narrowest relevant spec first
- separate template errors from layout issues
- separate environment/build issues from runtime UI issues
