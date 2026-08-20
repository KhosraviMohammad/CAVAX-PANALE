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
import { useDispatch } from "react-redux";

import { openUserForm } from "@/store/actions";
import {
  SearchIcon,
  FilterListIcon as FilterIcon,
  CheckIcon,
  CloseIcon,
  RefreshIcon,
  AddIcon,
} from "@/assets/icons";

export type UserStatusFilter = "ALL" | "ACTIVE" | "ADMIN" | "VERIFIED";

export const UsersHeaderControls: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatusFilter>("ALL");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null);
  };

  const handleSelectStatus = (status: UserStatusFilter) => {
    setStatusFilter(status);
    handleCloseFilterMenu();
  };

  const statusLabels: Record<UserStatusFilter, string> = {
    ALL: "همه کاربران",
    ACTIVE: "کاربران فعال",
    ADMIN: "مدیران سیستم",
    VERIFIED: "کاربران تایید شده",
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
          placeholder="جستجوی نام، تلفن، کدملی یا ایمیل..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Filter Icon Button */}
        <Tooltip title="فیلتر بر اساس وضعیت کاربر">
          <IconButton
            onClick={handleOpenFilterMenu}
            sx={{
              bgcolor:
                statusFilter !== "ALL"
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
            <Badge color="primary" variant="dot" invisible={statusFilter === "ALL"}>
              <FilterIcon color={statusFilter !== "ALL" ? "primary" : "action"} />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Status Filter Dropdown Menu */}
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
            فیلتر بر اساس وضعیت
          </Typography>
          <Divider sx={{ mb: 0.5 }} />
          {(["ALL", "ACTIVE", "ADMIN", "VERIFIED"] as UserStatusFilter[]).map((status) => (
            <MenuItem
              key={status}
              selected={statusFilter === status}
              onClick={() => handleSelectStatus(status)}
              sx={{ borderRadius: 1, my: 0.2 }}
            >
              <ListItemText primary={statusLabels[status]} />
              {statusFilter === status && <CheckIcon fontSize="small" color="primary" />}
            </MenuItem>
          ))}
        </Menu>

        {/* Active Filter Chip */}
        {statusFilter !== "ALL" && (
          <Chip
            label={`وضعیت: ${statusLabels[statusFilter]}`}
            color="primary"
            variant="outlined"
            size="small"
            onDelete={() => handleSelectStatus("ALL")}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ fontWeight: 600, borderRadius: 1 }}
          />
        )}
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
        <Tooltip title="بروزرسانی لیست کاربران">
          <IconButton
            onClick={() => {}}
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
          onClick={() => dispatch(openUserForm())}
        >
          افزودن کاربر جدید
        </Button>
      </Box>
    </Paper>
  );
};
