import React from "react";
import { Grid, Paper, Box, Typography, Avatar, useTheme, alpha, Skeleton } from "@mui/material";
import {
  ReceiptLong as TxIcon,
  HourglassEmpty as PendingIcon,
  CheckCircle as CompletedIcon,
  ArrowDownward as DepositIcon,
} from "@mui/icons-material";
import { useGetTransactionsQuery } from "@/store/api/transactionsApi";

export const TransactionsKpiCards: React.FC = () => {
  const theme = useTheme();
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
            <TxIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کل تراکنش‌ها
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

      {/* Deposit Transactions */}
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
            <DepositIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              تراکنش‌های واریز
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 800 }}>
                {depositCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Pending Transactions */}
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
              در انتظار تایید
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

      {/* Completed Transactions */}
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
            <CompletedIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              تکمیل شده
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="info.main" sx={{ fontWeight: 800 }}>
                {completedCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
