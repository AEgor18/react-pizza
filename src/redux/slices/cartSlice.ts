import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import calcTotalPrice from '../../utils/calcTotalPrice';

export type CartItemType = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
};

interface CartSliceState {
	totalPrice: number;
	cart: CartItemType[];
}

const { cart, totalPrice } = getCartFromLocalStorage();

const initialState: CartSliceState = {
	totalPrice,
	cart,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.cart.find(
				(item) =>
					item.id === action.payload.id &&
					item.type === action.payload.type &&
					item.size === action.payload.size
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.cart.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.cart.reduce((sum, item) => {
				return item.price * item.count + sum;
			}, 0);
		},
		deleteItem(state, action) {
			const findItem = state.cart.find(
				(item) => item.id === action.payload.id
			);
			if (findItem && findItem.count > 1) {
				findItem.count--;
			}
			state.totalPrice = state.cart.reduce((sum, item) => {
				return item.price * item.count + sum;
			}, 0);
		},
		removeItem(state, action) {
			state.cart = state.cart.filter(
				(item) =>
					item.id !== action.payload.id ||
					item.type !== action.payload.type ||
					item.size !== action.payload.size
			);
			state.totalPrice = calcTotalPrice(state.cart);
		},
		clearCart(state) {
			state.cart = [];
			state.totalPrice = 0;
		},
	},
});

export const cartSelect = (state: RootState) => state.cart;

export const { addItem, removeItem, clearCart, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
