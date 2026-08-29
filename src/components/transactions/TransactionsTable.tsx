import React, { useState, useEffect } from "react";
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Chip,
  useTheme,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ChevronRightIcon, ChevronLeftIcon } from "@/assets/icons";
import { useGetTransactionsQuery, type Transaction } from "@/store/api/transactionsApi";
import type { TransactionTypeFilter, TransactionStatusFilter } from "./TransactionsHeaderControls";

interface TransactionsTableProps {
  searchTerm?: string;
  typeFilter?: TransactionTypeFilter;
  statusFilter?: TransactionStatusFilter;
  refetchTrigger?: number;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

const getTypeChipColor = (
  type?: string,
): "success" | "info" | "warning" | "error" | "default" | "primary" | "secondary" => {
  switch (type?.toLowerCase()) {
    case "deposit":
      return "success";
    case "convert":
      return "info";
    case "fee":
      return "warning";
    case "block":
      return "error";
    case "adjustment":
      return "secondary";
    default:
      return "primary";
  }
};

const getStatusChipColor = (status?: string): "success" | "warning" | "error" | "default" => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "success":
      return "success";
    case "pending":
      return "warning";
    case "failed":
    case "error":
    case "rejected":
      return "error";
    default:
      return "default";
  }
};

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  searchTerm = "",
  typeFilter = "ALL",
  statusFilter = "ALL",
  refetchTrigger,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const {
    data: txResponse,
    isLoading,
    isError,
    refetch,
  } = useGetTransactionsQuery({
    page: page + 1,
    page_size: rowsPerPage,
    search: searchTerm || undefined,
    transaction_type: typeFilter !== "ALL" ? typeFilter : undefined,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  });

  useEffect(() => {
    if (refetchTrigger) {
      refetch();
    }
  }, [refetchTrigger, refetch]);

  const transactions = txResponse?.results || [];
  const totalCount = txResponse?.count || transactions.length;

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <IconButton color="inherit" size="small" onClick={() => refetch()}>
            تلاش مجدد
          </IconButton>
        }
        sx={{ borderRadius: 1 }}
      >
        خطا در دریافت لیست تراکنش‌ها. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید.
      </Alert>
    );
  }

  return (
    <Card elevation={2} sx={{ overflow: "hidden" }}>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                نوع تراکنش
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>کاربران</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>توضیحات / منبع</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                ورودی‌ها (`entry_count`)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                وضعیت
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                تاریخ ایجاد
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions && transactions.length > 0 ? (
              transactions.map((tx: Transaction) => {
                const userList = tx.users && tx.users.length > 0 ? tx.users.join("، ") : "-";

                return (
                  <TableRow key={tx.uuid} hover>
                    {/* Transaction Type */}
                    <TableCell align="center">
                      <Chip
                        label={tx.transaction_type || "عمومی"}
                        color={getTypeChipColor(tx.transaction_type)}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 1 }}
                      />
                    </TableCell>

                    {/* Users */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {userList}
                      </Typography>
                    </TableCell>

                    {/* Description / Source */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {tx.description || tx.source || "-"}
                      </Typography>
                    </TableCell>

                    {/* Entry Count */}
                    <TableCell align="center">
                      <Chip
                        label={tx.entry_count ?? 0}
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>

                    {/* Status */}
                    <TableCell align="center">
                      <Chip
                        label={tx.status || "نامشخص"}
                        color={getStatusChipColor(tx.status)}
                        size="small"
                        sx={{ fontWeight: 600, borderRadius: 1 }}
                      />
                    </TableCell>

                    {/* Created At */}
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(tx.created_at)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">هیچ تراکنشی یافت نشد.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Integrated Table Footer / Pagination */}
      {(() => {
        const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
        const to = Math.min((page + 1) * rowsPerPage, totalCount);
        const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              p: 1.5,
              px: 2.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              نمایش <b>{from}</b> تا <b>{to}</b> از <b>{totalCount}</b> تراکنش
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
                sx={{ borderRadius: 1 }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>

              <Typography variant="caption" sx={{ px: 0.5, fontWeight: "bold" }}>
                {page + 1} / {totalPages}
              </Typography>

              <IconButton
                size="small"
                disabled={(page + 1) * rowsPerPage >= totalCount}
                onClick={() => setPage(page + 1)}
                sx={{ borderRadius: 1 }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      })()}
    </Card>
  );
};
