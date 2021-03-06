import React, { useEffect, useReducer, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player'
import arrow_back from '../../assets/arrow-back.json'

const initialState = {
	title: 'My Recipes',
	btn_back: false,
}

const reducer = (state, action) => {
	switch (action.type) {
		case '/my-recipes/':
			return { title: 'My Recipes', btn_back: false }
		case '/my-recipes':
			return { title: 'My Recipes', btn_back: false }
		case '/my-recipes/category':
			return { title: 'Select A Recipe', btn_back: true }
		case '/my-recipes/category/recipe':
			return { title: 'Recipe', btn_back: true }
		case '/my-recipes/timer':
			return { title: 'Timer', btn_back: true }
		default:
			return { title: 'Back Home', btn_back: true }
	}
}

export default function Header() {
	const [ offline, setOffline ] = useState(false)
	const [ state, dispatch ] = useReducer(reducer, initialState)

	window.addEventListener('offline', () => {
		setOffline(!offline)
	})

	window.addEventListener('online', () => {
		setOffline(!offline)
	})

	let location = useLocation()
	let navigate = useNavigate()

	useEffect(
		() => {
			dispatch({ type: location.pathname })
		},
		[ location ]
	)

	const handleBack = () => {
		location.pathname === '/my-recipes/category/recipe'
			? navigate('/my-recipes/category')
			: navigate('/my-recipes')
	}

	return (
		<header className='header'>
			{state.btn_back ? (
				<button onClick={handleBack} className='header__arrow_link'>
					<Player
						autoplay={true}
						loop={true}
						hover={false}
						keepLastFrame={false}
						speed={0.5}
						src={arrow_back}
						style={{ height: '30px', width: '40px' }}
					/>
				</button>
			) : null}
			<Link to='/my-recipes/' className='header__link'>
				{state.title}
			</Link>
			{offline ? <p className='header__offline'>Offline</p> : null}
		</header>
	)
}
