export default function ClientHeader({ clientName, duration, date, onChange }) {
  return (
    <div className="client-header bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-7 mb-4 sm:mb-6">
      {/* Nome cliente */}
      <div
        className="text-2xl sm:text-3xl font-bold text-gray-900 outline-none border-b-2 border-transparent focus:border-blue-400 pb-1 mb-3 transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onChange('clientName', e.currentTarget.innerText.trim())}
        dangerouslySetInnerHTML={{ __html: clientName }}
        data-placeholder="Nome cliente..."
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
        {/* Durata */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-500 whitespace-nowrap">
            Durata:
          </label>
          <div className="flex items-center gap-1">
            <div
              className="inline-block min-w-[40px] text-sm font-semibold text-gray-800 outline-none border-b border-dashed border-gray-400 focus:border-blue-400 px-1 py-0.5 transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onChange('duration', e.currentTarget.innerText.trim())}
              dangerouslySetInnerHTML={{ __html: duration }}
              data-placeholder="4"
            />
            <span className="text-sm text-gray-600">settimane</span>
          </div>
        </div>

        {/* Data */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-500 whitespace-nowrap">
            Data:
          </label>
          <div
            className="inline-block min-w-[80px] text-sm text-gray-700 outline-none border-b border-dashed border-gray-400 focus:border-blue-400 px-1 py-0.5 transition-colors empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onChange('date', e.currentTarget.innerText.trim())}
            dangerouslySetInnerHTML={{ __html: date }}
            data-placeholder="gg/mm/aaaa"
          />
        </div>
      </div>
    </div>
  );
}
