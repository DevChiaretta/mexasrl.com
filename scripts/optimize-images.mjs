// scripts/optimize-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
ensureDir("img");

// ----- FILE LIST (adattata al tuo repo) -----
const iconNumbers = Array.from({ length: 11 }, (_, i) => `${i + 1}.webp`); // 1.webp ... 11.webp
const iconInputs = ["UX.png", ...iconNumbers]; // icone/loghi ~80x80
const sectionInputs = [
  "assistenza.webp",
  "elettrico(2).webp",
  "team.webp",
  "person.webp",
];

const ICON_WIDTHS = [80, 160, 320];        // per icone
const SECTION_WIDTHS = [400, 800, 1200];   // per immagini di sezione

const sanitize = (s) =>
  s.normalize("NFKD")
   .replace(/\.[^.]+$/, "")       // togli estensione
   .replace(/[^\w-]+/g, "-")      // spazi & caratteri strani -> "-"
   .replace(/-+/g, "-")
   .toLowerCase();

async function convertOne(inputPath, outBase, widths) {
  for (const w of widths) {
    const avif = path.join("img", `${outBase}-${w}.avif`);
    const webp = path.join("img", `${outBase}-${w}.webp`);
    await sharp(inputPath).resize({ width: w }).avif({ quality: 55 }).toFile(avif);
    await sharp(inputPath).resize({ width: w }).webp({ quality: 70 }).toFile(webp);
    console.log("✓", avif, "|", webp);
  }
}

(async () => {
  // ICONS
  for (const f of iconInputs) {
    if (!fs.existsSync(f)) { console.warn("! manca", f); continue; }
    const outBase = sanitize(path.basename(f));
    await convertOne(f, outBase, ICON_WIDTHS);
  }

  // SECTIONS
  for (const f of sectionInputs) {
    if (!fs.existsSync(f)) { console.warn("! manca", f); continue; }
    const outBase = sanitize(path.basename(f)); // "elettrico(2)" -> "elettrico-2"
    await convertOne(f, outBase, SECTION_WIDTHS);
  }

  console.log("\nDone. Usa i file in /img/*.avif e /img/*.webp");
})();
