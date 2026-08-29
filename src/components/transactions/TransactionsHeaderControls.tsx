import React, { useState } from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemText,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  SearchIcon,
  FilterListIcon as FilterIcon,
  CheckIcon,
  CloseIcon,
  RefreshIcon,
} from "@/assets/icons";

export type TransactionTypeFilter = "ALL" | "deposit" | "convert" | "fee" | "block" | "adjustment";
export type TransactionStatusFilter = "ALL" | "pending" | "completed" | "failed";

interface TransactionsHeaderControlsProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  typeFilter: TransactionTypeFilter;
  onTypeFilterChange: (type: TransactionTypeFilter) => void;
  statusFilter: TransactionStatusFilter;
  onStatusFilterChange: (status: TransactionStatusFilter) => void;
  onRefresh?: () => void;
}

export const TransactionsHeaderControls: React.FC<TransactionsHeaderControlsProps> = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  statusFilter,
  onStatusFilterChange,
  onRefresh,
}) => {
  const theme = useTheme();
  const [typeAnchorEl, setTypeAnchorEl] = useState<null | HTMLElement>(null);
  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(null);

  const typeLabels: Record<TransactionTypeFilter, string> = {
    ALL: "همه انواع",
    deposit: "واریز (Deposit)",
    convert: "تبدیل (Convert)",
    fee: "کارمزد (Fee)",
    block: "مسدودسازی (Block)",
    adjustment: "اصلاحیه (Adjustment)",
  };

  const statusLabels: Record<TransactionStatusFilter, string> = {
    ALL: "همه وضعیت‌ها",
    pending: "در انتظار (Pending)",
    completed: "تکمیل شده (Completed)",
    failed: "ناموفق (Failed)",
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 1,
        background:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.background.paper, 0.9)
            : `linear-gradient(135deg, #ffffff 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap", flexGrow: 1 }}>
        {/* Search Field */}
        <TextField
          size="small"
          placeholder="جستجوی توضیحات یا منبع..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: "100%", sm: 320 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              bgcolor: "background.paper",
            },
          }}
        />

        {/* Filter Type Menu Button */}
        <Tooltip title="فیلتر نوع تراکنش">
          <IconButton
            onClick={(e) => setTypeAnchorEl(e.currentTarget)}
            sx={{
              bgcolor:
                typeFilter !== "ALL" ? alpha(theme.palette.primary.main, 0.15) : "background.paper",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 1,
              p: 1,
              transition: "all 0.2s ease",
            }}
          >
            <Badge color="primary" variant="dot" invisible={typeFilter === "ALL"}>
              <FilterIcon color={typeFilter !== "ALL" ? "primary" : "action"} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={typeAnchorEl}
          open={Boolean(typeAnchorEl)}
          onClose={() => setTypeAnchorEl(null)}
          slotProps={{
            paper: { elevation: 3, sx: { borderRadius: 1, minWidth: 200, mt: 1, p: 0.5 } },
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ px: 2, py: 1, display: "block", fontWeight: 700 }}
          >
            فیلتر بر اساس نوع
          </Typography>
          <Divider sx={{ mb: 0.5 }} />
          {(
            ["ALL", "deposit", "convert", "fee", "block", "adjustment"] as TransactionTypeFilter[]
          ).map((t) => (
            <MenuItem
              key={t}
              selected={typeFilter === t}
              onClick={() => {
                onTypeFilterChange(t);
                setTypeAnchorEl(null);
              }}
              sx={{ borderRadius: 1, my: 0.2 }}
            >
              <ListItemText primary={typeLabels[t]} />
              {typeFilter === t && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          ))}
        </Menu>

        {/* Filter Status Menu Button */}
        <Tooltip title="فیلتر وضعیت تراکنش">
          <IconButton
            onClick={(e) => setStatusAnchorEl(e.currentTarget)}
            sx={{
              bgcolor:
                statusFilter !== "ALL"
                  ? alpha(theme.palette.primary.main, 0.15)
                  : "background.paper",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 1,
              p: 1,
              transition: "all 0.2s ease",
            }}
          >
            <Badge color="secondary" variant="dot" invisible={statusFilter === "ALL"}>
              <FilterIcon color={statusFilter !== "ALL" ? "secondary" : "action"} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={statusAnchorEl}
          open={Boolean(statusAnchorEl)}
          onClose={() => setStatusAnchorEl(null)}
          slotProps={{
            paper: { elevation: 3, sx: { borderRadius: 1, minWidth: 200, mt: 1, p: 0.5 } },
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ px: 2, py: 1, display: "block", fontWeight: 700 }}
          >
            فیلتر بر اساس وضعیت
          </Typography>
          <Divider sx={{ mb: 0.5 }} />
          {(["ALL", "pending", "completed", "failed"] as TransactionStatusFilter[]).map((s) => (
            <MenuItem
              key={s}
              selected={statusFilter === s}
              onClick={() => {
                onStatusFilterChange(s);
                setStatusAnchorEl(null);
              }}
              sx={{ borderRadius: 1, my: 0.2 }}
            >
              <ListItemText primary={statusLabels[s]} />
              {statusFilter === s && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          ))}
        </Menu>

        {/* Active Chips */}
        {typeFilter !== "ALL" && (
          <Chip
            label={`نوع: ${typeLabels[typeFilter]}`}
            color="primary"
            variant="outlined"
            size="small"
            onDelete={() => onTypeFilterChange("ALL")}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ fontWeight: 600, borderRadius: 1 }}
          />
        )}
        {statusFilter !== "ALL" && (
          <Chip
            label={`وضعیت: ${statusLabels[statusFilter]}`}
            color="secondary"
            variant="outlined"
            size="small"
            onDelete={() => onStatusFilterChange("ALL")}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ fontWeight: 600, borderRadius: 1 }}
          />
        )}
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Tooltip title="بروزرسانی لیست تراکنش‌ها">
          <IconButton
            onClick={onRefresh}
            color="primary"
            sx={{
              borderRadius: 1,
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.18) },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};
