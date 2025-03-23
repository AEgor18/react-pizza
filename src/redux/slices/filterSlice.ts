import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterSliceState {
	currentCategory: number;
	currentSort: number;
	currentOrder: number;
	currentPage: number;
	searchValue: string;
}

const initialState: FilterSliceState = {
	currentCategory: 0,
	currentSort: 0,
	currentOrder: 0,
	currentPage: 1,
	searchValue: '',
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCurrentCategory(state, action: PayloadAction<number>) {
			state.currentCategory = action.payload;
		},
		setCurrentSort(state, action: PayloadAction<number>) {
			state.currentSort = action.payload;
		},
		setCurrentOrder(state, action: PayloadAction<number>) {
			state.currentOrder = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setFilters(state, action) {
			state.currentCategory = Number(action.payload.category);
			state.currentSort = action.payload.sortBy;
			state.currentOrder = action.payload.order;
			state.currentPage = Number(action.payload.page);
			state.searchValue = action.payload.search;
		},
	},
});

export const {
	setCurrentCategory,
	setCurrentSort,
	setCurrentOrder,
	setFilters,
	setCurrentPage,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
