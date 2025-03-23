import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const { id } = useParams();
	const [data, setData] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>({ imageUrl: '', title: '', price: 0 });

	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get(`https://67af9f13dffcd88a67872d36.mockapi.io/pizzas/${id}`)
			.then((res) => res.data)
			.then((res) => setData(res))
			.catch((e) => {
				console.log(e);
				navigate('/');
			});
	}, [id]);

	if (!data) {
		return <>Загрузка...</>;
	}
	return (
		<div className='container'>
			<img
				src={data.imageUrl}
				alt={data.title}
				style={{ width: 300, height: 300 }}
			/>
			<h3>{data.title}</h3>
			<p>{data.price} ₽</p>
			<Link to='/'>
				<div className='button' style={{ marginTop: 20 }}>
					<span>Назад</span>
				</div>
			</Link>
		</div>
	);
};

export default FullPizza;
