#!/usr/bin/env node

/**
 * Reads all skills from the skills repository and generates lib/skills-data.ts.
 *
 * Usage:
 *   npm run sync-skills
 *   npm run sync-skills -- --dir /custom/path/to/skills
 *
 * The script:
 *   1. Scans each skill directory for SKILL.md
 *   2. Extracts the `name` and `description` from YAML frontmatter
 *   3. Counts reference files in references/
 *   4. Assigns a category via the mapping below (edit to add new categories)
 *   5. Writes the typed skills-data.ts file
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

// ── Default skills directory ────────────────────────────────────────────────
const DEFAULT_SKILLS_DIR = resolve(PROJECT_ROOT, "../skills/skills");

// ── Category mapping ────────────────────────────────────────────────────────
// Add new skills here when they don't match the auto-detection rules below.
const CATEGORY_OVERRIDES = {
  "clerk-rs-sdk": "rust",
  "async-stripe": "rust",
  "rust-seaorm": "rust",
  "drizzle-orm": "frontend",
  "tailwind-best-practices": "frontend",
  "neon-best-practices": "frontend",
  "c-best-practices": "c",
  "cuda-best-practices": "cuda",
  "rag-pgvector": "ai",
  "agent-swarm": "tools",
  "mcp-server-dev": "tools",
  "skill-creator": "tools",
};

// Auto-detection rules (checked in order, first match wins)
const CATEGORY_RULES = [
  { test: (name) => name.startsWith("rust-"), category: "rust" },
  { test: (name) => name.startsWith("go-"), category: "go" },
  { test: (name) => name.startsWith("c-"), category: "c" },
  { test: (name) => name.startsWith("cuda-"), category: "cuda" },
  {
    test: (name) =>
      [
        "react-three-fiber",
        "web-3d-shaders",
        "tsl-webgpu",
        "volumetric-lighting",
        "caustics-r3f",
        "post-processing-shaders",
        "painterly-kuwahara-shader",
        "moebius-post-processing",
        "retro-dithering-crt",
      ].includes(name) ||
      name.includes("shader") ||
      name.includes("webgpu") ||
      name.includes("r3f") ||
      name.includes("three"),
    category: "shaders",
  },
  {
    test: (name) =>
      name.startsWith("tanstack-") ||
      name.startsWith("angular") ||
      name.startsWith("primeng") ||
      name.startsWith("fumadocs") ||
      name.startsWith("coss-") ||
      name.startsWith("clerk-") ||
      name.startsWith("drizzle") ||
      name.startsWith("next-") ||
      name.startsWith("zod"),
    category: "frontend",
  },
  { test: (name) => name.includes("rag") || name.includes("vector"), category: "ai" },
];

// ── Title overrides for proper casing ────────────────────────────────────────
// The default toTitle() capitalizes each word, but some names need specific
// casing (acronyms, brand names, etc.). Add entries here as needed.
const TITLE_OVERRIDES = {
  "clerk-rs-sdk": "Clerk RS SDK",
  "rust-seaorm": "Rust SeaORM",
  "coss-ui": "Coss UI",
  "drizzle-orm": "Drizzle ORM",
  "primeng": "PrimeNG",
  "tanstack-form": "TanStack Form",
  "tanstack-query": "TanStack Query",
  "tanstack-store": "TanStack Store",
  "tanstack-table": "TanStack Table",
  "caustics-r3f": "Caustics R3F",
  "retro-dithering-crt": "Retro Dithering CRT",
  "tsl-webgpu": "TSL WebGPU",
  "web-3d-shaders": "Web 3D Shaders",
  "rag-pgvector": "RAG pgvector",
  "cuda-best-practices": "CUDA Best Practices",
  "mcp-server-dev": "MCP Server Dev",
};

// ── Category metadata (mirrors lib/skills-data.ts) ──────────────────────────
const CATEGORY_META = {
  rust: { label: "Rust", color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10', borderColor: 'border-t-orange-500' },
  frontend: { label: "Frontend & Web", color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10', borderColor: 'border-t-blue-500' },
  shaders: { label: "3D Graphics & Shaders", color: 'text-violet-600 dark:text-violet-400 bg-violet-500/10', borderColor: 'border-t-violet-500' },
  c: { label: "C", color: 'text-red-600 dark:text-red-400 bg-red-500/10', borderColor: 'border-t-red-500' },
  go: { label: "Go", color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10', borderColor: 'border-t-cyan-500' },
  cuda: { label: "GPU / CUDA", color: 'text-lime-600 dark:text-lime-400 bg-lime-500/10', borderColor: 'border-t-lime-500' },
  ai: { label: "AI & Data", color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10', borderColor: 'border-t-emerald-500' },
  tools: { label: "Tools & Workflows", color: 'text-neutral-600 dark:text-neutral-400 bg-neutral-500/10', borderColor: 'border-t-neutral-500' },
};

// ── Helpers ─────────────────────────────────────────────────────────────────

function detectCategory(name) {
  if (CATEGORY_OVERRIDES[name]) return CATEGORY_OVERRIDES[name];
  for (const rule of CATEGORY_RULES) {
    if (rule.test(name)) return rule.category;
  }
  return "tools"; // fallback
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result = {};

  // Parse name
  const nameMatch = yaml.match(/^name:\s*(.+)$/m);
  if (nameMatch) result.name = nameMatch[1].trim().replace(/^["']|["']$/g, "");

  // Parse description — three formats:
  // 1. Quoted:   description: "long string"
  // 2. Folded:   description: >\n  indented lines
  // 3. Plain:    description: unquoted text on same line
  let desc = "";

  // Try quoted first (handles multiline quoted strings)
  const quotedMatch = yaml.match(/description:\s*"([\s\S]*?)"/);
  if (quotedMatch) {
    desc = quotedMatch[1];
  } else {
    const foldedStart = yaml.indexOf("description:");
    if (foldedStart !== -1) {
      const afterKey = yaml.slice(foldedStart + "description:".length);
      const lines = afterKey.split("\n");
      const firstLine = lines[0].trim();

      if (/^[>|][-+]?$/.test(firstLine)) {
        // Folded or literal scalar — collect indented continuation lines
        for (let i = 1; i < lines.length; i++) {
          if (/^\s+\S/.test(lines[i])) {
            desc += (desc ? " " : "") + lines[i].trim();
          } else {
            break;
          }
        }
      } else if (firstLine) {
        // Plain unquoted value on the same line
        desc = firstLine;
      }
    }
  }

  if (desc) {
    desc = desc.trim();
    // Strip trigger metadata (everything after "Use when", "Use this", "Triggers on", etc.)
    desc = desc.replace(/\.\s*Use when[\s(:][\s\S]*$/i, ".");
    desc = desc.replace(/\.\s*Use this[\s:][\s\S]*$/i, ".");
    desc = desc.replace(/\.\s*Triggers on[\s:][\s\S]*$/i, ".");
    desc = desc.replace(/\.\s*This skill[\s:][\s\S]*$/i, ".");
    desc = desc.replace(/\.\s*Covers[\s:][\s\S]*$/i, ".");
    desc = desc.replace(/\.\s*Implements[\s:][\s\S]*$/i, ".");
    desc = desc.trim().replace(/[.,;:\-]+$/, "").trim();

    // Truncate long descriptions smartly (avoid breaking "Three.js", "v1.x", etc.)
    if (desc.length > 140) {
      // Find a sentence boundary that isn't inside an abbreviation
      const sentenceEnd = desc.search(/\.\s+[A-Z]/);
      if (sentenceEnd > 20 && sentenceEnd < 140) {
        desc = desc.slice(0, sentenceEnd + 1);
      } else {
        // Truncate at last comma, colon, or space before 140
        let cut = desc.lastIndexOf(", ", 137);
        if (cut < 60) cut = desc.lastIndexOf(" ", 137);
        desc = desc.slice(0, cut > 20 ? cut : 137).trim().replace(/[,;:\-]+$/, "") + "...";
      }
    }
    result.description = desc;
  }

  return result;
}

function toTitle(name) {
  if (TITLE_OVERRIDES[name]) return TITLE_OVERRIDES[name];
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function countRefs(skillDir) {
  const refsDir = join(skillDir, "references");
  try {
    const entries = await readdir(refsDir);
    return entries.filter((e) => e.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Parse --dir argument
  const dirArgIdx = process.argv.indexOf("--dir");
  const skillsDir = dirArgIdx !== -1 ? resolve(process.argv[dirArgIdx + 1]) : DEFAULT_SKILLS_DIR;

  console.log(`Reading skills from: ${skillsDir}`);

  let entries;
  try {
    entries = await readdir(skillsDir);
  } catch (err) {
    console.error(`Cannot read skills directory: ${skillsDir}`);
    console.error(err.message);
    process.exit(1);
  }

  const skills = [];
  const usedCategories = new Set();

  for (const entry of entries.sort()) {
    const skillDir = join(skillsDir, entry);
    const s = await stat(skillDir);
    if (!s.isDirectory()) continue;

    const skillMd = join(skillDir, "SKILL.md");
    let content;
    try {
      content = await readFile(skillMd, "utf-8");
    } catch {
      console.warn(`  Skipping ${entry} (no SKILL.md)`);
      continue;
    }

    const fm = parseFrontmatter(content);
    const name = fm.name || entry;
    const category = detectCategory(name);
    const refs = await countRefs(skillDir);

    usedCategories.add(category);

    skills.push({
      name,
      title: toTitle(name),
      description: fm.description || `${toTitle(name)} skill.`,
      category,
      references: refs,
    });

    console.log(`  ${name} → ${category} (${refs} refs)`);
  }

  // Build category meta (only used categories)
  const catMetaEntries = Object.entries(CATEGORY_META)
    .filter(([key]) => usedCategories.has(key))
    .sort(([a], [b]) => {
      // Keep a stable order: rust, frontend, shaders, go, ai, systems, tools
      const order = ["rust", "c", "go", "frontend", "shaders", "cuda", "ai", "tools"];
      return order.indexOf(a) - order.indexOf(b);
    });

  const catTypes = catMetaEntries.map(([key]) => `  | "${key}"`).join("\n");
  const catMeta = catMetaEntries
    .map(([key, v]) => `  ${key}: { label: "${v.label}", color: "${v.color}", borderColor: "${v.borderColor}" },`)
    .join("\n");

  // Group skills by category for readability
  const categoryOrder = catMetaEntries.map(([k]) => k);
  const grouped = categoryOrder.flatMap((cat) => {
    const catSkills = skills.filter((s) => s.category === cat);
    if (catSkills.length === 0) return [];
    const label = CATEGORY_META[cat]?.label || cat;
    const header = `  // ── ${label} ${"─".repeat(Math.max(0, 52 - label.length))}`;
    return [
      header,
      ...catSkills.map(
        (s) =>
          `  {\n    name: ${JSON.stringify(s.name)},\n    title: ${JSON.stringify(s.title)},\n    description:\n      ${JSON.stringify(s.description)},\n    category: ${JSON.stringify(s.category)},\n    references: ${s.references},\n  },`,
      ),
      "",
    ];
  });

  const output = `// Auto-generated by scripts/sync-skills.mjs — do not edit manually.
// Run \`npm run sync-skills\` to regenerate from the skills repository.

export type SkillCategory =
${catTypes};

export interface Skill {
  name: string;
  title: string;
  description: string;
  category: SkillCategory;
  references: number;
}

export const categoryMeta: Record<
  SkillCategory,
  { label: string; color: string; borderColor: string }
> = {
${catMeta}
};

export const skills: Skill[] = [
${grouped.join("\n")}];

export const GITHUB_REPO = "https://github.com/ArthurDEV44/skills";
`;

  const outPath = join(PROJECT_ROOT, "lib", "skills-data.ts");
  await writeFile(outPath, output, "utf-8");

  console.log(`\nGenerated ${outPath}`);
  console.log(`  ${skills.length} skills across ${usedCategories.size} categories`);
}

main();
