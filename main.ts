import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES = [
  "I asked my AI agent to clean up my code. It renamed the mess 'utils'.",
  "My AI agent narrates every keystroke like it's defusing a bomb. It's renaming a folder.",
  "My AI agent needs a committee to write one sentence. I ordered intelligence and got a homeowners' association.",
];

function pickBest(): string {
  return CANDIDATES[0];
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const roast = pickBest();

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), `${roast}\n`, "utf8");
