# RM2O Engineering Consultancy — Website

A static, multi-page marketing site for RM2O Engineering Consultancy (Port Moresby, PNG). No build step, no framework — plain HTML/CSS/JS, so it's easy to preview, edit, and deploy.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About Us | `about.html` |
| Vision & Mission | `vision-mission.html` |
| Our Services | `services.html` |
| Our Team | `team.html` |
| Projects & Clients | `projects-clients.html` |
| Contact Us | `contact.html` |

Shared styles live in `css/style.css` (design system: colors, nav, footer) and `css/pages.css` (page-specific layouts). All interactivity is in `js/script.js` (mobile nav, scroll reveal, timeline filters, team tabs, contact form).

## 1. Run it locally in VS Code

1. Open the `rm2o-website` folder in VS Code (**File → Open Folder…**).
2. Install the **Live Server** extension (by Ritwick Dey) from the Extensions panel — free, one-time install.
3. Right-click `index.html` in the file explorer → **Open with Live Server**.
4. Your browser opens at `http://127.0.0.1:5500` with hot-reload — edit any file and save to see changes instantly.

You can also just double-click `index.html` to open it directly in a browser (no server needed), but Live Server gives you auto-refresh and avoids occasional `file://` quirks.

## 2. Before going live

- **Contact form**: already wired up to Formspree (`https://formspree.io/f/moeaqpgp`) — submissions email straight to the account that created the form. Log into [formspree.io](https://formspree.io) to view/manage submissions or change the destination email.
- **Client logos**: real logo files live in `icons/` and are already wired into the homepage and Projects & Clients marquees plus the four reference cards. To add or swap a logo, drop a PNG/SVG into `icons/` and reference it with an `<img src="icons/your-file.png">` inside a `.client-logo` (marquee) or `.ref-logo` (reference card) container — both classes size and pad the image automatically.
- **Content**: all copy is pulled directly from the RM2O Company Profile 2026 PDF. Update project status (Completed/In Progress) in `projects-clients.html` as jobs progress — look for `data-status="done"` or `data-status="progress"` on each `.tl-item`.
- **About page photo**: the About page still uses a decorative placeholder panel (no real photography yet). Once you have a photo (office, team, or a Port Moresby building — portrait orientation, ~1200×1500px works best), share it and it can be swapped in.

## 3. Publish with Git

```bash
cd rm2o-website
git init
git add .
git commit -m "Initial RM2O website"
```

Then push to GitHub and host for free with **GitHub Pages**:

```bash
git remote add origin https://github.com/<your-username>/rm2o-website.git
git branch -M main
git push -u origin main
```

In the GitHub repo: **Settings → Pages → Source → Deploy from branch → main → / (root)**. Your site will be live at `https://<your-username>.github.io/rm2o-website/` within a minute or two.

**Alternative — Netlify** (also free, and supports a custom domain easily): drag the `rm2o-website` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo for automatic redeploys on every push.

## Notes

- Fonts (Poppins/Inter) and icons (Font Awesome) load from CDN — an internet connection is required both locally and once deployed.
- No build tools, npm packages, or frameworks are used — everything is plain, portable HTML/CSS/JS.
