import React, { useRef } from 'react';

import styles from './Search.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

const Search = () => {
	const { searchValue } = useSelector((state: RootState) => state.filter);
	const dispatch = useDispatch();
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div className={styles.root}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				stroke='currentColor'
				stroke-width='2'
				stroke-linecap='round'
				stroke-linejoin='round'
				className={styles.icon}
			>
				<circle cx='11' cy='11' r='8' />
				<path d='m21 21-4.3-4.3' />
			</svg>
			<input
				ref={inputRef}
				type='text'
				placeholder='Поиск пиццы'
				className={styles.input}
				value={searchValue}
				onChange={(e) => dispatch(setSearchValue(e.target.value))}
			/>
			{searchValue && (
				<svg
					className={styles.cross}
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					stroke-width='2'
					stroke-linecap='round'
					stroke-linejoin='round'
					onClick={() => dispatch(setSearchValue(''))}
				>
					<path d='M18 6 6 18' />
					<path d='m6 6 12 12' />
				</svg>
			)}
		</div>
	);
};

export default Search;
