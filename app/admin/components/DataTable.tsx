// src/app/admin/components/DataTable.tsx
'use client';
import { Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  title?: string;
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export default function DataTable({ title, data, columns, onEdit, onDelete }: DataTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 overflow-hidden">
      {title && (
        <div className="px-6 py-5 border-b dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 w-24 text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-5 text-sm text-gray-700 dark:text-gray-300">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t dark:border-gray-800 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div>Showing 1-10 of {data.length * 10}</div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl flex items-center gap-1 transition-colors">
            <ChevronLeft size={18} /> Prev
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-2xl">1</button>
          <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl">2</button>
          <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl">3</button>
          <button className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl flex items-center gap-1">
            Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}