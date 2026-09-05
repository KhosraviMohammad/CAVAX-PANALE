import { alpha, type Components, type Theme } from "@mui/material/styles";

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "outlined" | "borderless";
  }
}

export const getIconButtonOverrides = (
  _mode: "light" | "dark",
): Components<Theme>["MuiIconButton"] => ({
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 8,
      color: theme.palette.text.secondary,
      transition: "all 0.15s ease",
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    }),
    colorPrimary: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
      },
    }),
    colorSecondary: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.secondary.main,
        backgroundColor: alpha(theme.palette.secondary.main, 0.08),
      },
    }),
    colorError: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.08),
      },
    }),
    colorInfo: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.info.main,
        backgroundColor: alpha(theme.palette.info.main, 0.08),
      },
    }),
    colorSuccess: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.success.main,
        backgroundColor: alpha(theme.palette.success.main, 0.08),
      },
    }),
    colorWarning: ({ theme }) => ({
      color: theme.palette.text.secondary,
      "&:hover": {
        color: theme.palette.warning.main,
        backgroundColor: alpha(theme.palette.warning.main, 0.08),
      },
    }),
  },
  variants: [
    {
      props: { variant: "outlined" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 8,
        color: theme.palette.text.secondary,
        transition: "all 0.15s ease",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
    },
    {
      props: { variant: "outlined", color: "primary" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.primary.main,
        "&:hover": {
          color: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
      }),
    },
    {
      props: { variant: "outlined", color: "secondary" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.secondary.main,
        "&:hover": {
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.08),
        },
      }),
    },
    {
      props: { variant: "outlined", color: "error" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.error.main,
        "&:hover": {
          color: theme.palette.error.main,
          borderColor: theme.palette.error.main,
          backgroundColor: alpha(theme.palette.error.main, 0.08),
        },
      }),
    },
    {
      props: { variant: "outlined", color: "info" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.info.main,
        "&:hover": {
          color: theme.palette.info.main,
          borderColor: theme.palette.info.main,
          backgroundColor: alpha(theme.palette.info.main, 0.08),
        },
      }),
    },
    {
      props: { variant: "outlined", color: "success" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.success.main,
        "&:hover": {
          color: theme.palette.success.main,
          borderColor: theme.palette.success.main,
          backgroundColor: alpha(theme.palette.success.main, 0.08),
        },
      }),
    },
    {
      props: { variant: "outlined", color: "warning" },
      style: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.warning.main,
        "&:hover": {
          color: theme.palette.warning.main,
          borderColor: theme.palette.warning.main,
          backgroundColor: alpha(theme.palette.warning.main, 0.08),
        },
      }),
    },
  ],
});
