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
import { useGetEntriesQuery, type LedgerEntry } from "@/store/api/entriesApi";
import type { EntryDirectionFilter } from "./EntriesHeaderControls";

interface EntriesTableProps {
  searchTerm?: string;
  directionFilter?: EntryDirectionFilter;
  minAmount?: string;
  refetchTrigger?: number;
}

const formatAmount = (val?: string | number) => {
  if (val === undefined || val === null || val === "") return "0";
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return String(val);
  return num.toLocaleString("fa-IR", { maximumFractionDigits: 8 });
};

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

export const EntriesTable: React.FC<EntriesTableProps> = ({
  searchTerm = "",
  directionFilter = "ALL",
  minAmount = "",
  refetchTrigger,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const {
    data: entriesResponse,
    isLoading,
    isError,
    refetch,
  } = useGetEntriesQuery({
    page: page + 1,
    page_size: rowsPerPage,
    search: searchTerm || undefined,
    direction: directionFilter !== "ALL" ? directionFilter : undefined,
    min_amount: minAmount || undefined,
  });

  useEffect(() => {
    if (refetchTrigger) {
      refetch();
    }
  }, [refetchTrigger, refetch]);

  const entries = entriesResponse?.results || [];
  const totalCount = entriesResponse?.count || entries.length;

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
        خطا در دریافت اسناد دفتر کل. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید.
      </Alert>
    );
  }

  return (
    <Card elevation={2} sx={{ overflow: "hidden" }}>
      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 850 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>کاربر</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>دارایی (Asset)</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                جهت مالی
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                باکت / حساب
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                مبلغ ردیف
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                موجودی پس از ردیف
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                نوع تراکنش
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                تاریخ ایجاد
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries && entries.length > 0 ? (
              entries.map((entry: LedgerEntry) => {
                const isDebit = entry.direction === "debit";

                return (
                  <TableRow key={entry.uuid} hover>
                    {/* User */}
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {entry.user || "-"}
                      </Typography>
                    </TableCell>

                    {/* Asset */}
                    <TableCell>
                      <Chip
                        label={entry.asset || "IRR"}
                        color="primary"
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 1 }}
                      />
                    </TableCell>

                    {/* Direction */}
                    <TableCell align="center">
                      <Chip
                        label={isDebit ? "بدهکار (Debit)" : "بستانکار (Credit)"}
                        color={isDebit ? "error" : "success"}
                        size="small"
                        sx={{ fontWeight: 700, borderRadius: 1 }}
                      />
                    </TableCell>

                    {/* Bucket */}
                    <TableCell align="center">
                      <Chip
                        label={entry.bucket === "blocked" ? "مسدود شده" : "در دسترس"}
                        color={entry.bucket === "blocked" ? "warning" : "default"}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600, borderRadius: 1 }}
                      />
                    </TableCell>

                    {/* Amount */}
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: isDebit ? "error.main" : "success.main",
                        }}
                      >
                        {formatAmount(entry.amount)}
                      </Typography>
                    </TableCell>

                    {/* Balance After */}
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {formatAmount(entry.balance_after)}
                      </Typography>
                    </TableCell>

                    {/* Transaction Type */}
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {entry.transaction_type || "-"}
                      </Typography>
                    </TableCell>

                    {/* Created At */}
                    <TableCell align="center">
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(entry.created_at)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">هیچ سندی در دفتر کل یافت نشد.</Typography>
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
              نمایش <b>{from}</b> تا <b>{to}</b> از <b>{totalCount}</b> سند دفتر کل
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
