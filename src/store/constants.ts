// Store Configuration
export const STORE_CONFIG = {
  PERSIST_KEY: "root",
  PERSIST_WHITELIST: ["theme", "auth"],
} as const;

// Action Type Prefixes
export const ACTION_PREFIXES = {
  APP: "app",
} as const;

// State Types
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const DIRECTIONS = {
  LTR: "ltr",
  RTL: "rtl",
} as const;

// Type definitions
export type ThemeMode = (typeof THEMES)[keyof typeof THEMES];
export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

export interface ThemeState {
  mode: ThemeMode;
  direction: Direction;
}

// Theme Type
export const THEME_INITIAL_STATE: ThemeState = {
  mode: THEMES.LIGHT,
  direction: DIRECTIONS.RTL,
};
