import { getTheme } from '../themes';

const COLUMNS = [
  { key: 'esercizio', label: 'Esercizio' },
  { key: 'serie',     label: 'Serie' },
  { key: 'reps',      label: 'Reps' },
  { key: 'dettagli',  label: 'Dettagli' },
];

export default function WorkoutTable({ rows, themeId, onChange, onAddRow, onRemoveRow, onAddRowAt }) {
  const theme = getTheme(themeId);

  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full border-collapse text-sm border ${theme.border}`}>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`
                  px-3 py-2.5 text-left font-semibold text-xs uppercase tracking-wide
                  border ${theme.headerCell}
                  ${theme.header}
                `}
                style={{
                  width: col.key === 'esercizio' || col.key === 'dettagli' ? '30%' : '10%',
                }}
              >
                {col.label}
              </th>
            ))}
            <th className={`no-print px-1 py-2.5 w-10 border ${theme.headerCell} ${theme.header}`} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const isAlt = rowIdx % 2 === 1;
            const rowBg = isAlt ? theme.rowAlt : theme.row;
            return (
              <tr key={row.id} className={`${rowBg} transition-colors`}>
                {COLUMNS.map((col) => (
                  <td key={col.key} className={`border ${theme.cell} p-0 align-top`}>
                    <div
                      className="editable-cell min-h-[40px] px-3 py-2 outline-none focus:bg-yellow-50/60 text-sm leading-snug"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => onChange(rowIdx, col.key, e.currentTarget.innerText)}
                      dangerouslySetInnerHTML={{ __html: row[col.key] }}
                    />
                  </td>
                ))}

                {/* Controlli riga */}
                <td className={`no-print border ${theme.cell} px-1 align-middle`}>
                  <div className="flex flex-col gap-1 items-center py-1">
                    <button
                      onClick={() => onAddRowAt(rowIdx + 1)}
                      title="Inserisci riga sotto"
                      className="w-7 h-7 rounded-full bg-green-100 hover:bg-green-200 text-green-700 flex items-center justify-center text-base font-bold transition-colors active:scale-95"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemoveRow(rowIdx)}
                      title="Rimuovi riga"
                      disabled={rows.length <= 1}
                      className="w-7 h-7 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center text-base font-bold transition-colors active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      −
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
