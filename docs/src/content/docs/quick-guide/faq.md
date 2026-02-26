---
title: FAQ
---

Common questions and answers. If you don't see your question below and couldn't find a solution in the docs, ask your question in our [Discord Community](https://discord.gg/6j3QNdtcN6) (We try to answer within 2hrs.)

---

## Getting Started & Setup

<details>
<summary>I updated to the latest Jaseci PyPI packages and my project won't <code>jac start</code> properly.</summary>

Run `jac purge` to clear the global bytecode cache. This is the recommended approach after upgrading packages:

```bash
jac purge
```

This command works even when the cache is corrupted. If `jac purge` is not available (older versions), manually clear the cache:

```
Linux:   rm -rf ~/.cache/jac/bytecode/
macOS:   rm -rf ~/Library/Caches/jac/bytecode/
Windows: rmdir /s /q %LOCALAPPDATA%\jac\cache\bytecode
```

</details>

<details>
<summary>What do I need to install to get started with Jac?</summary>

See the [Installation Guide](/quick-guide/install/).

</details>

<details>
<summary>What are good first projects to build with Jac?</summary>

Check out the [To-Do App Tutorial](/tutorials/first-app/part1-todo-app/).

</details>

## Language & Concepts

<details>
<summary>What's the difference between Jac, Jaclang, and Jaseci?</summary>

- **Jac**: The language
- **Jaclang**: The compiler/runtime
- **Jaseci**: The full framework and ecosystem including plugins (byllm, jac-client, jac-scale, etc.)

</details>

<details>
<summary>Do I need to know graph theory to use Jaseci?</summary>

No. Learn OSP: [OSP Guide](/tutorials/language/osp/).

</details>

<details>
<summary>Can I use Python libraries (PyPI) in Jac?</summary>

Yes. Jac integrates seamlessly with Python libraries.

</details>

<details>
<summary>What's the learning curve coming from Python? How is Jac different from just using Python?</summary>

Jac supersets Python. It adds graph-based architecture and AI-native features. [Learn Jac Basics - from Python](/tutorials/language/basics/).

</details>

<details>
<summary>Can ____ be done in Jac? Is ____ compatible with Jac?</summary>

**Yes**, if the answer to any of these questions is yes:

- Can it be done in Python with any PyPI package?
- Can it be done in TypeScript/JavaScript with any Node.js package?
- Can it be done in C with any C-compatible library?

Jac compiles to Python (server), JavaScript (client), and native binaries (C ABI), so any library or tool compatible with those ecosystems is compatible with Jac.

**If you find something that works in Python/Node.js/C but doesn't work in Jac, that's a bug!** Please [file an issue](https://github.com/Jaseci-Labs/jaseci/issues) or let us know in the [Discord](https://discord.gg/6j3QNdtcN6).

</details>

## AI & LLM Integration

<details>
<summary>How does byLLM differ from calling OpenAI/Anthropic directly?</summary>

- Standardized interface across AI providers
- Integrated model management in Jac
- Simplified prompt engineering

See [API key setup](/tutorials/first-app/part2-ai-features/#set-up-your-api-key).

</details>

<details>
<summary>How do I structure by llm() functions so that the output is deterministic and parseable?</summary>

Use structured prompts and response templates. [AI Integration Reference](/reference/language/ai-integration/).

</details>

## Production & Deployment

<details>
<summary>How do I deploy a Jac app to production?</summary>

- [Local Deployment](/tutorials/production/local/): `jac start` creates an HTTP API server.
- [Kubernetes Deployment](/tutorials/production/kubernetes/): Deploy with a single command.

</details>

<details>
<summary>Do I need Docker/Kubernetes knowledge to use jac-scale?</summary>

No. jac-scale handles containerization and orchestration automatically.

</details>

<details>
<summary>What does jac-scale do automatically?</summary>

- Containerizes Jac application
- Sets up Kubernetes deployment
- Manages scaling and load balancing

[Kubernetes Deployment Reference](/reference/language/deployment/).

</details>

## Debugging & Support

<details>
<summary>Where's the best place to get help?</summary>

Join the [Jaseci Discord Community](https://discord.gg/6j3QNdtcN6) and use the #get-help channel.

</details>

<details>
<summary>What debugging tools are available for Jac?</summary>

- VS Code debugger support: [Debugging Guide](/tutorials/language/debugging/)
- Writing and running tests: [Testing Reference](/reference/testing/)

</details>

<details>
<summary>How do I debug graph state visually and trace execution flow?</summary>

Use the graph visualization tool in the debugger: [Debugging Guide](/tutorials/language/debugging/).

</details>

<details>
<summary>How do I test Jac walkers and nodes?</summary>

[Testing Guide](/tutorials/language/testing/).

</details>

## Project Structure & Best Practices

<details>
<summary>Can I build a complete app in one .jac file?</summary>

Technically yes, but not recommended. Use modular structure for scalability. See [Project Setup](/tutorials/fullstack/setup/).

</details>

<details>
<summary>Can I use Jac with React/frontend frameworks?</summary>

Yes. Jac supports [React-style components](/tutorials/fullstack/components/).

</details>

<details>
<summary>How do I structure multi-agent AI systems in Jac?</summary>

Use the project template: `jac create <project_name> --use <template_name>`

Organize files by purpose:
- `.jac`: Core logic
- `.cl.jac`: Client-side code
- `.impl.jac`: Implementation details

See [CLI Reference](/reference/cli/).

</details>

<details>
<summary>How do I handle authentication and authorization in Jac walkers?</summary>

See [Authentication](/tutorials/fullstack/auth/).

</details>

## Community & Contributing

<details>
<summary>How active is the Jaseci community?</summary>

Very active! Join the [Jaseci Discord Community](https://discord.gg/6j3QNdtcN6) for support and discussions with fellow contributors.

</details>

<details>
<summary>How often is Jac updated?</summary>

Check the [Release Notes](/community/release_notes/jaclang/) for the latest updates and versions.

</details>

<details>
<summary>How do I contribute to Jaseci?</summary>

- [Discord contributors channel](https://discord.gg/6j3QNdtcN6)
- Read the [Contributing Guide](/community/internals/contrib/)

</details>
