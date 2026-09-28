# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Final-Project-AI
# MovieMind

MovieMind is a React and Vite movie discovery frontend powered by TMDB.

## Setup

1. Install dependencies with `npm install`.
2. Create `.env.local` in the project root and add your TMDB API key:

	```env
	VITE_TMDB_API_KEY=your_tmdb_api_key
	```

3. Start the development server with `npm run dev` and open the local URL printed by Vite.

The key is read by the frontend, so it is visible in browser requests. Vite variables prefixed with `VITE_` are not private secrets. Restrict the key in TMDB settings where possible. A server-side proxy is needed before using private credentials in a deployed app.

## Checks

- `npm run lint` checks the source files.
- `npm run build` creates the production bundle.

## TMDB data

Reusable API functions in `src/services/tmdb.js` load trending and popular movies, search/discover results, genres, and movie details with credits. TMDB usage requires attribution; see [TMDB's terms](https://www.themoviedb.org/terms-of-use).
