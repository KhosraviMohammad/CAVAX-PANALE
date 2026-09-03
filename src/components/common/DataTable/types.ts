import React from "react";

export interface Column<T> {
  id: string;
  label: React.ReactNode;
  align?: "left" | "right" | "center" | "inherit" | "justify";
  width?: string | number;
  minWidth?: string | number;
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string | number;
  isLoading?: boolean;
  loadingRowsCount?: number;
  isError?: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  minWidth?: number | string;
  onRowClick?: (item: T) => void;
  // Pagination
  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  itemLabel?: string; // e.g. "مورد", "کاربر", "کیف پول"
  // Custom row render
  renderRow?: (item: T, index: number, columns: Column<T>[]) => React.ReactNode;
}
