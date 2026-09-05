import React from "react";
import {
  Paper,
  Box,
  Typography,
  Avatar,
  CircularProgress,
  useTheme,
  alpha,
  type SxProps,
  type Theme,
} from "@mui/material";

export type KpiCardColor = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export interface KpiCardProps {
  title: React.ReactNode;
  value: React.ReactNode;
  icon: React.ReactNode;
  color?: KpiCardColor;
  subtitle?: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  sx?: SxProps<Theme>;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  color = "primary",
  subtitle,
  onClick,
  loading = false,
  sx,
}) => {
  const theme = useTheme();
  const paletteColor = theme.palette[color] || theme.palette.primary;

  return (
    <Paper
      elevation={1}
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 2,
        cursor: onClick ? "pointer" : "default",
        background: `linear-gradient(135deg, ${alpha(paletteColor.main, 0.08)} 0%, ${alpha(
          paletteColor.main,
          0.02,
        )} 100%)`,
        border: `1px solid ${alpha(paletteColor.main, 0.15)}`,
        transition: "all 0.2s ease",
        "&:hover": onClick
          ? {
              transform: "translateY(-2px)",
              boxShadow: theme.shadows[3],
              borderColor: alpha(paletteColor.main, 0.3),
            }
          : undefined,
        ...sx,
      }}
    >
      <Avatar
        variant="square"
        sx={{
          bgcolor: paletteColor.main,
          color: paletteColor.contrastText || "#ffffff",
          width: 46,
          height: 46,
          borderRadius: 1,
        }}
      >
        {icon}
      </Avatar>
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }} noWrap>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: `${color}.main`, fontWeight: 800 }}>
          {loading ? <CircularProgress size={20} color="inherit" /> : value}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
