import { ACTION_PREFIXES } from "./constants";
// Action Types
export const SET_USER = `${ACTION_PREFIXES.APP}/setUser` as const;
export const SET_TOKEN = `${ACTION_PREFIXES.APP}/setToken` as const;
export const LOGIN = `${ACTION_PREFIXES.APP}/login` as const;
export const LOGOUT = `${ACTION_PREFIXES.APP}/logout` as const;
export const SET_CREDENTIALS = `${ACTION_PREFIXES.APP}/setCredentials` as const;
export const SET_THEME_MODE = `${ACTION_PREFIXES.APP}/setThemeMode` as const;
export const SET_THEME_DIRECTION = `${ACTION_PREFIXES.APP}/setThemeDirection` as const;
export const SET_HEADER_TITLE = `${ACTION_PREFIXES.APP}/setHeaderTitle` as const;
export const SET_HEADER_DESCRIPTION = `${ACTION_PREFIXES.APP}/setHeaderDescription` as const;
export const SET_HEADER_INFO = `${ACTION_PREFIXES.APP}/setHeaderInfo` as const;
export const SET_HEADER_ACTIONS = `${ACTION_PREFIXES.APP}/setHeaderActions` as const;

export const CLEAR_HEADER = `${ACTION_PREFIXES.APP}/clearHeader` as const;
export const TRIGGER_HEADER_ACTION = `${ACTION_PREFIXES.APP}/triggerHeaderAction` as const;
export const RESET_LAST_ACTION = `${ACTION_PREFIXES.APP}/resetLastAction` as const;
export const SET_HEADER_SEARCH_QUERY = `${ACTION_PREFIXES.APP}/setHeaderSearchQuery` as const;
export const SET_HEADER_QUERY_ITEM = `${ACTION_PREFIXES.APP}/setHeaderQueryItem` as const;

// Policies UI (dialogs) action types
export const OPEN_POLICY_FORM = `${ACTION_PREFIXES.APP}/openPolicyForm` as const;
export const CLOSE_POLICY_FORM = `${ACTION_PREFIXES.APP}/closePolicyForm` as const;
export const OPEN_DELETE_POLICY = `${ACTION_PREFIXES.APP}/openDeletePolicy` as const;
export const CLOSE_DELETE_POLICY = `${ACTION_PREFIXES.APP}/closeDeletePolicy` as const;

// Filter action types
export const SET_FILTER_QUERY = `${ACTION_PREFIXES.APP}/setFilterQuery` as const;
export const SET_FILTER_TYPE = `${ACTION_PREFIXES.APP}/setFilterType` as const;
export const SET_FILTER_DOMAIN = `${ACTION_PREFIXES.APP}/setFilterDomain` as const;
export const CLEAR_FILTERS = `${ACTION_PREFIXES.APP}/clearFilters` as const;

// Users UI (dialogs) action types
export const OPEN_USER_FORM = `${ACTION_PREFIXES.APP}/openUserForm` as const;
export const OPEN_EDIT_USER_FORM = `${ACTION_PREFIXES.APP}/openEditUserForm` as const;
export const CLOSE_USER_FORM = `${ACTION_PREFIXES.APP}/closeUserForm` as const;

// Wallets UI action types
export const SET_WALLETS_SEARCH_TERM = `${ACTION_PREFIXES.APP}/setWalletsSearchTerm` as const;
export const SET_WALLETS_FILTERS = `${ACTION_PREFIXES.APP}/setWalletsFilters` as const;
export const RESET_WALLETS_FILTERS = `${ACTION_PREFIXES.APP}/resetWalletsFilters` as const;
export const OPEN_WALLETS_FILTER_DIALOG = `${ACTION_PREFIXES.APP}/openWalletsFilterDialog` as const;
export const CLOSE_WALLETS_FILTER_DIALOG =
  `${ACTION_PREFIXES.APP}/closeWalletsFilterDialog` as const;

export type { RootState } from "./index";
