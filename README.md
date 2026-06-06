# zgit — Git, Visualized.

```bash
npm install -g @12britz/zgit
```

![MIT](https://img.shields.io/badge/license-MIT-green)
![npm](https://img.shields.io/badge/npm-@12britz%2Fzgit-red)
![Node](https://img.shields.io/badge/node-%3E%3D18-blue)

---

```
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

**Git, without the gray screen.**

`zgit` replaces `git` in your terminal with a modern, colorful, information-dense CLI.
Same commands. Richer feedback. Built for developers who ship fast.

---

## Why zgit

Terminal git is functional, but it's also forgettable. `zgit` adds visual signal without breaking muscle memory:

| | git | zgit |
|:--|:--|:--|
| Log | Plain text | Colored hash + author + time |
| Status | Symbols only | Sectioned tree + file counts |
| Diff | Raw patch | Hunks + headers + alignment |
| Branches | Text list | Active marker + clean rows |
| Feel | 1980s | 2020s |

---

## Install

```bash
npm install -g @12britz/zgit
```

Or try it instantly:

```bash
npx @12britz/zgit log
```

---

## Quick Start

```bash
# working tree state
zgit status

# visual log
zgit log

# compact log
zgit log --oneline

# branch graph
zgit log --graph

# file staging
zgit add .

# commit
zgit commit -m "hello"

# branch switch
zgit switch main
```

---

## What you get

- **Rich `log`** — colored hashes, author, time, and clean story lines
- **Clear `status`** — scannable working tree sections with file counts
- **Polished `diff`** — colored hunks and readable headers
- **Branches** — active marker and clean list view
- **Box outputs** — formatted `remote`, `tag`, `branch`, and more
- **CLI-native** — keyboard-first, fast, no electron

---

## Commands at a glance

| Command | Use when |
|:--|:--|
| `status / st` | You want to know where you are |
| `log` | You want readable history |
| `diff [file]` | You want precise changes |
| `add [path]` | You're staging work |
| `commit -m "msg"` | You're saving progress |
| `branch` | You're managing flow |
| `switch / sw <name>` | You're changing context |
| `stash` | You need a clean pane |
| `reset [ref]` | You're backing out |
| `merge <branch>` | You're joining work |
| `pull [remote]` | You're syncing up |
| `push [remote]` | You're publishing |
| `remote` | You're checking origins |
| `tag [name]` | You're marking releases |

---

## Design principles

- **Clarity over decoration**
- **Information density without noise**
- **Drop-in friendly, opinionated where it matters**
- **Beautiful by default**
- **No boxes, just lines**

---

## Support

- Issues: [12britz/zgit](https://github.com/12britz/zgit/issues)
- PRs welcome
