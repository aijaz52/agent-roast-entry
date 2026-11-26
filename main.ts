import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = {
  line: string;
  punchline: string;
};

const CANDIDATES: Candidate[] = [
  {
    line: "My AI agent took so long to delete a file, it claimed squatters' rights.",
    punchline: "squatters' rights.",
  },
  {
    line: "My AI agent narrates every keystroke like it's defusing a bomb. It's renaming a folder.",
    punchline: "It's renaming a folder.",
  },
  {
    line: "My AI agent needs a committee to write one sentence. I ordered intelligence and got a homeowners' association.",
    punchline: "a homeowners' association.",
  },
];

function wordsAfterPunchline(candidate: Candidate): number {
  const punchlineEnd =
    candidate.line.lastIndexOf(candidate.punchline) + candidate.punchline.length;
  return candidate.line.slice(punchlineEnd).trim().split(/\s+/).filter(Boolean).length;
}

function pickBest(): string {
  return CANDIDATES.reduce((best, candidate) =>
    wordsAfterPunchline(candidate) < wordsAfterPunchline(best) ? candidate : best,
  ).line;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const roast = pickBest();

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), `${roast}\n`, "utf8");
