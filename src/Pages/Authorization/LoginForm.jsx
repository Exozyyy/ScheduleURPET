import React, { useState, useEffect } from 'react'
import './Form.css'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		const user = { username, password }

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})

			if (!response.ok) {
				throw new Error('Неверный логин или пароль')
			}

			const data = await response.json()

			localStorage.setItem('token', data.token)

			setLoading(false)
			alert('Вход успешен!')
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
	}

	return (
		<div>
			<h2>
				Система управления <br />
				Вход
			</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Логин</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Пароль</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? 'Загрузка...' : 'Войти'}
				</button>
			</form>
			<div id="register">
				<p>
					Нет аккаунта? <a href="/register">Зарегистрируйтесь</a>
				</p>
				<p>
					Забыли пароль? <a href="/reset-password">Восстановить пароль</a>
				</p>
			</div>
			{error && <div>{error}</div>}
		</div>
	)
}

export const Login = () => LoginForm()
