import type { RootState } from "@/store/types";

export const selectWalletsUiState = (state: RootState) => state.walletsUi;

export const selectWalletsSearchTerm = (state: RootState) => state.walletsUi?.searchTerm || "";

export const selectWalletsFilters = (state: RootState) => state.walletsUi?.filters || {};

export const selectIsWalletsFilterDialogOpen = (state: RootState) =>
  Boolean(state.walletsUi?.isFilterDialogOpen);

export const selectHasActiveWalletsFilters = (state: RootState) => {
  const filters = state.walletsUi?.filters || {};
  return Boolean(
    filters.user ||
    filters.asset ||
    filters.min_balance ||
    filters.max_balance ||
    (filters.is_frozen && filters.is_frozen !== "all"),
  );
};
