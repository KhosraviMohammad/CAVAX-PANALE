import React, { useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { useSelector } from "react-redux";
import { selectThemeMode, selectThemeDirection } from "@/store/selectors/themeSelectors";

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
    stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
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
  const theme = createTheme({
    direction: direction,
    palette: {
      mode: mode,
      primary: {
        main: "#1A4C8B",
        light: "#2E6AB5",
        dark: "#0D2E5A",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#C2A978",
        light: "#D4C09A",
        dark: "#9E8555",
        contrastText: "#1B2430",
      },
      background: {
        default: mode === "light" ? "#F7F6F3" : "#111820",
        paper: mode === "light" ? "#FFFFFF" : "#1A2332",
      },
      text: {
        primary: mode === "light" ? "#1B2430" : "#F0EDE8",
        secondary: mode === "light" ? "#4A5568" : "#B0BEC5",
      },
      error: {
        main: "#E53935",
      },
      success: {
        main: "#2E7D32",
      },
      warning: {
        main: "#F9A825",
      },
      info: {
        main: "#1976D2",
      },
    },
    typography: {
      fontFamily: [
        "Vazirmatn",
        "IRANSans",
        "Inter",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
      button: {
        fontWeight: 600,
        textTransform: "none",
      },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(26, 76, 139, 0.25)",
            },
          },
          contained: {
            background: "linear-gradient(135deg, #1A4C8B 0%, #0D2E5A 100%)",
            color: "#FFFFFF",
            "&:hover": {
              background: "linear-gradient(135deg, #0D2E5A 0%, #071D3A 100%)",
            },
          },
        },
      },
    },
  });

  const cache = createCacheWithDirection(direction);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
};
