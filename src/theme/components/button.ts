import type { Components, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const buttonTheme: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: "none",
        fontWeight: 700,
        boxShadow: "none",
        fontFamily: "Vazirmatn, sans-serif",
        transition: "all 0.2s ease-in-out",
        fontSize: "0.875rem",
        padding: "8px 20px",
      },
      contained: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
        },
      }),
      outlined: ({ theme }: { theme: Theme }) => ({
        borderColor:
          theme.palette.mode === "light" ? "rgba(15, 23, 42, 0.15)" : "rgba(255, 255, 255, 0.2)",
        color: theme.palette.text.primary,
        backgroundColor: "transparent",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
      sizeSmall: ({ theme }: { theme: Theme }) => ({
        padding: "5px 12px",
        fontSize: "0.75rem",
        [theme.breakpoints.up("sm")]: {
          padding: "6px 16px",
          fontSize: "0.8125rem",
        },
      }),
      sizeLarge: ({ theme }: { theme: Theme }) => ({
        padding: "10px 24px",
        fontSize: "0.875rem",
        [theme.breakpoints.up("sm")]: {
          padding: "12px 32px",
          fontSize: "1rem",
        },
      }),
    },
  },
};
