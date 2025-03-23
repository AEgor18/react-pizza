import React, { memo } from 'react';

type CategoriesProps = {
	currentCategory: number;
	onClickCategory: (i: number) => void;
};

const arr = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories: React.FC<CategoriesProps> = memo(
	({ currentCategory, onClickCategory }) => {
		return (
			<div className='categories'>
				<ul>
					{arr.map((item, i) => (
						<li
							key={item}
							className={currentCategory === i ? 'active' : ''}
							onClick={() => onClickCategory(i)}
						>
							{item}
						</li>
					))}
				</ul>
			</div>
		);
	}
);
