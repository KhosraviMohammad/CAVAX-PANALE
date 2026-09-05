import { alpha, type Components, type Theme } from "@mui/material/styles";

export const getDrawerOverrides = (
  _mode?: "light" | "dark",
): Pick<
  Components<Theme>,
  | "MuiDrawer"
  | "MuiList"
  | "MuiListItem"
  | "MuiListItemButton"
  | "MuiListItemIcon"
  | "MuiListItemText"
> => ({
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundImage: "none",
        boxSizing: "border-box",
      }),
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        margin: "3px 8px",
        padding: "10px 14px",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        color: "inherit",
        "&:hover": {
          backgroundColor: alpha(theme.palette.common.white, 0.12),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.common.white, 0.22),
          boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
          "&:hover": {
            backgroundColor: alpha(theme.palette.common.white, 0.28),
          },
        },
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: "inherit",
        minWidth: 38,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: {
        fontSize: "0.9375rem",
        fontWeight: 500,
      },
    },
  },
});
