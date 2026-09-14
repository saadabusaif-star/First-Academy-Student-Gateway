# First Academy — Student Gateway

A simple landing page for students: pick your grade (4–12), get a short list of
vetted learning sites and skill-building games — no shooters, no open
social sandboxes like Roblox.

## Files
- `index.html` — the page itself (header, hero, grade picker, footer)
- `style.css` — all styling
- `script.js` — grade data + the logic that swaps resources when a grade is picked

## Host it on GitHub Pages (free)

1. Create a new GitHub repository, e.g. `first-academy-gateway`.
2. Upload these three files (`index.html`, `style.css`, `script.js`) to the
   root of the repo — drag-and-drop works on github.com, or:
   ```bash
   git init
   git add index.html style.css script.js README.md
   git commit -m "Student gateway site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/first-academy-gateway.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / `root`** → Save.
4. After a minute or two your site is live at:
   `https://<your-username>.github.io/first-academy-gateway/`
5. Optional: if the school owns `firstacademy.org` (or a subdomain like
   `students.firstacademy.org`), add a `CNAME` file in the repo root
   containing just that domain, and point a DNS CNAME record at
   `<your-username>.github.io`.

## Things to swap in before publishing

- **School logo**: replace the placeholder "FA" badge in `index.html`
  (`.logo-mark`) with `<img src="assets/logo.png" alt="First Academy logo">`
  once you have the real logo file.
- **Ministry emblem**: the header currently shows a text placeholder
  ("MOE"). If the school has permission to use the official UAE Ministry
  of Education emblem, swap it in the same way — check with school
  administration on correct usage first, since it's an official government
  mark.
- **Contact email / links**: update the footer's email and the "Main
  school website" link if needed.
- **Resource lists**: everything a student sees lives in `RESOURCE_BANDS`
  at the top of `script.js`. Add, remove, or re-grade any link there —
  each entry just needs a `name`, `url`, `desc`, and whether it awards a
  `cert` (shows a "Certificate" badge).

## Why these particular resources

Every linked site was chosen because it teaches a real, transferable
skill (coding, math, language, digital literacy) and many issue a
certificate or badge on completion — good for a student portfolio.
Nothing with unmoderated chat, ad-heavy pages, or open-world social
sandboxes was included.
