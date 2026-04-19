"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";

type Column = {
  key: string;
  label: string;
  render?: (value: any, row: any) => ReactNode;
};

type PaginationConfig = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageSizeOptions?: readonly number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

type DataTableProps = {
  title?: string;
  data: any[];
  columns: Column[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  loading?: boolean;
  emptyMessage?: string;
  pagination?: PaginationConfig;
};

export default function DataTable({
  title,
  data,
  columns,
  onEdit,
  onDelete,
  loading = false,
  emptyMessage = "No records found.",
  pagination,
}: DataTableProps) {
  const canEdit = Boolean(onEdit || onDelete);
  const startRow = pagination
    ? pagination.total === 0
      ? 0
      : (pagination.page - 1) * pagination.limit + 1
    : 0;
  const endRow = pagination
    ? pagination.total === 0
      ? 0
      : Math.min(pagination.page * pagination.limit, pagination.total)
    : data.length;

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {title ? (
        <div className="border-b px-6 py-5 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400"
                >
                  {col.label}
                </th>
              ))}
              {canEdit ? <th className="w-24 px-6 py-4 text-right">Actions</th> : null}
            </tr>
          </thead>

          <tbody className="divide-y dark:divide-gray-800">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (canEdit ? 1 : 0)}
                  className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (canEdit ? 1 : 0)}
                  className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={row?._id || index} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-5 text-sm text-gray-700 dark:text-gray-300">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {canEdit ? (
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        {onEdit ? (
                          <button
                            onClick={() => onEdit(row)}
                            className="rounded-xl p-2 text-blue-600 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <Edit2 size={18} />
                          </button>
                        ) : null}
                        {onDelete ? (
                          <button
                            onClick={() => onDelete(row)}
                            className="rounded-xl p-2 text-red-600 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                          >
                            <Trash2 size={18} />
                          </button>
                        ) : null}
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t px-6 py-4 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span>Rows:</span>
            <select
              value={pagination.limit}
              onChange={(event) => pagination.onPageSizeChange(Number(event.target.value))}
              className="h-8 rounded-md border bg-white px-2 text-xs dark:border-gray-700 dark:bg-gray-900"
              disabled={loading}
            >
              {(pagination.pageSizeOptions || [10, 50, 100]).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>
              Showing {startRow}-{endRow} of {pagination.total}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(Math.max(1, pagination.page - 1))}
              disabled={loading || !pagination.hasPrevPage}
              className="flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:enabled:hover:bg-gray-800"
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            <span className="text-xs">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.page + 1))}
              disabled={loading || !pagination.hasNextPage}
              className="flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors enabled:hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:enabled:hover:bg-gray-800"
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
