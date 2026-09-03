import type { Components, Theme } from "@mui/material/styles";

export const paperTheme: Components<Theme> = {
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 10,
      },
    },
  },
};
