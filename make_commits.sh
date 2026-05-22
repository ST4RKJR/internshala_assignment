#!/bin/bash
git add package.json package-lock.json .gitignore README.md
git commit -m "Initialize Next.js project with dependencies"

git add postcss.config.mjs
git commit -m "Configure PostCSS and Tailwind CSS"

git add tsconfig.json next-env.d.ts
git commit -m "Setup TypeScript configuration"

git add eslint.config.mjs next.config.ts
git commit -m "Add ESLint and Next.js configuration"

git add src/types/index.ts
git commit -m "Define TypeScript interfaces and types for internships"

git add src/app/globals.css
git commit -m "Setup global stylesheet with Tailwind imports"

git add src/app/layout.tsx src/app/favicon.ico
git commit -m "Configure root layout and metadata"

git add data.json
git commit -m "Add mock internship data"

git add src/components/InternshipCard.tsx
git commit -m "Create InternshipCard component with hover effects"

git add src/components/FilterSidebar.tsx
git commit -m "Build FilterSidebar with multi-select and varied inputs"

git add src/components/SearchLayout.tsx
git commit -m "Implement SearchLayout with filtering logic"

git add src/app/page.tsx
git commit -m "Integrate search system into main page and add header navbar"

git add AGENTS.md CLAUDE.md
git commit -m "Add agent instructions and project documentation"
