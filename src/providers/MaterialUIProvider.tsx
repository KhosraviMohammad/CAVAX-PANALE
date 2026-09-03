"use client";

import React, { useEffect } from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  type Theme,
  alpha,
} from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useSelector } from "react-redux";
import { selectThemeMode, selectThemeDirection } from "@/store/selectors/themeSelectors";
import { getPalette, typography, themeComponents } from "@/theme";

interface MaterialUIProviderProps {
  children: React.ReactNode;
}

// Create dynamic cache based on direction
const createCacheWithDirection = (direction: string) => {
  return createCache({
    key: direction === "rtl" ? "muirtl" : "muiltr",
    stylisPlugins: direction === "rtl" ? [rtlPlugin] : [],
  });
};

export const MaterialUIProvider = ({ children }: MaterialUIProviderProps) => {
  // Get theme state from Redux
  const mode = useSelector(selectThemeMode);
  const direction = useSelector(selectThemeDirection);

  // Save theme preferences to localStorage whenever they change and update document direction
  useEffect(() => {
    document.dir = direction;
    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-direction", direction);
  }, [mode, direction]);

  // Create Material-UI theme
  const theme = React.useMemo(() => {
    const baseTheme = createTheme({
      direction: direction,
      palette: getPalette(mode),
      typography: typography,
      shape: {
        borderRadius: 10,
      },
      components: themeComponents,
    });
    return responsiveFontSizes(baseTheme);
  }, [mode, direction]);

  const cache = React.useMemo(() => createCacheWithDirection(direction), [direction]);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
};

export default MaterialUIProvider;
