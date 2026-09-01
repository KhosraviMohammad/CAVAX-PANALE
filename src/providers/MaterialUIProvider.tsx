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
      palette: {
        mode: mode,
        primary: {
          main: "#2563eb", // Brand Blue
          light: "#3b82f6",
          dark: "#1d4ed8",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#06b6d4", // Brand Cyan
          light: "#22d3ee",
          dark: "#0891b2",
          contrastText: "#ffffff",
        },
        background: {
          default: mode === "light" ? "#f8fafc" : "#0f172a",
          paper: mode === "light" ? "#ffffff" : "#1e293b",
        },
        text: {
          primary: mode === "light" ? "#0f172a" : "#f8fafc",
          secondary: mode === "light" ? "#64748b" : "#94a3b8",
        },
        error: {
          main: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },
        success: {
          main: "#26A17B", // Tether green
          light: "#34d399",
          dark: "#059669",
        },
        warning: {
          main: "#f59e0b",
          light: "#fbbf24",
          dark: "#d97706",
        },
        info: {
          main: "#06b6d4",
          light: "#38bdf8",
          dark: "#0284c7",
        },
        divider: mode === "light" ? "#e2e8f0" : "rgba(255, 255, 255, 0.12)",
      },
      typography: {
        fontFamily: ["Vazirmatn", "Space Grotesk", "sans-serif"].join(","),
        h1: {
          fontWeight: 900,
          fontSize: "3.5rem",
        },
        h2: {
          fontWeight: 800,
          fontSize: "2.25rem",
        },
        h3: {
          fontWeight: 700,
          fontSize: "1.75rem",
        },
        h4: {
          fontWeight: 700,
          fontSize: "1.5rem",
        },
        h5: {
          fontWeight: 600,
          fontSize: "1.25rem",
        },
        h6: {
          fontWeight: 600,
          fontSize: "1rem",
        },
        body1: {
          fontSize: "1rem",
          lineHeight: 1.6,
        },
        body2: {
          fontSize: "0.875rem",
          lineHeight: 1.5,
        },
        button: {
          fontWeight: 700,
          textTransform: "none",
        },
      },
      shape: {
        borderRadius: 10,
      },
      components: {
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
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 10,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              fontFamily: "Vazirmatn, sans-serif",
              transition: "all 0.2s ease-in-out",
              fontSize: "0.875rem",
              padding: "8px 20px",
            },
            contained: ({ theme }: { theme: Theme }) => ({
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
              },
            }),
            outlined: ({ theme }: { theme: Theme }) => ({
              borderColor:
                theme.palette.mode === "light"
                  ? "rgba(15, 23, 42, 0.15)"
                  : "rgba(255, 255, 255, 0.2)",
              color: theme.palette.text.primary,
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }),
            sizeSmall: ({ theme }: { theme: Theme }) => ({
              padding: "5px 12px",
              fontSize: "0.75rem",
              [theme.breakpoints.up("sm")]: {
                padding: "6px 16px",
                fontSize: "0.8125rem",
              },
            }),
            sizeLarge: ({ theme }: { theme: Theme }) => ({
              padding: "10px 24px",
              fontSize: "0.875rem",
              [theme.breakpoints.up("sm")]: {
                padding: "12px 32px",
                fontSize: "1rem",
              },
            }),
          },
        },
        MuiCard: {
          styleOverrides: {
            root: ({ theme }: { theme: Theme }) => ({
              borderRadius: 16,
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }),
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 10,
            },
          },
        },
      },
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
