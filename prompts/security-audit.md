# Security Audit

Audit complet de sécurité d'un dossier ou du codebase entier : vulnérabilités OWASP top 10, dépendances obsolètes, secrets exposés, et recommandations. Utilise context7 pour la stack et la recherche web pour les CVE et bonnes pratiques de sécurité à jour.

## Folder

Auditer la sécurité de tous les fichiers d'un dossier.

### FR

```
Effectue un audit de sécurité complet du dossier @backend/ : vérifie les vulnérabilités OWASP top 10 (injection, XSS, CSRF, broken auth, etc.), les dépendances obsolètes ou vulnérables, les secrets exposés dans le code, et les mauvaises pratiques de sécurité. Effectue des recherches sur le web pour vérifier les CVE récentes liées aux dépendances du projet, et utilise context7 pour approfondir ta compréhension de la stack technique et ses bonnes pratiques de sécurité. Rédige ensuite un rapport détaillé avec les corrections à apporter, classées par criticité.
```

### EN

```
Perform a full security audit of the @backend/ folder: check for OWASP top 10 vulnerabilities (injection, XSS, CSRF, broken auth, etc.), outdated or vulnerable dependencies, exposed secrets in the code, and security bad practices. Search the web to check for recent CVEs related to the project's dependencies, and use context7 to deepen your understanding of the technical stack and its security best practices. Then write a detailed report with the fixes to apply, sorted by criticality.
```

## PRD for security fixes

Quand l'audit révèle trop de correctifs pour une seule session : générer un PRD découpé en US.

### FR

```
Effectue un audit de sécurité complet du codebase : vérifie les vulnérabilités OWASP top 10, les dépendances obsolètes ou vulnérables, les secrets exposés, et les mauvaises pratiques de sécurité. Effectue des recherches sur le web pour vérifier les CVE récentes liées aux dépendances du projet, et utilise context7 pour approfondir ta compréhension de la stack technique et ses bonnes pratiques de sécurité. Rédige ensuite un PRD dans le dossier @tasks avec /ralph-tui-prd contenant les corrections classées par criticité.
```

### EN

```
Perform a full security audit of the codebase: check for OWASP top 10 vulnerabilities, outdated or vulnerable dependencies, exposed secrets, and security bad practices. Search the web to check for recent CVEs related to the project's dependencies, and use context7 to deepen your understanding of the technical stack and its security best practices. Then write a PRD in the @tasks folder with /ralph-tui-prd containing the fixes sorted by criticality.
```
