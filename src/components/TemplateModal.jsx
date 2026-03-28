import { THEMES } from '../themes';

const PREVIEW_ROWS = ['Squat', 'Panca', 'Stacco'];

function TablePreview({ theme }) {
  return (
    <table className={`w-full border-collapse text-xs border ${theme.border}`}>
      <thead>
        <tr>
          {['Esercizio', 'Serie', 'Reps', 'Dettagli'].map((col) => (
            <th
              key={col}
              className={`px-1.5 py-1 text-left font-semibold border ${theme.headerCell} ${theme.header}`}
              style={{ fontSize: '9px' }}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {PREVIEW_ROWS.map((ex, i) => {
          const rowBg = i % 2 === 1 ? theme.rowAlt : theme.row;
          return (
            <tr key={ex} className={rowBg}>
              {[ex, '4', '8-10', ''].map((val, ci) => (
                <td
                  key={ci}
                  className={`px-1.5 py-1 border ${theme.cell}`}
                  style={{ fontSize: '9px' }}
                >
                  {val}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function TemplateModal({ onSelect, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Scegli lo stile della tabella</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 text-xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onSelect(theme.id)}
                className="text-left rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-md transition-all active:scale-95 overflow-hidden"
              >
                {/* Preview tabella */}
                <div className="p-2 bg-gray-50">
                  <TablePreview theme={theme} />
                </div>
                {/* Label */}
                <div className="px-3 py-2 bg-white">
                  <span className="text-sm font-semibold text-gray-700">{theme.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
