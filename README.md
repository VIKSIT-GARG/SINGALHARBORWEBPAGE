# SignalHarbor product website

Standalone, frontend-only product page based on the SignalHarbor Figma design. HTML, CSS, and browser JavaScript; no build step or runtime dependencies.

## Run locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. The site includes responsive navigation, scroll reveals, orbital signal animation, a scroll progress indicator, reduced-motion support, OS-specific installation commands, and clipboard handling. Content remains readable when JavaScript is disabled.

## Deploy

Import this repository in Vercel. Select **Other** as the framework, leave the build command empty, and serve the repository root. No environment variables are required. The website does not host the Python agent, collect credentials, or run analysis.

The setup command links to the actual application fork, whose repository name is still `SurgeScout`. It clones into a local `SignalHarbor` folder. Product claims reflect the fork reviewed on 2026-10-14: SQLite persistence, async integrations, API-key access, opt-in scheduling, OpenRouter free-model routing, and preparation-only launch proposals. Free-model availability and quotas apply.

Design: https://www.figma.com/design/Mr3ZoXT3J3m1E752cKULv1?node-id=1-2

Typography uses Google Fonts with local system fallbacks. All artwork is CSS or local SVG. No analytics or third-party JavaScript.
