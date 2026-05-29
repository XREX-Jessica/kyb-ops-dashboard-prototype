# KYB Ops Dashboard Prototype

Static CMS prototype for the XREX Pay internal KYB onboarding operations dashboard.

## Pages

| Page | File | Purpose |
|---|---|---|
| Case List + Queue Views | `site/index.html` | Pipeline overview, 8 queue views, role switcher |
| Case Detail | `site/case-detail.html?id=KYB-001` | Full case record, state transitions, activity log |

## Local use

Open `site/index.html` in any browser. No server required.

## GitHub Pages

Deployed automatically on push to `main`. URL: `https://<owner>.github.io/kyb-ops-dashboard-prototype/`

## Demo

- Use the **role switcher** (top of sidebar) to see how each role's view differs
- Click any case row or Case ID to open the Case Detail page
- Try the **Change State** dropdown to simulate state transitions (Waiting Customer triggers blocker validation)
- Log Contact Attempts and tick Customer Responded to see activity log entries auto-generated
- The **⚡ Returned from Customer** queue surfaces cases where `customerResponded = true`
