unpacking archive
1.5 MB
5ms
using build driver railpack-v0.29.0
uploading snapshot
318.8 KB
25ms
 INFO No package manager inferred, using npm default
                   
╭─────────────────╮
│ Railpack 0.29.0 │
╰─────────────────╯
 
  ↳ Detected Node
  ↳ Custom start command detected, skipping Caddy start
  ↳ Custom start command detected, skipping Caddy start
  ↳ Custom start command detected, skipping Caddy start
  ↳ Using npm package manager
  ↳ Custom start command detected, skipping Caddy start
            
  Packages  
  ──────────
  node  │  22.22.3  │  railpack default (22)
            
  Steps     
  ──────────
  ▸ install
    $ npm install
         
  ▸ build
    $ npm run build
            
  Deploy    
  ──────────
    $ npm run start
 

load build definition from ./railpack-plan.json
0ms

mkdir -p /app/node_modules/.cache cached
0ms

install mise packages: node cached
0ms

copy package.json cached
0ms

npm install cached
0ms

copy / /app
79ms

npm run build
4s
npm warn config production Use `--omit=dev` instead.
> mediwayturkey@0.1.0 build
> next build
  ▲ Next.js 14.2.35
   Creating an optimized production build ...
Failed to compile.
./lib/i18n/ar.ts
Error: 

  x Unexpected character '═'
   ,-[/app/lib/i18n/ar.ts:1:1]
 1 | ═══════════════════════════════════════════════════════════════
   : ^
 2 | MOBİL ARAYÜZ ÇEVİRİLERİ — 14 DİL
 3 | ═══════════════════════════════════════════════════════════════
   `----
Caused by:
    Syntax Error
Import trace for requested module:
./lib/i18n/ar.ts
./lib/i18n/index.ts
./app/[locale]/page.tsx
./lib/i18n/bg.ts
Error: 

  x Unexpected character '═'
   ,-[/app/lib/i18n/bg.ts:1:1]
 1 | ═══════════════════════════════════════════════════════════════
   : ^
 2 | MOBİL ARAYÜZ ÇEVİRİLERİ — 14 DİL
 3 | ═══════════════════════════════════════════════════════════════
   `----
Caused by:
    Syntax Error
Import trace for requested module:
./lib/i18n/bg.ts
./lib/i18n/index.ts
./app/[locale]/page.tsx
./lib/i18n/el.ts
Error: 

  x Unexpected character '═'
   ,-[/app/lib/i18n/el.ts:1:1]
 1 | ═══════════════════════════════════════════════════════════════
   : ^
 2 | MOBİL ARAYÜZ ÇEVİRİLERİ — 14 DİL
 3 | ═══════════════════════════════════════════════════════════════
   `----
Caused by:
    Syntax Error
Import trace for requested module:
./lib/i18n/el.ts
./lib/i18n/index.ts
./app/[locale]/page.tsx
./lib/i18n/en.ts
Error: 

  x Unexpected character '═'
   ,-[/app/lib/i18n/en.ts:1:1]
 1 | ═══════════════════════════════════════════════════════════════
   : ^
 2 | MOBİL ARAYÜZ ÇEVİRİLERİ — 14 DİL
 3 | ═══════════════════════════════════════════════════════════════
   `----
Caused by:
    Syntax Error
Import trace for requested module:
./lib/i18n/en.ts
./lib/i18n/index.ts
./app/[locale]/page.tsx
./lib/i18n/es.ts
Error: 

  x Unexpected character '═'
   ,-[/app/lib/i18n/es.ts:1:1]
 1 | ═══════════════════════════════════════════════════════════════
   : ^
 2 | MOBİL ARAYÜZ ÇEVİRİLERİ — 14 DİL
 3 | ═══════════════════════════════════════════════════════════════
   `----
Caused by:
    Syntax Error
Import trace for requested module:
./lib/i18n/es.ts
./lib/i18n/index.ts
./app/[locale]/page.tsx
> Build failed because of webpack errors
Build Failed: build daemon returned an error < failed to solve: process "npm run build" did not complete successfully: exit code: 1 >
