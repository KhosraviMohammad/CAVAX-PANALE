import React from "react";
import { Grid } from "@mui/material";
import {
  Payments as DepositIcon,
  HourglassEmpty as PendingIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import { useGetDepositRequestsQuery } from "@/store/api/depositRequestsApi";
import { KpiCard } from "@/components/common/KpiCard";

export const DepositRequestsKpiCards: React.FC = () => {
  const { data: response, isLoading } = useGetDepositRequestsQuery({ page: 1, page_size: 100 });

  const requests = response?.results || [];
  const totalCount = response?.count ?? requests.length;
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter(
    (r) => r.status === "approved" || r.status === "completed" || r.status === "success",
  ).length;
  const rejectedCount = requests.filter(
    (r) => r.status === "rejected" || r.status === "failed",
  ).length;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Deposit Requests */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کل درخواست‌های واریز"
          value={totalCount}
          color="primary"
          icon={<DepositIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Pending */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="در انتظار بررسی"
          value={pendingCount}
          color="warning"
          icon={<PendingIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Approved */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="تایید شده"
          value={approvedCount}
          color="success"
          icon={<ApprovedIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Rejected */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="رد شده"
          value={rejectedCount}
          color="error"
          icon={<RejectedIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
