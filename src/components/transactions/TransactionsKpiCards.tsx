import React from "react";
import { Grid } from "@mui/material";
import {
  ReceiptLong as TxIcon,
  HourglassEmpty as PendingIcon,
  CheckCircle as CompletedIcon,
  ArrowDownward as DepositIcon,
} from "@mui/icons-material";
import { useGetTransactionsQuery } from "@/store/api/transactionsApi";
import { KpiCard } from "@/components/common/KpiCard";

export const TransactionsKpiCards: React.FC = () => {
  const { data: txResponse, isLoading } = useGetTransactionsQuery({ page: 1, page_size: 100 });

  const transactions = txResponse?.results || [];
  const totalCount = txResponse?.count ?? transactions.length;
  const depositCount = transactions.filter((t) => t.transaction_type === "deposit").length;
  const pendingCount = transactions.filter((t) => t.status === "pending").length;
  const completedCount = transactions.filter(
    (t) => t.status === "completed" || t.status === "success",
  ).length;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Transactions */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کل تراکنش‌ها"
          value={totalCount}
          color="primary"
          icon={<TxIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Deposit Transactions */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="تراکنش‌های واریز"
          value={depositCount}
          color="success"
          icon={<DepositIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Pending Transactions */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="در انتظار تایید"
          value={pendingCount}
          color="warning"
          icon={<PendingIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Completed Transactions */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="تکمیل شده"
          value={completedCount}
          color="info"
          icon={<CompletedIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
