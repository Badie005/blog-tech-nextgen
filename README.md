# blog-tech-nextgen
Blog Tech Personnel Nouvelle Génération - Plateforme moderne de blogging avec Next.js, authentification, système de commentaires et analytics avancés

## Structure du dépôt

```
blog-tech-nextgen/
├── web/                   # Application Next.js (App Router, TS, Tailwind v4)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   ├── (dashboard)/
│   │   │   └── blog/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── blog/
│   │   │   └── dashboard/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── styles/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env.example
│   └── package.json
└── docs/
    └── PHASE1.md
```

## Démarrage rapide

1. Installer les dépendances
   ```bash
   cd web
   npm install
   ```
2. Lancer le serveur de dev
   ```bash
   npm run dev
   ```
3. Ouvrir http://localhost:3000

## Variables d'environnement

Copier `web/.env.example` vers `web/.env.local` et compléter les valeurs.

## Prisma

Les scripts utiles (à exécuter dans `web/`):

```bash
npm run db:push      # pousser le schéma vers la base (nécessite DATABASE_URL)
npm run db:migrate   # migrations locales (dev)
npm run db:studio    # ouvrir Prisma Studio
```

## Décisions Phase 1 (BAD-5)

- Scaffolding de l'app Next.js dans `web/` (nom npm valide)
- Fonts: Inter + JetBrains Mono via `next/font`
- Thème Tailwind v4: couleurs primaire/secondaire/accents, dark mode
- Prisma initialisé avec modèles (User, Article, Category, Tag, Comment + NextAuth)
