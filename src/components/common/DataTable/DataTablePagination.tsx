import React from "react";
import { Box, Typography, IconButton, Paper, Skeleton, alpha } from "@mui/material";
import { ChevronRightIcon, ChevronLeftIcon } from "@/assets/icons";

interface DataTablePaginationProps {
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  isLoading?: boolean;
}

export const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  itemLabel = "مورد",
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1.5,
          pt: 2,
          px: 1,
        }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={160}
          height={20}
          sx={{ borderRadius: "6px" }}
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton
            animation="wave"
            variant="rounded"
            width={32}
            height={32}
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={64}
            height={32}
            sx={{ borderRadius: "8px" }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            width={32}
            height={32}
            sx={{ borderRadius: "8px" }}
          />
        </Box>
      </Box>
    );
  }

  const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min((page + 1) * rowsPerPage, totalCount);
  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1.5,
        pt: 2,
        px: 1,
      }}
    >
      {/* Items count summary */}
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
        نمایش <b style={{ color: "inherit" }}>{from}</b> تا <b style={{ color: "inherit" }}>{to}</b>{" "}
        از <b style={{ color: "inherit" }}>{totalCount}</b> {itemLabel}
      </Typography>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          size="small"
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
          aria-label="صفحه قبلی"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.paper",
            transition: "all 0.15s ease-in-out",
            "&:hover:not(:disabled)": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
              borderColor: "primary.main",
              color: "primary.main",
            },
            "&:disabled": {
              opacity: 0.4,
            },
          }}
        >
          <ChevronRightIcon fontSize="small" />
        </IconButton>

        {/* Page Badge */}
        <Paper
          elevation={0}
          sx={{
            px: 1.75,
            py: 0.5,
            borderRadius: "8px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? alpha(theme.palette.primary.main, 0.04)
                : alpha(theme.palette.common.white, 0.04),
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: "0.8125rem",
              color: "primary.main",
            }}
          >
            {page + 1}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            / {totalPages}
          </Typography>
        </Paper>

        <IconButton
          size="small"
          disabled={(page + 1) * rowsPerPage >= totalCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="صفحه بعدی"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "8px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: "background.paper",
            transition: "all 0.15s ease-in-out",
            "&:hover:not(:disabled)": {
              backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
              borderColor: "primary.main",
              color: "primary.main",
            },
            "&:disabled": {
              opacity: 0.4,
            },
          }}
        >
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};
