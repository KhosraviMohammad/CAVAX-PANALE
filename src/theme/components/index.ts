import type { Components, Theme } from "@mui/material/styles";
import { buttonTheme } from "./button";
import { inputTheme } from "./input";
import { cardTheme } from "./card";
import { paperTheme } from "./paper";

export const themeComponents: Components<Theme> = {
  ...buttonTheme,
  ...inputTheme,
  ...cardTheme,
  ...paperTheme,
};

export { buttonTheme, inputTheme, cardTheme, paperTheme };
