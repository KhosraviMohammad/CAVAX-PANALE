import {
  SET_WALLETS_SEARCH_TERM,
  SET_WALLETS_FILTERS,
  RESET_WALLETS_FILTERS,
  OPEN_WALLETS_FILTER_DIALOG,
  CLOSE_WALLETS_FILTER_DIALOG,
} from "@/store/types";
import type { WalletFilterValues } from "@/components/wallets/WalletsFilterDialog";

export interface SetWalletsSearchTermAction {
  type: typeof SET_WALLETS_SEARCH_TERM;
  payload: string;
  [key: string]: unknown;
}

export interface SetWalletsFiltersAction {
  type: typeof SET_WALLETS_FILTERS;
  payload: WalletFilterValues;
  [key: string]: unknown;
}

export interface ResetWalletsFiltersAction {
  type: typeof RESET_WALLETS_FILTERS;
  [key: string]: unknown;
}

export interface OpenWalletsFilterDialogAction {
  type: typeof OPEN_WALLETS_FILTER_DIALOG;
  [key: string]: unknown;
}

export interface CloseWalletsFilterDialogAction {
  type: typeof CLOSE_WALLETS_FILTER_DIALOG;
  [key: string]: unknown;
}

export type WalletsUiAction =
  | SetWalletsSearchTermAction
  | SetWalletsFiltersAction
  | ResetWalletsFiltersAction
  | OpenWalletsFilterDialogAction
  | CloseWalletsFilterDialogAction;

export const setWalletsSearchTerm = (searchTerm: string): SetWalletsSearchTermAction => ({
  type: SET_WALLETS_SEARCH_TERM,
  payload: searchTerm,
});

export const setWalletsFilters = (filters: WalletFilterValues): SetWalletsFiltersAction => ({
  type: SET_WALLETS_FILTERS,
  payload: filters,
});

export const resetWalletsFilters = (): ResetWalletsFiltersAction => ({
  type: RESET_WALLETS_FILTERS,
});

export const openWalletsFilterDialog = (): OpenWalletsFilterDialogAction => ({
  type: OPEN_WALLETS_FILTER_DIALOG,
});

export const closeWalletsFilterDialog = (): CloseWalletsFilterDialogAction => ({
  type: CLOSE_WALLETS_FILTER_DIALOG,
});
