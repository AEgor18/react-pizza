import { CartItemType } from '../redux/slices/cartSlice';

const calcTotalPrice = (cart: CartItemType[]) => {
	return cart.reduce((sum, item) => {
		return item.price * item.count + sum;
	}, 0);
};

export default calcTotalPrice;
