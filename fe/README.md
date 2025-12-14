# Reference

- [Supabase Backend](https://www.google.com/search?q=supabase+backend+demo&sca_esv=7e4dfe0eab4f43b7&rlz=1C1KNTJ_viVN1027VN1027&ei=Hpw9abCBNrOk2roP5siimQM&ved=0ahUKEwiwiNm7hbuRAxUzklYBHWakKDMQ4dUDCBE&uact=5&oq=supabase+backend+demo&gs_lp=Egxnd3Mtd2l6LXNlcnAiFXN1cGFiYXNlIGJhY2tlbmQgZGVtbzIFECEYoAEyBRAhGKABMgUQIRigATIFECEYnwVI_wpQ9QFY4QZwAXgBkAEAmAF8oAGkBKoBAzEuNLgBA8gBAPgBAZgCBqACvATCAgoQABiwAxjWBBhHwgITEC4YgAQYsAMY0QMYQxjHARiKBcICCxAAGIAEGJECGIoFwgIFEAAYgATCAgYQABgWGB7CAgsQABiABBiGAxiKBcICCBAAGIAEGKIEwgIFEAAY7wWYAwCIBgGQBgmSBwMxLjWgB8MYsgcDMC41uAezBMIHBTAuNS4xyAcQgAgA&sclient=gws-wiz-serp#fpstate=ive&vld=cid:480a7a6f,vid:kyphLGnSz6Q,st:0)

# Sign Up

1. Create with a real email
2. Password must be at least 8 characters (at least: 1 uppercase, 1 lowercase and 1 special character) - e.g., Aa1!0000
3. Confirm New Password
4. Access youe email (which you have registered above), then confirm that email
5. Access the login page and sign in with the created account

# Sign In

1. Sign in with a real email
2. Password must be at least 8 characters (at least: 1 uppercase, 1 lowercase and 1 special character) - e.g., Aa1!0000

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
