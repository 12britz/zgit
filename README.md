# zgit — Git, visualized.

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

**Git, without the gray blur.**

`zgit` is a modern wrapper for `git` with richer output, visual history, and a developer experience that respects your time.
Same workflow. Better signals.

---

## why

Terminal git leaves a lot to the imagination. `zgit` adds context and color without getting in the way.

- **`log`**: colored hash, message, author, and date
- **`status`**: sectioned working tree with counts and icons
- **`diff`**: formatted hunks and headers
- **`branch`**: active marker and clean rows
- **`help`**: scannable command list

---

## install

```bash
npm install -g @12britz/zgit
```

or

```bash
npx @12britz/zgit log
```

---

## quick start

```bash
zgit status
zgit log
zgit log --oneline
zgit log --graph
zgit add .
zgit commit -m "hello"
zgit switch main
```

---

## commands

| command | use when |
|:--|:--|
| `status / st` | checking tree state |
| `log` | reading history |
| `diff [file]` | reviewing changes |
| `add [path]` | staging work |
| `commit -m "msg"` | saving progress |
| `branch` | managing flow |
| `switch / sw <name>` | changing branches |
| `stash` | cleaning context |
| `reset [ref]` | undoing safely |
| `merge <branch>` | joining work |
| `pull [remote]` | syncing |
| `push [remote]` | publishing |
| `remote` | checking origins |
| `tag [name]` | marking releases |

---

## principles

- clarity over noise
- information-dense, not cluttered
- drop-in, not rewrite-the-world
- fast keys, no mouse
- beautiful by default
