import React from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Badge,
  Chip,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon, FilterListIcon as FilterIcon, CloseIcon, RefreshIcon } from "@/assets/icons";
import { WalletsFilterDialog, type WalletFilterValues } from "./WalletsFilterDialog";
import {
  selectWalletsSearchTerm,
  selectWalletsFilters,
  selectHasActiveWalletsFilters,
} from "@/store/selectors/walletsUiSelectors";
import {
  setWalletsSearchTerm,
  setWalletsFilters,
  resetWalletsFilters,
  openWalletsFilterDialog,
} from "@/store/actions/walletsUiActions";

interface WalletsHeaderControlsProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  filters?: WalletFilterValues;
  onFilterChange?: (newFilters: WalletFilterValues) => void;
  onRefresh?: () => void;
}

export const WalletsHeaderControls: React.FC<WalletsHeaderControlsProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  onRefresh,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const reduxSearchTerm = useSelector(selectWalletsSearchTerm);
  const reduxFilters = useSelector(selectWalletsFilters);
  const reduxHasActiveFilters = useSelector(selectHasActiveWalletsFilters);

  const currentSearchTerm = searchTerm !== undefined ? searchTerm : reduxSearchTerm;
  const currentFilters = filters !== undefined ? filters : reduxFilters;
  const hasActiveFilters =
    filters !== undefined
      ? Boolean(
          filters.user ||
          filters.asset ||
          filters.min_balance ||
          filters.max_balance ||
          (filters.is_frozen && filters.is_frozen !== "all"),
        )
      : reduxHasActiveFilters;

  const handleSearchChange = (term: string) => {
    if (onSearchChange) {
      onSearchChange(term);
    } else {
      dispatch(setWalletsSearchTerm(term));
    }
  };

  const handleOpenFilterDialog = () => {
    dispatch(openWalletsFilterDialog());
  };

  const handleRemoveFilter = (key: keyof WalletFilterValues) => {
    const updated = { ...currentFilters };
    if (key === "user") {
      delete updated.user;
      delete updated.userObject;
    } else {
      delete updated[key];
    }

    if (onFilterChange) {
      onFilterChange(updated);
    } else {
      dispatch(setWalletsFilters(updated));
    }
  };

  const handleResetAllFilters = () => {
    if (onFilterChange) {
      onFilterChange({});
    } else {
      dispatch(resetWalletsFilters());
    }
  };

  return (
    <>
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
        <Box
          sx={{ display: "flex", gap: 1.5, alignItems: "center", flexWrap: "wrap", flexGrow: 1 }}
        >
          {/* Search Field */}
          <TextField
            size="small"
            placeholder="جستجوی کاربر یا کد ارز..."
            value={currentSearchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
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

          {/* Filter Dialog Trigger Button */}
          <Tooltip title="فیلتر پیشرفته کیف پول‌ها">
            <IconButton
              onClick={handleOpenFilterDialog}
              sx={{
                bgcolor: hasActiveFilters
                  ? alpha(theme.palette.primary.main, 0.15)
                  : "background.paper",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: 1,
                p: 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: alpha(theme.palette.primary.main, 0.2),
                },
              }}
            >
              <Badge color="primary" variant="dot" invisible={!hasActiveFilters}>
                <FilterIcon color={hasActiveFilters ? "primary" : "action"} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Active Filter Chips */}
          {currentFilters.userObject && (
            <Chip
              label={`کاربر: ${currentFilters.userObject.username}`}
              color="primary"
              variant="outlined"
              size="small"
              onDelete={() => handleRemoveFilter("user")}
              deleteIcon={<CloseIcon fontSize="small" />}
              sx={{ fontWeight: 600, borderRadius: 1 }}
            />
          )}

          {currentFilters.asset && (
            <Chip
              label={`ارز: ${currentFilters.asset}`}
              color="primary"
              variant="outlined"
              size="small"
              onDelete={() => handleRemoveFilter("asset")}
              deleteIcon={<CloseIcon fontSize="small" />}
              sx={{ fontWeight: 600, borderRadius: 1 }}
            />
          )}

          {currentFilters.is_frozen && currentFilters.is_frozen !== "all" && (
            <Chip
              label={`وضعیت: ${currentFilters.is_frozen === "true" ? "فریز شده" : "فعال"}`}
              color="primary"
              variant="outlined"
              size="small"
              onDelete={() => handleRemoveFilter("is_frozen")}
              deleteIcon={<CloseIcon fontSize="small" />}
              sx={{ fontWeight: 600, borderRadius: 1 }}
            />
          )}

          {currentFilters.min_balance && (
            <Chip
              label={`حداقل موجودی: ${currentFilters.min_balance}`}
              color="primary"
              variant="outlined"
              size="small"
              onDelete={() => handleRemoveFilter("min_balance")}
              deleteIcon={<CloseIcon fontSize="small" />}
              sx={{ fontWeight: 600, borderRadius: 1 }}
            />
          )}

          {currentFilters.max_balance && (
            <Chip
              label={`حداکثر موجودی: ${currentFilters.max_balance}`}
              color="primary"
              variant="outlined"
              size="small"
              onDelete={() => handleRemoveFilter("max_balance")}
              deleteIcon={<CloseIcon fontSize="small" />}
              sx={{ fontWeight: 600, borderRadius: 1 }}
            />
          )}

          {hasActiveFilters && (
            <Button
              size="small"
              color="secondary"
              onClick={handleResetAllFilters}
              sx={{ fontSize: "0.8rem", textTransform: "none" }}
            >
              پاکسازی همه فیلترها
            </Button>
          )}
        </Box>

        {/* Right Controls */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Tooltip title="بروزرسانی لیست کیف پول‌ها">
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

      {/* Filter Dialog */}
      <WalletsFilterDialog />
    </>
  );
};
