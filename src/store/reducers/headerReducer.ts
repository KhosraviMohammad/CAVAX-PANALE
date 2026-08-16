import { SET_HEADER_TITLE, SET_HEADER_DESCRIPTION, SET_HEADER_INFO } from "@/store/types";
import type { HeaderAction } from "@/store/actions/headerActions";

export interface HeaderState {
  title: string;
  description: string;
}

export const HEADER_INITIAL_STATE: HeaderState = {
  title: "داشبورد BSCADA",
  description: "",
};

export const headerReducer = (state = HEADER_INITIAL_STATE, action: HeaderAction): HeaderState => {
  switch (action.type) {
    case SET_HEADER_TITLE:
      return { ...state, title: action.payload };
    case SET_HEADER_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_HEADER_INFO:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description || "",
      };
    default:
      return state;
  }
};
