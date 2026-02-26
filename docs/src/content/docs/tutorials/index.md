---
title: Overview
---# Tutorials

In-depth tutorials organized by topic. Each tutorial takes 30-60 minutes to complete.

---

## Start Here

New to Jac? Begin with **[Build an AI Day Planner](/tutorials/first-app/build-ai-day-planner/)** -- a 7-part guide that takes you from zero to a full-stack AI-powered app, teaching the full language along the way:

| Part | What You'll Build | Concepts |
|------|-------------------|----------|
| 1: First Lines of Jac | Hello World | Syntax basics, types, functions, control flow |
| 2: Modeling Data | Task data model | Nodes, graphs, root, edges |
| 3: Backend API | HTTP endpoints | `def:pub`, imports, enums, collections |
| 4: Reactive Frontend | Working UI | Client-side code, JSX, reactive state |
| 5: AI Features | Smart categorization + shopping list | `by llm()`, `obj`, `sem`, structured output |
| 6: Authentication | Login, signup, multi-file | Auth, `impl`, declaration/implementation split |
| 7: Walkers & OSP | Reimplementation using OSP | Walkers, abilities, graph traversal |

[Start the tutorial →](/tutorials/first-app/build-ai-day-planner/){ .md-button .md-button--primary }

:::note[First App vs Full-Stack Tutorials]
**Build an AI Day Planner** is a self-contained introduction to the full Jac language -- build one app across seven parts, learning every major concept as you go. **Full-Stack Apps** (below) is a deep-dive into each concept individually. New to Jac? Start with the Day Planner. Want to understand a specific topic (routing, state, auth)? Use the Full-Stack tutorials as targeted reference.
:::


---

## Learning Paths

Choose a path based on what you want to build:

###  Core Language

Master Jac fundamentals and its unique features.

| Tutorial | Description | Time |
|----------|-------------|------|
| [Jac Basics](/tutorials/language/basics/) | Syntax, types, functions - coming from Python | 30 min |
| [Object-Spatial Programming](/tutorials/language/osp/) | Nodes, edges, walkers, graph traversal | 45 min |
| [Testing](/tutorials/language/testing/) | Write and run tests for your code | 20 min |

---

###  AI Integration

Build AI-powered applications with byLLM.

| Tutorial | Description | Time |
|----------|-------------|------|
| [byLLM Quickstart](/tutorials/ai/quickstart/) | First LLM-integrated function | 20 min |
| [Structured Outputs](/tutorials/ai/structured-outputs/) | Type-safe responses with enums and objects | 30 min |
| [Agentic AI](/tutorials/ai/agentic/) | Tool calling and ReAct patterns | 45 min |

---

###  Full-Stack Development

Build complete web applications with jac-client.

| Tutorial | Description | Time |
|----------|-------------|------|
| [Project Setup](/tutorials/fullstack/setup/) | Create a full-stack Jac project | 15 min |
| [Components](/tutorials/fullstack/components/) | Build React-style UI components | 30 min |
| [State Management](/tutorials/fullstack/state/) | Reactive state with hooks | 30 min |
| [Backend Integration](/tutorials/fullstack/backend/) | Connect frontend to walkers | 30 min |
| [Authentication](/tutorials/fullstack/auth/) | Add user login and signup | 30 min |
| [Routing](/tutorials/fullstack/routing/) | Multi-page applications | 20 min |

---

###  Production Deployment

Deploy your applications to production.

| Tutorial | Description | Time |
|----------|-------------|------|
| [Local API Server](/tutorials/production/local/) | Run as HTTP API with `jac start` | 15 min |
| [Kubernetes Deployment](/tutorials/production/kubernetes/) | Scale with `jac start --scale` | 30 min |

---

## Examples Gallery

Complete applications to study and learn from.

| Example | Description | Level |
|---------|-------------|-------|
| [LittleX](/tutorials/examples/littlex/) | Twitter clone in 200 lines | Intermediate |
| [EmailBuddy](/tutorials/examples/emailbuddy/) | AI email assistant | Intermediate |
| [RAG Chatbot](/tutorials/examples/rag-chatbot/) | Document Q&A with MCP | Advanced |
| [RPG Generator](/tutorials/examples/rpg/) | AI-generated game levels | Advanced |

[View all examples →](/tutorials/examples/)

---

## Prerequisites

Before starting tutorials, ensure you have:

- [x] Jac installed (`pip install jaseci`)
- [x] Completed the [Quick Guide](/)
- [x] A code editor (VS Code with Jac extension recommended)

**Assumed knowledge:**

- **Python familiarity required** -- Jac supersets Python; you should be comfortable with functions, classes, and type annotations
- **React/JSX familiarity helpful** -- for full-stack tutorials, basic component and hook knowledge helps
- **Web development basics helpful** -- HTTP, REST, frontend/backend separation

For AI tutorials, you'll also need:

- [x] An LLM API key (OpenAI, Anthropic, or Google)

---

## How to Use These Tutorials

1. **Follow in order** within each path - tutorials build on each other
2. **Type the code** yourself - don't just copy-paste
3. **Experiment** - modify examples to test your understanding
4. **Check the reference** - link to [Language Reference](/reference/language/) for details

---

## Quick Reference Links

| Need | Resource |
|------|----------|
| Syntax lookup | [Language Reference](/reference/language/) |
| CLI commands | [CLI Reference](/reference/cli/) |
| Configuration | [jac.toml Reference](/reference/config/) |
| Get help | [Discord Community](https://discord.gg/6j3QNdtcN6) |
