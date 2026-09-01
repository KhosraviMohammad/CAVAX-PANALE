import type { RootState } from "@/store/types";

// Export all selectors
export * from "./themeSelectors";
export * from "./headerSelectors";
export * from "./authSelectors";
export * from "./usersUiSelectors";
export * from "./walletsUiSelectors";

// Memoized selectors for better performance
export const createMemoizedSelector = <T, R>(
  selector: (state: RootState) => T,
  transform: (value: T) => R,
) => {
  let lastState: T | null = null;
  let lastResult: R | null = null;

  return (state: RootState): R => {
    const currentState = selector(state);
    if (currentState !== lastState) {
      lastState = currentState;
      lastResult = transform(currentState);
    }
    return lastResult!;
  };
};
