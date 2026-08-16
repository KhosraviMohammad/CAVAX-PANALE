import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import type { Sample } from "@/store/api/sampleApi";

interface SampleValueDialogProps {
  open: boolean;
  sample: Sample | null;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (sampleId: number, value: number) => Promise<void>;
}

export const SampleValueDialog: React.FC<SampleValueDialogProps> = ({
  open,
  sample,
  isLoading,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState<number>(0);
  const [prevSample, setPrevSample] = useState<Sample | null>(null);

  if (sample !== prevSample) {
    setPrevSample(sample);
    setValue(sample ? sample.value : 0);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sample) {
      await onSubmit(sample.id, Number(value));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: { borderRadius: 1 } } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
          تغییر مقدار نمونه ({sample?.name})
        </DialogTitle>
        <DialogContent dividers sx={{ p: 2.5 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            کد شناسایی: <b>{sample?.code}</b> | دسته: <b>{sample?.category_name}</b>
          </Typography>
          <TextField
            size="small"
            label={`مقدار جدید (${sample?.unit || "عددی"})`}
            type="number"
            fullWidth
            required
            autoFocus
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} color="inherit" sx={{ borderRadius: 1 }}>
            انصراف
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ borderRadius: 1, px: 2.5, fontWeight: "bold" }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "اعمال مقدار"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
