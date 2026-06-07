import { ACTION_PREFIXES, DEFAULT_VALUES } from './constants';
import { RiskLevel } from './constants';
// Action Types
export const SET_USER = `${ACTION_PREFIXES.APP}/setUser`;
export const SET_TOKEN = `${ACTION_PREFIXES.APP}/setToken`;
export const LOGIN = `${ACTION_PREFIXES.APP}/login`;
export const LOGOUT = `${ACTION_PREFIXES.APP}/logout`;
export const SET_THEME_MODE = `${ACTION_PREFIXES.APP}/setThemeMode`;
export const SET_THEME_DIRECTION = `${ACTION_PREFIXES.APP}/setThemeDirection`;
export const SET_HEADER_TITLE = `${ACTION_PREFIXES.APP}/setHeaderTitle`;
export const SET_HEADER_ACTIONS = `${ACTION_PREFIXES.APP}/setHeaderActions`;
export const CLEAR_HEADER = `${ACTION_PREFIXES.APP}/clearHeader`;
export const TRIGGER_HEADER_ACTION = `${ACTION_PREFIXES.APP}/triggerHeaderAction`;
export const RESET_LAST_ACTION = `${ACTION_PREFIXES.APP}/resetLastAction`;
export const SET_HEADER_SEARCH_QUERY = `${ACTION_PREFIXES.APP}/setHeaderSearchQuery`;
export const SET_HEADER_QUERY_ITEM = `${ACTION_PREFIXES.APP}/setHeaderQueryItem`;

// Policies UI (dialogs) action types
export const OPEN_POLICY_FORM = `${ACTION_PREFIXES.APP}/openPolicyForm`;
export const CLOSE_POLICY_FORM = `${ACTION_PREFIXES.APP}/closePolicyForm`;
export const OPEN_DELETE_POLICY = `${ACTION_PREFIXES.APP}/openDeletePolicy`;
export const CLOSE_DELETE_POLICY = `${ACTION_PREFIXES.APP}/closeDeletePolicy`;

// Filter action types
export const SET_FILTER_QUERY = `${ACTION_PREFIXES.APP}/setFilterQuery`;
export const SET_FILTER_TYPE = `${ACTION_PREFIXES.APP}/setFilterType`;
export const SET_FILTER_DOMAIN = `${ACTION_PREFIXES.APP}/setFilterDomain`;
export const CLEAR_FILTERS = `${ACTION_PREFIXES.APP}/clearFilters`;

// Devices UI (edit dialog) action types
export const OPEN_EDIT_AGENT_DIALOG = `${ACTION_PREFIXES.APP}/openEditAgentDialog`;
export const CLOSE_EDIT_AGENT_DIALOG = `${ACTION_PREFIXES.APP}/closeEditAgentDialog`;
export const SET_EDITED_AGENT_FIELD = `${ACTION_PREFIXES.APP}/setEditedAgentField`;

// State Types
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const DIRECTIONS = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;

// Type definitions
export type ThemeMode = (typeof THEMES)[keyof typeof THEMES];
export type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

// User Type
export const USER_INITIAL_STATE = DEFAULT_VALUES.USER;

// Auth Type
export const AUTH_INITIAL_STATE = {
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false,
} as const;

// Theme Type
export const THEME_INITIAL_STATE = {
  mode: THEMES.LIGHT,
  direction: DIRECTIONS.LTR,
} as const;

// Header Action Button Type
export type HeaderActionButton = {
  id: string;
  label: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  variant?: 'contained' | 'outlined' | 'text';
};

// Header Type
export const HEADER_INITIAL_STATE = {
  title: 'Dashboard',
  actions: [],
  lastActionId: undefined,
  lastActionTs: undefined,
  searchQuery: '',
  setQueryItem: null,
} as const;

// Root State Type
export interface RootState {
  user: {
    user: any | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
  };
  theme: {
    mode: ThemeMode;
    direction: Direction;
  };
  header: {
    title: string;
    actions: HeaderActionButton[];
    lastActionId?: string;
    lastActionTs?: number;
    searchQuery: string;
    setQueryItem: any | null;
  };
  policiesUi: {
    formOpen: boolean;
    selectedPolicy: any | null;
    deleteOpen: boolean;
    policyToDeleteId: number | null;
    filterQuery: string;
    filterType: string;
    filterDomain: string;
  };
  devicesUi: {
    editDialogOpen: boolean;
    selectedAgent: any | null;
    editedAgent: any | null;
  };
}

//logo

export interface TriangleStatus {
  level: RiskLevel;
  jitter: boolean;
  offset: { x: number; y: number };
}

export interface LogoState {
  top: TriangleStatus;
  left: TriangleStatus;
  right: TriangleStatus;
}

// اگر این فایل منبع RootStateت هست:
export interface RootState {
  logo: LogoState;
  // ... سایر استورها
}
