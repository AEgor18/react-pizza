import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Home from '../pages/Home';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState } from '../redux/store';
import { AnyAction } from '@reduxjs/toolkit';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import '@testing-library/jest-dom';

jest.mock('../redux/slices/pizzaSlice', () => ({
	fetchPizzas: jest.fn(),
}));

const mockStore = configureStore<RootState, AnyAction>([]);

describe('Компонент Home', () => {
	let store: MockStoreEnhanced<RootState, AnyAction>;

	beforeEach(() => {
		store = mockStore({
			pizza: { items: [], status: 'success' },
			filter: {
				currentCategory: 0,
				currentSort: 0,
				currentOrder: 0,
				currentPage: 1,
				searchValue: '',
			},
			cart: { totalPrice: 0, cart: [] },
		});
	});

	test('Проверка отображения скелетонов при загрузке', () => {
		store = mockStore({
			pizza: { items: [], status: 'loading' },
			filter: {
				currentCategory: 0,
				currentSort: 0,
				currentOrder: 0,
				currentPage: 1,
				searchValue: '',
			},
			cart: { totalPrice: 0, cart: [] },
		});

		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		expect(screen.getAllByTestId('pizza-skeleton')).toHaveLength(6);
	});

	test('Проверка ренденринга компонента Home', () => {
		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		expect(screen.getByText(/Все пиццы/i)).toBeInTheDocument();
	});

	test('Проверка вызова функции fetchPizzas', () => {
		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		expect(fetchPizzas).toHaveBeenCalled();
	});

	test('Проверка работы категорий', () => {
		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		const categoryButton = screen.getByText(/Мясные/i);
		fireEvent.click(categoryButton);

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'filter/setCurrentCategory',
			payload: 1,
		});
	});

	test('Проверка работы пагинации', () => {
		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		const paginationButton = screen.getByText(/2/i);
		fireEvent.click(paginationButton);

		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'filter/setCurrentPage',
			payload: 2,
		});
	});

	test('Проверка пограничного условия, что список пицц пуст', () => {
		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		expect(screen.getByText(/Пиццы не найдены/i)).toBeInTheDocument();
	});

	test('Проверка отображения сообщения об ошибке при статусе "failed"', () => {
		store = mockStore({
			pizza: { items: [], status: 'failed' },
			filter: {
				currentCategory: 0,
				currentSort: 0,
				currentOrder: 0,
				currentPage: 1,
				searchValue: '',
			},
			cart: { totalPrice: 0, cart: [] },
		});

		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		expect(
			screen.getByText(/Произошла ошибка при загрузке пицц/i)
		).toBeInTheDocument();
	});
	test('Проверка отображения пицц на странице', () => {
		store = mockStore({
			pizza: {
				items: [
					{
						id: '1',
						imageUrl:
							'https://media.dodostatic.net/image/r:292x292/11ee7d610d2925109ab2e1c92cc5383c.jpg',
						title: 'Сырная',
						types: ['традиционное'],
						sizes: [26, 40],
						price: 245,
						rating: 6,
					},
					{
						id: '2',
						imageUrl:
							'https://media.dodostatic.net/image/r:292x292/11ee7d6110059795842d40396bcf1e73.jpg',
						title: 'Цыпленок барбекю',
						types: ['тонкое'],
						sizes: [26, 40],
						price: 295,
						rating: 4,
					},
				],
				status: 'success',
			},
			filter: {
				currentCategory: 0,
				currentSort: 0,
				currentOrder: 0,
				currentPage: 1,
				searchValue: '',
			},
			cart: { totalPrice: 0, cart: [] },
		});

		render(
			<Provider store={store}>
				<Home />
			</Provider>
		);

		expect(screen.getByText(/Сырная/i)).toBeInTheDocument();
		expect(screen.getByText(/Цыпленок барбекю/i)).toBeInTheDocument();
	});
});
