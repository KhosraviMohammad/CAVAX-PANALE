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

export type EntryDirectionFilter = "ALL" | "debit" | "credit";

interface EntriesHeaderControlsProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  directionFilter: EntryDirectionFilter;
  onDirectionFilterChange: (dir: EntryDirectionFilter) => void;
  minAmount: string;
  onMinAmountChange: (val: string) => void;
  onRefresh?: () => void;
}

export const EntriesHeaderControls: React.FC<EntriesHeaderControlsProps> = ({
  searchTerm,
  onSearchChange,
  directionFilter,
  onDirectionFilterChange,
  minAmount,
  onMinAmountChange,
  onRefresh,
}) => {
  const theme = useTheme();
  const [directionAnchorEl, setDirectionAnchorEl] = useState<null | HTMLElement>(null);

  const directionLabels: Record<EntryDirectionFilter, string> = {
    ALL: "همه جهت‌ها",
    debit: "بدهکار (Debit)",
    credit: "بستانکار (Credit)",
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
          placeholder="جستجوی کاربر، ارز یا نوع..."
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
            width: { xs: "100%", sm: 260 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              bgcolor: "background.paper",
            },
          }}
        />

        {/* Min Amount Field */}
        <TextField
          size="small"
          type="number"
          placeholder="حداقل مبلغ (min_amount)"
          value={minAmount}
          onChange={(e) => onMinAmountChange(e.target.value)}
          sx={{
            width: { xs: "100%", sm: 200 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              bgcolor: "background.paper",
            },
          }}
        />

        {/* Filter Direction Menu Button */}
        <Tooltip title="فیلتر جهت مالی (بدهکار/بستانکار)">
          <IconButton
            onClick={(e) => setDirectionAnchorEl(e.currentTarget)}
            sx={{
              bgcolor:
                directionFilter !== "ALL"
                  ? alpha(theme.palette.primary.main, 0.15)
                  : "background.paper",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 1,
              p: 1,
              transition: "all 0.2s ease",
            }}
          >
            <Badge color="primary" variant="dot" invisible={directionFilter === "ALL"}>
              <FilterIcon color={directionFilter !== "ALL" ? "primary" : "action"} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={directionAnchorEl}
          open={Boolean(directionAnchorEl)}
          onClose={() => setDirectionAnchorEl(null)}
          slotProps={{
            paper: { elevation: 3, sx: { borderRadius: 1, minWidth: 200, mt: 1, p: 0.5 } },
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ px: 2, py: 1, display: "block", fontWeight: 700 }}
          >
            فیلتر بر اساس جهت
          </Typography>
          <Divider sx={{ mb: 0.5 }} />
          {(["ALL", "debit", "credit"] as EntryDirectionFilter[]).map((dir) => (
            <MenuItem
              key={dir}
              selected={directionFilter === dir}
              onClick={() => {
                onDirectionFilterChange(dir);
                setDirectionAnchorEl(null);
              }}
              sx={{ borderRadius: 1, my: 0.2 }}
            >
              <ListItemText primary={directionLabels[dir]} />
              {directionFilter === dir && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          ))}
        </Menu>

        {/* Active Chips */}
        {directionFilter !== "ALL" && (
          <Chip
            label={`جهت: ${directionLabels[directionFilter]}`}
            color="primary"
            variant="outlined"
            size="small"
            onDelete={() => onDirectionFilterChange("ALL")}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ fontWeight: 600, borderRadius: 1 }}
          />
        )}
        {minAmount && (
          <Chip
            label={`حداقل مبلغ: ${minAmount}`}
            color="secondary"
            variant="outlined"
            size="small"
            onDelete={() => onMinAmountChange("")}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ fontWeight: 600, borderRadius: 1 }}
          />
        )}
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Tooltip title="بروزرسانی لیست اسناد دفتر کل">
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
