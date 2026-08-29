import React from "react";
import { Grid, Paper, Box, Typography, Avatar, useTheme, alpha, Skeleton } from "@mui/material";
import {
  Payments as DepositIcon,
  HourglassEmpty as PendingIcon,
  CheckCircle as ApprovedIcon,
  Cancel as RejectedIcon,
} from "@mui/icons-material";
import { useGetDepositRequestsQuery } from "@/store/api/depositRequestsApi";

export const DepositRequestsKpiCards: React.FC = () => {
  const theme = useTheme();
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
            <DepositIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کل درخواست‌های واریز
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                {totalCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Pending */}
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
            <PendingIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              در انتظار بررسی
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="warning.main" sx={{ fontWeight: 800 }}>
                {pendingCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Approved */}
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
            <ApprovedIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              تایید شده
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 800 }}>
                {approvedCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Rejected */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.08)} 0%, ${alpha(
              theme.palette.error.main,
              0.02,
            )} 100%)`,
            border: `1px solid ${alpha(theme.palette.error.main, 0.15)}`,
          }}
        >
          <Avatar
            variant="square"
            sx={{
              bgcolor: theme.palette.error.main,
              width: 46,
              height: 46,
              borderRadius: 1,
            }}
          >
            <RejectedIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              رد شده
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="error.main" sx={{ fontWeight: 800 }}>
                {rejectedCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
