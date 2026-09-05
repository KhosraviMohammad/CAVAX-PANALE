import React from "react";
import { Grid } from "@mui/material";
import {
  Assignment as SampleIcon,
  CheckCircle as ActiveIcon,
  Category as CategoryIcon,
  BarChart as StatsIcon,
} from "@mui/icons-material";
import type { Sample } from "@/store/api/sampleApi";
import { KpiCard } from "@/components/common/KpiCard";

interface SampleKpiCardsProps {
  samples?: Sample[];
}

export const SampleKpiCards: React.FC<SampleKpiCardsProps> = ({ samples }) => {
  const totalSamples = samples?.length || 0;
  const activeSamples = samples?.filter((s) => s.is_active).length || 0;
  const typeASamples = samples?.filter((s) => s.sample_type === "TYPE_A").length || 0;
  const typeBSamples = samples?.filter((s) => s.sample_type === "TYPE_B").length || 0;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Samples */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="کل نمونه‌ها"
          value={totalSamples}
          color="primary"
          icon={<SampleIcon fontSize="medium" />}
        />
      </Grid>

      {/* Active Samples */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="نمونه‌های فعال"
          value={activeSamples}
          color="success"
          icon={<ActiveIcon fontSize="medium" />}
        />
      </Grid>

      {/* Type A Samples */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="نمونه‌های نوع A"
          value={typeASamples}
          color="warning"
          icon={<CategoryIcon fontSize="medium" />}
        />
      </Grid>

      {/* Type B Samples */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <KpiCard
          title="نمونه‌های نوع B"
          value={typeBSamples}
          color="info"
          icon={<StatsIcon fontSize="medium" />}
        />
      </Grid>
    </Grid>
  );
};
