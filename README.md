# AetherLabs

AetherLabs contains the robotics and maker branch pages, Innocad project planner, and the light themed circuit workspace. The workspace supports its documented starter simulations and board-specific pin maps; arbitrary code compilation and full board libraries are not included.

The transparent parent-company wordmark and favicon are in `dist/assets/`. Build the Cloudflare Worker bundle with:

```sh
node scripts/build-worker.mjs
```

The generated entry point is `dist/server/index.js`. Do not put API keys or other secrets in this repository.
