# Codex-hjemmeside

Hjemmeside for Markus Johnsens naturfaglige tutorservice.

## Lokal udvikling

```bash
pnpm install
pnpm run build
```

## GitHub Pages

Repoet er sat op med GitHub Actions i `.github/workflows/pages.yml`.
Når koden ligger på `main`, bygger workflowet siden med:

```bash
GITHUB_PAGES=true pnpm run build
```

Den statiske side hostes på:

```text
https://markusmj2256.github.io/Codex-hjemmeside/
```

## Kontaktformular

GitHub Pages kan kun hoste statiske filer. Derfor åbner kontaktformularen en færdigudfyldt mail på GitHub Pages.
Hvis siden senere flyttes til en server med backend, kan formularen sende direkte via SMTP med miljøvariablerne i `.env.example`.
