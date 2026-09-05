import { alpha, type Components, type Theme } from "@mui/material/styles";

export const getTableOverrides = (
  _mode?: "light" | "dark",
): Pick<
  Components<Theme>,
  | "MuiTable"
  | "MuiTableHead"
  | "MuiTableBody"
  | "MuiTableRow"
  | "MuiTableCell"
  | "MuiTableContainer"
> => ({
  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius ? Number(theme.shape.borderRadius) : 8,
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.common.white, 0.035)
            : alpha(theme.palette.primary.main, 0.035),
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
      }),
      head: {
        fontWeight: 700,
        fontSize: "0.8125rem",
      },
      body: {
        fontSize: "0.875rem",
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiTableRow-hover:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.common.white, 0.04)
              : alpha(theme.palette.primary.main, 0.035),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          },
        },
      }),
    },
  },
});
