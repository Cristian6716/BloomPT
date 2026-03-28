import WorkoutTable from './WorkoutTable';
import { getTheme } from '../themes';

export default function TableBlock({
  table,
  index,
  total,
  onUpdateTitle,
  onChangeCell,
  onAddRow,
  onRemoveRow,
  onAddRowAt,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onChangeTheme,
}) {
  const theme = getTheme(table.themeId);

  return (
    <div className="print-page bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
      {/* Toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1">
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95"
            title="Sposta su"
          >↑</button>
          <button
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors active:scale-95"
            title="Sposta giù"
          >↓</button>
          <span className="text-xs text-gray-400 ml-1">#{index + 1}</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onChangeTheme}
            className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
            title="Cambia stile grafico"
          >
            🎨 Stile
          </button>
          <button
            onClick={onDuplicate}
            className="flex items-center gap-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
          >
            ⧉ Duplica
          </button>
          <button
            onClick={onDelete}
            disabled={total <= 1}
            className="flex items-center gap-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            ✕ Elimina
          </button>
        </div>
      </div>

      {/* Titolo */}
      <div
        className={`table-title text-base sm:text-lg font-bold mb-3 outline-none border-b-2 border-transparent focus:border-blue-400 pb-1 transition-colors ${theme.title}`}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onUpdateTitle(e.currentTarget.innerText)}
        dangerouslySetInnerHTML={{ __html: table.title }}
        data-placeholder="Titolo scheda..."
      />

      {/* Tabella */}
      <WorkoutTable
        rows={table.rows}
        themeId={table.themeId}
        onChange={onChangeCell}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
        onAddRowAt={onAddRowAt}
      />
    </div>
  );
}
