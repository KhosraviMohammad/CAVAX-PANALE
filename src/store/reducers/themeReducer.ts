import { THEME_INITIAL_STATE } from "@/store/constants";
import { SET_THEME_MODE, SET_THEME_DIRECTION } from "@/store/types";
import type { ThemeAction } from "@/store/actions/themeActions";

export const themeReducer = (state = THEME_INITIAL_STATE, action: ThemeAction) => {
  switch (action.type) {
    case SET_THEME_MODE:
      return { ...state, mode: action.payload };
    case SET_THEME_DIRECTION:
      return { ...state, direction: action.payload };
    default:
      return state;
  }
};
