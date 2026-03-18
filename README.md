# MertGSD

**The open-source AI agent framework for structured project execution.** Plan, build, audit, and deploy — fully autonomous or human-in-the-loop.

MertGSD is a multi-agent system that turns AI coding assistants into complete project management engines. 18 specialized agents + 18 workflows that handle everything from initial research to production deployment.


> *"I built this because every AI coding tool is great at writing code but terrible at managing projects. MertGSD bridges that gap."* — Mert Ali Dalkır

---

## Why MertGSD?

**The problem:** AI coding assistants write code fast but lose context between sessions, hallucinate project state, skip testing, forget to audit security, and can't manage multi-phase projects.

**The solution:** MertGSD adds a structured execution layer on top of any AI coding tool:

- **Context management** — `.planning/` directory persists project state across sessions
- **Anti-hallucination** — every claim verified against real files and real command output
- **Quality gates** — security, performance, mobile, SEO, accessibility, brand audits built-in
- **Autonomous execution** — give a prompt, walk away, get notified when done
- **Phased delivery** — complex projects broken into manageable phases with atomic commits

---

## Quick Start

### Install

```bash
git clone https://github.com/mertdlkr/MertGSD.git
```

### Add to your project

```bash
bash MertGSD/mertgsd-install.sh /path/to/your-project
```

This copies `.agent/` (18 agents + 18 workflows) into your project directory.

### Start building

```bash
/gsd-new-project
```

**Full autonomous mode:**
```
/gsd-super "Build a SaaS dashboard with auth, billing, and real-time analytics"
```

---

## Usage by Platform



```bash
cd your-project
/gsd-new-project          # Initialize project
/gsd-plan 1               # Plan phase 1
/gsd-execute 1            # Execute with atomic commits
/gsd-audit                # Full quality audit
/gsd-deploy               # Deploy to production
```

### GitHub Copilot CLI / OpenAI Codex CLI

The `.agent/` directory works as context files. Point the CLI to read them:

```bash
# Copilot CLI
copilot "Read .agent/workflows/gsd-new-project.md and follow the workflow to initialize this project"

# Codex CLI
codex "Follow the workflow in .agent/workflows/gsd-super.md to build: [your prompt]"
```

Add a `.github/copilot-instructions.md` referencing MertGSD:
```markdown
When I say /gsd-[command], read and follow .agent/workflows/gsd-[command].md
Available agents are in .agent/agents/
```

### Cursor / Windsurf / Cline (IDE Agents)

1. Install MertGSD to your project: `bash mertgsd-install.sh .`
2. Open your project in the IDE
3. Reference workflows in chat:
   - "Follow .agent/workflows/gsd-new-project.md to set up this project"
   - "Use the gsd-security-auditor agent to scan for vulnerabilities"
4. The IDE agent reads the `.agent/` files as context and follows the structured workflows

### Any LLM / Custom Setup

MertGSD agents and workflows are plain Markdown files. Any LLM that can read files and execute commands can use them:

```
System prompt: "You have access to a project management framework in .agent/.
Read .agent/workflows/gsd-help.md for available commands. When the user requests
a workflow, read and follow the corresponding .md file step by step."
```

---

## Default Workflow (The GSD Loop)

This is how most projects flow from idea to production:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE GSD LOOP                              │
│                                                              │
│  ┌──────────────┐                                           │
│  │ /gsd-new-project │  ← You describe what to build         │
│  └──────┬───────┘                                           │
│         │  Creates: PROJECT.md, REQUIREMENTS.md,            │
│         │  ROADMAP.md, STATE.md, gsd-config.json            │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /gsd-plan N  │  ← Research + create task plans           │
│  └──────┬───────┘                                           │
│         │  Creates: RESEARCH.md, PLAN.md files              │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /gsd-execute N│  ← Build with atomic commits             │
│  └──────┬───────┘                                           │
│         │  Creates: SUMMARY.md, VERIFICATION.md             │
│         │  Sends: push notification ✓                       │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /gsd-verify N│  ← User acceptance testing                │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ├── Pass? → Next phase (repeat from /gsd-plan N+1)  │
│         └── Gaps? → /gsd-plan N --gaps (fix and re-execute) │
│                                                              │
│  After all phases:                                           │
│  ┌──────────────┐                                           │
│  │ /gsd-audit   │  ← Security, performance, mobile, SEO,   │
│  └──────┬───────┘    accessibility, brand review             │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /gsd-deploy  │  ← Build, deploy, verify live URL         │
│  └──────────────┘                                           │
│                                                              │
│  SHORTCUT: /gsd-super does ALL of this autonomously         │
└─────────────────────────────────────────────────────────────┘
```

**For quick tasks** that don't need full project setup:
```
/gsd-quick "Add dark mode toggle to the navbar"
```

---

## All Commands (18)

### Core

| Command | What it does |
|---------|-------------|
| `/gsd-super [prompt]` | Full autonomy — prompt to production, zero human input |
| `/gsd-new-project` | Interactive setup: questions → research → requirements → roadmap → config |
| `/gsd-no-halluc [question]` | Verified Q&A with mandatory external research and citations |

### Build Cycle

| Command | What it does |
|---------|-------------|
| `/gsd-discuss [phase]` | Capture implementation decisions before planning |
| `/gsd-plan [phase]` | Research and create executable task plans |
| `/gsd-execute [phase]` | Execute plans with atomic git commits |
| `/gsd-verify [phase]` | User acceptance testing against phase goals |

### Quality & Review

| Command | What it does |
|---------|-------------|
| `/gsd-audit` | Full project audit — 6 agents in parallel |
| `/gsd-review [phase]` | PR-style code review with multi-agent analysis |
| `/gsd-refactor [desc]` | Safe refactoring with test snapshots + auto-rollback |

### Operations

| Command | What it does |
|---------|-------------|
| `/gsd-deploy` | Build → deploy → verify (CF Pages / Vercel / Netlify) |
| `/gsd-migrate [desc]` | DB migration with safety gates + rollback SQL |
| `/gsd-setup-config` | Configure ntfy, deploy platform, Supabase, tests |

### Utilities

| Command | What it does |
|---------|-------------|
| `/gsd-quick [desc]` | Small ad-hoc task with GSD guarantees |
| `/gsd-progress` | Current state, blockers, next steps |
| `/gsd-commit-memory` | Distill context into long-term memory |
| `/gsd-help` | Show all commands |

---

## All Agents (18)

### Planning & Execution

| Agent | What it does |
|-------|-------------|
| `gsd-executor` | Executes plans with atomic commits, deviation handling, checkpoints |
| `gsd-planner` | Creates task plans with dependency analysis and wave ordering |
| `gsd-roadmapper` | Creates phased project roadmaps from requirements |
| `gsd-phase-researcher` | Researches implementation approach before planning |
| `gsd-project-researcher` | Researches domain, stack, ecosystem before roadmap |
| `gsd-research-synthesizer` | Merges parallel research outputs into actionable summaries |

### Verification

| Agent | What it does |
|-------|-------------|
| `gsd-verifier` | Goal-backward verification — did the code deliver what was promised? |
| `gsd-plan-checker` | Pre-execution plan quality check |
| `gsd-integration-checker` | Cross-phase integration and E2E flow verification |
| `gsd-debugger` | Scientific method bug investigation with hypothesis testing |
| `gsd-codebase-mapper` | Explores and documents codebase structure |

### Quality Auditors

| Agent | What it does |
|-------|-------------|
| `gsd-security-auditor` | OWASP top 10, dependency audit, secrets detection, CSP |
| `gsd-performance-tester` | Lighthouse, bundle size, lazy loading, render performance |
| `gsd-mobile-auditor` | Responsive design, touch targets, viewport, overflow |
| `gsd-seo-checker` | Metadata, sitemap, structured data, hreflang, headings |
| `gsd-accessibility-tester` | WCAG 2.2 AA, ARIA, keyboard nav, contrast, focus |
| `gsd-brand-reviewer` | Brand consistency, copy quality, design system, typography |

### Infrastructure

| Agent | What it does |
|-------|-------------|
| `gsd-notifier` | Push notifications via ntfy.sh at milestones |

---

## Anti-Hallucination System

The #1 problem with AI coding: it says it did something but didn't actually do it. MertGSD has 8 structural safeguards:

| Protection | How |
|------------|-----|
| **File-First Context** | Always re-reads files before acting — never trusts memory |
| **Source Verification** | Technical claims verified against docs, not training data |
| **Confidence Levels** | Research tagged `HIGH` (verified) / `MEDIUM` (searched) / `LOW` (memory) |
| **Verification Gates** | Every task output is READ — not assumed to pass |
| **No Auto-Pass** | Build/test results never marked passed without actual output |
| **Decision Attribution** | Tracks `USER-decided` vs `AI-suggested` for audit trail |
| **Context Freshness** | New conversation recommended between workflow steps |
| **Checkpoint Integrity** | Waits for human approval — never skips confirmation |

---

## Push Notifications

Configure during `/gsd-new-project` or `/gsd-setup-config`:

```
"Push bildirim almak ister misin?" → yes
"ntfy kanal adı?" → my-project-alerts
```

You'll get notified on your phone when:
- A phase completes
- Deploy succeeds or fails
- Audit finds critical issues
- Errors block execution

Uses [ntfy.sh](https://ntfy.sh) — free, open-source, no account needed.

---

## File Structure

```
your-project/
├── .agent/                          ← MertGSD system (copied by install)
│   ├── agents/                      ← 18 specialized agents
│   │   ├── gsd-executor.md
│   │   ├── gsd-planner.md
│   │   ├── gsd-security-auditor.md
│   │   └── ... (18 total)
│   └── workflows/                   ← 18 workflow orchestrators
│       ├── gsd-new-project.md
│       ├── gsd-super.md
│       ├── gsd-audit.md
│       └── ... (18 total)
│
└── .planning/                       ← Project state (created by gsd-new-project)
    ├── PROJECT.md                   ← Vision and context
    ├── REQUIREMENTS.md              ← v1/v2 requirements
    ├── ROADMAP.md                   ← Phases and progress
    ├── STATE.md                     ← Current position (living memory)
    ├── gsd-config.json              ← Settings (ntfy, deploy, tests)
    ├── research/                    ← Domain research
    └── phases/
        └── 01-phase-name/
            ├── 01-01-PLAN.md        ← Task plan
            ├── 01-01-SUMMARY.md     ← Execution summary
            ├── 01-VERIFICATION.md   ← Goal verification
            ├── SECURITY-AUDIT.md    ← Security report
            ├── PERFORMANCE-REPORT.md
            ├── MOBILE-AUDIT.md
            ├── SEO-REPORT.md
            ├── ACCESSIBILITY-REPORT.md
            ├── BRAND-REVIEW.md
            └── AUDIT.md             ← Unified audit
```

---

## Real-World Example

This system was built while shipping real production projects:

- **NexVar.io** — AI-first software studio site (Next.js 16, i18n, AI chatbot, newsletter, blog CMS)
- **Vault** — Personal finance tracker (Supabase, multi-currency, AI assistant, real-time rates)

Every agent and workflow exists because it was needed during real development.

---

## Requirements

**Required:**
- Git

**Optional:**
- Node.js 18+ (for web projects)
- [ntfy](https://ntfy.sh) app (push notifications)
- Supabase / Prisma (database features)
- Cloudflare / Vercel / Netlify (deployment)

---

## Model Compatibility

MertGSD works with any LLM:

| Model | Status |
|-------|--------|
| GPT-4 / GPT-4o (OpenAI) | Compatible |
| Gemini (Google) | Compatible |
| Llama / Mistral / DeepSeek | Compatible |

Model-agnostic by design — uses structural safeguards (file reads, command verification, user gates) instead of model-specific prompting.

---

## Contributing

PRs welcome. If you add a new agent or workflow, follow the existing format in `.agent/agents/` and `.agent/workflows/`.

---

## Author

**Mert Ali Dalkır** — AI-first builder, co-founder of [NexVar](https://nexvar.io).

I build tools and systems that make AI-powered development faster, more reliable, and more structured. MertGSD is the execution framework behind everything I ship.

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

**If MertGSD saves you time, give it a star.** It helps others find it.

<!--
Keywords for discoverability:
multi-agent system, structured ai development, ai coding workflow, llm project planning,
ai code review, ai security audit, anti-hallucination, context management,
phased execution, atomic commits, ai deployment automation, cursor agents,
copilot custom agents, codex agents, windsurf agents, cline agents,
ai software development, prompt to production, ai-powered development
-->
