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
  useRejectDepositRequestMutation,
  type DepositRequest,
} from "@/store/api/depositRequestsApi";

interface RejectDepositDialogProps {
  open: boolean;
  request: DepositRequest | null;
  onClose: () => void;
}

export const RejectDepositDialog: React.FC<RejectDepositDialogProps> = ({
  open,
  request,
  onClose,
}) => {
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [rejectDepositRequest, { isLoading }] = useRejectDepositRequestMutation();

  const handleClose = () => {
    setReason("");
    setErrorMessage(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    if (!reason.trim()) {
      setErrorMessage("لطفاً علت رد درخواست واریز را وارد نمایید.");
      return;
    }

    setErrorMessage(null);
    try {
      await rejectDepositRequest({ uuid: request.uuid, reason: reason.trim() }).unwrap();
      handleClose();
    } catch (err: unknown) {
      const errorData = err as { data?: { reason?: string[]; detail?: string; message?: string } };
      const msg =
        errorData?.data?.reason?.[0] ||
        errorData?.data?.detail ||
        errorData?.data?.message ||
        "خطا در رد درخواست واریز.";
      setErrorMessage(msg);
    }
  };

  return (
    <Dialog open={open} onClose={isLoading ? undefined : handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "error.main" }}>رد درخواست واریز</DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {errorMessage}
            </Alert>
          )}

          <Alert severity="warning" sx={{ mb: 2, borderRadius: 1 }}>
            آیا از رد این درخواست واریز اطمینان دارید؟ علت رد برای کاربر جهت اطلاع‌رسانی ثبت خواهد
            شد.
          </Alert>

          {request && (
            <Box sx={{ mb: 2, p: 1.5, bgcolor: "action.hover", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                کد پیگیری: <b>{request.tracking_id || request.uuid}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                دارایی: <b>{request.asset}</b> | مبلغ: <b>{request.amount}</b>
              </Typography>
              {request.bank_account && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  حساب مبدأ: {request.bank_account.bank_name} ({request.bank_account.account_holder}
                  )
                </Typography>
              )}
            </Box>
          )}

          <TextField
            autoFocus
            fullWidth
            label="علت رد درخواست (اجباری)"
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            placeholder="دلیل عدم تایید این واریز را وارد کنید (مانند عدم تطابق فیش، عدم واریز به حساب و...)"
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
            color="error"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            تایید و رد درخواست
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
