# Holiday Sign Generator Demo

## Overview

TypeScript-based Single Page Application (SPA) demo for [makertool-holiday-sign-generator](https://github.com/RichardMcQuiston01/makertool-holiday-sign-generator), the `@richardmcquiston01/holiday-sign-generator` npm package.

Pick a holiday, a saying, an optional last name and image, a sign shape, fonts,
and a mounting type, then generate a laser-ready SVG/DXF preview right in the
browser and download the files — no server, no build step for the user.

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation

```bash
npm install
```

### Usage

```bash
npm run dev       # start the Vite dev server
npm run build      # type-check and build to dist/
npm run preview    # preview the production build locally
npm run lint        # lint with ESLint
npm run format      # format with Prettier
npm run typecheck   # type-check without emitting
```

### Examples

This app depends directly on the `dev` branch of
[makertool-holiday-sign-generator](https://github.com/RichardMcQuiston01/makertool-holiday-sign-generator)
via a git dependency (see `package.json`) until the package has its first npm
release — at that point this can switch to a normal semver `^x.y.z` dependency
from the npm registry.

Fonts used in this demo (`public/fonts/`) are bundled under the SIL Open Font
License; see each font's accompanying `*-OFL.txt` file.

## Buy Me a Coffee

If this app, code, or repository has helped you or someone you know, please consider donating. I appreciate any help to offset the costs of development and/or AI Credits.

[**Donate via Stripe**](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800), or scan:

[![Donate via Stripe](./donate.svg)](https://donate.stripe.com/00w5kD3Gj1Xo9v7gVOcs800)

## License

Apache 2

## Copyright

(c)2026 Richard McQuiston. All rights reserved.
