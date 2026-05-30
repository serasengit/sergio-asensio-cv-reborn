# 🧪 Testing

## 🧰 Test stack

The project currently uses:

- Karma
- Jasmine
- Angular TestBed

## 📁 Test location

Tests live next to the code they validate:

- `src/**/*.spec.ts`

This keeps features and their tests close together and makes local maintenance easier.

## ▶️ Run tests

Run the full suite:

```bash
npm run test
```

Run coverage:

```bash
npm run test:coverage
```

## ✅ What is covered

Current tests focus mainly on:

- shell/navigation components
- routes and resolvers
- reducers, selectors, and actions
- standalone feature components
- interceptors and shared UI pieces

## 🔄 Recommended workflow

When changing behavior:

1. update or add the relevant spec near the changed code
2. run the narrowest useful spec first
3. run the broader suite when the change touches shared shell behavior

## 📝 Notes

- some build-related issues may come from external font inlining during production builds, not from unit tests
- the most useful frontend regression checks in this repo are usually route, shell, and component template validations
