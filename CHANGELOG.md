# CHANGELOG

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-09-18

### Added

- Project scaffolding: Vite + React + TypeScript + Tailwind CSS v4, ESLint +
  Prettier, and a GitHub Actions CI workflow.
- `SignForm`: a controlled form covering every input from the package's
  README spec — holiday (filtering saying/image choices), saying (predefined
  or custom "Other" text), optional last name, image, sign shape
  (square/rectangle/ellipse/round), saying/name fonts, saying/name/image
  heights, margin, unit, and mounting type (screw, with screw size, or
  adhesive).
- Five bundled SIL Open Font License TTF fonts (`public/fonts/`), fetched in
  the browser and registered with the package's `createFontRegistry()` —
  Work Sans, Nothing You Could Do, Young Serif, Big Shoulders, Silkscreen.
- `SvgPreview`: renders the generated sign's SVG inline (scaled to fit its
  container — the file's own `width`/`height` are physical units) and
  provides Download SVG / Download DXF buttons.
- Depends on `@richardmcquiston01/holiday-sign-generator` directly from its
  GitHub `dev` branch (via a git dependency) ahead of the package's first npm
  publish; the package's `prepare` script builds `dist/` on install.
- Standard donate block (README section + floating `DonateCard`).

### Fixed

- `@richardmcquiston01/holiday-sign-generator`'s `font.ts` imported
  `opentype.js` as a default export, which only works under Node/CJS
  resolution — opentype.js's real ESM build has no default export, so Vite's
  production build failed outright. Fixed upstream (namespace import
  instead) once this demo's build surfaced it.
