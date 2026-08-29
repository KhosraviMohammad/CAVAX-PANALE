import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  useFreezeWalletMutation,
  useUnfreezeWalletMutation,
  type Wallet,
} from "@/store/api/walletsApi";

interface FreezeWalletDialogProps {
  open: boolean;
  wallet: Wallet | null;
  mode: "freeze" | "unfreeze";
  onClose: () => void;
}

export const FreezeWalletDialog: React.FC<FreezeWalletDialogProps> = ({
  open,
  wallet,
  mode,
  onClose,
}) => {
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [freezeWallet, { isLoading: isFreezing }] = useFreezeWalletMutation();
  const [unfreezeWallet, { isLoading: isUnfreezing }] = useUnfreezeWalletMutation();

  const isLoading = isFreezing || isUnfreezing;

  const handleClose = () => {
    setReason("");
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return;

    if (mode === "freeze" && !reason.trim()) {
      setErrorMessage("لطفاً دلیل مسدودسازی را وارد نمایید.");
      return;
    }

    setErrorMessage(null);
    try {
      if (mode === "freeze") {
        await freezeWallet({ uuid: wallet.uuid, reason: reason.trim() }).unwrap();
      } else {
        await unfreezeWallet({ uuid: wallet.uuid, reason: reason.trim() }).unwrap();
      }
      handleClose();
    } catch (err: unknown) {
      const errorData = err as { data?: { reason?: string[]; detail?: string; message?: string } };
      const msg =
        errorData?.data?.reason?.[0] ||
        errorData?.data?.detail ||
        errorData?.data?.message ||
        (mode === "freeze"
          ? "خطا در فریز کردن کیف پول. ممکن است کیف پول قبلاً فریز شده باشد یا دسترسی مدیر کل لازم باشد."
          : "خطا در رفع فریز کیف پول.");
      setErrorMessage(msg);
    }
  };

  const isFreeze = mode === "freeze";

  return (
    <Dialog open={open} onClose={isLoading ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>
        {isFreeze ? "مسدودسازی (فریز) کیف پول" : "رفع مسدودسازی (آن‌فریز) کیف پول"}
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {errorMessage}
            </Alert>
          )}

          <Alert severity={isFreeze ? "warning" : "info"} sx={{ mb: 2, borderRadius: 1 }}>
            {isFreeze
              ? "با فریز کردن این کیف پول، تراکنش‌های خروجی (برداشت و هولدهای جدید) متوقف می‌شوند. واریزها و تسویه‌های قبلی همچنان انجام خواهند شد."
              : "با آن‌فریز کردن، محدودیت‌های خروجی وجه از این کیف پول برداشته خواهد شد."}
          </Alert>

          {wallet && (
            <Box sx={{ mb: 2, p: 1.5, bgcolor: "action.hover", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                کاربر: {wallet.user?.username} ({wallet.user?.phone_number || "-"})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                دارایی: <b>{wallet.asset}</b> | موجودی کل: <b>{wallet.total_balance}</b>
              </Typography>
            </Box>
          )}

          <TextField
            autoFocus
            fullWidth
            label={isFreeze ? "دلیل مسدودسازی (اجباری)" : "دلیل رفع مسدودسازی (اختیاری)"}
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required={isFreeze}
            placeholder={
              isFreeze
                ? "علت مسدودسازی این کیف پول را وارد کنید..."
                : "در صورت نیاز توضیحات آن‌فریز را بنویسید..."
            }
            sx={{ mt: 1 }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} disabled={isLoading} color="inherit">
            انصراف
          </Button>
          <Button
            type="submit"
            variant="contained"
            color={isFreeze ? "error" : "success"}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isFreeze ? "تایید و مسدودسازی" : "تایید و رفع مسدودسازی"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
