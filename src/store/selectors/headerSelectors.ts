import type { RootState } from "@/store/types";

export const selectHeaderState = (state: RootState) => state.header;

export const selectHeaderTitle = (state: RootState) => state.header?.title || "داشبورد BSCADA";

export const selectHeaderDescription = (state: RootState) => state.header?.description || "";
