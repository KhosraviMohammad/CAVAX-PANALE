import React from "react";
import { Grid } from "@mui/material";
import {
  AccountBalanceWallet as WalletIcon,
  Block as FrozenIcon,
  CheckCircle as ActiveIcon,
  MonetizationOn as AssetIcon,
} from "@mui/icons-material";
import { useGetWalletsQuery } from "@/store/api/walletsApi";
import { KpiCard } from "@/components/common/KpiCard";

export const WalletsKpiCards: React.FC = () => {
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
        <KpiCard
          title="کل کیف پول‌ها"
          value={totalWallets}
          color="primary"
          icon={<WalletIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Active Wallets */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کیف پول‌های فعال"
          value={activeWallets}
          color="success"
          icon={<ActiveIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Frozen Wallets */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کیف پول‌های مسدود / فریز"
          value={frozenWallets}
          color="error"
          icon={<FrozenIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Unique Assets */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="تنوع ارزها / دارایی‌ها"
          value={uniqueAssets}
          color="warning"
          icon={<AssetIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
