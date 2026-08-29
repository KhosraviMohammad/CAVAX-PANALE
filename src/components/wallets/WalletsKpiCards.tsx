import React from "react";
import { Grid, Paper, Box, Typography, Avatar, useTheme, alpha, Skeleton } from "@mui/material";
import {
  AccountBalanceWallet as WalletIcon,
  Block as FrozenIcon,
  CheckCircle as ActiveIcon,
  MonetizationOn as AssetIcon,
} from "@mui/icons-material";
import { useGetWalletsQuery } from "@/store/api/walletsApi";

export const WalletsKpiCards: React.FC = () => {
  const theme = useTheme();
  const { data: walletsResponse, isLoading } = useGetWalletsQuery({ page: 1, page_size: 100 });

  const wallets = walletsResponse?.results || [];
  const totalWallets = walletsResponse?.count ?? wallets.length;
  const frozenWallets = wallets.filter((w) => w.is_frozen).length;
  const activeWallets = wallets.filter((w) => !w.is_frozen).length;
  const uniqueAssets = Array.from(new Set(wallets.map((w) => w.asset))).length;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Wallets */}
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
            <WalletIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کل کیف پول‌ها
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                {totalWallets}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Active Wallets */}
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
              کیف پول‌های فعال
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 800 }}>
                {activeWallets}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Frozen Wallets */}
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
            <FrozenIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کیف پول‌های مسدود / فریز
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="error.main" sx={{ fontWeight: 800 }}>
                {frozenWallets}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Unique Assets */}
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
            <AssetIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              تنوع ارزها / دارایی‌ها
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="warning.main" sx={{ fontWeight: 800 }}>
                {uniqueAssets}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
