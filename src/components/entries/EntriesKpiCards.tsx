import React from "react";
import { Grid, Paper, Box, Typography, Avatar, useTheme, alpha, Skeleton } from "@mui/material";
import {
  MenuBook as EntryIcon,
  RemoveCircle as DebitIcon,
  AddCircle as CreditIcon,
  MonetizationOn as AssetIcon,
} from "@mui/icons-material";
import { useGetEntriesQuery } from "@/store/api/entriesApi";

export const EntriesKpiCards: React.FC = () => {
  const theme = useTheme();
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
            <EntryIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              کل اسناد دفتر کل
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                {totalEntries}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Debits */}
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
            <DebitIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              ردیف‌های بدهکار (Debit)
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="error.main" sx={{ fontWeight: 800 }}>
                {debitCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Credits */}
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
            <CreditIcon fontSize="medium" />
          </Avatar>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              ردیف‌های بستانکار (Credit)
            </Typography>
            {isLoading ? (
              <Skeleton width={50} height={32} />
            ) : (
              <Typography variant="h5" color="success.main" sx={{ fontWeight: 800 }}>
                {creditCount}
              </Typography>
            )}
          </Box>
        </Paper>
      </Grid>

      {/* Assets */}
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
              تنوع دارایی‌ها
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
