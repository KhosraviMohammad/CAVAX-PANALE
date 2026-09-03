import React, { useState, useMemo } from "react";
import { Typography, Chip } from "@mui/material";
import { useGetEntriesQuery, type LedgerEntry } from "@/store/api/entriesApi";
import { DataTable, type Column } from "@/components/common/DataTable";

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

export const EntriesTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const {
    data: entriesResponse,
    isLoading,
    isError,
  } = useGetEntriesQuery({
    page: page + 1,
    page_size: rowsPerPage,
  });

  const entries = entriesResponse?.results || [];
  const totalCount = entriesResponse?.count || entries.length;

  const columns = useMemo<Column<LedgerEntry>[]>(
    () => [
      {
        id: "user",
        label: "کاربر",
        render: (entry) => (
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {entry.user || "-"}
          </Typography>
        ),
      },
      {
        id: "asset",
        label: "دارایی (Asset)",
        render: (entry) => (
          <Chip
            label={entry.asset || "IRR"}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 700, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "direction",
        label: "جهت مالی",
        align: "center",
        render: (entry) => {
          const isDebit = entry.direction === "debit";
          return (
            <Chip
              label={isDebit ? "بدهکار (Debit)" : "بستانکار (Credit)"}
              color={isDebit ? "error" : "success"}
              size="small"
              sx={{ fontWeight: 700, borderRadius: "6px" }}
            />
          );
        },
      },
      {
        id: "bucket",
        label: "باکت / حساب",
        align: "center",
        render: (entry) => (
          <Chip
            label={entry.bucket === "blocked" ? "مسدود شده" : "در دسترس"}
            color={entry.bucket === "blocked" ? "warning" : "default"}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "amount",
        label: "مبلغ ردیف",
        align: "right",
        render: (entry) => {
          const isDebit = entry.direction === "debit";
          return (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: isDebit ? "error.main" : "success.main",
              }}
            >
              {formatAmount(entry.amount)}
            </Typography>
          );
        },
      },
      {
        id: "balance_after",
        label: "موجودی پس از ردیف",
        align: "right",
        render: (entry) => (
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {formatAmount(entry.balance_after)}
          </Typography>
        ),
      },
      {
        id: "transaction_type",
        label: "نوع تراکنش",
        align: "center",
        render: (entry) => (
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {entry.transaction_type || "-"}
          </Typography>
        ),
      },
      {
        id: "created_at",
        label: "تاریخ ایجاد",
        align: "center",
        render: (entry) => (
          <Typography variant="caption" color="text.secondary">
            {formatDate(entry.created_at)}
          </Typography>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={entries}
      keyExtractor={(entry) => entry.uuid}
      isLoading={isLoading}
      isError={isError}
      errorMessage="خطا در دریافت اسناد دفتر کل. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید."
      emptyMessage="هیچ سندی در دفتر کل یافت نشد."
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={setPage}
      itemLabel="سند دفتر کل"
      minWidth={850}
    />
  );
};

export default EntriesTable;
