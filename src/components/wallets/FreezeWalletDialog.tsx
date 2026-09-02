import React, { useState } from "react";
import { TextField, Box, Alert } from "@mui/material";
import { AcUnit as FreezeIcon, LockOpen as UnfreezeIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { ActionDialog } from "@/components/common/ActionDialog";
import {
  useFreezeWalletMutation,
  useUnfreezeWalletMutation,
  type Wallet,
} from "@/store/api/walletsApi";
import { parseApiError } from "@/utils/apiError";

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

  const [freezeWallet, { isLoading: isFreezing }] = useFreezeWalletMutation();
  const [unfreezeWallet, { isLoading: isUnfreezing }] = useUnfreezeWalletMutation();

  const isLoading = isFreezing || isUnfreezing;
  const isFreeze = mode === "freeze";

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!wallet) return;

    if (isFreeze && !reason.trim()) {
      toast.error("لطفاً دلیل مسدودسازی را وارد نمایید.");
      return;
    }

    try {
      if (isFreeze) {
        await freezeWallet({ uuid: wallet.uuid, reason: reason.trim() }).unwrap();
        toast.success("کیف پول با موفقیت مسدود شد.");
      } else {
        await unfreezeWallet({ uuid: wallet.uuid, reason: reason.trim() }).unwrap();
        toast.success("رفع مسدودسازی کیف پول با موفقیت انجام شد.");
      }
      handleClose();
    } catch (err: unknown) {
      const fallbackMsg = isFreeze ? "خطا در فریز کردن کیف پول." : "خطا در رفع فریز کیف پول.";
      const { generalError } = parseApiError(err, ["reason"], fallbackMsg);
      if (generalError) {
        toast.error(generalError);
      }
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={handleClose}
      title={isFreeze ? "مسدودسازی (فریز) کیف پول" : "رفع مسدودسازی (آن‌فریز) کیف پول"}
      icon={isFreeze ? <FreezeIcon fontSize="small" /> : <UnfreezeIcon fontSize="small" />}
      submitText={isFreeze ? "تایید و مسدودسازی" : "تایید و رفع مسدودسازی"}
      submitColor={isFreeze ? "error" : "success"}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      maxWidth="sm"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Alert severity={isFreeze ? "warning" : "info"} sx={{ borderRadius: 1 }}>
          {isFreeze
            ? "با فریز کردن این کیف پول، تراکنش‌های خروجی (برداشت و هولدهای جدید) متوقف می‌شوند. واریزها و تسویه‌های قبلی همچنان انجام خواهند شد."
            : "با آن‌فریز کردن، محدودیت‌های خروجی وجه از این کیف پول برداشته خواهد شد."}
        </Alert>

        <TextField
          autoFocus
          fullWidth
          size="small"
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
        />
      </Box>
    </ActionDialog>
  );
};
