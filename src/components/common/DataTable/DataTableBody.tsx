import React from "react";
import { TableBody, TableRow, TableCell, alpha } from "@mui/material";
import type { Column } from "./types";
import { DataTableLoading } from "./DataTableLoading";
import { DataTableEmpty } from "./DataTableEmpty";

interface DataTableBodyProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string | number;
  isLoading?: boolean;
  loadingRowsCount?: number;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  renderRow?: (item: T, index: number, columns: Column<T>[]) => React.ReactNode;
}

export const DataTableBody = <T,>({
  columns,
  data,
  keyExtractor,
  isLoading,
  loadingRowsCount = 6,
  emptyMessage,
  onRowClick,
  renderRow,
}: DataTableBodyProps<T>) => {
  if (isLoading) {
    return (
      <TableBody>
        <DataTableLoading colSpan={columns.length} rowsCount={loadingRowsCount} />
      </TableBody>
    );
  }

  if (!data || data.length === 0) {
    return (
      <TableBody>
        <DataTableEmpty colSpan={columns.length} message={emptyMessage} />
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((item, index) => {
        const key = keyExtractor(item, index);
        const isLastRow = index === data.length - 1;

        if (renderRow) {
          return <React.Fragment key={key}>{renderRow(item, index, columns)}</React.Fragment>;
        }

        return (
          <TableRow
            key={key}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            sx={{
              cursor: onRowClick ? "pointer" : "default",
              transition: "background-color 0.15s ease",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.035)
                    : alpha(theme.palette.common.white, 0.04),
              },
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || "left"}
                sx={{
                  py: 1.5,
                  px: 2,
                  fontSize: "0.875rem",
                  borderBottom: (theme) =>
                    isLastRow ? "none" : `1px solid ${alpha(theme.palette.divider, 0.6)}`,
                }}
              >
                {column.render
                  ? column.render(item, index)
                  : ((item as Record<string, unknown>)[column.id] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
