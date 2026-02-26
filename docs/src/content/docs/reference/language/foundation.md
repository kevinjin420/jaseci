---
title: "Part I: Foundation"
---# Part I: Foundation

**In this part:**

- [Introduction](#introduction) - What is Jac, principles, comparison to Python
- [Getting Started](#getting-started) - Installation, first program, CLI basics
- [Language Basics](#language-basics) - Syntax, comments, code structure
- [Types and Values](#types-and-values) - Type system, generics, literals
- [Variables and Scope](#variables-and-scope) - Local, instance, global variables
- [Operators](#operators) - Arithmetic, comparison, logical, graph operators
- [Control Flow](#control-flow) - Conditionals, loops, pattern matching

---

## Introduction

### 1 What is Jac?

Jac is an AI-native full-stack programming language that supersets Python and JavaScript with native compilation support. It introduces Object-Spatial Programming (OSP) and novel constructs for AI-integrated programming (such as `by llm()`), providing a unified language for backend, frontend, and AI development with full access to the PyPI and npm ecosystems.

```jac
with entry {
    print("Hello, Jac!");
}
```

### 2 The Six Principles

| Principle | Description |
|-----------|-------------|
| **AI-Native** | LLMs as first-class citizens through Meaning Typed Programming |
| **Full-Stack** | Backend and frontend in one unified language |
| **Superset** | Full access to PyPI and npm ecosystems |
| **Object-Spatial** | Graph-based domain modeling with mobile walkers |
| **Cloud-Native** | One-command deployment with automatic scaling |
| **Human & AI Friendly** | Readable structure for both humans and AI models |

### 3 Designed for Humans and AI

Jac is built for clarity and architectural transparency:

- `has` declarations for clean attribute definitions
- `impl` separation keeps interfaces distinct from implementations
- Structure that humans can reason about AND models can reliably generate

### 4 When to Use Jac

Jac excels at:

- Graph-structured applications (social networks, knowledge graphs)
- AI-powered applications with LLM integration
- Full-stack web applications
- Agentic AI systems
- Rapid prototyping

### 5 Jac vs Python

```jac
obj Person {
    has name: str;
    has age: int;

    def greet() -> str {
        return f"Hi, I'm {self.name}";
    }
}
```

**Key differences from Python:**

| Feature | Python | Jac |
|---------|--------|-----|
| Blocks | Indentation | Braces `{}` |
| Statements | Newline-terminated | Semicolons required |
| Fields | `self.x = x` | `has x: Type;` |
| Methods | `def method():` | `def method() { }` |
| Abilities | N/A | `can` (walker entry/exit only) |
| Types | Optional | Mandatory |

---

## Getting Started

### 1 Installation

```bash
# Full installation with all plugins
pip install jaseci

# Minimal installation
pip install jaclang

# Individual plugins
pip install byllm        # LLM integration
pip install jac-client   # Full-stack web
pip install jac-scale    # Production deployment
```

### 2 Your First Program

Create a file `hello.jac`:

```jac
def greet(name: str) -> str {
    return f"Hello, {name}!";
}

with entry {
    print(greet("World"));
}
```

Run it:

```bash
jac hello.jac
```

Note: `jac` is shorthand for `jac run`.

### 3 Project Structure

```
my_project/
├── jac.toml           # Project configuration
├── main.jac           # Entry point
├── app.jac            # Full-stack entry (jac-client)
├── models/
│   ├── __init__.jac
│   └── user.jac
└── tests/
    └── test_models.jac
```

**File Extensions:**

| Extension | Purpose |
|-----------|---------|
| `.jac` | Universal Jac code |
| `.sv.jac` | Server-side only |
| `.cl.jac` | Client-side only |
| `.impl.jac` | Implementation file |

### 4 Editor Setup

Install the VS Code extension for Jac language support:

```bash
# Start the language server
jac lsp
```

---

## Language Basics

### 1 Source Code Encoding

Jac source files are UTF-8 encoded. Unicode is fully supported in strings and comments.

### 2 Comments

```jac
# Single-line comment

#* Multi-line
   comment *#

"""Docstring for modules, classes, and functions"""
```

### 3 Statements and Expressions

All statements end with semicolons:

```jac
with entry {
    x = 5;
    print(x);
    result = compute(x) + 10;
}
```

### 4 Code Blocks

Code blocks use braces:

```jac
with entry {
    if condition {
        statement1;
        statement2;
    }
}
```

### 5 Keywords

Jac keywords are reserved and cannot be used as identifiers:

| Category | Keywords |
|----------|----------|
| **Archetypes** | `obj`, `node`, `edge`, `walker`, `class`, `enum` |
| **Abilities** | `can`, `def`, `init`, `postinit` |
| **Access** | `pub`, `priv`, `protect`, `static`, `override`, `abs` |
| **Control** | `if`, `elif`, `else`, `while`, `for`, `match`, `case`, `switch`, `default` |
| **Loop** | `break`, `continue`, `skip` |
| **Return** | `return`, `yield`, `report` |
| **Exception** | `try`, `except`, `finally`, `raise`, `assert` |
| **OSP** | `visit`, `disengage`, `spawn`, `here`, `root`, `visitor`, `entry`, `exit` |
| **Module** | `import`, `include`, `from`, `as`, `glob` |
| **Blocks** | `cl` (client), `sv` (server) |
| **Other** | `with`, `test`, `impl`, `sem`, `by`, `del`, `in`, `is`, `and`, `or`, `not`, `async`, `await`, `flow`, `wait`, `lambda`, `props` |

**Note:** The abstract modifier keyword is `abs`, not `abstract`.

### 6 Identifiers

Valid identifiers start with a letter or underscore, followed by letters, digits, or underscores.

To use a reserved keyword as an identifier, escape it with a backtick prefix:

```jac
obj Example {
    has `class: str;  # Backtick-escaped keyword used as identifier
}
```

!!! danger
    Backtick-escaped keywords in `has` declarations **do not work** -- they cause a `SyntaxError` in Python's dataclass machinery at runtime. Choose a non-keyword identifier instead (e.g., `has cls: str;` or `has kind: str;`).

!!! note "Special variable references don't need backtick escaping"
    The following are **built-in references**, not regular identifiers. Use them directly without backticks: `self`, `super`, `root`, `here`, `visitor`, `init`, `postinit`. For example, write `self.name`, `root ++> node`, and `def init()` -- never `` `self ``, `` `root ``, or `` `init ``.

---

## Learn More

**Tutorials:**

- [Jac Basics](/tutorials/language/basics/) - Step-by-step introduction to Jac syntax
- [Hello World](/quick-guide/hello-world/) - Your first Jac program

**Related Reference:**

- [Part II: Functions & Objects](/reference/language/functions-objects/) - Classes, methods, inheritance
