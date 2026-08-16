import { THEMES, DIRECTIONS } from "@/store/constants";
import type { ThemeMode, Direction } from "@/store/constants";
import { SET_THEME_MODE, SET_THEME_DIRECTION } from "@/store/types";

// Action Types
interface SetThemeModeAction {
  type: typeof SET_THEME_MODE;
  payload: ThemeMode;
  [key: string]: unknown;
}

interface SetThemeDirectionAction {
  type: typeof SET_THEME_DIRECTION;
  payload: Direction;
  [key: string]: unknown;
}

export type ThemeAction = SetThemeModeAction | SetThemeDirectionAction;

// Theme Mode Actions
export const setThemeMode = (mode: ThemeMode): SetThemeModeAction => ({
  type: SET_THEME_MODE,
  payload: mode,
});

export const setLightTheme = (): SetThemeModeAction => ({
  type: SET_THEME_MODE,
  payload: THEMES.LIGHT,
});

export const setDarkTheme = (): SetThemeModeAction => ({
  type: SET_THEME_MODE,
  payload: THEMES.DARK,
});

// Theme Direction Actions
export const setThemeDirection = (direction: Direction): SetThemeDirectionAction => ({
  type: SET_THEME_DIRECTION,
  payload: direction,
});

export const setLTR = (): SetThemeDirectionAction => ({
  type: SET_THEME_DIRECTION,
  payload: DIRECTIONS.LTR,
});

export const setRTL = (): SetThemeDirectionAction => ({
  type: SET_THEME_DIRECTION,
  payload: DIRECTIONS.RTL,
});
