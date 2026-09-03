import type { Components, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const inputTheme: Components<Theme> = {
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.secondary,
        fontWeight: 600,
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        borderRadius: 14,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.background.default
            : alpha(theme.palette.common.white, 0.04),
        color: theme.palette.text.primary,
        "&.MuiInputBase-sizeSmall": {
          borderRadius: 10,
        },
      }),
      sizeSmall: {
        borderRadius: 10,
      },
    },
  },
};
