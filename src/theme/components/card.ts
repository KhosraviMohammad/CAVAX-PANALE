import { alpha, type Components, type Theme } from "@mui/material/styles";

export const getCardOverrides = (
  _mode?: "light" | "dark",
): Pick<
  Components<Theme>,
  "MuiCard" | "MuiCardContent" | "MuiCardHeader" | "MuiCardActions" | "MuiPaper"
> => ({
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
      }),
      rounded: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius ? Number(theme.shape.borderRadius) * 1.5 : 12,
      }),
      outlined: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
      }),
      elevation0: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: "none",
      }),
      elevation1: ({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 4px 20px ${alpha(theme.palette.common.black, 0.4)}`
            : `0 4px 20px ${alpha(theme.palette.common.black, 0.04)}`,
      }),
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius ? Number(theme.shape.borderRadius) * 1.5 : 12,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: "none",
      }),
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 20,
        "&:last-child": {
          paddingBottom: 20,
        },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: "16px 20px",
      },
      title: {
        fontSize: "1rem",
        fontWeight: 600,
      },
      subheader: ({ theme }) => ({
        fontSize: "0.8125rem",
        color: theme.palette.text.secondary,
      }),
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: "12px 20px",
      },
    },
  },
});
