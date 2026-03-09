import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightLinksValidator from "starlight-links-validator";
import fs from "node:fs";

const jacGrammar = JSON.parse(
  fs.readFileSync(
    new URL("./src/grammars/jac.tmLanguage.json", import.meta.url),
    "utf-8",
  ),
);

export default defineConfig({
  site: "https://jac-lang.org",
  integrations: [
    starlight({
      plugins: [starlightLinksValidator({ errorOnLocalLinks: false })],
      disable404Route: true,
      title: "Jac Docs",
      logo: {
        src: "./src/assets/logo.png",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Jaseci-Labs/jaseci",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/6j3QNdtcN6",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/Jaseci-Labs/jaseci/edit/main/docs/docs/",
      },
      customCss: ["./src/styles/custom.css"],
      expressiveCode: {
        frames: false,
        themes: ["dracula", "github-light"],
        shiki: {
          langs: [
            {
              ...jacGrammar,
              aliases: ["jac"],
            },
          ],
        },
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: "",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Mono:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:card",
            content: "summary_large_image",
          },
        },
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-PLSMBEBC20",
            async: true,
          },
        },
        {
          tag: "script",
          content: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-PLSMBEBC20');`,
        },
      ],
      sidebar: [
        {
          label: "Quick Guide",
          items: [
            { label: "Welcome", slug: "quick-guide/welcome" },
            { label: "Installation", slug: "quick-guide/install" },
            { label: "Hello World", slug: "quick-guide/hello-world" },
            { label: "Core Concepts", slug: "quick-guide/what-makes-jac-different" },
            { label: "Syntax Cheatsheet", slug: "quick-guide/syntax-cheatsheet" },
            { label: "Jac vs Traditional Stack", slug: "quick-guide/jac-vs-traditional-stack" },
            { label: "FAQ", slug: "quick-guide/faq" },
            { label: "LLM Docs", slug: "quick-guide/llmdocs" },
            { label: "Next Steps", slug: "quick-guide/next-steps" },
          ],
        },
        {
          label: "Tutorials",
          collapsed: true,
          items: [
            { label: "Overview", slug: "tutorials" },
            { label: "Learning Roadmap", slug: "tutorials/roadmap" },
            { label: "Build an AI Day Planner", slug: "tutorials/first-app/build-ai-day-planner" },
            {
              label: "Core Language",
              collapsed: true,
              items: [
                { label: "Jac Programming Primer", slug: "tutorials/language/coding_primer" },
                { label: "Jac Basics (from Python)", slug: "tutorials/language/basics" },
                { label: "Mixing Jac and Python", slug: "tutorials/language/mixing-jac-python" },
                { label: "Jac as a Python Library", slug: "tutorials/language/library-mode" },
                { label: "Object-Spatial Programming", slug: "tutorials/language/osp" },
                { label: "Testing Your Code", slug: "tutorials/language/testing" },
                { label: "Debugging in VS Code", slug: "tutorials/language/debugging" },
              ],
            },
            {
              label: "AI Integration",
              collapsed: true,
              items: [
                { label: "byLLM Quickstart", slug: "tutorials/ai/quickstart" },
                { label: "Structured Outputs", slug: "tutorials/ai/structured-outputs" },
                { label: "Agentic AI & Tools", slug: "tutorials/ai/agentic" },
                { label: "Multimodal (Images & Video)", slug: "tutorials/ai/multimodal" },
              ],
            },
            {
              label: "Full-Stack Apps",
              collapsed: true,
              items: [
                { label: "Project Setup", slug: "tutorials/fullstack/setup" },
                { label: "React-Style Components", slug: "tutorials/fullstack/components" },
                { label: "State & Effects", slug: "tutorials/fullstack/state" },
                { label: "Backend Integration", slug: "tutorials/fullstack/backend" },
                { label: "Authentication", slug: "tutorials/fullstack/auth" },
                { label: "Routing", slug: "tutorials/fullstack/routing" },
                { label: "Build a Todo App", slug: "tutorials/fullstack/todo-app" },
                { label: "Legacy: Todo App (Part 1)", slug: "tutorials/first-app/part1-todo-app" },
                { label: "Legacy: Add AI (Part 2)", slug: "tutorials/first-app/part2-ai-features" },
                { label: "Legacy: Walkers & Auth (Part 3)", slug: "tutorials/first-app/part3-multi-user" },
              ],
            },
            {
              label: "Production",
              collapsed: true,
              items: [
                { label: "Local API Server", slug: "tutorials/production/local" },
                { label: "Deploy to Kubernetes", slug: "tutorials/production/kubernetes" },
              ],
            },
            {
              label: "Examples Gallery",
              collapsed: true,
              items: [
                { label: "Overview", slug: "tutorials/examples" },
                { label: "LittleX (Twitter Clone)", slug: "tutorials/examples/littlex" },
                { label: "EmailBuddy (AI Assistant)", slug: "tutorials/examples/emailbuddy" },
                { label: "RAG Chatbot", slug: "tutorials/examples/rag-chatbot" },
                { label: "RPG Level Generator", slug: "tutorials/examples/rpg" },
              ],
            },
            { label: "Troubleshooting", slug: "tutorials/troubleshooting" },
          ],
        },
        {
          label: "Reference",
          collapsed: true,
          items: [
            { label: "CLI Reference", slug: "reference/cli" },
            { label: "Configuration", slug: "reference/config" },
            {
              label: "Language Reference",
              collapsed: true,
              items: [
                { label: "Overview", slug: "reference/language" },
                { label: "Part I: Foundation", slug: "reference/language/foundation" },
                { label: "Part II: Functions & Objects", slug: "reference/language/functions-objects" },
                { label: "Part III: OSP", slug: "reference/language/osp" },
                { label: "Part IV: Full-Stack", slug: "reference/language/full-stack" },
                { label: "Part V: AI Integration", slug: "reference/language/ai-integration" },
                { label: "Part VI: Concurrency", slug: "reference/language/concurrency" },
                { label: "Part VII: Advanced", slug: "reference/language/advanced" },
                { label: "Part VIII: Ecosystem", slug: "reference/language/ecosystem" },
                { label: "Python Integration", slug: "reference/language/python-integration" },
                { label: "Part IX: Deployment", slug: "reference/language/deployment" },
                { label: "Library Mode", slug: "reference/language/library-mode" },
                { label: "Appendices", slug: "reference/language/appendices" },
                { label: "Walker Responses", slug: "reference/language/walker-responses" },
                { label: "Graph Operations", slug: "reference/language/graph-operations" },
              ],
            },
            { label: "AI-Programming Reference", slug: "reference/plugins/byllm" },
            { label: "Full-Stack Reference", slug: "reference/plugins/jac-client" },
            { label: "Cloud-Scale Reference", slug: "reference/plugins/jac-scale" },
            { label: "Testing", slug: "reference/testing" },
          ],
        },
        {
          label: "Community",
          collapsed: true,
          items: [
            { label: "Breaking Changes", slug: "community/breaking-changes" },
            { label: "Contributors", slug: "community/contributors" },
            {
              label: "Release Notes",
              collapsed: true,
              items: [
                { label: "Jaclang", slug: "community/release_notes/jaclang" },
                { label: "byLLM", slug: "community/release_notes/byllm" },
                { label: "jac-client", slug: "community/release_notes/jac-client" },
                { label: "jac-scale", slug: "community/release_notes/jac-scale" },
                { label: "(Deprecated) jac-cloud", slug: "community/release_notes/jac-cloud" },
              ],
            },
            {
              label: "Internals",
              collapsed: true,
              items: [
                { label: "Contributing Guide", slug: "community/internals/contrib" },
                { label: "Import Patterns", slug: "community/internals/jac_import_patterns" },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
