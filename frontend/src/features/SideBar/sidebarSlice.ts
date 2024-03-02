import { Category } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchSidebarCategories } from './sidebarThunks.ts';

interface SidebarState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: SidebarState = {
  categories: [],
  isLoading: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSidebarCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchSidebarCategories.fulfilled,
      (state, { payload: categories }) => {
        state.isLoading = false;
        if (categories) {
          state.categories = categories;
        }
      },
    );
    builder.addCase(fetchSidebarCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const sidebarReducer = sidebarSlice.reducer;
export const sidebarState = (state: RootState) => state.sidebar.categories;
export const isSidebarLoading = (state: RootState) => state.sidebar.isLoading;
