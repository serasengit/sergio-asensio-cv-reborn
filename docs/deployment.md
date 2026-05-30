# ☁️ Deployment

## 🚀 Deployment model

This frontend is prepared to be deployed as a static SPA with:

- Angular build output
- Nginx for Docker-based serving
- Wrangler for Cloudflare deployment

## 📦 Build output

Production assets are generated under:

- `dist/sergio-asensio-cv/browser`

## 🐳 Docker

The repo includes Docker-related files for packaging and serving the application.

Useful command:

```bash
npm run dockerize --env=dev --service=app
```

Supporting files:

- `docker-compose.yml`
- `docker/`
- `Dockerfile`

## 🌐 Cloudflare / Wrangler

Useful commands:

```bash
npm run preview
npm run deploy
```

Main config:

- `wrangler.jsonc`

Important SPA note:

- the config is prepared to handle client-side routing using `not_found_handling: "single-page-application"`

## ✅ Production considerations

- confirm the correct production API base URL in environment configuration
- verify translation files are included in the final asset output
- verify shell navigation and deep links under SPA routing

## 📝 Notes

- a local `ng build` may fail in restricted environments if external font inlining cannot reach Google Fonts
- that issue is environmental and separate from the actual SPA deployment structure
