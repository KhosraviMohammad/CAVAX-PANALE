import React from "react";
import { Grid, Paper, Box, Typography, Avatar, useTheme, alpha } from "@mui/material";
import {
  Assignment as SampleIcon,
  CheckCircle as ActiveIcon,
  Category as CategoryIcon,
  BarChart as StatsIcon,
} from "@mui/icons-material";
import type { Sample } from "@/store/api/sampleApi";

interface SampleKpiCardsProps {
  samples?: Sample[];
}

export const SampleKpiCards: React.FC<SampleKpiCardsProps> = ({ samples }) => {
  const theme = useTheme();

  const totalSamples = samples?.length || 0;
  const activeSamples = samples?.filter((s) => s.is_active).length || 0;
  const typeASamples = samples?.filter((s) => s.sample_type === "TYPE_A").length || 0;
  const typeBSamples = samples?.filter((s) => s.sample_type === "TYPE_B").length || 0;

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {/* Total Samples */}
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
            <SampleIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کل نمونه‌ها
            </Typography>
            <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
              {totalSamples}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Active Samples */}
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
              نمونه‌های فعال
            </Typography>
            <Typography variant="h5" color="success.main" sx={{ fontWeight: 800 }}>
              {activeSamples}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Type A Samples */}
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
            <CategoryIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              نمونه‌های نوع A
            </Typography>
            <Typography variant="h5" color="warning.main" sx={{ fontWeight: 800 }}>
              {typeASamples}
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Type B Samples */}
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
            <StatsIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              نمونه‌های نوع B
            </Typography>
            <Typography variant="h5" color="info.main" sx={{ fontWeight: 800 }}>
              {typeBSamples}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
