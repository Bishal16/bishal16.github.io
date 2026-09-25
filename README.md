# Mahathir Mohammad Bishal - Portfolio

Portfolio site for a Backend Engineer specializing in Java & Spring Boot, live at **https://bishal16.github.io**.

Plain static HTML/CSS/JS, deployed by GitHub Pages from the `main` branch. There is no build step.

## Local Preview

```bash
python3 -m http.server 8000
```

Open http://localhost:8000

## Updating

- Resume: replace `assets/resume.pdf` (the site links to it directly)
- Social preview image: `assets/og-image.png` (1200×630)
- Content: `index.html`; styles: `styles.css`
- Bump `<lastmod>` in `sitemap.xml` after content changes
