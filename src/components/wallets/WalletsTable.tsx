import React, { useState, useMemo } from "react";
import { Box, Typography, Chip, IconButton, Tooltip, alpha } from "@mui/material";
import { useSelector } from "react-redux";
import {
  AcUnit as FreezeIcon,
  LockOpen as UnfreezeIcon,
  Tune as AdjustIcon,
} from "@mui/icons-material";
import { useGetWalletsQuery, type Wallet } from "@/store/api/walletsApi";
import { DataTable, type Column } from "@/components/common/DataTable";
import { FreezeWalletDialog } from "./FreezeWalletDialog";
import { AdjustWalletDialog } from "./AdjustWalletDialog";
import { type WalletFilterValues } from "./WalletsFilterDialog";
import {
  selectWalletsSearchTerm,
  selectWalletsFilters,
} from "@/store/selectors/walletsUiSelectors";

interface WalletsTableProps {
  searchTerm?: string;
  filters?: WalletFilterValues;
}

const formatBalance = (val: string | number) => {
  if (val === undefined || val === null || val === "") return "0";
  const num = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(num)) return String(val);
  return num.toLocaleString("fa-IR", { maximumFractionDigits: 8 });
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

export const WalletsTable: React.FC<WalletsTableProps> = ({ searchTerm, filters }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  // Read search term & filters from Redux with props fallback
  const reduxSearchTerm = useSelector(selectWalletsSearchTerm);
  const reduxFilters = useSelector(selectWalletsFilters);

  const activeSearchTerm = searchTerm !== undefined ? searchTerm : reduxSearchTerm;
  const activeFilters = filters !== undefined ? filters : reduxFilters;

  // Freeze/Unfreeze Dialog State
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [dialogMode, setDialogMode] = useState<"freeze" | "unfreeze">("freeze");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Adjust Wallet Dialog State
  const [adjustWalletItem, setAdjustWalletItem] = useState<Wallet | null>(null);
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);

  const {
    data: walletsResponse,
    isLoading,
    isError,
  } = useGetWalletsQuery({
    page: page + 1,
    page_size: rowsPerPage,
    search: activeSearchTerm,
    user: activeFilters?.user,
    asset: activeFilters?.asset,
    min_balance: activeFilters?.min_balance,
    max_balance: activeFilters?.max_balance,
    is_frozen: activeFilters?.is_frozen,
  });

  const wallets = walletsResponse?.results || [];
  const totalCount = walletsResponse?.count || wallets.length;

  const handleOpenDialog = (wallet: Wallet, mode: "freeze" | "unfreeze") => {
    setSelectedWallet(wallet);
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedWallet(null);
  };

  const handleOpenAdjustDialog = (wallet: Wallet) => {
    setAdjustWalletItem(wallet);
    setIsAdjustDialogOpen(true);
  };

  const handleCloseAdjustDialog = () => {
    setIsAdjustDialogOpen(false);
    setAdjustWalletItem(null);
  };

  const columns = useMemo<Column<Wallet>[]>(
    () => [
      {
        id: "user",
        label: "کاربر",
        render: (wallet) => (
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {wallet.user?.username || "-"}
          </Typography>
        ),
      },
      {
        id: "phone_number",
        label: "تلفن همراه",
        render: (wallet) => (
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {wallet.user?.phone_number || "-"}
          </Typography>
        ),
      },
      {
        id: "asset",
        label: "دارایی (Asset)",
        render: (wallet) => (
          <Chip
            label={wallet.asset || "IRT"}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ fontWeight: 700, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "available_balance",
        label: "موجودی در دسترس",
        align: "right",
        render: (wallet) => (
          <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
            {formatBalance(wallet.available_balance)}
          </Typography>
        ),
      },
      {
        id: "blocked_balance",
        label: "موجودی مسدود شده",
        align: "right",
        render: (wallet) => (
          <Typography variant="body2" sx={{ fontWeight: 600, color: "warning.main" }}>
            {formatBalance(wallet.blocked_balance)}
          </Typography>
        ),
      },
      {
        id: "total_balance",
        label: "موجودی کل",
        align: "right",
        render: (wallet) => (
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {formatBalance(wallet.total_balance)}
          </Typography>
        ),
      },
      {
        id: "status",
        label: "وضعیت",
        align: "center",
        render: (wallet) => (
          <Chip
            label={wallet.is_frozen ? "فریز شده" : "فعال"}
            color={wallet.is_frozen ? "error" : "success"}
            size="small"
            sx={{ fontWeight: 600, borderRadius: "6px" }}
          />
        ),
      },
      {
        id: "updated_at",
        label: "آخرین تغییر",
        align: "center",
        render: (wallet) => (
          <Typography variant="caption" color="text.secondary">
            {formatDate(wallet.updated_at)}
          </Typography>
        ),
      },
      {
        id: "actions",
        label: "عملیات",
        align: "center",
        render: (wallet) => (
          <Box sx={{ display: "flex", justifyContent: "center", gap: 0.75 }}>
            <Tooltip title="تعدیل دستی موجودی (افزایش / کاهش)" arrow>
              <IconButton
                size="small"
                onClick={() => handleOpenAdjustDialog(wallet)}
                sx={{
                  borderRadius: "8px",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  color: "primary.main",
                  "&:hover": {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <AdjustIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {wallet.is_frozen ? (
              <Tooltip title="رفع مسدودسازی (آن‌فریز)" arrow>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(wallet, "unfreeze")}
                  sx={{
                    borderRadius: "8px",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    color: "success.main",
                    "&:hover": {
                      backgroundColor: (theme) => alpha(theme.palette.success.main, 0.08),
                    },
                  }}
                >
                  <UnfreezeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="مسدودسازی (فریز)" arrow>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(wallet, "freeze")}
                  sx={{
                    borderRadius: "8px",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    color: "error.main",
                    "&:hover": {
                      backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
                    },
                  }}
                >
                  <FreezeIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={wallets}
        keyExtractor={(wallet) => wallet.uuid}
        isLoading={isLoading}
        isError={isError}
        errorMessage="خطا در دریافت لیست کیف پول‌ها. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید."
        emptyMessage="هیچ کیف پولی یافت نشد."
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={setPage}
        itemLabel="کیف پول"
      />

      {/* Freeze / Unfreeze Dialog */}
      <FreezeWalletDialog
        open={isDialogOpen}
        wallet={selectedWallet}
        mode={dialogMode}
        onClose={handleCloseDialog}
      />

      {/* Adjust Wallet Balance Dialog */}
      <AdjustWalletDialog
        open={isAdjustDialogOpen}
        wallet={adjustWalletItem}
        onClose={handleCloseAdjustDialog}
      />
    </>
  );
};

export default WalletsTable;
