import { SET_HEADER_TITLE, SET_HEADER_DESCRIPTION, SET_HEADER_INFO } from "@/store/types";

export interface SetHeaderTitleAction {
  type: typeof SET_HEADER_TITLE;
  payload: string;
  [key: string]: unknown;
}

export interface SetHeaderDescriptionAction {
  type: typeof SET_HEADER_DESCRIPTION;
  payload: string;
  [key: string]: unknown;
}

export interface SetHeaderInfoAction {
  type: typeof SET_HEADER_INFO;
  payload: {
    title: string;
    description?: string;
  };
  [key: string]: unknown;
}

export type HeaderAction = SetHeaderTitleAction | SetHeaderDescriptionAction | SetHeaderInfoAction;

export const setHeaderTitle = (title: string): SetHeaderTitleAction => ({
  type: SET_HEADER_TITLE,
  payload: title,
});

export const setHeaderDescription = (description: string): SetHeaderDescriptionAction => ({
  type: SET_HEADER_DESCRIPTION,
  payload: description,
});

export const setHeaderInfo = (info: {
  title: string;
  description?: string;
}): SetHeaderInfoAction => ({
  type: SET_HEADER_INFO,
  payload: info,
});
