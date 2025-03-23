import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: string[];
	rating: number;
};

interface PizzaSliceState {
	items: PizzaItem[];
	status: 'loading' | 'success' | 'failed';
}

type FetchPizzasParams = {
	page: number;
	category: string | number;
	sortBy: string | number;
	search: string;
	orderBy: string;
};
export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async ({ page, category, sortBy, search, orderBy }: FetchPizzasParams) => {
		const { data } = await axios.get<PizzaItem[]>(
			`https://67af9f13dffcd88a67872d36.mockapi.io/pizzas?page=${page}&limit=4&category=${category}&sortBy=${sortBy}&order=${orderBy}&${
				search ? `title=${search}` : ''
			}`
		);
		return data as PizzaItem[];
	}
);

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	FAILED = 'failed',
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.FAILED;
			state.items = [];
		});
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
