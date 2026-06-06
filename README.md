# zgit

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

**Beautiful Git. Beautiful terminal.**

A modern, colorful Git CLI with rich output, visual history, and a premium developer experience. Drop-in replacement for `git` that makes your terminal look legendary.

![MIT](https://img.shields.io/badge/license-MIT-green)
![npm](https://img.shields.io/badge/npm-%40britz%2Fzgit-red)
![Node](https://img.shields.io/badge/node-%3E%3D18-blue)

## Why zgit

Most CLIs betray you at the worst moment: ugly outputs, hard-to-scan history, no author info, no context. `zgit` fixes that.

- **Visual `log`**: colored hashes, author, time, and clean commit grouping
- **Beautiful `status`**: scannable working tree sections with icons
- **Box outputs**: formatted across `diff`, `branch`, `remote`, `tag`, and more
- **Drop-in feel**: familiar `git` mental model
- **Terminal-native**: built for developers who live in the CLI

## Install

```bash
npm install -g @12britz/zgit
```

Or run instantly without installing:

```bash
npx @12britz/zgit log
```

## Quick Start

```bash
zgit status
zgit log
zgit log --oneline
zgit log --graph
zgit add .
zgit commit -m "hello"
zgit branch
zgit switch main
```

## What you get

| Command | Experience |
|:--|:--|
| `zgit log` | Rich, readable history |
| `zgit status` | Clean tree state with file counts |
| `zgit diff` | Colored hunks and headers |
| `zgit branch` | Branch list with current marker |
| `zgit remote` | Formatted remotes |
| `zgit tag` | Tags shown clearly |
| `zgit stash` | Friendly stashes overview |

## philosophy

- **Clarity over decoration**
- **Information density without noise**
- **Drop-in friendly, opinionated when useful**
- **Beautiful by default**

## Support

- Report issues: [12britz/zgit](https://github.com/12britz/zgit/issues)
- PRs welcome
