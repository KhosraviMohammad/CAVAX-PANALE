import React from "react";
import {
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Edit as EditIcon,
  Assignment as SampleIcon,
  Category as CategoryIcon,
  BarChart as StatsIcon,
  DeveloperBoard as TagIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

import type { Sample } from "@/store/api/sampleApi";

interface SampleTableProps {
  samples?: Sample[];
  totalFilteredCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onEditValueClick: (sample: Sample) => void;
}

export const SampleTable: React.FC<SampleTableProps> = ({
  samples,
  totalFilteredCount,
  page,
  rowsPerPage,
  onPageChange,
  onEditValueClick,
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

  return (
    <Card elevation={2} sx={{ borderRadius: 1, overflow: "hidden" }}>
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead sx={{ bgcolor: "action.hover" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>نام نمونه</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>کد شناسایی</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>دسته‌بندی</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>نوع نمونه</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                مقدار فعلی
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                وضعیت
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {samples && samples.length > 0 ? (
              samples.map((sample) => {
                const meta = getSampleMeta(sample.sample_type);

                return (
                  <TableRow key={sample.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          variant="square"
                          sx={{
                            bgcolor: alpha(meta.color, 0.12),
                            color: meta.color,
                            width: 34,
                            height: 34,
                            borderRadius: 1,
                          }}
                        >
                          {meta.icon}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          {sample.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={sample.code}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ fontWeight: "bold", fontFamily: "monospace", borderRadius: 1 }}
                      />
                    </TableCell>

                    <TableCell>{sample.category_name}</TableCell>

                    <TableCell>
                      <Chip
                        label={meta.label}
                        size="small"
                        sx={{
                          bgcolor: alpha(meta.color, 0.1),
                          color: meta.color,
                          fontWeight: 600,
                          borderRadius: 1,
                        }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={`${sample.value} ${sample.unit || ""}`}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: "bold", fontSize: "0.85rem", px: 1, borderRadius: 1 }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={sample.is_active ? "فعال" : "غیرفعال"}
                        color={sample.is_active ? "success" : "default"}
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 600, borderRadius: 1 }}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="ویرایش مقدار نمونه">
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => onEditValueClick(sample)}
                          sx={{ borderRadius: 1 }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">هیچ نمونه‌ای یافت نشد.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Integrated Table Footer */}
      {(() => {
        const from = totalFilteredCount === 0 ? 0 : page * rowsPerPage + 1;
        const to = Math.min((page + 1) * rowsPerPage, totalFilteredCount);
        const totalPages = Math.max(1, Math.ceil(totalFilteredCount / rowsPerPage));

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              p: 1.5,
              px: 2.5,
              borderTop: `1px solid ${theme.palette.divider}`,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              نمایش <b>{from}</b> تا <b>{to}</b> از <b>{totalFilteredCount}</b> نمونه
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                size="small"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
                sx={{ borderRadius: 1 }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>

              <Typography variant="caption" sx={{ px: 0.5, fontWeight: "bold" }}>
                {page + 1} / {totalPages}
              </Typography>

              <IconButton
                size="small"
                disabled={(page + 1) * rowsPerPage >= totalFilteredCount}
                onClick={() => onPageChange(page + 1)}
                sx={{ borderRadius: 1 }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      })()}
    </Card>
  );
};
