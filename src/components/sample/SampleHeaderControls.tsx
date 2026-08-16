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
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import type { SampleCategory } from "@/store/api/sampleApi";

interface SampleHeaderControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategoryId: number | "ALL";
  onCategorySelect: (categoryId: number | "ALL") => void;
  categories?: SampleCategory[];
  onRefresh: () => void;
  onAddSampleClick: () => void;
}

export const SampleHeaderControls: React.FC<SampleHeaderControlsProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategoryId,
  onCategorySelect,
  categories,
  onRefresh,
  onAddSampleClick,
}) => {
  const theme = useTheme();
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null);
  };

  const handleSelectCategory = (categoryId: number | "ALL") => {
    onCategorySelect(categoryId);
    handleCloseFilterMenu();
  };

  const selectedCategoryObj = categories?.find((c) => c.id === selectedCategoryId);

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
          placeholder="جستجوی نمونه یا کد..."
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
            width: { xs: "100%", sm: 280 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 1,
              bgcolor: "background.paper",
            },
          }}
        />

        {/* Filter Icon Button */}
        <Tooltip title="فیلتر بر اساس دسته‌بندی">
          <IconButton
            onClick={handleOpenFilterMenu}
            sx={{
              bgcolor:
                selectedCategoryId !== "ALL"
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
            <Badge color="primary" variant="dot" invisible={selectedCategoryId === "ALL"}>
              <FilterIcon color={selectedCategoryId !== "ALL" ? "primary" : "action"} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Category Filter Dropdown Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleCloseFilterMenu}
          slotProps={{
            paper: {
              elevation: 3,
              sx: { borderRadius: 1, minWidth: 220, mt: 1, p: 0.5 },
            },
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ px: 2, py: 1, display: "block", fontWeight: 700 }}
          >
            فیلتر بر اساس دسته‌بندی
          </Typography>
          <Divider sx={{ mb: 0.5 }} />
          <MenuItem
            selected={selectedCategoryId === "ALL"}
            onClick={() => handleSelectCategory("ALL")}
            sx={{ borderRadius: 1, my: 0.2 }}
          >
            <ListItemText primary="همه دسته‌ها" />
            {selectedCategoryId === "ALL" && <CheckIcon fontSize="small" color="primary" />}
          </MenuItem>
          {categories?.map((cat) => (
            <MenuItem
              key={cat.id}
              selected={selectedCategoryId === cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              sx={{ borderRadius: 1, my: 0.2 }}
            >
              <ListItemText primary={`${cat.name} (${cat.code})`} />
              {selectedCategoryId === cat.id && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          ))}
        </Menu>

        {/* Active Filter Chip */}
        {selectedCategoryId !== "ALL" && selectedCategoryObj && (
          <Chip
            label={`دسته: ${selectedCategoryObj.name}`}
            color="primary"
            variant="outlined"
            size="small"
            onDelete={() => handleSelectCategory("ALL")}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ fontWeight: 600, borderRadius: 1 }}
          />
        )}
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Tooltip title="بروزرسانی داده‌ها">
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

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddSampleClick}
          sx={{
            borderRadius: 1,
            px: 2.5,
            py: 0.9,
            fontWeight: "bold",
          }}
        >
          افزودن نمونه جدید
        </Button>
      </Box>
    </Paper>
  );
};
