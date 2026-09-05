import { createTheme, type Theme, type Direction } from "@mui/material/styles";
import { getPalette } from "./palette";
import { typography } from "./typography";
import { getComponentOverrides } from "./components";

export const createAppTheme = (mode: "light" | "dark", direction: Direction = "rtl"): Theme => {
  return createTheme({
    direction,
    palette: getPalette(mode),
    typography,
    shape: {
      borderRadius: 8,
    },
    components: getComponentOverrides(mode),
  });
};

export * from "./palette";
export * from "./typography";
export * from "./components";
export default createAppTheme;
