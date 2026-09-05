import React from "react";
import { Grid } from "@mui/material";
import {
  PeopleIcon,
  CheckCircleIcon as ActiveIcon,
  SidebarSecurityIcon as AdminIcon,
  VpnKeyIcon as VerifiedIcon,
} from "@/assets/icons";
import { useGetUserStatsQuery } from "@/store/api/usersApi";
import { KpiCard } from "@/components/common/KpiCard";

export const UsersKpiCards: React.FC = () => {
  const { data: stats, isLoading } = useGetUserStatsQuery();

  const totalUsers = stats?.total_users ?? 0;
  const activeUsers = stats?.active_users ?? 0;
  const kycUsers = stats?.kyc_completed_users ?? stats?.verified_users ?? 0;
  const adminUsers = stats?.admin_users ?? 0;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کل کاربران"
          value={totalUsers}
          color="primary"
          icon={<PeopleIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Active Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کاربران فعال"
          value={activeUsers}
          color="success"
          icon={<ActiveIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* KYC Completed / Verified Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="احراز هویت شده"
          value={kycUsers}
          color="info"
          icon={<VerifiedIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Admin Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="مدیران سیستم"
          value={adminUsers}
          color="warning"
          icon={<AdminIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
