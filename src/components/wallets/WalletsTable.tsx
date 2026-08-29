import React, { useState } from "react";
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
  useTheme,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { AcUnit as FreezeIcon, LockOpen as UnfreezeIcon } from "@mui/icons-material";
import { ChevronRightIcon, ChevronLeftIcon } from "@/assets/icons";
import { useGetWalletsQuery, type Wallet } from "@/store/api/walletsApi";
import { FreezeWalletDialog } from "./FreezeWalletDialog";

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

export const WalletsTable: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  // Freeze/Unfreeze Dialog State
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [dialogMode, setDialogMode] = useState<"freeze" | "unfreeze">("freeze");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: walletsResponse,
    isLoading,
    isError,
    refetch,
  } = useGetWalletsQuery({
    page: page + 1,
    page_size: rowsPerPage,
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

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
        <CircularProgress size={48} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        action={
          <IconButton color="inherit" size="small" onClick={() => refetch()}>
            تلاش مجدد
          </IconButton>
        }
        sx={{ borderRadius: 1 }}
      >
        خطا در دریافت لیست کیف پول‌ها. لطفاً اتصال سرور و توکن دسترسی را بررسی نمایید.
      </Alert>
    );
  }

  return (
    <>
      <Card elevation={2} sx={{ overflow: "hidden" }}>
        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 800 }}>
            <TableHead sx={{ bgcolor: "action.hover" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>کاربر</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>تلفن همراه</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>دارایی (Asset)</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  موجودی در دسترس
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  موجودی مسدود شده
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  موجودی کل
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  وضعیت
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  آخرین تغییر
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wallets && wallets.length > 0 ? (
                wallets.map((wallet: Wallet) => {
                  const username = wallet.user?.username || "-";
                  const phoneNumber = wallet.user?.phone_number || "-";

                  return (
                    <TableRow key={wallet.uuid} hover>
                      {/* Username */}
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                          {username}
                        </Typography>
                      </TableCell>

                      {/* Phone Number */}
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {phoneNumber}
                        </Typography>
                      </TableCell>

                      {/* Asset */}
                      <TableCell>
                        <Chip
                          label={wallet.asset || "IRR"}
                          color="primary"
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: 700, borderRadius: 1 }}
                        />
                      </TableCell>

                      {/* Available Balance */}
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
                          {formatBalance(wallet.available_balance)}
                        </Typography>
                      </TableCell>

                      {/* Blocked Balance */}
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "warning.main" }}>
                          {formatBalance(wallet.blocked_balance)}
                        </Typography>
                      </TableCell>

                      {/* Total Balance */}
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {formatBalance(wallet.total_balance)}
                        </Typography>
                      </TableCell>

                      {/* Status Chip */}
                      <TableCell align="center">
                        <Chip
                          label={wallet.is_frozen ? "فریز شده" : "فعال"}
                          color={wallet.is_frozen ? "error" : "success"}
                          size="small"
                          sx={{ fontWeight: 600, borderRadius: 1 }}
                        />
                      </TableCell>

                      {/* Updated At */}
                      <TableCell align="center">
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(wallet.updated_at)}
                        </Typography>
                      </TableCell>

                      {/* Actions */}
                      <TableCell align="center">
                        {wallet.is_frozen ? (
                          <Tooltip title="رفع مسدودسازی (آن‌فریز)">
                            <IconButton
                              color="success"
                              size="small"
                              onClick={() => handleOpenDialog(wallet, "unfreeze")}
                              sx={{ borderRadius: 1 }}
                            >
                              <UnfreezeIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="مسدودسازی (فریز)">
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleOpenDialog(wallet, "freeze")}
                              sx={{ borderRadius: 1 }}
                            >
                              <FreezeIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">هیچ کیف پولی یافت نشد.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Integrated Table Footer / Pagination */}
        {(() => {
          const from = totalCount === 0 ? 0 : page * rowsPerPage + 1;
          const to = Math.min((page + 1) * rowsPerPage, totalCount);
          const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

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
                نمایش <b>{from}</b> تا <b>{to}</b> از <b>{totalCount}</b> کیف پول
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                  sx={{ borderRadius: 1 }}
                >
                  <ChevronRightIcon fontSize="small" />
                </IconButton>

                <Typography variant="caption" sx={{ px: 0.5, fontWeight: "bold" }}>
                  {page + 1} / {totalPages}
                </Typography>

                <IconButton
                  size="small"
                  disabled={(page + 1) * rowsPerPage >= totalCount}
                  onClick={() => setPage(page + 1)}
                  sx={{ borderRadius: 1 }}
                >
                  <ChevronLeftIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          );
        })()}
      </Card>

      {/* Freeze / Unfreeze Dialog */}
      <FreezeWalletDialog
        open={isDialogOpen}
        wallet={selectedWallet}
        mode={dialogMode}
        onClose={handleCloseDialog}
      />
    </>
  );
};
