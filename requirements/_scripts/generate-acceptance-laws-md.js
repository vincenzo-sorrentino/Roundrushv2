/**
 * generate-acceptance-laws-md.js
 *
 * Reads each EP's acceptance-laws.yaml and generates a corresponding
 * acceptance-laws.md with YAML front matter including a sha256 hash
 * of the YAML source, ensuring alignment between source and derived doc.
 *
 * Usage:
 *   node requirements/_scripts/generate-acceptance-laws-md.js
 *
 * No external dependencies required (uses Node.js built-ins only).
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

const EPICS_DIR = join(process.cwd(), 'requirements', 'epics');

/**
 * Minimal YAML parser — handles the flat structure of acceptance-laws.yaml
 * without requiring external deps. Parses top-level scalars and the `laws` list.
 */
function parseAcceptanceLawsYaml(text) {
  const result = { epic_id: '', title: '', laws: [] };
  let currentLaw = null;

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;

    // Top-level scalars
    const scalarMatch = line.match(/^(epic_id|title):\s*"?([^"]*)"?$/);
    if (scalarMatch && !currentLaw) {
      result[scalarMatch[1]] = scalarMatch[2];
      continue;
    }

    // New law item
    if (line.startsWith('- id:')) {
      if (currentLaw) result.laws.push(currentLaw);
      currentLaw = { id: line.replace('- id:', '').trim(), title: '', description: '' };
      continue;
    }

    if (currentLaw) {
      const fieldMatch = line.match(/^(title|description):\s*(.*)$/);
      if (fieldMatch) {
        currentLaw[fieldMatch[1]] = fieldMatch[2].replace(/^"|"$/g, '');
      }
    }
  }
  if (currentLaw) result.laws.push(currentLaw);
  return result;
}

function sha256(content) {
  return createHash('sha256').update(content, 'utf8').digest('hex');
}

function generateMd(yamlContent, data) {
  const hash = sha256(yamlContent);
  const now = new Date().toISOString();

  let md = `---
generated_from: acceptance-laws.yaml
yaml_hash: ${hash}
generated_at: "${now}"
epic_id: ${data.epic_id}
title: "${data.title}"
---

# Acceptance Laws — ${data.epic_id} ${data.title}

> **Auto-generated** from \`acceptance-laws.yaml\`.
> Do not edit manually — run \`node requirements/_scripts/generate-acceptance-laws-md.js\` to regenerate.

| ID | Law | Description |
|---|---|---|
`;

  for (const law of data.laws) {
    md += `| ${law.id} | ${law.title} | ${law.description} |\n`;
  }

  md += `\n---\n\n`;

  for (const law of data.laws) {
    md += `### ${law.id} — ${law.title}\n\n${law.description}\n\n`;
  }

  return md;
}

// Main
let entries;
try {
  entries = readdirSync(EPICS_DIR);
} catch (e) {
  console.error(`Cannot read epics directory: ${EPICS_DIR}`);
  process.exit(1);
}

let generated = 0;
for (const entry of entries) {
  const epDir = join(EPICS_DIR, entry);
  if (!statSync(epDir).isDirectory()) continue;

  const yamlPath = join(epDir, 'acceptance-laws.yaml');
  let yamlContent;
  try {
    yamlContent = readFileSync(yamlPath, 'utf8');
  } catch {
    continue; // no YAML in this EP
  }

  const data = parseAcceptanceLawsYaml(yamlContent);
  const md = generateMd(yamlContent, data);
  const mdPath = join(epDir, 'acceptance-laws.md');
  writeFileSync(mdPath, md);
  console.log(`Generated: ${mdPath}`);
  generated++;
}

console.log(`\nDone — ${generated} acceptance-laws.md file(s) generated.`);
