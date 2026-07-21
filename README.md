# Portfolio

Editable portfolio built with Next.js, React, and Tailwind CSS.

## Requirements

- Node.js 22 recommended, 20.9.0 minimum
- npm

The project includes `.nvmrc`, `.node-version`, `engines`, and `engine-strict=true` so older Node versions fail early. Netlify is pinned to Node 22 in `netlify.toml`.

## Local Development

```bash
npm install
npm run dev
```

Open:

- Portfolio: http://localhost:3000
- Editor: http://localhost:3000/admin

Next.js writes generated files to `.next`, which is ignored by Git.

## Editing Portfolio Data

Portfolio content lives in:

```text
data/portfolio.json
```

Use `/admin` to edit it through forms. The editor saves through:

```text
app/api/portfolio/route.js
```

Writes are saved atomically through `lib/portfolioDb.js`.

## Scripts

```bash
npm run node:check
npm run lint
npm run build
npm run start
npm run check
```

Build and dev output go to `.next`, which should stay out of Git.

## Netlify

`netlify.toml` sets the build command, publish directory, and Node version:

```bash
npm run build
```

Publish directory:

```text
.next
```
