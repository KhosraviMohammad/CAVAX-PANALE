import React from "react";
import { TableHead, TableRow, TableCell, alpha } from "@mui/material";
import type { Column } from "./types";

interface DataTableHeaderProps<T> {
  columns: Column<T>[];
}

export const DataTableHeader = <T,>({ columns }: DataTableHeaderProps<T>) => {
  return (
    <TableHead
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.035)
            : alpha(theme.palette.common.white, 0.03),
      }}
    >
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || "left"}
            sx={{
              fontWeight: 700,
              fontSize: "0.8125rem",
              color: "text.secondary",
              py: 1.75,
              px: 2,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              width: column.width,
              minWidth: column.minWidth,
              whiteSpace: "nowrap",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
