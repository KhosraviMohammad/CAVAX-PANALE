import { alpha, type Components, type Theme } from "@mui/material/styles";

export const getInputOverrides = (
  _mode?: "light" | "dark",
): Pick<
  Components<Theme>,
  | "MuiOutlinedInput"
  | "MuiInputLabel"
  | "MuiFormHelperText"
  | "MuiSelect"
  | "MuiMenuItem"
  | "MuiMenu"
  | "MuiAutocomplete"
> => ({
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius ?? 10,
        backgroundColor: theme.palette.background.paper,
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
          borderWidth: "2px",
        },
        "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.error.main,
          borderWidth: "2px",
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        "&.Mui-focused": {
          fontWeight: 600,
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginInline: 7,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      select: {
        display: "flex",
        alignItems: "center",
      },
      icon: ({ theme }) => ({
        color: theme.palette.text.secondary,
        transition: "transform 0.2s ease, color 0.2s ease",
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: "1.0625rem",
        borderRadius: 6,
        margin: "2px 6px",
        padding: "8px 12px",
        transition: "all 0.15s ease",
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
        "&.Mui-selected": {
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          fontWeight: 600,
          color: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 10,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 8px 24px ${alpha(theme.palette.common.black, 0.5)}`
            : `0 8px 24px ${alpha(theme.palette.common.black, 0.08)}`,
        padding: "4px 0",
      }),
    },
  },
  MuiAutocomplete: {
    styleOverrides: {
      paper: ({ theme }) => ({
        borderRadius: 10,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 8px 24px ${alpha(theme.palette.common.black, 0.5)}`
            : `0 8px 24px ${alpha(theme.palette.common.black, 0.08)}`,
        margin: 0,
      }),
      listbox: {
        padding: "8px 0",
      },
      option: ({ theme }) => ({
        fontSize: "1.0625rem",
        borderRadius: 6,
        margin: "2px 6px",
        padding: "8px 12px",
        transition: "all 0.15s ease",
        '&[data-focus="true"]': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
        '&[aria-selected="true"]': {
          backgroundColor: `${alpha(theme.palette.primary.main, 0.12)} !important`,
          fontWeight: 600,
          color: theme.palette.primary.main,
          '&[data-focus="true"]': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.16)} !important`,
          },
        },
      }),
      noOptions: ({ theme }) => ({
        color: theme.palette.text.secondary,
        padding: "10px 16px",
        fontSize: "0.9375rem",
      }),
      loading: ({ theme }) => ({
        color: theme.palette.text.secondary,
        padding: "10px 16px",
        fontSize: "0.9375rem",
      }),
    },
  },
});
