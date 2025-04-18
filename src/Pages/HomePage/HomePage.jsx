import React from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const Home = () => {
	return (
		<div className="home-container">
			<header className="header">
				<h1 className="title">Добро пожаловать в систему управления расписанием УРПЭТ</h1>
				<p className="subtitle">
					Эта система предназначена для студентов, преподавателей и администрации учебного
					заведения.
				</p>
			</header>

			<div className="button-container">
				<Link to="/login">
					<button className="btn-primary">Войти</button>
				</Link>

				<Link to="/user">
					<button className="btn-secondary">Продолжить как гость</button>
				</Link>
			</div>

			<footer className="footer">
				<p>© 2025 Система управления расписанием. Все права защищены.</p>
			</footer>
		</div>
	)
}

export const HomePage = () => Home()
