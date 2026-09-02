import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { Cancel as RejectIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { ActionDialog } from "@/components/common/ActionDialog";
import {
  useRejectDepositRequestMutation,
  type DepositRequest,
} from "@/store/api/depositRequestsApi";
import { parseApiError } from "@/utils/apiError";

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

  const [rejectDepositRequest, { isLoading }] = useRejectDepositRequestMutation();

  const handleClose = () => {
    setReason("");
    onClose();
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!request) return;

    if (!reason.trim()) {
      toast.error("لطفاً علت رد درخواست واریز را وارد نمایید.");
      return;
    }

    try {
      await rejectDepositRequest({ uuid: request.uuid, reason: reason.trim() }).unwrap();
      toast.success("درخواست واریز رد شد.");
      handleClose();
    } catch (err: unknown) {
      const { generalError } = parseApiError(err, ["reason"], "خطا در رد درخواست واریز.");
      if (generalError) {
        toast.error(generalError);
      }
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={handleClose}
      title="رد درخواست واریز"
      icon={<RejectIcon fontSize="small" />}
      submitText="تایید و رد درخواست"
      submitColor="error"
      isLoading={isLoading}
      onSubmit={handleSubmit}
      maxWidth="sm"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {request && (
          <Box sx={{ p: 1.5, bgcolor: "action.hover", borderRadius: 1 }}>
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
                حساب مبدأ: {request.bank_account.bank_name} ({request.bank_account.account_holder})
              </Typography>
            )}
          </Box>
        )}

        <TextField
          autoFocus
          fullWidth
          size="small"
          label="علت رد درخواست (اجباری)"
          multiline
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          placeholder="دلیل عدم تایید این واریز را وارد کنید..."
        />
      </Box>
    </ActionDialog>
  );
};
