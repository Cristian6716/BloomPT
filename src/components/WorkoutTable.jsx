import { getTheme } from '../themes';

const COLUMNS = [
  { key: 'esercizio', label: 'Esercizio' },
  { key: 'serie',     label: 'Serie' },
  { key: 'reps',      label: 'Reps' },
  { key: 'dettagli',  label: 'Dettagli' },
];

export default function WorkoutTable({ rows, themeId, onChange, onAddRow, onRemoveRow }) {
  const theme = getTheme(themeId);
  const lastIdx = rows.length - 1;

  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full border-collapse text-sm border ${theme.border}`}>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`px-3 py-2.5 text-left font-semibold text-xs uppercase tracking-wide border ${theme.headerCell} ${theme.header}`}
                style={{ width: col.key === 'esercizio' || col.key === 'dettagli' ? '30%' : '10%' }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const isAlt = rowIdx % 2 === 1;
            const rowBg = isAlt ? theme.rowAlt : theme.row;
            const isLast = rowIdx === lastIdx;

            return (
              <tr key={row.id} className={`${rowBg} transition-colors`}>
                {COLUMNS.map((col, colIdx) => {
                  const isLastCol = colIdx === COLUMNS.length - 1;
                  return (
                    <td key={col.key} className={`border ${theme.cell} p-0 align-top`}>
                      {/* Nell'ultima colonna dell'ultima riga: wrap relativo per il bottone − */}
                      {isLast && isLastCol ? (
                        <div className="relative">
                          <div
                            className="editable-cell min-h-[40px] px-3 py-2 pr-9 outline-none focus:bg-yellow-50/60 text-sm leading-snug"
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => onChange(rowIdx, col.key, e.currentTarget.innerText)}
                            dangerouslySetInnerHTML={{ __html: row[col.key] }}
                          />
                          {/* Bottone rimuovi — solo ultima riga */}
                          {rows.length > 1 && (
                            <button
                              onClick={() => onRemoveRow(rowIdx)}
                              title="Rimuovi ultima riga"
                              className="no-print absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-500 flex items-center justify-center text-sm font-bold transition-colors active:scale-95"
                            >
                              −
                            </button>
                          )}
                        </div>
                      ) : (
                        <div
                          className="editable-cell min-h-[40px] px-3 py-2 outline-none focus:bg-yellow-50/60 text-sm leading-snug"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => onChange(rowIdx, col.key, e.currentTarget.innerText)}
                          dangerouslySetInnerHTML={{ __html: row[col.key] }}
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Aggiungi riga — sotto la tabella */}
      <div className="no-print mt-2">
        <button
          onClick={onAddRow}
          className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
        >
          <span className="text-lg font-bold leading-none">+</span> Aggiungi riga
        </button>
      </div>
    </div>
  );
}
