import {
  SET_WALLETS_SEARCH_TERM,
  SET_WALLETS_FILTERS,
  RESET_WALLETS_FILTERS,
  OPEN_WALLETS_FILTER_DIALOG,
  CLOSE_WALLETS_FILTER_DIALOG,
} from "@/store/types";
import type { WalletsUiAction } from "@/store/actions/walletsUiActions";
import type { WalletFilterValues } from "@/components/wallets/WalletsFilterDialog";

export interface WalletsUiState {
  searchTerm: string;
  filters: WalletFilterValues;
  isFilterDialogOpen: boolean;
}

export const WALLETS_UI_INITIAL_STATE: WalletsUiState = {
  searchTerm: "",
  filters: {},
  isFilterDialogOpen: false,
};

export const walletsUiReducer = (
  state = WALLETS_UI_INITIAL_STATE,
  action: WalletsUiAction,
): WalletsUiState => {
  switch (action.type) {
    case SET_WALLETS_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SET_WALLETS_FILTERS:
      return { ...state, filters: action.payload };
    case RESET_WALLETS_FILTERS:
      return { ...state, filters: {}, searchTerm: "" };
    case OPEN_WALLETS_FILTER_DIALOG:
      return { ...state, isFilterDialogOpen: true };
    case CLOSE_WALLETS_FILTER_DIALOG:
      return { ...state, isFilterDialogOpen: false };
    default:
      return state;
  }
};
