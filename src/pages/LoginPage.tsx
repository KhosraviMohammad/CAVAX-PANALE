import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  useTheme,
  Container,
} from "@mui/material";
import {
  PersonIcon,
  LockIcon,
  VisibilityIcon as Visibility,
  VisibilityOffIcon as VisibilityOff,
  AdminPanelSettingsIcon as AdminIcon,
} from "@/assets/icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAdminLoginMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/actions";
import { loginFormSchema, type LoginFormData, zodResolver } from "@/schemas/authSchemas";

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await adminLogin(data).unwrap();
      dispatch(
        setCredentials({
          user: response.user,
          access: response.access,
          refresh: response.refresh,
        }),
      );
      toast.success("ورود با موفقیت انجام شد");
      navigate("/", { replace: true });
    } catch (err: unknown) {
      console.error("Login error:", err);
      const errorMsg =
        (err as { data?: { detail?: string; message?: string } })?.data?.detail ||
        (err as { data?: { detail?: string; message?: string } })?.data?.message ||
        "نام کاربری یا رمز عبور اشتباه است";
      toast.error(errorMsg);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 50% 30%, ${theme.palette.primary.main}25 0%, ${theme.palette.background.default} 70%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Ambient Glow Objects */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.primary.main}30 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.palette.secondary.main}30 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <Container maxWidth="xs" sx={{ zIndex: 1, p: 2 }}>
        <Card
          elevation={12}
          sx={{
            overflow: "hidden",
          }}
        >
          {/* Top Decorative Line */}
          <Box
            sx={{
              height: 4,
              width: "100%",
            }}
          />

          <CardContent sx={{ p: 4 }}>
            {/* Header Icon & Title */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  color: "#fff",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                  mb: 2,
                }}
              >
                <AdminIcon sx={{ fontSize: 36 }} />
              </Box>
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  color: theme.palette.text.primary,
                  mb: 0.5,
                }}
              >
                ورود به پنل مدیریت
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  textAlign: "center",
                }}
              >
                لطفاً اطلاعات حساب مدیریتی خود را وارد کنید
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="نام کاربری"
                autoComplete="username"
                autoFocus
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color={errors.username ? "error" : "action"} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  mb: 2,
                }}
              />

              <TextField
                margin="normal"
                fullWidth
                id="password"
                label="رمز عبور"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color={errors.password ? "error" : "action"} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  mb: 3,
                }}
              />

              <Button type="submit" fullWidth variant="contained" disabled={isLoading}>
                {isLoading ? <CircularProgress size={26} color="inherit" /> : "ورود به سیستم"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
