import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination/Pagination';
import {
	setCurrentCategory,
	setCurrentSort,
	setCurrentOrder,
	setFilters,
	setCurrentPage,
} from '../redux/slices/filterSlice';

import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { RootState, useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
	const { items, status } = useSelector((state: RootState) => state.pizza);
	const {
		currentCategory,
		currentSort,
		currentOrder,
		currentPage,
		searchValue,
	} = useSelector((state: RootState) => state.filter);
	const dispatch = useAppDispatch();
	const isMounted = useRef<boolean>(false);
	const isFetched = useRef<boolean>(false);
	const navigate = useNavigate();
	const [open, setOpen] = useState<boolean>(false);
	const orderRef = useRef<HTMLDivElement | null>(null);

	const sortNames = ['rating', 'price', 'title'];
	const order = [
		{ name: 'по возрастанию', value: 'ask' },
		{ name: 'по убыванию', value: 'desc' },
	];

	const toggleSort = (value: number) => {
		dispatch(setCurrentOrder(value));
		setOpen(!open);
	};

	const getPizzas = () => {
		const page = currentPage;
		const category = currentCategory !== 0 ? currentCategory : '';
		const sortBy = sortNames[currentSort];
		const search = searchValue;
		const orderBy = order[currentOrder].value;

		try {
			dispatch(
				fetchPizzas({
					page,
					category,
					sortBy,
					search,
					orderBy,
				})
			);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const parsedParams = {
				...params,
				category: params.category ? Number(params.category) : 0,
				sortBy:
					typeof params.sortBy === 'string' &&
					sortNames.indexOf(params.sortBy) !== -1
						? sortNames.indexOf(params.sortBy)
						: 0,
				order:
					typeof params.order === 'string' &&
					order.findIndex((item) => item.value === params.order) !==
						-1
						? order.findIndex((item) => item.value === params.order)
						: 0,
				page: params.page ? Number(params.page) : 1,
				search: params.search ? params.search : '',
			};

			dispatch(setFilters(parsedParams));
		}

		isFetched.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				category: currentCategory,
				sortBy: sortNames[currentSort],
				order: order[currentOrder].value,
				page: currentPage,
				search: searchValue,
			});
			navigate(`?${queryString}`);
		}
		if (isFetched.current) {
			getPizzas();
			isMounted.current = true;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentCategory, currentSort, currentOrder, searchValue, currentPage]);

	useEffect(() => {
		const handleToggleSort = (e: any) => {
			if (!e.composedPath().includes(orderRef.current)) {
				setOpen(false);
			}
		};

		document.body.addEventListener('click', handleToggleSort);

		return () => {
			document.body.removeEventListener('click', handleToggleSort);
		};
	}, []);

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCurrentCategory(id));
	}, []);
	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					currentCategory={currentCategory}
					onClickCategory={onChangeCategory}
				/>
				<Sort
					currentSort={currentSort}
					onClickSort={(value) => dispatch(setCurrentSort(value))}
				/>
			</div>
			<div className='sort__label' ref={orderRef}>
				<h2 className='content__title'>Все пиццы</h2>
				<span
					onClick={() => setOpen(!open)}
					style={{ marginLeft: '20px', marginBottom: '-20px' }}
				>
					{order[currentOrder].name}
				</span>
			</div>
			{open && (
				<div className='pizza-block__popup'>
					<ul>
						{order.map((item, i) => (
							<li
								className={
									item.name === order[currentOrder].name
										? 'active'
										: ''
								}
								onClick={() => toggleSort(i)}
							>
								{item.name}
							</li>
						))}
					</ul>
				</div>
			)}
			<div className='content__items'>
				{status === 'loading'
					? [...new Array(6)].map((_, index) => (
							<PizzaSkeleton key={index} />
					  ))
					: items.map((pizza: any) => (
							<PizzaBlock key={pizza.id} {...pizza} />
					  ))}
			</div>
			<Pagination
				onChangePage={(number: number) =>
					dispatch(setCurrentPage(number))
				}
			/>
		</div>
	);
};

export default Home;
