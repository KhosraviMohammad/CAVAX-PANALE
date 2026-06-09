import type { ThemeMode, Direction } from '@/store/types';
import { SET_THEME_MODE, SET_THEME_DIRECTION } from '@/store/types';
import { THEMES, DIRECTIONS } from '@/store/types';

// Action Types
interface SetThemeModeAction {
  type: typeof SET_THEME_MODE;
  payload: ThemeMode | ((state: ThemeMode) => ThemeMode);
}

interface SetThemeDirectionAction {
  type: typeof SET_THEME_DIRECTION;
  payload: Direction | ((state: Direction) => Direction);
}

export type ThemeAction = SetThemeModeAction | SetThemeDirectionAction;

// Theme Mode Actions
export const setThemeMode = (mode: ThemeMode): SetThemeModeAction => ({
  type: SET_THEME_MODE,
  payload: mode,
});

export const toggleThemeMode = (): SetThemeModeAction => ({
  type: SET_THEME_MODE,
  payload: (state: ThemeMode) => (state === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT),
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

export const toggleThemeDirection = (): SetThemeDirectionAction => ({
  type: SET_THEME_DIRECTION,
  payload: (state: Direction) => (state === DIRECTIONS.LTR ? DIRECTIONS.RTL : DIRECTIONS.LTR),
});

export const setLTR = (): SetThemeDirectionAction => ({
  type: SET_THEME_DIRECTION,
  payload: DIRECTIONS.LTR,
});

export const setRTL = (): SetThemeDirectionAction => ({
  type: SET_THEME_DIRECTION,
  payload: DIRECTIONS.RTL,
});
