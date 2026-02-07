# Explore Codebase with Agent Team

## Simple (découverte rapide)

```
Explore la codebase [REPO/DOSSIER] en profondeur.

Crée une agent team d'exploration :
- "mapper": cartographie l'architecture (dossiers, modules, entry points, dépendances)
- "doc-reader": lit les README, CLAUDE.md, configs, et résume les conventions du projet
- "code-reader": analyse les patterns clés (routing, state management, DB, auth)

Chaque agent documente ses findings. Synthétise le tout dans un rapport structuré :
- Architecture globale
- Stack technique
- Patterns et conventions
- Points d'entrée
- Zones de complexité / dette technique
```

## Deep dive (exploration complète)

```
Explore la codebase [REPO/DOSSIER]. Je ne connais pas ce projet.

Crée une agent team avec des spécialistes :
- "architect": cartographie l'architecture (modules, layers, dépendances entre packages), produit docs/architecture.md
- "api-explorer": documente tous les endpoints/routes, leurs inputs/outputs, l'auth, dans docs/api-map.md
- "data-explorer": analyse les modèles de données, schemas DB, migrations, relations, dans docs/data-model.md
- "infra-explorer": analyse configs (Docker, CI/CD, env vars, scripts), dans docs/infra.md
- "quality-auditor": évalue la couverture de tests, linting, dette technique, dans docs/quality-audit.md

Opus pour architect, Sonnet pour les autres.
Chaque agent travaille en read-only — aucune modification de code.
Synthétise un résumé exécutif dans docs/codebase-overview.md à la fin.
```

## Ciblé (explorer un aspect précis)

```
Explore [ASPECT : ex. "le système d'auth", "le pipeline de données", "le state management"]
dans la codebase [REPO/DOSSIER].

Crée une agent team :
- "tracer": trace le flux complet de bout en bout (entry point → processing → output)
- "dependency-mapper": identifie toutes les dépendances internes et externes de ce système
- "edge-case-hunter": cherche les bugs potentiels, race conditions, cas limites non gérés

Aucune modification — exploration pure.
Produit un rapport avec : flux, dépendances, risques identifiés.
```

## Comparatif (évaluer avant un choix)

```
Compare ces [N] repos/approches pour [OBJECTIF] :
- [REPO/DOSSIER 1]
- [REPO/DOSSIER 2]
- [REPO/DOSSIER 3]

Crée une agent team avec un reviewer par repo :
- "reviewer-1": explore [REPO 1], évalue architecture, DX, maintenabilité, perf
- "reviewer-2": explore [REPO 2], mêmes critères
- "reviewer-3": explore [REPO 3], mêmes critères
- "arbitre": compare les findings, produit une matrice de comparaison et une recommandation

Aucune modification — analyse pure.
Produit un rapport comparatif dans docs/comparison.md.
```
