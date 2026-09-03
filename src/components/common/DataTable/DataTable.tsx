import React from "react";
import { Card, TableContainer, Table, Paper, Alert } from "@mui/material";
import type { DataTableProps } from "./types";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTablePagination } from "./DataTablePagination";

export const DataTable = <T,>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  loadingRowsCount,
  isError = false,
  errorMessage = "خطا در دریافت اطلاعات جدول.",
  emptyMessage,
  minWidth = 800,
  onRowClick,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  itemLabel,
  renderRow,
}: DataTableProps<T>) => {
  if (isError) {
    return (
      <Alert severity="error" sx={{ borderRadius: "10px" }}>
        {errorMessage}
      </Alert>
    );
  }

  const showPagination =
    (page !== undefined &&
      rowsPerPage !== undefined &&
      totalCount !== undefined &&
      onPageChange !== undefined) ||
    isLoading;

  const calculatedLoadingRows = loadingRowsCount || (rowsPerPage ? Math.min(rowsPerPage, 8) : 6);

  return (
    <Card
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: "16px",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: (theme) =>
          theme.palette.mode === "light"
            ? "0 4px 20px -2px rgba(0, 0, 0, 0.04)"
            : "0 4px 20px -2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: "12px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
          backgroundColor: "background.paper",
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth }}>
          <DataTableHeader columns={columns} />
          <DataTableBody
            columns={columns}
            data={data}
            keyExtractor={keyExtractor}
            isLoading={isLoading}
            loadingRowsCount={calculatedLoadingRows}
            emptyMessage={emptyMessage}
            onRowClick={onRowClick}
            renderRow={renderRow}
          />
        </Table>
      </TableContainer>

      {showPagination && (
        <DataTablePagination
          page={page ?? 0}
          rowsPerPage={rowsPerPage ?? 10}
          totalCount={totalCount ?? 0}
          onPageChange={onPageChange ?? (() => {})}
          itemLabel={itemLabel}
          isLoading={isLoading}
        />
      )}
    </Card>
  );
};

export default DataTable;
