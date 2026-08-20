import React from "react";
import { Grid, Paper, Box, Typography, Avatar, useTheme, alpha, Skeleton } from "@mui/material";
import {
  PeopleIcon,
  CheckCircleIcon as ActiveIcon,
  SidebarSecurityIcon as AdminIcon,
  VpnKeyIcon as VerifiedIcon,
} from "@/assets/icons";
import { useGetUserStatsQuery } from "@/store/api/usersApi";

export const UsersKpiCards: React.FC = () => {
  const theme = useTheme();
  const { data: stats, isLoading } = useGetUserStatsQuery();

  const totalUsers = stats?.total_users ?? 0;
  const activeUsers = stats?.active_users ?? 0;
  const kycUsers = stats?.kyc_completed_users ?? stats?.verified_users ?? 0;
  const adminUsers = stats?.admin_users ?? 0;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
              theme.palette.primary.main,
              0.02,
            )} 100%)`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          <Avatar
            variant="square"
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 46,
              height: 46,
              borderRadius: 1,
            }}
          >
            <PeopleIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کل کاربران
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                {totalUsers}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Active Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.08)} 0%, ${alpha(
              theme.palette.success.main,
              0.02,
            )} 100%)`,
            border: `1px solid ${alpha(theme.palette.success.main, 0.15)}`,
          }}
        >
          <Avatar
            variant="square"
            sx={{
              bgcolor: theme.palette.success.main,
              width: 46,
              height: 46,
              borderRadius: 1,
            }}
          >
            <ActiveIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کاربران فعال
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 800 }}>
                {activeUsers}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* KYC Completed / Verified Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.08)} 0%, ${alpha(
              theme.palette.info.main,
              0.02,
            )} 100%)`,
            border: `1px solid ${alpha(theme.palette.info.main, 0.15)}`,
          }}
        >
          <Avatar
            variant="square"
            sx={{
              bgcolor: theme.palette.info.main,
              width: 46,
              height: 46,
              borderRadius: 1,
            }}
          >
            <VerifiedIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              احراز هویت شده
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="info.main" sx={{ fontWeight: 800 }}>
                {kycUsers}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Admin Users */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.warning.main, 0.08)} 0%, ${alpha(
              theme.palette.warning.main,
              0.02,
            )} 100%)`,
            border: `1px solid ${alpha(theme.palette.warning.main, 0.15)}`,
          }}
        >
          <Avatar
            variant="square"
            sx={{
              bgcolor: theme.palette.warning.main,
              width: 46,
              height: 46,
              borderRadius: 1,
            }}
          >
            <AdminIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              مدیران سیستم
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="warning.main" sx={{ fontWeight: 800 }}>
                {adminUsers}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
