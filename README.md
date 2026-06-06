# ⚡️ zgit — Git, Visualized.

A beautifully styled, Tokyo Night-themed CLI wrapper for Git that turns raw output into structured visual panels.

[![MIT License](https://img.shields.io/badge/license-MIT-9ece6a?style=for-the-badge)](LICENSE)
[![npm version](https://img.shields.io/badge/npm-@12britz%2Fzgit-7aa2f7?style=for-the-badge)](https://www.npmjs.com/package/@12britz/zgit)
[![Node.js version](https://img.shields.io/badge/node-%3E%3D18.0.0-bb9af3?style=for-the-badge)](package.json)

---

```text
  ░██   ░██    
                              ░██    
  ░█████████  ░████████ ░██░████████ 
       ░███  ░██    ░██ ░██   ░██    
     ░███    ░██    ░██ ░██   ░██    
   ░███      ░██   ░███ ░██   ░██    
  ░█████████  ░█████░██ ░██    ░████ 
                    ░██              
              ░███████
```

### **Git, without the grey blur.**

`zgit` wraps standard `git` commands and presents them in high-contrast Tokyo Night widgets. Zero configuration, zero context switching. Just your workflow, beautiful by default.

---

## ✨ Features

### 1. Unified Status Panels (`zgit status`)
Get a grouped summary of your staging and working tree state with color-coded headings and status indicators:
```text
╭─ Status ─────────────────────────────────╮
│ ℹ Branch:   main                         │
│ ℹ Tracking: origin/main                  │
│                                          │
│ MODIFIED (1)                             │
│   📝 src/banner.js                       │
╰──────────────────────────────────────────╯
```

### 2. Streamlined Log Trees (`zgit log` & `zgit log --graph`)
Read history with custom bullet symbols, contributor flags, and formatted relative dates.
Uses a right-borderless **open-box style** to prevent wrapping on thin terminals:
```text
╭─ Logs ────────────────────────────────────────────────────────────────────────────────
│ ● f36a1ef feat: premium ui refresh for zgit log, help, and readme (by britz) 6/6/2026
│ ● 5acdc63 feat: premium zgit log output (by britz) 6/6/2026
│ ● ef48476 docs: redesign readme as premium landing page (by britz) 6/6/2026
╰───────────────────────────────────────────────────────────────────────────────────────
```

### 3. Open-Box Diff Layout (`zgit diff`)
No more copying vertical borders (`│`) when extracting code from diff outputs. Line additions are colored soft green, deletions soft red, and file indicators cyan.

### 4. Rich Branch Summaries (`zgit branch`)
Highlights your current branch in bold green and lists other branches alongside their latest short commit hashes and summaries:
```text
╭─ Branches ────────────────────────────────────────────────────────────────────────────────╮
│ Current: main                                                                             │
│                                                                                           │
│ ● main [f36a1ef] (feat: premium ui refresh for zgit log, help, and readme)                │
│   remotes/origin/main [f36a1ef] (feat: premium ui refresh for zgit log, help, and readme) │
╰───────────────────────────────────────────────────────────────────────────────────────────╯
```

---

## 🚀 Install & Quick Start

### Global Installation
```bash
npm install -g @12britz/zgit
```

### Run without installing (On-Demand)
```bash
npx @12britz/zgit st
```

### Typical Workflow Commands
```bash
zgit status                 # Beautiful working tree status
zgit branch                 # Rich branch list with commit logs
zgit diff [file]            # Colored code diffs
zgit log --count 5          # History log list
zgit add .                  # Stage files in a green status frame
zgit commit -m "Your msg"   # Record commit
zgit push origin            # Push commits to remote
```

---

## 🛠 Command Reference

| Command | Shortcut | Description | Output Style |
|:---|:---|:---|:---|
| `init [path]` | - | Create new git repository | Full Box |
| `clone <url> [path]` | - | Clone a remote repo | Full Box |
| `status` | `st` | Check working tree state | Full Box |
| `log` | - | Read commit history list | Open Box |
| `diff [file]` | - | Review file changes | Open Box |
| `add [path]` | - | Stage files to indexes | Full Box |
| `commit` | - | Record changes | Full Box |
| `branch` | - | Manage local/remote branches | Full Box |
| `switch <name>` | `sw` | Change working branches | Full Box |
| `stash` | - | Save or pop changes | Open Box |
| `reset [ref]` | - | Reset changes (mixed/hard/soft)| Full Box |
| `merge <branch>` | - | Join work branches | Full Box |
| `pull / push` | - | Sync changes with origin | Full Box |
| `remote` | - | Manage git origins | Open Box |
| `tag [name]` | - | Mark version releases | Full Box |

---

## 🎨 Theme Details
`zgit` uses custom TrueColor escape sequences mapped to the Tokyo Night theme:
* **Background Accent Panels**: `#7aa2f7` (Tokyo Night Blue)
* **Success/Staged Action Panels**: `#9ece6a` (Soft Green)
* **Danger/Delete Action Panels**: `#f7768e` (Coral Red)
* **Caution/Reset Action Panels**: `#e0af68` (Warm Yellow)
* **Graph/Conflict Action Panels**: `#bb9af3` (Warm Purple)
