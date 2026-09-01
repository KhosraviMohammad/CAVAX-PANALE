import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";
import { AddBox as AddIcon } from "@mui/icons-material";
import { ActionDialog } from "@/components/common/ActionDialog";
import { zodResolver, sampleFormSchema, type SampleFormData } from "@/schemas/sampleSchemas";
import type { SampleCategory } from "@/store/api/sampleApi";

interface SampleFormDialogProps {
  open: boolean;
  categories?: SampleCategory[];
  selectedCategoryId?: number;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: SampleFormData) => Promise<void>;
}

export const SampleFormDialog: React.FC<SampleFormDialogProps> = ({
  open,
  categories,
  selectedCategoryId,
  isLoading,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SampleFormData>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      category_id:
        selectedCategoryId || (categories && categories.length > 0 ? categories[0].id : 0),
      name: "",
      code: "",
      sample_type: "TYPE_A",
      unit: "",
      value: 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        category_id:
          selectedCategoryId || (categories && categories.length > 0 ? categories[0].id : 0),
        name: "",
        code: "",
        sample_type: "TYPE_A",
        unit: "",
        value: 0,
      });
    }
  }, [open, selectedCategoryId, categories, reset]);

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      title="افزودن نمونه جدید"
      icon={<AddIcon fontSize="small" />}
      submitText="ذخیره نمونه"
      submitColor="primary"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      maxWidth="md"
    >
      <Grid container spacing={2.5}>
        {/* Category & Type */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small" error={Boolean(errors.category_id)}>
                <InputLabel id="category-select-label">دسته‌بندی مربوطه</InputLabel>
                <Select
                  {...field}
                  labelId="category-select-label"
                  label="دسته‌بندی مربوطه"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  sx={{ borderRadius: 1 }}
                >
                  {categories?.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name} ({cat.code})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="sample_type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel id="type-select-label">نوع نمونه</InputLabel>
                <Select
                  {...field}
                  labelId="type-select-label"
                  label="نوع نمونه"
                  sx={{ borderRadius: 1 }}
                >
                  <MenuItem value="TYPE_A">نوع A</MenuItem>
                  <MenuItem value="TYPE_B">نوع B</MenuItem>
                  <MenuItem value="OTHER">سایر</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        {/* Name, Code, Unit */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="نام نمونه"
                placeholder="نمونه شماره ۱"
                fullWidth
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="کد شناسایی"
                placeholder="SMP_01"
                fullWidth
                error={Boolean(errors.code)}
                helperText={errors.code?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="واحد"
                placeholder="عدد، درصد، کیلوگرم"
                fullWidth
                error={Boolean(errors.unit)}
                helperText={errors.unit?.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
              />
            )}
          />
        </Grid>
      </Grid>
    </ActionDialog>
  );
};
