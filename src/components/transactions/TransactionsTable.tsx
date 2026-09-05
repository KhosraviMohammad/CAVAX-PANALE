import React, { useState, useMemo } from "react";
import { Typography, Chip } from "@mui/material";
import { useGetTransactionsQuery, type Transaction } from "@/store/api/transactionsApi";
import { DataTable, type Column } from "@/components/common/DataTable";

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

export const TransactionsTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const {
    data: txResponse,
    isLoading,
    isError,
  } = useGetTransactionsQuery({
    page: page + 1,
    page_size: rowsPerPage,
  });

  const transactions = txResponse?.results || [];
  const totalCount = txResponse?.count || transactions.length;

  const columns = useMemo<Column<Transaction>[]>(
    () => [
      {
        id: "transaction_type",
        label: "نوع تراکنش",
        align: "center",
        render: (tx) => (
          <Chip
            label={tx.transaction_type || "عمومی"}
            color={getTypeChipColor(tx.transaction_type)}
            size="small"
            sx={{ fontWeight: 700, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "users",
        label: "کاربران",
        render: (tx) => {
          const userList = tx.users && tx.users.length > 0 ? tx.users.join("، ") : "-";
          return (
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              {userList}
            </Typography>
          );
        },
      },
      {
        id: "description",
        label: "توضیحات / منبع",
        render: (tx) => (
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {tx.description || tx.source || "-"}
          </Typography>
        ),
      },
      {
        id: "entry_count",
        label: "ورودی‌ها (entry_count)",
        align: "center",
        render: (tx) => (
          <Chip
            label={tx.entry_count ?? 0}
            variant="outlined"
            size="small"
            sx={{ fontWeight: 700, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "status",
        label: "وضعیت",
        align: "center",
        render: (tx) => (
          <Chip
            label={tx.status || "نامشخص"}
            color={getStatusChipColor(tx.status)}
            size="small"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "created_at",
        label: "تاریخ ایجاد",
        align: "center",
        render: (tx) => (
          <Typography variant="caption" color="text.secondary">
            {formatDate(tx.created_at)}
          </Typography>
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={transactions}
      keyExtractor={(tx) => tx.uuid}
      isLoading={isLoading}
      isError={isError}
      errorMessage="خطا در دریافت لیست تراکنش‌ها. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید."
      emptyMessage="هیچ تراکنشی یافت نشد."
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalCount}
      onPageChange={setPage}
      itemLabel="تراکنش"
      minWidth={850}
    />
  );
};

export default TransactionsTable;
