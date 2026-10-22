import {
  PROFILE,
  RESUME_SNAPSHOT,
  EXPERIENCE_TIMELINE,
  CASE_STUDIES,
  EDUCATION_CREDENTIALS,
} from "../data/portfolioData";

/**
 * Normalizes unicode punctuation into clean ASCII for PDF Type1 standard fonts
 * and escapes PDF literal string characters: \, (, )
 */
function sanitizePdfText(input = "") {
  return String(input)
    .replace(/·/g, " | ")
    .replace(/[—–]/g, " - ")
    .replace(/[→↗]/g, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[^\x20-\x7E]/g, "")
    .trim()
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

/**
 * Approximate width of ASCII text in Helvetica at a given font size (in points)
 */
function estimateTextWidth(text = "", fontSize = 9) {
  const clean = String(text)
    .replace(/·/g, " | ")
    .replace(/[—–]/g, " - ")
    .replace(/[→↗]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .trim();
  return clean.length * fontSize * 0.51;
}

/**
 * Word-wraps a string to a maximum character width per line
 */
function wrapText(text = "", maxChars = 95) {
  const clean = String(text)
    .replace(/·/g, " | ")
    .replace(/[—–]/g, " - ")
    .replace(/[→↗]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
    .trim();

  if (!clean) return [];
  const words = clean.split(/\s+/);
  const lines = [];
  let current = "";

  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Builds the raw PDF 1.4 binary string matching the clean, breathable visual layout
 * of Attachment 2 while filling the A4 page evenly with clickable hyperlink labels
 * and zero overlapping text.
 */
export function buildResumePdfBytes() {
  // A4 dimensions in points: 595.28 x 841.89
  const marginX = 45;
  const rightX = 550;
  let y = 788;

  const ops = [];
  const linkAnnotations = [];

  const drawText = (
    text,
    x,
    yPos,
    font = "F1",
    size = 9.2,
    rgb = [0.16, 0.14, 0.12]
  ) => {
    const safe = sanitizePdfText(text);
    ops.push(
      `BT /${font} ${size} Tf ${rgb[0]} ${rgb[1]} ${rgb[2]} rg 1 0 0 1 ${x.toFixed(
        2
      )} ${yPos.toFixed(2)} Tm (${safe}) Tj ET`
    );
  };

  /**
   * Draws clean text and attaches an invisible PDF URI link annotation (no cluttered underline strokes)
   */
  const drawLink = (
    label,
    uri,
    x,
    yPos,
    font = "F1",
    size = 8.8,
    rgb = [0.6, 0.31, 0.14]
  ) => {
    drawText(label, x, yPos, font, size, rgb);
    const width = estimateTextWidth(label, size);
    if (uri) {
      linkAnnotations.push({
        rect: [x - 1, yPos - 2, x + width + 2, yPos + size + 1],
        uri,
      });
    }
    return width;
  };

  const drawLine = (yPos) => {
    ops.push(
      `0.6 w 0.82 0.77 0.70 RG ${marginX} ${yPos.toFixed(2)} m ${rightX} ${yPos.toFixed(
        2
      )} l S`
    );
  };

  // ==================== 1. HEADER ====================
  drawText(PROFILE.name.toUpperCase(), marginX, y, "F2", 19, [0.14, 0.11, 0.09]);
  const locText = `${PROFILE.location} (UTC+6)`;
  drawText(
    locText,
    rightX - estimateTextWidth(locText, 9),
    y + 4,
    "F1",
    9,
    [0.36, 0.31, 0.26]
  );
  y -= 16;

  drawText(
    `${PROFILE.role}  |  ${PROFILE.tagline}`,
    marginX,
    y,
    "F2",
    10,
    [0.6, 0.31, 0.14]
  );
  const waLabel = `WhatsApp: ${PROFILE.phoneFormatted}`;
  drawLink(
    waLabel,
    PROFILE.whatsappUrl,
    rightX - estimateTextWidth(waLabel, 9),
    y + 1,
    "F1",
    9,
    [0.36, 0.31, 0.26]
  );
  y -= 14;

  // Clean Clickable Contact & Profile Hyperlinks Row (No raw long URLs)
  let cx = marginX;
  const emailW = drawLink(
    PROFILE.email,
    `mailto:${PROFILE.email}`,
    cx,
    y,
    "F1",
    8.8,
    [0.25, 0.21, 0.18]
  );
  cx += emailW + 8;
  drawText("|", cx, y, "F1", 8.8, [0.58, 0.51, 0.44]);
  cx += 9;

  const ghW = drawLink(
    `GitHub (${PROFILE.repoCount} Repos, ${PROFILE.orgCount} Orgs)`,
    PROFILE.githubUrl,
    cx,
    y,
    "F2",
    8.8,
    [0.6, 0.31, 0.14]
  );
  cx += ghW + 8;
  drawText("|", cx, y, "F1", 8.8, [0.58, 0.51, 0.44]);
  cx += 9;

  const liW = drawLink(
    "LinkedIn Profile",
    PROFILE.linkedinUrl,
    cx,
    y,
    "F2",
    8.8,
    [0.6, 0.31, 0.14]
  );
  cx += liW + 8;
  drawText("|", cx, y, "F1", 8.8, [0.58, 0.51, 0.44]);
  cx += 9;

  const lhW = drawLink(
    "LearnHikmah Live",
    "https://learnhikmah.com",
    cx,
    y,
    "F1",
    8.8,
    [0.25, 0.21, 0.18]
  );
  cx += lhW + 8;
  drawText("|", cx, y, "F1", 8.8, [0.58, 0.51, 0.44]);
  cx += 9;

  drawLink(
    "An-Nujum Foundation Live",
    "https://an-nujum-foundation.vercel.app/",
    cx,
    y,
    "F1",
    8.8,
    [0.25, 0.21, 0.18]
  );

  // ==================== 2. PROFESSIONAL SUMMARY ====================
  y -= 12;
  drawLine(y);
  y -= 14;
  drawText("PROFESSIONAL SUMMARY", marginX, y, "F2", 9.5, [0.6, 0.31, 0.14]);
  y -= 14;

  const summaryLines = wrapText(RESUME_SNAPSHOT.executiveSummary, 96);
  for (const line of summaryLines) {
    drawText(line, marginX, y, "F1", 9.2, [0.2, 0.17, 0.14]);
    y -= 13;
  }

  // ==================== 3. CORE TECHNICAL STACK ====================
  y -= 4;
  drawLine(y);
  y -= 14;
  drawText("CORE TECHNICAL STACK", marginX, y, "F2", 9.5, [0.6, 0.31, 0.14]);
  y -= 14;

  for (const group of RESUME_SNAPSHOT.skillGroups) {
    drawText(`${group.category}:`, marginX, y, "F2", 9.0, [0.16, 0.14, 0.12]);
    drawText(group.items, marginX + 102, y, "F1", 9.0, [0.24, 0.2, 0.17]);
    y -= 14;
  }

  // ==================== 4. PROFESSIONAL EXPERIENCE ====================
  y -= 4;
  drawLine(y);
  y -= 14;
  drawText("PROFESSIONAL EXPERIENCE", marginX, y, "F2", 9.5, [0.6, 0.31, 0.14]);
  y -= 14;

  const engineeringExp = EXPERIENCE_TIMELINE.filter((e) => e.id !== "exp-education");
  engineeringExp.forEach((exp, idx) => {
    drawText(
      `${exp.role}  -  ${exp.organization} (${exp.location})`,
      marginX,
      y,
      "F2",
      9.4,
      [0.14, 0.11, 0.09]
    );
    drawText(
      exp.period,
      rightX - estimateTextWidth(exp.period, 8.6),
      y,
      "F2",
      8.6,
      [0.6, 0.31, 0.14]
    );
    y -= 12.5;

    drawText(`Stack: ${exp.stack}`, marginX, y, "F1", 8.4, [0.42, 0.36, 0.31]);
    y -= 12.5;

    for (const pt of exp.highlights) {
      const wrapped = wrapText(`- ${pt}`, 95);
      wrapped.forEach((line, lineIdx) => {
        drawText(
          line,
          lineIdx === 0 ? marginX + 4 : marginX + 11,
          y,
          "F1",
          8.9,
          [0.2, 0.17, 0.14]
        );
        y -= 12.2;
      });
    }
    if (idx < engineeringExp.length - 1) {
      y -= 4;
    }
  });

  // ==================== 5. SELECTED PRODUCTION SYSTEMS ====================
  y -= 4;
  drawLine(y);
  y -= 14;
  drawText("SELECTED PRODUCTION SYSTEMS", marginX, y, "F2", 9.5, [0.6, 0.31, 0.14]);
  y -= 14;

  const topProjects = CASE_STUDIES.filter((p) => p.cvSelected);
  topProjects.forEach((proj, idx) => {
    drawText(
      `${proj.name}  |  ${proj.role}  |  ${proj.stack}`,
      marginX,
      y,
      "F2",
      9.1,
      [0.14, 0.11, 0.09]
    );

    // Right-aligned clean hyperlink labels ("Live Site" / "Source Code")
    if (proj.repoUrl) {
      const srcLabel = "Source Code";
      const srcW = estimateTextWidth(srcLabel, 8.5);
      const srcX = rightX - srcW;
      drawLink(srcLabel, proj.repoUrl, srcX, y, "F2", 8.5, [0.36, 0.31, 0.26]);

      const sepX = srcX - 9;
      drawText("|", sepX, y, "F1", 8.5, [0.62, 0.55, 0.48]);

      const liveLabel = "Live Site";
      const liveW = estimateTextWidth(liveLabel, 8.5);
      drawLink(liveLabel, proj.url, sepX - liveW - 5, y, "F2", 8.5, [0.6, 0.31, 0.14]);
    } else {
      const liveLabel =
        proj.id === "balzo-financial" ? "GitHub Org" : "Live Site";
      const liveW = estimateTextWidth(liveLabel, 8.5);
      drawLink(liveLabel, proj.url, rightX - liveW, y, "F2", 8.5, [0.6, 0.31, 0.14]);
    }
    y -= 12.2;

    const projLines = wrapText(`${proj.shortSummary} Outcome: ${proj.impact}`, 96).slice(0, 2);
    for (const line of projLines) {
      drawText(line, marginX + 4, y, "F1", 8.8, [0.22, 0.19, 0.16]);
      y -= 11.8;
    }

    if (idx < topProjects.length - 1) {
      y -= 4;
    }
  });

  // ==================== 6. EDUCATION & CREDENTIALS ====================
  y -= 4;
  drawLine(y);
  y -= 14;
  drawText("EDUCATION & CREDENTIALS", marginX, y, "F2", 9.5, [0.6, 0.31, 0.14]);
  y -= 14;

  EDUCATION_CREDENTIALS.forEach((edu, idx) => {
    drawText(edu.degree, marginX, y, "F2", 9.0, [0.14, 0.11, 0.09]);
    drawText(
      edu.year,
      rightX - estimateTextWidth(edu.year, 8.6),
      y,
      "F2",
      8.6,
      [0.6, 0.31, 0.14]
    );
    y -= 12;

    drawText(
      `${edu.institution}  |  ${edu.board}`,
      marginX + 4,
      y,
      "F1",
      8.6,
      [0.26, 0.22, 0.18]
    );
    y -= 12;

    if (idx < EDUCATION_CREDENTIALS.length - 1) {
      y -= 3;
    }
  });

  // ==================== 7. FOOTER ====================
  const footerLineY = Math.min(y - 2, 52);
  const footerTextY = footerLineY - 12;
  drawLine(footerLineY);
  drawText(
    PROFILE.hiringStatus,
    marginX,
    footerTextY,
    "F1",
    8.4,
    [0.38, 0.32, 0.27]
  );

  // Clean clickable footer links
  const fGhLabel = "GitHub";
  const fLiLabel = "LinkedIn";
  const fEmLabel = "Email";

  const fEmW = estimateTextWidth(fEmLabel, 8.4);
  const fEmX = rightX - fEmW;
  drawLink(fEmLabel, `mailto:${PROFILE.email}`, fEmX, footerTextY, "F2", 8.4, [0.6, 0.31, 0.14]);

  const fSep2X = fEmX - 9;
  drawText("|", fSep2X, footerTextY, "F1", 8.4, [0.62, 0.55, 0.48]);

  const fLiW = estimateTextWidth(fLiLabel, 8.4);
  const fLiX = fSep2X - fLiW - 5;
  drawLink(fLiLabel, PROFILE.linkedinUrl, fLiX, footerTextY, "F2", 8.4, [0.6, 0.31, 0.14]);

  const fSep1X = fLiX - 9;
  drawText("|", fSep1X, footerTextY, "F1", 8.4, [0.62, 0.55, 0.48]);

  const fGhW = estimateTextWidth(fGhLabel, 8.4);
  const fGhX = fSep1X - fGhW - 5;
  drawLink(fGhLabel, PROFILE.githubUrl, fGhX, footerTextY, "F2", 8.4, [0.6, 0.31, 0.14]);

  const contentStream = ops.join("\n");

  // Assemble PDF 1.4 objects with clickable /Subtype /Link annotations
  const baseObjCount = 6;
  const annotRefs = linkAnnotations
    .map((_, idx) => `${baseObjCount + 1 + idx} 0 R`)
    .join(" ");
  const annotsEntry = linkAnnotations.length > 0 ? ` /Annots [${annotRefs}]` : "";

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R${annotsEntry} >>\nendobj\n`,
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj\n",
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj\n",
    `6 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
  ];

  linkAnnotations.forEach((annot, idx) => {
    const objNum = baseObjCount + 1 + idx;
    const [x1, y1, x2, y2] = annot.rect.map((n) => n.toFixed(2));
    const safeUri = sanitizePdfText(annot.uri);
    objects.push(
      `${objNum} 0 obj\n<< /Type /Annot /Subtype /Link /Rect [${x1} ${y1} ${x2} ${y2}] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${safeUri}) >> >>\nendobj\n`
    );
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return pdf;
}

/**
 * Generates and downloads "Naymul_Islam_Resume.pdf" directly in the browser.
 */
export function downloadResumePdf() {
  const pdf = buildResumePdfBytes();
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Naymul_Islam_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Prints the A4 Resume directly from the dedicated #a4-print-root DOM node
 * so it works 100% reliably inside any browser or iframe environment.
 */
export function printResumePdf() {
  window.focus();
  window.print();
}
