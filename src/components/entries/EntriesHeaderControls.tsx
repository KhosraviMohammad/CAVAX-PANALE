import React, { useState } from "react";
import {
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
import { HeaderControlsWrapper } from "@/components/common/HeaderControlsWrapper";

export type EntryDirectionFilter = "ALL" | "debit" | "credit";

export const EntriesHeaderControls: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [directionFilter, setDirectionFilter] = useState<EntryDirectionFilter>("ALL");
  const [minAmount, setMinAmount] = useState("");

  const [directionAnchorEl, setDirectionAnchorEl] = useState<null | HTMLElement>(null);

  const directionLabels: Record<EntryDirectionFilter, string> = {
    ALL: "همه جهت‌ها",
    debit: "بدهکار (Debit)",
    credit: "بستانکار (Credit)",
  };

  const leftContent = (
    <>
      {/* Search Field */}
      <TextField
        size="small"
        placeholder="جستجوی کاربر، ارز یا نوع..."
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
        onChange={(e) => setMinAmount(e.target.value)}
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
              setDirectionFilter(dir);
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
          onDelete={() => setDirectionFilter("ALL")}
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
          onDelete={() => setMinAmount("")}
          deleteIcon={<CloseIcon fontSize="small" />}
          sx={{ fontWeight: 600, borderRadius: 1 }}
        />
      )}
    </>
  );

  const rightContent = (
    <Tooltip title="بروزرسانی لیست اسناد دفتر کل">
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
  );

  return <HeaderControlsWrapper leftContent={leftContent} rightContent={rightContent} />;
};
