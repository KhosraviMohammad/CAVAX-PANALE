import React, { useEffect } from "react";
import {
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Box,
} from "@mui/material";
import { Tune as AdjustIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { ActionDialog } from "@/components/common/ActionDialog";
import { useAdjustWalletMutation, type Wallet } from "@/store/api/walletsApi";
import {
  adjustWalletSchema,
  type AdjustWalletFormData,
  zodResolver,
} from "@/schemas/walletSchemas";

interface AdjustWalletDialogProps {
  open: boolean;
  wallet: Wallet | null;
  onClose: () => void;
}

export const AdjustWalletDialog: React.FC<AdjustWalletDialogProps> = ({
  open,
  wallet,
  onClose,
}) => {
  const [adjustWallet, { isLoading }] = useAdjustWalletMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AdjustWalletFormData>({
    resolver: zodResolver(adjustWalletSchema),
    defaultValues: {
      direction: "credit",
      amount: "",
      reason: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        direction: "credit",
        amount: "",
        reason: "",
      });
    }
  }, [open, reset]);

  const handleClose = () => {
    reset({
      direction: "credit",
      amount: "",
      reason: "",
    });
    onClose();
  };

  const onSubmit = async (data: AdjustWalletFormData) => {
    if (!wallet) return;

    try {
      await adjustWallet({
        uuid: wallet.uuid,
        direction: data.direction,
        amount: data.amount.trim(),
        reason: data.reason.trim(),
      }).unwrap();

      toast.success("تعدیل موجودی با موفقیت ثبت شد.");
      handleClose();
    } catch (err: unknown) {
      const errorData = err as {
        data?: {
          reason?: string[];
          amount?: string[];
          detail?: string;
          message?: string;
          non_field_errors?: string[];
        };
      };

      const msg =
        errorData?.data?.detail ||
        errorData?.data?.message ||
        errorData?.data?.reason?.[0] ||
        errorData?.data?.amount?.[0] ||
        errorData?.data?.non_field_errors?.[0] ||
        "خطا در ثبت تعدیل موجودی. لطفاً مطمئن شوید کیف پول مسدود نیست و موجودی کافی است.";

      toast.error(msg);
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={handleClose}
      title="تعدیل دستی موجودی کیف پول"
      icon={<AdjustIcon fontSize="small" />}
      submitText="تایید و ثبت تعدیل"
      submitColor="primary"
      submitDisabled={Boolean(wallet?.is_frozen)}
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="sm"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {wallet && (
          <Paper variant="outlined" sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
              کاربر: {wallet.user?.username} ({wallet.user?.phone_number || "-"})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              دارایی: <b>{wallet.asset}</b> | موجودی در دسترس: <b>{wallet.available_balance}</b> |
              موجودی کل: <b>{wallet.total_balance}</b>
            </Typography>
          </Paper>
        )}

        {/* Direction Select */}
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ fontWeight: 700, mb: 1, fontSize: "0.875rem" }}>
            نوع تعدیل
          </FormLabel>
          <Controller
            name="direction"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel
                  value="credit"
                  control={<Radio color="success" />}
                  label="افزایش موجودی"
                />
                <FormControlLabel
                  value="debit"
                  control={<Radio color="error" />}
                  label="کاهش موجودی"
                />
              </RadioGroup>
            )}
          />
        </FormControl>

        {/* Amount Field */}
        <TextField
          fullWidth
          size="small"
          label="مبلغ تعدیل"
          type="number"
          {...register("amount")}
          error={!!errors.amount}
          helperText={errors.amount?.message}
          placeholder="مثلاً 100000"
          slotProps={{
            htmlInput: { min: 0, step: "any" },
          }}
        />

        {/* Reason Field */}
        <TextField
          fullWidth
          size="small"
          label="دلیل تعدیل"
          multiline
          rows={3}
          {...register("reason")}
          error={!!errors.reason}
          helperText={errors.reason?.message}
          placeholder="علت تعدیل یا جبران موجودی را به طور کامل توضیح دهید..."
        />
      </Box>
    </ActionDialog>
  );
};
