import React, { useEffect, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useSelector } from "react-redux";
import { selectThemeMode, selectThemeDirection } from "@/store/selectors/themeSelectors";
import { createAppTheme } from "@/theme";

interface MaterialUIProviderProps {
  children: React.ReactNode;
}
// const ignoreGradientRtlPlugin = (element: any, index: number, children: any[], callback: any) => {
//   if (element && element.children && Array.isArray(element.children)) {
//     const processChildren = (nodes: any[]) => {
//       for (const node of nodes) {
//         if (node && node.type === "decl" && typeof node.value === "string") {
//           if (node.value.includes("gradient(") && !node.value.includes("/* @noflip */")) {
//             node.value = "/* @noflip */ " + node.value;
//           }
//         }
//         if (node && node.children && Array.isArray(node.children)) {
//           processChildren(node.children);
//         }
//       }
//     };
//     processChildren(element.children);
//   }
//   return (rtlPlugin as any)(element, index, children, callback);
// };

// Create dynamic cache based on direction
const createCacheWithDirection = (direction: string) => {
  // Emotion already includes the default prefixer. Only add RTL plugin when needed.
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

  // Create Material-UI theme using modularized theme builder
  const theme = useMemo(() => createAppTheme(mode, direction), [mode, direction]);
  const cache = useMemo(() => createCacheWithDirection(direction), [direction]);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
};
