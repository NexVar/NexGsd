# MertGSD

**The open-source AI agent framework for structured project execution.** Plan, build, audit, and deploy — fully autonomous or human-in-the-loop.

MertGSD is a multi-agent system that turns AI coding assistants into complete project management engines. 18 specialized agents + 39 workflows that handle everything from initial research to production deployment, brownfield mapping, milestone ops, debugging, and maintenance.


> *"I built this because every AI coding tool is great at writing code but terrible at managing projects. MertGSD bridges that gap."* — <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">Mert Ali Dalkır</a>

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

### Option A: npm (recommended)

```bash
npm i -g mertgsd
cd your-project
mertgsd install
```

That's it. Works on **macOS, Linux, and Windows**.

To update later:

```bash
npm update -g mertgsd
mertgsd update
```

### Option B: Git clone (manual)

<details>
<summary>Click to expand</summary>

```bash
git clone https://github.com/mertdlkr/MertGSD.git
```

**macOS / Linux / WSL:**
```bash
bash MertGSD/mertgsd-install.sh /path/to/your-project
```

**Windows (PowerShell):**
```powershell
# Use Git Bash
bash MertGSD/mertgsd-install.sh C:/Users/you/your-project

# Or manual copy
Copy-Item -Recurse MertGSD/.agent your-project/.agent
```

</details>

### Start building


**Step 1 — Plan your project:**
```
/mertgsd-new-project
```
It will ask you questions about what you want to build, research the domain, and create a structured project plan. No code is written at this stage.

**Step 2 — Build it autonomously:**
```
/mertgsd-super
```
After planning, run this to execute the entire project autonomously — plan, build, test, audit, and deploy. Walk away and get notified when it's done.

**Or skip planning and go full autonomous with a prompt:**
```
/mertgsd-super "Build a SaaS dashboard with auth, billing, and analytics"
```

**See all 39 commands:**
```
/mertgsd-help
```

> **Works with any AI coding tool.** For non-slash-command tools, just tell them: "Read `.agent/workflows/mertgsd-new-project.md` and follow the workflow."

### CLI Commands

```bash
mertgsd install [path]   # Install MertGSD to a project
mertgsd update [path]    # Update to latest version
mertgsd info             # Show agent/workflow counts
mertgsd --version        # Show version
mertgsd --help           # Show help
```

---

## Usage by Platform



```bash
cd your-project
/mertgsd-new-project          # Initialize project
/mertgsd-plan 1               # Plan phase 1
/mertgsd-execute 1            # Execute with atomic commits
/mertgsd-audit                # Full quality audit
/mertgsd-deploy               # Deploy to production
```

### GitHub Copilot CLI / OpenAI Codex CLI

The `.agent/` directory works as context files. Point the CLI to read them:

```bash
# Copilot CLI
copilot "Read .agent/workflows/mertgsd-new-project.md and follow the workflow to initialize this project"

# Codex CLI
codex "Follow the workflow in .agent/workflows/mertgsd-super.md to build: [your prompt]"
```

Add a `.github/copilot-instructions.md` referencing MertGSD:
```markdown
When I say /mertgsd-[command], read and follow .agent/workflows/mertgsd-[command].md
Available agents are in .agent/agents/
```

### Cursor / Windsurf / Cline / VS Code (IDE Agents)

1. Install MertGSD to your project: `./mertgsd-install.sh .`
2. Open your project in the IDE
3. Reference workflows in chat:
   - "Follow .agent/workflows/mertgsd-new-project.md to set up this project"
   - "Use the mertgsd-security-auditor agent to scan for vulnerabilities"
4. The IDE agent reads the `.agent/` files as context and follows the structured workflows

### Any LLM / Custom Setup

MertGSD agents and workflows are plain Markdown files. Any LLM that can read files and execute commands can use them:

```
System prompt: "You have access to a project management framework in .agent/.
Read .agent/workflows/mertgsd-help.md for available commands. When the user requests
a workflow, read and follow the corresponding .md file step by step."
```

---

## Default Workflow (The MertGSD Loop)

This is how most projects flow from idea to production:

```
┌─────────────────────────────────────────────────────────────┐
│                    THE MERTGSD LOOP                           │
│                                                              │
│  ┌──────────────┐                                           │
│  │ /mertgsd-new-project │  ← You describe what to build         │
│  └──────┬───────┘                                           │
│         │  Creates: PROJECT.md, REQUIREMENTS.md,            │
│         │  ROADMAP.md, STATE.md, mertgsd-config.json            │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /mertgsd-plan N  │  ← Research + create task plans           │
│  └──────┬───────┘                                           │
│         │  Creates: RESEARCH.md, PLAN.md files              │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /mertgsd-execute N│  ← Build with atomic commits             │
│  └──────┬───────┘                                           │
│         │  Creates: SUMMARY.md, VERIFICATION.md             │
│         │  Sends: push notification ✓                       │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /mertgsd-verify N│  ← User acceptance testing                │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ├── Pass? → Next phase (repeat from /mertgsd-plan N+1)  │
│         └── Gaps? → /mertgsd-plan N --gaps (fix and re-execute) │
│                                                              │
│  After all phases:                                           │
│  ┌──────────────┐                                           │
│  │ /mertgsd-audit   │  ← Security, performance, mobile, SEO,   │
│  └──────┬───────┘    accessibility, brand review             │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │ /mertgsd-deploy  │  ← Build, deploy, verify live URL         │
│  └──────────────┘                                           │
│                                                              │
│  SHORTCUT: /mertgsd-super does ALL of this autonomously         │
└─────────────────────────────────────────────────────────────┘
```

**For quick tasks** that don't need full project setup:
```
/mertgsd-quick "Add dark mode toggle to the navbar"
```

---

## Command Surface

### Core

| Command | What it does |
|---------|-------------|
| `/mertgsd-super [prompt]` | Full autonomy — prompt to production, zero human input |
| `/mertgsd-new-project` | Interactive setup: questions → research → requirements → roadmap → config |
| `/mertgsd-no-halluc [question]` | Verified Q&A with mandatory external research and citations |

### Build Cycle

| Command | What it does |
|---------|-------------|
| `/mertgsd-discuss [phase]` | Capture implementation decisions before planning |
| `/mertgsd-plan [phase]` | Research and create executable task plans |
| `/mertgsd-execute [phase]` | Execute plans with atomic git commits |
| `/mertgsd-verify [phase]` | User acceptance testing against phase goals |

### Quality & Review

| Command | What it does |
|---------|-------------|
| `/mertgsd-audit` | Full project audit — 6 agents in parallel |
| `/mertgsd-review [phase]` | PR-style code review with multi-agent analysis |
| `/mertgsd-refactor [desc]` | Safe refactoring with test snapshots + auto-rollback |

### Operations

| Command | What it does |
|---------|-------------|
| `/mertgsd-deploy` | Build → deploy → verify (CF Pages / Vercel / Netlify) |
| `/mertgsd-migrate [desc]` | DB migration with safety gates + rollback SQL |
| `/mertgsd-setup-config` | Configure ntfy, deploy platform, Supabase, tests |

### Utilities

| Command | What it does |
|---------|-------------|
| `/mertgsd-quick [desc]` | Small ad-hoc task with MertGSD guarantees |
| `/mertgsd-progress` | Current state, blockers, next steps |
| `/mertgsd-commit-memory` | Distill context into long-term memory |
| `/mertgsd-help` | Show all commands |

### Brownfield & Milestones

| Command | What it does |
|---------|-------------|
| `/mertgsd-map-codebase` | Build a real codebase map before planning existing projects |
| `/mertgsd-new-milestone` | Start the next milestone on an existing project |
| `/mertgsd-audit-milestone` | Verify milestone-wide requirement coverage and integration |
| `/mertgsd-complete-milestone` | Archive a shipped milestone and prepare the next cycle |
| `/mertgsd-plan-milestone-gaps` | Turn milestone audit gaps into roadmap work |

### Continuity & Maintenance

| Command | What it does |
|---------|-------------|
| `/mertgsd-debug [issue]` | Start or resume a structured debug session |
| `/mertgsd-pause-work` | Save a precise handoff for the next session |
| `/mertgsd-resume-work` | Restore project context and route to the next step |
| `/mertgsd-add-todo` | Capture follow-up work without losing context |
| `/mertgsd-check-todos` | Review pending todos and route them into action |
| `/mertgsd-health` | Validate `.planning/` integrity and repair safe issues |
| `/mertgsd-update` | Update a MertGSD clone or explain reinstall path |
| `/mertgsd-settings` | Inspect or update MertGSD project settings |
| `/mertgsd-set-profile` | Set the preferred model profile |
| `/mertgsd-research-phase` | Run standalone phase research before planning |
| `/mertgsd-add-phase` | Append a new roadmap phase |
| `/mertgsd-insert-phase` | Insert an urgent decimal phase |
| `/mertgsd-remove-phase` | Remove an unstarted future phase |
| `/mertgsd-add-tests` | Add or strengthen tests for an area or phase |
| `/mertgsd-reapply-patches` | Reapply locally saved patch overlays after updates |

---

## All Agents (18)

### Planning & Execution

| Agent | What it does |
|-------|-------------|
| `mertgsd-executor` | Executes plans with atomic commits, deviation handling, checkpoints |
| `mertgsd-planner` | Creates task plans with dependency analysis and wave ordering |
| `mertgsd-roadmapper` | Creates phased project roadmaps from requirements |
| `mertgsd-phase-researcher` | Researches implementation approach before planning |
| `mertgsd-project-researcher` | Researches domain, stack, ecosystem before roadmap |
| `mertgsd-research-synthesizer` | Merges parallel research outputs into actionable summaries |

### Verification

| Agent | What it does |
|-------|-------------|
| `mertgsd-verifier` | Goal-backward verification — did the code deliver what was promised? |
| `mertgsd-plan-checker` | Pre-execution plan quality check |
| `mertgsd-integration-checker` | Cross-phase integration and E2E flow verification |
| `mertgsd-debugger` | Scientific method bug investigation with hypothesis testing |
| `mertgsd-codebase-mapper` | Explores and documents codebase structure |

### Quality Auditors

| Agent | What it does |
|-------|-------------|
| `mertgsd-security-auditor` | OWASP top 10, dependency audit, secrets detection, CSP |
| `mertgsd-performance-tester` | Lighthouse, bundle size, lazy loading, render performance |
| `mertgsd-mobile-auditor` | Responsive design, touch targets, viewport, overflow |
| `mertgsd-seo-checker` | Metadata, sitemap, structured data, hreflang, headings |
| `mertgsd-accessibility-tester` | WCAG 2.2 AA, ARIA, keyboard nav, contrast, focus |
| `mertgsd-brand-reviewer` | Brand consistency, copy quality, design system, typography |

### Infrastructure

| Agent | What it does |
|-------|-------------|
| `mertgsd-notifier` | Push notifications via ntfy.sh at milestones |

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

Configure during `/mertgsd-new-project` or `/mertgsd-setup-config`:

```
"Push bildirim almak ister misin?" → yes
"ntfy kanal adı?" → my-project-alerts
```

You'll get notified on your phone when:
- A phase completes
- Deploy succeeds or fails
- Audit finds critical issues
- Errors block execution

Uses <a href="https://ntfy.sh" target="_blank" rel="noreferrer">ntfy.sh</a> — free, open-source, no account needed.

---

## File Structure

```
your-project/
├── .agent/                          ← MertGSD system (copied by install)
│   ├── agents/                      ← 18 specialized agents
│   │   ├── mertgsd-executor.md
│   │   ├── mertgsd-planner.md
│   │   ├── mertgsd-security-auditor.md
│   │   └── ... (18 total)
│   └── workflows/                   ← 39 workflows
│       ├── mertgsd-new-project.md
│       ├── mertgsd-super.md
│       ├── mertgsd-audit.md
│       └── ... (18 total)
│
└── .planning/                       ← Project state (created by mertgsd-new-project)
    ├── PROJECT.md                   ← Vision and context
    ├── REQUIREMENTS.md              ← v1/v2 requirements
    ├── ROADMAP.md                   ← Phases and progress
    ├── STATE.md                     ← Current position (living memory)
    ├── mertgsd-config.json              ← Settings (ntfy, deploy, tests)
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

- **<a href="https://nexvar.io" target="_blank" rel="noreferrer">NexVar.io</a>** — AI-first software studio site (Next.js 16, i18n, AI chatbot, newsletter, blog CMS)
- **Vault** — Personal finance tracker (Supabase, multi-currency, AI assistant, real-time rates)

Every agent and workflow exists because it was needed during real development. Read more at <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">mertdlkr.com</a>.

---

## Requirements

**Required:**
- Git

**Optional:**
- Node.js 18+ (for web projects)
- <a href="https://ntfy.sh" target="_blank" rel="noreferrer">ntfy</a> app (push notifications)
- Supabase / Prisma (database features)
- Cloudflare / Vercel / Netlify (deployment)

---

## Model Compatibility

MertGSD works with any LLM:

| Model | Status |
|-------|--------|
| GPT / Codex (OpenAI) | Compatible |
| Gemini (Google) | Compatible |
| Llama / Mistral / DeepSeek | Compatible |

Model-agnostic by design — uses structural safeguards (file reads, command verification, user gates) instead of model-specific prompting.

---

## Contributing

PRs welcome. If you add a new agent or workflow, follow the existing format in `.agent/agents/` and `.agent/workflows/`.

---

## Author

**<a href="https://mertdlkr.com" target="_blank" rel="noreferrer">Mert Ali Dalkır</a>** — AI-first builder, co-founder of <a href="https://nexvar.io" target="_blank" rel="noreferrer">NexVar</a>.

I build tools and systems that make AI-powered development faster, more reliable, and more structured. MertGSD is the execution framework behind everything I ship.

<a href="https://mertdlkr.com" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr.com-000?style=flat&amp;logo=safari&amp;logoColor=white" alt="Website"></a>
<a href="https://x.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-000?style=flat&amp;logo=x&amp;logoColor=white" alt="X"></a>
<a href="https://www.linkedin.com/in/mertdlkr/" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr-0A66C2?style=flat&amp;logo=linkedin&amp;logoColor=white" alt="LinkedIn"></a>
<a href="https://github.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr-181717?style=flat&amp;logo=github&amp;logoColor=white" alt="GitHub"></a>
<a href="https://medium.com/@mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-000?style=flat&amp;logo=medium&amp;logoColor=white" alt="Medium"></a>
<a href="https://t.me/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-26A5E4?style=flat&amp;logo=telegram&amp;logoColor=white" alt="Telegram"></a>
<a href="https://instagram.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/@mertdlkr-E4405F?style=flat&amp;logo=instagram&amp;logoColor=white" alt="Instagram"></a>
<a href="https://kaggle.com/mertdlkr" target="_blank" rel="noreferrer"><img src="https://img.shields.io/badge/mertdlkr-20BEFF?style=flat&amp;logo=kaggle&amp;logoColor=white" alt="Kaggle"></a>

---

## License

MIT

---

**If MertGSD saves you time, give it a star.** It helps others find it.

Built with conviction at <a href="https://mertdlkr.com" target="_blank" rel="noreferrer">mertdlkr.com</a>.

<!--
Keywords for discoverability:
multi-agent system, structured ai development, ai coding workflow, llm project planning,
ai code review, ai security audit, anti-hallucination, context management,
phased execution, atomic commits, ai deployment automation, cursor agents,
copilot custom agents, codex agents, windsurf agents, cline agents,
ai software development, prompt to production, ai-powered development
-->
