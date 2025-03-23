import { CartItemType } from '../redux/slices/cartSlice';
import calcTotalPrice from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
	const data = localStorage.getItem('cart');
	const cart = data ? JSON.parse(data) : [];
	const totalPrice = calcTotalPrice(cart);

	return {
		cart: cart as CartItemType[],
		totalPrice,
	};
};
