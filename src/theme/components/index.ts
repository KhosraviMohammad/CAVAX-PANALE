import type { Components, Theme } from "@mui/material/styles";
import { getButtonOverrides } from "./button";
import { getIconButtonOverrides } from "./iconButton";
import { getInputOverrides } from "./input";
import { getCardOverrides } from "./card";
import { getTableOverrides } from "./table";
import { getDrawerOverrides } from "./drawer";

export const getComponentOverrides = (mode: "light" | "dark"): Components<Theme> => ({
  MuiButton: getButtonOverrides(mode),
  MuiIconButton: getIconButtonOverrides(mode),
  ...getInputOverrides(mode),
  ...getCardOverrides(mode),
  ...getTableOverrides(mode),
  ...getDrawerOverrides(mode),
});

export * from "./button";
export * from "./iconButton";
export * from "./input";
export * from "./card";
export * from "./table";
export * from "./drawer";
