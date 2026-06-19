import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "private", "products");

const files = [
  { name: "sorbet-rezepte.pdf", title: "Sorbet Rezepte E-Book (Platzhalter)" },
  { name: "simple-pasta-basics.pdf", title: "Simple Pasta Basics (Platzhalter)" },
  { name: "meal-prep-starter.pdf", title: "Meal Prep Starter Guide (Platzhalter)" },
  { name: "fruehstuecks-bowls.pdf", title: "Fruehstuecks-Bowls (Platzhalter)" },
  { name: "grill-saison.pdf", title: "Grill-Saison E-Book (Platzhalter)" },
];

function buildPdf(title) {
  const escaped = title.replace(/([()\\])/g, "\\$1");
  const contentStream = `BT /F1 20 Tf 50 700 Td (${escaped}) Tj ET`;

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

for (const file of files) {
  writeFileSync(join(outDir, file.name), buildPdf(file.title), "latin1");
  console.log("created", file.name);
}
