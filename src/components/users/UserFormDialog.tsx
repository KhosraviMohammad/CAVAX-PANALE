import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  FormHelperText,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { selectIsUserFormOpen, selectEditingUserUuid } from "@/store/selectors";
import { closeUserForm } from "@/store/actions";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByUuidQuery,
} from "@/store/api/usersApi";
import { createUserSchema, type CreateUserFormData, zodResolver } from "@/schemas/userSchemas";

export const UserFormDialog: React.FC = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectIsUserFormOpen);
  const editingUserUuid = useSelector(selectEditingUserUuid);

  const isEditMode = Boolean(editingUserUuid);

  // Fetch details if in edit mode
  const { data: userDetails, isLoading: isLoadingDetails } = useGetUserByUuidQuery(
    editingUserUuid || "",
    { skip: !editingUserUuid },
  );

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const isLoadingSubmit = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      phone_number: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      gender: "male",
      address: "",
      national_code: "",
      password: "",
      is_active: true,
      verified: true,
      is_admin: false,
    },
  });

  // Populate form fields on edit mode or reset on create mode
  useEffect(() => {
    if (isEditMode && userDetails) {
      reset({
        phone_number: userDetails.phone_number || "",
        username: userDetails.username || "",
        first_name: userDetails.profile?.first_name || "",
        last_name: userDetails.profile?.last_name || "",
        email: userDetails.profile?.email || "",
        gender: userDetails.profile?.gender || "male",
        address: userDetails.profile?.address || "",
        national_code: userDetails.profile?.national_code || "",
        password: "",
        is_active: Boolean(userDetails.is_active),
        verified: Boolean(userDetails.verified),
        is_admin: Boolean(userDetails.is_admin),
      });
    } else if (!isEditMode) {
      reset({
        phone_number: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        gender: "male",
        address: "",
        national_code: "",
        password: "",
        is_active: true,
        verified: true,
        is_admin: false,
      });
    }
  }, [isEditMode, userDetails, reset]);

  const handleFormSubmit = async (formData: CreateUserFormData) => {
    try {
      if (isEditMode && editingUserUuid) {
        const payload: Partial<CreateUserFormData> = { ...formData };
        if (!payload.password) {
          delete payload.password;
        }
        await updateUser({ uuid: editingUserUuid, body: payload }).unwrap();
        toast.success("اطلاعات کاربر با موفقیت به‌روزرسانی شد");
      } else {
        await createUser(formData).unwrap();
        toast.success("کاربر جدید با موفقیت ایجاد شد");
      }
      reset();
      dispatch(closeUserForm());
    } catch (err: unknown) {
      console.error("Failed to submit user form:", err);
      const errorData = (err as { data?: Record<string, unknown> })?.data;

      if (errorData && typeof errorData === "object") {
        let hasFieldError = false;

        Object.entries(errorData).forEach(([field, messages]) => {
          let msg = "";
          if (Array.isArray(messages)) {
            msg = messages.join(" ");
          } else if (typeof messages === "object" && messages !== null) {
            msg = Object.values(messages).join(" ");
          } else if (typeof messages === "string") {
            msg = messages;
          }

          if (msg && field in formData) {
            hasFieldError = true;
            setError(field as keyof CreateUserFormData, {
              type: "server",
              message: msg,
            });
          }
        });

        if (!hasFieldError) {
          const generalMsg =
            (errorData.detail as string) ||
            (errorData.message as string) ||
            (Array.isArray(errorData.non_field_errors)
              ? errorData.non_field_errors.join(" ")
              : "") ||
            (isEditMode ? "خطا در بروزرسانی کاربر" : "خطا در ایجاد کاربر جدید");
          toast.error(generalMsg);
        } else {
          toast.error("لطفاً خطاهای مشخص‌شده در فرم را اصلاح نمایید");
        }
      } else {
        toast.error("خطا در ارتباط با سرور");
      }
    }
  };

  const handleClose = () => {
    reset();
    dispatch(closeUserForm());
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <DialogContent dividers>
          {isEditMode && isLoadingDetails ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress size={36} />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {/* Username */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="نام کاربری"
                  {...register("username")}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>

              {/* Phone Number */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="شماره تلفن"
                  {...register("phone_number")}
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                />
              </Grid>

              {/* First Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="نام"
                  {...register("first_name")}
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message}
                />
              </Grid>

              {/* Last Name */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="نام خانوادگی"
                  {...register("last_name")}
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message}
                />
              </Grid>

              {/* Password */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="password"
                  label={isEditMode ? "رمز عبور جدید (اختیاری)" : "رمز عبور"}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={
                    errors.password?.message ||
                    (isEditMode ? "در صورت عدم نیاز به تغییر خالی بگذارید" : undefined)
                  }
                />
              </Grid>

              {/* National Code */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="کد ملی"
                  {...register("national_code")}
                  error={!!errors.national_code}
                  helperText={errors.national_code?.message}
                />
              </Grid>

              {/* Email */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="email"
                  label="ایمیل"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              {/* Gender Select */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.gender}>
                      <InputLabel id="gender-select-label">جنسیت</InputLabel>
                      <Select {...field} labelId="gender-select-label" label="جنسیت">
                        <MenuItem value="male">مرد</MenuItem>
                        <MenuItem value="female">زن</MenuItem>
                        <MenuItem value="other">سایر</MenuItem>
                      </Select>
                      {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Address */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="آدرس"
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>

              {/* Checkboxes */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="حساب فعال باشد"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="verified"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="احراز هویت شده"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Controller
                  name="is_admin"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox {...field} checked={field.value} />}
                      label="دسترسی مدیر"
                    />
                  )}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} disabled={isLoadingSubmit}>
            انصراف
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isLoadingSubmit}>
            {isLoadingSubmit ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditMode ? (
              "ذخیره تغییرات"
            ) : (
              "ثبت کاربر"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
