import React, { useMemo } from "react";
import { Box, Typography, Chip, IconButton, Tooltip, Avatar, useTheme, alpha } from "@mui/material";
import {
  Edit as EditIcon,
  Category as CategoryIcon,
  BarChart as StatsIcon,
  DeveloperBoard as TagIcon,
} from "@mui/icons-material";

import type { Sample } from "@/store/api/sampleApi";
import { DataTable, type Column } from "@/components/common/DataTable";

interface SampleTableProps {
  samples?: Sample[];
  totalFilteredCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange?: (newRowsPerPage: number) => void;
  onEditValueClick: (sample: Sample) => void;
  isLoading?: boolean;
}

export const SampleTable: React.FC<SampleTableProps> = ({
  samples = [],
  totalFilteredCount,
  page,
  rowsPerPage,
  onPageChange,
  onEditValueClick,
  isLoading = false,
}) => {
  const theme = useTheme();

  const getSampleMeta = (type: string) => {
    switch (type) {
      case "TYPE_A":
        return {
          icon: <CategoryIcon />,
          color: theme.palette.primary.main,
          label: "نوع A",
        };
      case "TYPE_B":
        return {
          icon: <StatsIcon />,
          color: theme.palette.info.main,
          label: "نوع B",
        };
      default:
        return {
          icon: <TagIcon />,
          color: theme.palette.secondary.main,
          label: "عمومی / سایر",
        };
    }
  };

  const columns = useMemo<Column<Sample>[]>(
    () => [
      {
        id: "name",
        label: "نام نمونه",
        render: (sample) => {
          const meta = getSampleMeta(sample.sample_type);
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                variant="square"
                sx={{
                  bgcolor: alpha(meta.color, 0.12),
                  color: meta.color,
                  width: 34,
                  height: 34,
                  borderRadius: "6px",
                }}
              >
                {meta.icon}
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {sample.name}
              </Typography>
            </Box>
          );
        },
      },
      {
        id: "code",
        label: "کد شناسایی",
        render: (sample) => (
          <Chip
            label={sample.code}
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 700, fontFamily: "monospace", borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "category_name",
        label: "دسته‌بندی",
        render: (sample) => (
          <Typography variant="body2" color="text.secondary">
            {sample.category_name || "-"}
          </Typography>
        ),
      },
      {
        id: "sample_type",
        label: "نوع نمونه",
        render: (sample) => {
          const meta = getSampleMeta(sample.sample_type);
          return (
            <Chip
              label={meta.label}
              size="small"
              sx={{
                bgcolor: alpha(meta.color, 0.1),
                color: meta.color,
                fontWeight: 600,
                borderRadius: "6px",
              }}
            />
          );
        },
      },
      {
        id: "value",
        label: "مقدار فعلی",
        align: "center",
        render: (sample) => (
          <Chip
            label={`${sample.value} ${sample.unit || ""}`}
            color="primary"
            size="small"
            sx={{ fontWeight: 700, fontSize: "0.85rem", px: 1, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "is_active",
        label: "وضعیت",
        align: "center",
        render: (sample) => (
          <Chip
            label={sample.is_active ? "فعال" : "غیرفعال"}
            color={sample.is_active ? "success" : "default"}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "actions",
        label: "عملیات",
        align: "center",
        render: (sample) => (
          <Tooltip title="ویرایش مقدار نمونه" arrow>
            <IconButton
              size="small"
              onClick={() => onEditValueClick(sample)}
              sx={{
                borderRadius: "8px",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                color: "primary.main",
                "&:hover": {
                  backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [theme, onEditValueClick],
  );

  return (
    <DataTable
      columns={columns}
      data={samples}
      keyExtractor={(sample) => sample.id}
      isLoading={isLoading}
      emptyMessage="هیچ نمونه‌ای یافت نشد."
      page={page}
      rowsPerPage={rowsPerPage}
      totalCount={totalFilteredCount}
      onPageChange={onPageChange}
      itemLabel="نمونه"
      minWidth={800}
    />
  );
};

export default SampleTable;
