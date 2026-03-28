import { useReducer, useState, useCallback } from 'react';
import ClientHeader from './components/ClientHeader';
import TableBlock from './components/TableBlock';
import TemplateModal from './components/TemplateModal';
import { exportToWord } from './exportWord';
import './App.css';

// ── Helpers ───────────────────────────────────────────────────
function newRow() {
  return { id: crypto.randomUUID(), esercizio: '', serie: '', reps: '', dettagli: '' };
}

function cloneRows(rows) {
  return rows.map((r) => ({ ...r, id: crypto.randomUUID() }));
}

function cloneTable(table) {
  return { ...table, id: crypto.randomUUID(), rows: cloneRows(table.rows) };
}

function newTable(themeId = 'classic') {
  return {
    id: crypto.randomUUID(),
    title: 'Scheda',
    themeId,
    rows: Array.from({ length: 6 }, newRow),
  };
}

// ── Stato iniziale ────────────────────────────────────────────
const initialState = {
  clientName: '',
  duration: '',
  date: '',
  tables: [newTable('classic')],
};

// ── Reducer ───────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SET_HEADER':
      return { ...state, [action.field]: action.value };

    case 'ADD_TABLE':
      return { ...state, tables: [...state.tables, newTable(action.themeId)] };

    case 'APPLY_THEME':
      return {
        ...state,
        tables: state.tables.map((t, i) =>
          i === action.index ? { ...t, themeId: action.themeId } : t
        ),
      };

    case 'DUPLICATE_TABLE': {
      const copy = cloneTable(state.tables[action.index]);
      const next = [...state.tables];
      next.splice(action.index + 1, 0, copy);
      return { ...state, tables: next };
    }

    case 'DELETE_TABLE': {
      if (state.tables.length <= 1) return state;
      return { ...state, tables: state.tables.filter((_, i) => i !== action.index) };
    }

    case 'UPDATE_TITLE':
      return {
        ...state,
        tables: state.tables.map((t, i) =>
          i === action.index ? { ...t, title: action.value } : t
        ),
      };

    case 'MOVE_TABLE': {
      const { index, direction } = action;
      const next = [...state.tables];
      const swap = direction === 'up' ? index - 1 : index + 1;
      if (swap < 0 || swap >= next.length) return state;
      [next[index], next[swap]] = [next[swap], next[index]];
      return { ...state, tables: next };
    }

    case 'UPDATE_CELL':
      return {
        ...state,
        tables: state.tables.map((t, ti) => {
          if (ti !== action.tableIndex) return t;
          return {
            ...t,
            rows: t.rows.map((r, ri) =>
              ri === action.rowIndex ? { ...r, [action.field]: action.value } : r
            ),
          };
        }),
      };

    case 'ADD_ROW':
      return {
        ...state,
        tables: state.tables.map((t, ti) =>
          ti !== action.tableIndex ? t : { ...t, rows: [...t.rows, newRow()] }
        ),
      };

    case 'ADD_ROW_AT':
      return {
        ...state,
        tables: state.tables.map((t, ti) => {
          if (ti !== action.tableIndex) return t;
          const rows = [...t.rows];
          rows.splice(action.at, 0, newRow());
          return { ...t, rows };
        }),
      };

    case 'REMOVE_ROW':
      return {
        ...state,
        tables: state.tables.map((t, ti) => {
          if (ti !== action.tableIndex || t.rows.length <= 1) return t;
          return { ...t, rows: t.rows.filter((_, ri) => ri !== action.rowIndex) };
        }),
      };

    default:
      return state;
  }
}

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // themeTarget: indice della tabella a cui applicare il tema, o 'new' per nuova tabella
  const [themeTarget, setThemeTarget] = useState(null);

  const handleHeaderChange = useCallback((field, value) => {
    dispatch({ type: 'SET_HEADER', field, value });
  }, []);

  const handlePrint = () => window.print();

  const handleExportWord = async () => {
    await exportToWord(state.clientName, state.duration, state.date, state.tables);
  };

  const handleThemeSelect = (themeId) => {
    if (themeTarget === 'new') {
      dispatch({ type: 'ADD_TABLE', themeId });
    } else {
      dispatch({ type: 'APPLY_THEME', index: themeTarget, themeId });
    }
    setThemeTarget(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── NAVBAR ──────────────────────────────────────────── */}
      <header className="no-print sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">💪</span>
            <span className="font-bold text-gray-800 text-sm sm:text-base truncate">Schede PT</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => setThemeTarget('new')}
              className="text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg font-medium transition-colors active:scale-95"
            >
              + Tabella
            </button>
            <button
              onClick={handlePrint}
              className="text-xs sm:text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-lg font-medium transition-colors active:scale-95"
            >
              🖨 PDF
            </button>
            <button
              onClick={handleExportWord}
              className="text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors active:scale-95"
            >
              📄 Word
            </button>
          </div>
        </div>
      </header>

      {/* ── CONTENUTO ───────────────────────────────────────── */}
      <main className="print-container max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        {/* Prima pagina: intestazione + prima tabella */}
        <div className="print-page">
          <ClientHeader
            clientName={state.clientName}
            duration={state.duration}
            date={state.date}
            onChange={handleHeaderChange}
          />
          {state.tables.length > 0 && (
            <TableBlockWrapper
              table={state.tables[0]}
              index={0}
              total={state.tables.length}
              dispatch={dispatch}
              onChangeTheme={() => setThemeTarget(0)}
            />
          )}
        </div>

        {/* Tabelle successive — una per pagina */}
        {state.tables.slice(1).map((table, i) => {
          const index = i + 1;
          return (
            <div key={table.id} className="print-page">
              <TableBlockWrapper
                table={table}
                index={index}
                total={state.tables.length}
                dispatch={dispatch}
                onChangeTheme={() => setThemeTarget(index)}
              />
            </div>
          );
        })}

        {/* Aggiungi tabella in fondo */}
        <div className="no-print flex justify-center py-6">
          <button
            onClick={() => setThemeTarget('new')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-5 py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all active:scale-95"
          >
            <span className="text-xl font-light">+</span> Aggiungi tabella
          </button>
        </div>
      </main>

      {/* ── MODAL TEMA ──────────────────────────────────────── */}
      {themeTarget !== null && (
        <TemplateModal
          onSelect={handleThemeSelect}
          onClose={() => setThemeTarget(null)}
        />
      )}
    </div>
  );
}

// Wrapper per non ripetere tutti i dispatch nel JSX
function TableBlockWrapper({ table, index, total, dispatch, onChangeTheme }) {
  return (
    <TableBlock
      table={table}
      index={index}
      total={total}
      onChangeTheme={onChangeTheme}
      onUpdateTitle={(v) => dispatch({ type: 'UPDATE_TITLE', index, value: v })}
      onChangeCell={(ri, field, val) =>
        dispatch({ type: 'UPDATE_CELL', tableIndex: index, rowIndex: ri, field, value: val })
      }
      onAddRow={() => dispatch({ type: 'ADD_ROW', tableIndex: index })}
      onRemoveRow={(ri) => dispatch({ type: 'REMOVE_ROW', tableIndex: index, rowIndex: ri })}
      onDuplicate={() => dispatch({ type: 'DUPLICATE_TABLE', index })}
      onDelete={() => dispatch({ type: 'DELETE_TABLE', index })}
      onMoveUp={() => dispatch({ type: 'MOVE_TABLE', index, direction: 'up' })}
      onMoveDown={() => dispatch({ type: 'MOVE_TABLE', index, direction: 'down' })}
    />
  );
}
