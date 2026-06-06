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

A beautifully colored Git CLI with box-style terminal output.

## Install

```bash
npm install -g @12britz/zgit
```

## Quick Start

```bash
zgit status
zgit log
zgit add .
zgit commit -m "hello"
```

## Interface

### Home screen

Run `zgit` with no arguments to see the welcome screen and command list.

### ASCII banner

The startup banner is printed in bold and is not shown inside a box.

## Commands

| Command | Description |
|:--|:--|
| `init [path]` | Initialize repository |
| `clone <url> [path]` | Clone repository |
| `status / st` | Show working tree state |
| `log` | Show commit history |
| `diff [file]` | Show working changes |
| `add [path]` | Stage files |
| `commit -m "msg"` | Create commit |
| `branch` | List / manage branches |
| `switch / sw <name>` | Switch branch |
| `stash` | Save / pop / list stashes |
| `reset [ref]` | Reset changes |
| `merge <branch>` | Merge branch |
| `pull [remote]` | Fetch and integrate |
| `push [remote]` | Upload commits |
| `remote` | Manage remotes |
| `tag [name]` | List / create tags |
