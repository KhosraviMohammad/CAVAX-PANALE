import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Typography,
  IconButton,
  Grid,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { Close as CloseIcon, FilterList as FilterIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery, type User } from "@/store/api/usersApi";
import {
  selectIsWalletsFilterDialogOpen,
  selectWalletsFilters,
} from "@/store/selectors/walletsUiSelectors";
import {
  closeWalletsFilterDialog,
  setWalletsFilters,
  resetWalletsFilters,
} from "@/store/actions/walletsUiActions";

export interface WalletFilterValues {
  user?: string;
  userObject?: User | null;
  asset?: string;
  min_balance?: string;
  max_balance?: string;
  is_frozen?: string; // "all" | "true" | "false"
}

export const WalletsFilterDialog: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isDialogOpen = useSelector(selectIsWalletsFilterDialogOpen);
  const currentFilters = useSelector(selectWalletsFilters);

  const [userSearch, setUserSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(currentFilters.userObject || null);
  const [asset, setAsset] = useState(currentFilters.asset || "all");
  const [minBalance, setMinBalance] = useState(currentFilters.min_balance || "");
  const [maxBalance, setMaxBalance] = useState(currentFilters.max_balance || "");
  const [isFrozen, setIsFrozen] = useState(currentFilters.is_frozen || "all");

  // Fetch users from API for autocomplete
  const { data: usersData, isLoading: isUsersLoading } = useGetUsersQuery({
    search: userSearch,
    page_size: 50,
  });

  const usersList = usersData?.results || [];

  // Sync internal state when dialog opens or filters change in Redux
  useEffect(() => {
    if (isDialogOpen) {
      setSelectedUser(currentFilters.userObject || null);
      setAsset(currentFilters.asset || "all");
      setMinBalance(currentFilters.min_balance || "");
      setMaxBalance(currentFilters.max_balance || "");
      setIsFrozen(currentFilters.is_frozen || "all");
    }
  }, [isDialogOpen, currentFilters]);

  const handleClose = () => {
    dispatch(closeWalletsFilterDialog());
  };

  const handleApply = () => {
    const newFilters: WalletFilterValues = {
      user: selectedUser?.uuid || selectedUser?.username || undefined,
      userObject: selectedUser,
      asset: asset && asset !== "all" ? asset : undefined,
      min_balance: minBalance ? minBalance : undefined,
      max_balance: maxBalance ? maxBalance : undefined,
      is_frozen: isFrozen !== "all" ? isFrozen : undefined,
    };

    dispatch(setWalletsFilters(newFilters));
    handleClose();
  };

  const handleReset = () => {
    setSelectedUser(null);
    setAsset("all");
    setMinBalance("");
    setMaxBalance("");
    setIsFrozen("all");

    dispatch(resetWalletsFilters());
    handleClose();
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <DialogTitle
        sx={{
          m: 0,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1.5,
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FilterIcon fontSize="small" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
            فیلتر پیشرفته کیف پول‌ها
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small" sx={{ color: "text.secondary" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* Form Content */}
      <DialogContent sx={{ p: 3, bgcolor: "background.paper" }}>
        <Grid container spacing={2.5}>
          {/* User Select Autocomplete */}
          <Grid size={{ xs: 12 }}>
            <Autocomplete
              options={usersList}
              loading={isUsersLoading}
              value={selectedUser}
              onChange={(_, newValue) => setSelectedUser(newValue)}
              onInputChange={(_, newInputValue) => setUserSearch(newInputValue)}
              getOptionLabel={(option) => {
                if (typeof option === "string") return option;
                if (!option) return "";
                const name = [option.first_name, option.last_name].filter(Boolean).join(" ");
                return `${option.username || ""}${name ? ` (${name})` : ""}${
                  option.phone_number ? ` - ${option.phone_number}` : ""
                }`;
              }}
              isOptionEqualToValue={(option, value) =>
                Boolean(option && value && option.uuid === value.uuid)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="انتخاب کاربر"
                  placeholder="نام‌کاربری، شماره تلفن یا نام..."
                  fullWidth
                  slotProps={{
                    ...params.slotProps,
                    input: {
                      ...params.slotProps.input,
                      endAdornment: (
                        <>
                          {isUsersLoading ? <CircularProgress color="inherit" size={18} /> : null}
                          {params.slotProps.input.endAdornment}
                        </>
                      ),
                    },
                  }}
                />
              )}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props as React.HTMLAttributes<HTMLLIElement> & {
                  key?: React.Key;
                };
                const fullName = [option.first_name, option.last_name].filter(Boolean).join(" ");
                return (
                  <Box
                    component="li"
                    key={key || option.uuid}
                    {...optionProps}
                    sx={{ borderRadius: 1, my: 0.2 }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {option.username} {fullName ? `(${fullName})` : ""}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        تلفن: {option.phone_number}
                      </Typography>
                    </Box>
                  </Box>
                );
              }}
            />
          </Grid>

          {/* Asset Select */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="asset-select-label">کد ارز / دارایی</InputLabel>
              <Select
                labelId="asset-select-label"
                label="کد ارز / دارایی"
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
              >
                <MenuItem value="all">همه ارزها</MenuItem>
                <MenuItem value="USDT">USDT (تتر)</MenuItem>
                <MenuItem value="IRT">IRT (تومان)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Is Frozen Status */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="is-frozen-status-label">وضعیت کیف پول</InputLabel>
              <Select
                labelId="is-frozen-status-label"
                label="وضعیت کیف پول"
                value={isFrozen}
                onChange={(e) => setIsFrozen(e.target.value)}
              >
                <MenuItem value="all">همه وضعیت‌ها</MenuItem>
                <MenuItem value="true">مسدود / فریز شده</MenuItem>
                <MenuItem value="false">فعال</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Min Balance */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="حداقل موجودی"
              type="number"
              placeholder="0"
              value={minBalance}
              onChange={(e) => setMinBalance(e.target.value)}
            />
          </Grid>

          {/* Max Balance */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              size="small"
              fullWidth
              label="حداکثر موجودی"
              type="number"
              placeholder="بدون محدودیت"
              value={maxBalance}
              onChange={(e) => setMaxBalance(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <Divider />

      {/* Footer Actions */}
      <DialogActions
        sx={{
          p: 2,
          justifyContent: "space-between",
          bgcolor: alpha(theme.palette.background.default, 0.5),
        }}
      >
        <Button color="inherit" onClick={handleReset} sx={{ borderRadius: 1 }}>
          پاکسازی فیلترها
        </Button>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button onClick={handleClose} color="inherit" variant="outlined" sx={{ borderRadius: 1 }}>
            انصراف
          </Button>
          <Button
            onClick={handleApply}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 1, px: 3, fontWeight: 700 }}
          >
            اعمال فیلتر
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
