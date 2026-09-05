import React from "react";
import { Grid } from "@mui/material";
import {
  MenuBook as EntryIcon,
  RemoveCircle as DebitIcon,
  AddCircle as CreditIcon,
  MonetizationOn as AssetIcon,
} from "@mui/icons-material";
import { useGetEntriesQuery } from "@/store/api/entriesApi";
import { KpiCard } from "@/components/common/KpiCard";

export const EntriesKpiCards: React.FC = () => {
  const { data: entriesResponse, isLoading } = useGetEntriesQuery({ page: 1, page_size: 100 });

  const entries = entriesResponse?.results || [];
  const totalEntries = entriesResponse?.count ?? entries.length;
  const debitCount = entries.filter((e) => e.direction === "debit").length;
  const creditCount = entries.filter((e) => e.direction === "credit").length;
  const uniqueAssets = Array.from(new Set(entries.map((e) => e.asset).filter(Boolean))).length;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Entries */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کل اسناد دفتر کل"
          value={totalEntries}
          color="primary"
          icon={<EntryIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Debits */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="ردیف‌های بدهکار (Debit)"
          value={debitCount}
          color="error"
          icon={<DebitIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Credits */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="ردیف‌های بستانکار (Credit)"
          value={creditCount}
          color="success"
          icon={<CreditIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>

      {/* Assets */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="تنوع دارایی‌ها"
          value={uniqueAssets}
          color="warning"
          icon={<AssetIcon fontSize="medium" />}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
};
