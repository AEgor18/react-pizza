import './scss/app.scss';
import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

const Cart = lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/Cart'));
const FullPizza = lazy(
	() => import(/* webpackChunkName: 'FullPizza' */ './pages/FullPizza')
);
const NotFound = lazy(
	() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound')
);

function App() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path='/' element={<Home />} />
				<Route
					path='/cart'
					element={
						<Suspense fallback={<div>Загрузка...</div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					path='/pizzas/:id'
					element={
						<Suspense fallback={<div>Загрузка...</div>}>
							<FullPizza />
						</Suspense>
					}
				/>
				<Route
					path='*'
					element={
						<Suspense fallback={<div>Загрузка...</div>}>
							<NotFound />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}

export default App;
