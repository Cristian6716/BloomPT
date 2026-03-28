import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  ShadingType,
} from 'docx';
import { saveAs } from 'file-saver';
import { getTheme } from './themes';

function makeBorder(color = '444444') {
  return {
    top: { style: BorderStyle.SINGLE, size: 6, color },
    bottom: { style: BorderStyle.SINGLE, size: 6, color },
    left: { style: BorderStyle.SINGLE, size: 6, color },
    right: { style: BorderStyle.SINGLE, size: 6, color },
  };
}

function makeHeaderRow(themeId) {
  const theme = getTheme(themeId);
  const cols = ['Esercizio', 'Serie', 'Reps', 'Dettagli'];
  const widths = [3500, 900, 1200, 3000];
  return new TableRow({
    children: cols.map((col, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        shading: { fill: theme.wordHeaderColor, type: ShadingType.CLEAR, color: 'auto' },
        borders: makeBorder(theme.wordHeaderColor),
        children: [
          new Paragraph({
            children: [new TextRun({ text: col, bold: true, size: 22, color: theme.wordHeaderText })],
            alignment: AlignmentType.LEFT,
          }),
        ],
      })
    ),
  });
}

function makeDataRow(row, rowIdx) {
  const cells = [row.esercizio, row.serie, row.reps, row.dettagli];
  const widths = [3500, 900, 1200, 3000];
  const isAlt = rowIdx % 2 === 1;
  return new TableRow({
    children: cells.map((val, i) =>
      new TableCell({
        width: { size: widths[i], type: WidthType.DXA },
        shading: isAlt
          ? { fill: 'F3F4F6', type: ShadingType.CLEAR, color: 'auto' }
          : { fill: 'FFFFFF', type: ShadingType.CLEAR, color: 'auto' },
        borders: makeBorder('CCCCCC'),
        children: [
          new Paragraph({
            children: [new TextRun({ text: val || '', size: 22 })],
          }),
        ],
      })
    ),
  });
}

export async function exportToWord(clientName, duration, date, tables) {
  const sections = [];

  // ── Prima sezione: intestazione + prima tabella ──────────────
  const firstTableBlock = tables[0];
  const firstSectionChildren = [];

  // Nome cliente
  firstSectionChildren.push(
    new Paragraph({
      children: [new TextRun({ text: clientName || 'Cliente', bold: true, size: 48 })],
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
    })
  );

  if (duration) {
    firstSectionChildren.push(
      new Paragraph({
        children: [new TextRun({ text: `Durata: ${duration} settimane`, size: 28 })],
        spacing: { after: 80 },
      })
    );
  }

  if (date) {
    firstSectionChildren.push(
      new Paragraph({
        children: [new TextRun({ text: `Data: ${date}`, size: 24, color: '666666' })],
        spacing: { after: 300 },
      })
    );
  }

  // Prima tabella
  if (firstTableBlock) {
    firstSectionChildren.push(
      new Paragraph({
        children: [new TextRun({ text: firstTableBlock.title || '', bold: true, size: 28 })],
        spacing: { before: 200, after: 120 },
      })
    );
    firstSectionChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [makeHeaderRow(firstTableBlock.themeId), ...firstTableBlock.rows.map((r, i) => makeDataRow(r, i))],
      })
    );
  }

  sections.push({ children: firstSectionChildren });

  // ── Sezioni successive: una tabella per pagina ───────────────
  for (let i = 1; i < tables.length; i++) {
    const t = tables[i];
    sections.push({
      children: [
        new Paragraph({
          children: [new TextRun({ text: t.title || '', bold: true, size: 28 })],
          spacing: { before: 200, after: 120 },
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [makeHeaderRow(t.themeId), ...t.rows.map((r, i) => makeDataRow(r, i))],
        }),
      ],
    });
  }

  const doc = new Document({ sections });
  const blob = await Packer.toBlob(doc);

  const durStr = duration ? duration.toString().replace(/\s+/g, '') : '';
  const filename = durStr
    ? `scheda_allenamento_${durStr}settimane.docx`
    : 'scheda_allenamento.docx';

  saveAs(blob, filename);
}
