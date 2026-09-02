import React, { useEffect } from "react";
import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  CircularProgress,
  FormHelperText,
  Box,
} from "@mui/material";
import { PersonAdd as UserIcon } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ActionDialog } from "@/components/common/ActionDialog";
import { selectIsUserFormOpen, selectEditingUserUuid } from "@/store/selectors";
import { closeUserForm } from "@/store/actions";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUserByUuidQuery,
} from "@/store/api/usersApi";
import { createUserSchema, type CreateUserFormData, zodResolver } from "@/schemas/userSchemas";
import { parseApiError } from "@/utils/apiError";

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
      national_code: "",
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
        national_code: userDetails.profile?.national_code || "",
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
        national_code: "",
        is_active: true,
        verified: true,
        is_admin: false,
      });
    }
  }, [isEditMode, userDetails, reset]);

  const handleFormSubmit = async (formData: CreateUserFormData) => {
    try {
      if (isEditMode && editingUserUuid) {
        await updateUser({ uuid: editingUserUuid, body: formData }).unwrap();
        toast.success("اطلاعات کاربر با موفقیت به‌روزرسانی شد");
      } else {
        await createUser(formData).unwrap();
        toast.success("کاربر جدید با موفقیت ایجاد شد");
      }
      reset();
      dispatch(closeUserForm());
    } catch (err: unknown) {
      const knownFormFields = Object.keys(formData);

      const { fieldErrors, generalError } = parseApiError(err, knownFormFields);

      // Set field errors on matching form fields
      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof CreateUserFormData, {
          type: "server",
          message,
        });
      });

      // Notify general / non-field error using react-toastify
      if (generalError) {
        toast.error(generalError);
      }
    }
  };

  const handleClose = () => {
    reset();
    dispatch(closeUserForm());
  };

  return (
    <ActionDialog
      open={open}
      onClose={handleClose}
      title={isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      icon={<UserIcon fontSize="small" />}
      submitText={isEditMode ? "ذخیره تغییرات" : "ثبت کاربر"}
      submitColor="primary"
      isLoading={isLoadingSubmit}
      onSubmit={handleSubmit(handleFormSubmit)}
      maxWidth="md"
    >
      {isEditMode && isLoadingDetails ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress size={36} />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* Username */}
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="نام کاربری"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
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
                  </Select>
                  {errors.gender && <FormHelperText>{errors.gender.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          {/* Switch Toggle Options */}
          <Grid size={{ xs: 12, sm: 4 }}>
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  }
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
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  }
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
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="دسترسی مدیر"
                />
              )}
            />
          </Grid>
        </Grid>
      )}
    </ActionDialog>
  );
};
