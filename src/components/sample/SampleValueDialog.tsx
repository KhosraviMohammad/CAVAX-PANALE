import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { ActionDialog } from "@/components/common/ActionDialog";
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

  const handleSubmit = async () => {
    if (sample) {
      await onSubmit(sample.id, Number(value));
    }
  };

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title={`تغییر مقدار نمونه (${sample?.name || ""})`}
      icon={<EditIcon fontSize="small" />}
      submitText="اعمال مقدار"
      submitColor="primary"
      isLoading={isLoading}
      onSubmit={handleSubmit}
      maxWidth="xs"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
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
        />
      </Box>
    </ActionDialog>
  );
};
