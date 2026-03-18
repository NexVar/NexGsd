# MertGSD



---

## What It Does

You give a project brief. MertGSD handles the rest:

1. **Researches** your domain, stack, and ecosystem
2. **Creates** requirements, roadmap, and phased execution plans
3. **Builds** with atomic git commits and real verification
4. **Audits** security, performance, mobile, SEO, accessibility, brand
5. **Deploys** to Cloudflare Pages, Vercel, or Netlify
6. **Notifies** you via push notifications when milestones complete

No hallucinations. Every claim verified against real code and real command output.

---

## Quick Start

### 1. Clone

```bash
git clone https://github.com/mertdlkr/MertGSD.git
```

### 2. Install to your project

```bash
# From your project directory:
bash /path/to/MertGSD/mertgsd-install.sh .

# Or from the MertGSD repo:
bash mertgsd-install.sh /path/to/your-project
```

This copies the `.agent/` directory (18 agents + 18 workflows) into your project.

### 3. Start building

```bash
cd your-project
/gsd-new-project              # Initialize with your project brief
```

Or go full autonomous:

```bash
/gsd-super "Build a modern SaaS dashboard with auth, billing, and analytics"
```

---

## Commands

### Core

| Command | What it does |
|---------|-------------|
| `/gsd-super [prompt]` | Full autonomy — AI builds from prompt to production |
| `/gsd-new-project` | Interactive setup: questions, research, requirements, roadmap |
| `/gsd-no-halluc [question]` | Verified Q&A with mandatory external research |

### Workflow

| Command | What it does |
|---------|-------------|
| `/gsd-discuss [phase]` | Capture implementation decisions before planning |
| `/gsd-plan [phase]` | Research and create executable task plans |
| `/gsd-execute [phase]` | Execute plans with atomic git commits |
| `/gsd-verify [phase]` | User acceptance testing against phase goals |

### Quality

| Command | What it does |
|---------|-------------|
| `/gsd-audit` | Full project audit (security, performance, mobile, SEO, a11y, brand) |
| `/gsd-review [phase]` | PR-style code review with multi-agent analysis |
| `/gsd-refactor [desc]` | Safe refactoring with test snapshots and rollback |

### Operations

| Command | What it does |
|---------|-------------|
| `/gsd-deploy` | Build, deploy, verify (CF Pages / Vercel / Netlify) |
| `/gsd-migrate [desc]` | Database migration with safety gates and rollback SQL |
| `/gsd-setup-config` | Configure notifications, deploy platform, Supabase, tests |

### Utilities

| Command | What it does |
|---------|-------------|
| `/gsd-quick [desc]` | Small ad-hoc task with GSD quality guarantees |
| `/gsd-progress` | Current state, roadblocks, next steps |
| `/gsd-commit-memory` | Distill context into long-term memory |
| `/gsd-help` | Show all commands |

---

## Agents (18)

Each agent is a specialized AI that handles one responsibility. Agents are spawned by workflows and work together.

### Execution & Planning

| Agent | Role |
|-------|------|
| `gsd-executor` | Executes plans with atomic commits, deviation handling, checkpoints |
| `gsd-planner` | Creates executable task plans with dependency analysis |
| `gsd-roadmapper` | Creates project roadmaps with phase breakdown |
| `gsd-phase-researcher` | Researches how to implement a phase before planning |
| `gsd-project-researcher` | Researches domain ecosystem before roadmap creation |
| `gsd-research-synthesizer` | Synthesizes parallel research outputs into summaries |

### Verification & Quality

| Agent | Role |
|-------|------|
| `gsd-verifier` | Goal-backward verification — checks codebase delivers what was promised |
| `gsd-plan-checker` | Verifies plans will achieve phase goals before execution |
| `gsd-integration-checker` | Verifies cross-phase integration and E2E flows |
| `gsd-debugger` | Investigates bugs using scientific method |
| `gsd-codebase-mapper` | Explores and documents codebase structure |

### Audit Agents

| Agent | Role |
|-------|------|
| `gsd-security-auditor` | OWASP scanning, dependency audit, secrets detection, CSP review |
| `gsd-performance-tester` | Bundle analysis, Lighthouse, lazy loading, performance anti-patterns |
| `gsd-mobile-auditor` | Responsive design, touch targets, viewport, overflow detection |
| `gsd-seo-checker` | Metadata, sitemap, structured data, hreflang, heading hierarchy |
| `gsd-accessibility-tester` | WCAG 2.2 AA compliance, ARIA labels, keyboard nav, contrast |
| `gsd-brand-reviewer` | Brand consistency, copy quality, design system, typography review |

### Infrastructure

| Agent | Role |
|-------|------|
| `gsd-notifier` | Push notifications via ntfy.sh at key milestones |

---

## How It Works

### Project Lifecycle

```
/gsd-new-project
    │
    ├── Deep questioning (understand vision)
    ├── Domain research (4 parallel agents)
    ├── Requirements definition
    ├── Roadmap creation (phased)
    └── Project config (ntfy, deploy, supabase)
         │
         ▼
/gsd-plan [phase]
    │
    ├── Phase research
    ├── Task planning with dependencies
    └── Plan verification (goal-backward)
         │
         ▼
/gsd-execute [phase]
    │
    ├── Execute tasks with atomic commits
    ├── Verify each task (types, lint, tests, build)
    ├── Create summary
    ├── Phase verification
    └── Push notification ✓
         │
         ▼
/gsd-audit
    │
    ├── Security audit
    ├── Performance test
    ├── Mobile audit
    ├── SEO check
    ├── Accessibility test
    └── Brand review
         │
         ▼
/gsd-deploy
    │
    ├── Build
    ├── Deploy (CF Pages / Vercel / Netlify)
    ├── Verify live URL
    └── Push notification ✓
```

### Anti-Hallucination System

Every workflow includes built-in safeguards:

| Protection | How it works |
|------------|-------------|
| File-First Context | Always re-reads files — never relies on memory |
| Source Verification | Technical claims verified via docs before use |
| Confidence Levels | Research tagged HIGH / MEDIUM / LOW |
| Verification Gates | Every task verified — output read, not assumed |
| Decision Attribution | Tracks USER-decided vs AI-suggested decisions |
| Checkpoint Integrity | Waits for user — never hallucinate completion |

### Push Notifications (ntfy.sh)

Configure during `/gsd-new-project` or `/gsd-setup-config`. Notifications fire on:

- Phase completion
- Deploy success / failure
- Audit results
- Errors and blockers

Uses [ntfy.sh](https://ntfy.sh) — free, no account needed. Install the ntfy app on your phone.

---

## File Structure

After initialization, your project gets:

```
your-project/
├── .agent/
│   ├── agents/           ← 18 specialized agents
│   └── workflows/        ← 18 workflow orchestrators
└── .planning/
    ├── PROJECT.md        ← Vision and context
    ├── REQUIREMENTS.md   ← Scoped requirements (v1/v2)
    ├── ROADMAP.md        ← Phases and progress
    ├── STATE.md          ← Current position
    ├── gsd-config.json   ← Project config (ntfy, deploy, tests)
    ├── research/         ← Domain research outputs
    └── phases/
        ├── 01-phase-name/
        │   ├── 01-PLAN.md
        │   ├── 01-SUMMARY.md
        │   ├── 01-VERIFICATION.md
        │   ├── SECURITY-AUDIT.md
        │   ├── PERFORMANCE-REPORT.md
        │   ├── MOBILE-AUDIT.md
        │   ├── SEO-REPORT.md
        │   ├── ACCESSIBILITY-REPORT.md
        │   ├── BRAND-REVIEW.md
        │   └── AUDIT.md
        └── 02-phase-name/
            └── ...
```

---

## Full Autonomous Mode

Give it a prompt and walk away:

```
/gsd-super Build a personal finance tracking app with:
- Multi-currency support (TRY, USD, EUR, BTC)
- AI assistant for natural language transactions
- Mobile-first dark theme
- Supabase backend with RLS
- Deploy to Vercel
```

MertGSD will research, plan, build, test, and deploy — notifying you at each milestone.

---

## Examples

### Start a new project
```
/gsd-new-project
> "I want to build a modern portfolio site with blog, i18n support, and an AI chatbot"
```

### Run a full audit
```
/gsd-audit
```
Spawns 6 agents in parallel: security, performance, mobile, SEO, accessibility, brand.

### Safe database migration
```
/gsd-migrate "Add account_assets table for multi-currency support"
```
Creates migration SQL, rollback SQL, asks for confirmation before applying.

### Deploy
```
/gsd-deploy
```
Auto-detects platform, builds, deploys, verifies live URL.

---

## Requirements

- Git
- Node.js 18+ (for most projects)

Optional:
- [ntfy](https://ntfy.sh) app (push notifications)
- Supabase account (if using database features)
- Cloudflare / Vercel / Netlify account (for deployment)

---

## Model Compatibility


- GPT (OpenAI)
- Gemini (Google)
- Open-source models

Model-agnostic by design: uses structural safeguards (file reads, command verification, user gates) instead of model-specific behavior.

---

## Author

**Mert Ali Dalkır** — AI-first builder, co-founder of [NexVar](https://nexvar.io).

I build tools that make AI-powered development faster, more reliable, and more structured. MertGSD is born from real production experience — every agent and workflow exists because I needed it while building real projects.

[![X](https://img.shields.io/badge/@mertdlkr-000?style=flat&logo=x&logoColor=white)](https://x.com/mertdlkr)
[![LinkedIn](https://img.shields.io/badge/mertdlkr-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mertdlkr/)
[![GitHub](https://img.shields.io/badge/mertdlkr-181717?style=flat&logo=github&logoColor=white)](https://github.com/mertdlkr)
[![Medium](https://img.shields.io/badge/@mertdlkr-000?style=flat&logo=medium&logoColor=white)](https://medium.com/@mertdlkr)
[![Telegram](https://img.shields.io/badge/@mertdlkr-26A5E4?style=flat&logo=telegram&logoColor=white)](https://t.me/mertdlkr)
[![Instagram](https://img.shields.io/badge/@mertdlkr-E4405F?style=flat&logo=instagram&logoColor=white)](https://instagram.com/mertdlkr)
[![Kaggle](https://img.shields.io/badge/mertdlkr-20BEFF?style=flat&logo=kaggle&logoColor=white)](https://kaggle.com/mertdlkr)

---

## License

MIT

---

If MertGSD saves you time, give it a star and share it. PRs welcome.
