import { alpha, darken, type Components, type Theme } from "@mui/material/styles";

export const getButtonOverrides = (_mode?: "light" | "dark"): Components<Theme>["MuiButton"] => ({
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      textTransform: "none",
      fontWeight: 600,
      boxShadow: "none",
    },

    // ۱. با بک‌گراند (Contained)
    contained: ({ theme }) => ({
      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      color: theme.palette.primary.contrastText,
      boxShadow: "none",
      "&:hover": {
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${darken(theme.palette.primary.dark, 0.2)} 100%)`,
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
      },
    }),

    // ۲. با بردر (Outlined)
    outlined: ({ theme }) => ({
      borderColor: theme.palette.divider,
      color: theme.palette.text.primary,
      "&:hover": {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
      },
    }),

    // ۳. بدون بردر (Text)
    text: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    }),
  },
});
