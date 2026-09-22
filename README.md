# Upadyay — Faculty Recruitment Platform (Demo)

This is a front-end-only demo (no backend/database). All data — faculty
profiles, job postings, applications — lives in `localStorage` in the
browser and is scoped to whichever browser/device opens it.

## Structure — separate pages, shared nav

The app used to be a single-page app (every "screen" was a hidden `div`
overlay inside one `index.html`). It's now split into real pages, each with
its own file and URL, and a shared nav bar / footer built once and reused
everywhere:

```
index.html                        → Landing page (hero, categories, how-it-works) — the main entry point

pages/
  login.html                      → Log in                      (?role=seeker|company)
  register.html                   → Register                    (?role=seeker|company)
  jobs.html                       → Browse jobs                  (?cat=Schools|Intermediate|Higher Education)
  faculty-dashboard.html          → Faculty ("My profile") dashboard — login required
  employer-dashboard.html         → Employer poster panel (company, jobs, candidates) — login required
  profile.html                    → Full faculty profile editor  — login required
  admin.html                      → Admin panel (overview/faculty/institutions/jobs)

css/
  style.css                → all styles (unchanged, + a small "page mode" section at the bottom)

js/
  store.js                 → NEW — shared state (who's logged in, profile, company,
                              posted jobs, notifications) saved to localStorage so it
                              survives navigating between pages. Load this first.
  layout.js                → NEW — builds the shared nav bar / footer / toast /
                              notifications / mini-profile panel on every page.
                              Call mountNav('page-name') and mountChrome() once per page.
  employer.js               → demo data (faculty profiles, institutions), company
                              profile, candidate pool, job posting
  auth.js                   → login/register logic, nav login state, notifications,
                              mini profile — now navigates between pages instead of
                              opening/closing a modal overlay
  faculty.js                → faculty dashboard, profile form, browse-jobs logic
  admin.js                  → admin dashboard tables + CSV export helpers
  effects.js                → scroll-reveal + stat count-up animations (home page only)
```

### Load order (every page loads all six; effects.js is home-page only)
```
store.js → employer.js → auth.js → faculty.js → admin.js → layout.js → (effects.js on index.html only)
```

### How navigation + state works now
- `index.html` lives at the site root; every other page lives under `pages/`.
  `store.js` defines a `PAGES` map of root-relative paths (`/index.html`,
  `/pages/login.html`, etc.) and a `goTo('login' | 'register' | 'jobs' |
  'faculty' | 'employer' | 'profile' | 'admin' | 'home', params)` helper that
  reads from it and does `window.location.href = ...`. Because the paths are
  root-relative, links work the same whether they're built from `index.html`
  or from a page inside `pages/` — nothing needs `../` juggling.
- `layout.js` (the shared nav bar / footer) also builds every link from that
  same `PAGES` map, so there's one place that knows where each page lives.
- Anything that used to be "state in a JS variable" (who's logged in, their
  profile, the company profile, notifications, posted jobs, candidate
  invite/shortlist status) is now also saved to `localStorage` via
  `saveState()` any time it changes, and reloaded via `store.js` on every
  page load — so it survives a real page navigation instead of resetting.
- The faculty dashboard, employer dashboard and profile pages call
  `requireLogin('seeker' | 'company')` on load, which bounces to
  `login.html` if you're not signed in as the right role.
- `layout.js` renders the nav bar and footer identically on every page from
  one template, so editing the nav in one place changes it everywhere.

## Running it

No build step. Just open `index.html` in a browser, or serve the folder:

```
npx serve .
```

## Turning this into a real (backed) app later

If/when this gets a real backend:
- `employer.js`'s data objects (`facultyProfiles`, `institutionsData`)
  become API responses instead of hardcoded demo data.
- `store.js`'s `localStorage`-backed state becomes real session/auth state
  (cookies/JWT) and server-side data (profiles, jobs, applications) fetched
  per page instead of read from `localStorage`.
- The page boundaries are already the real routes (`/login`, `/dashboard`,
  `/admin`, etc.) — no further restructuring needed, just swap the data layer.
