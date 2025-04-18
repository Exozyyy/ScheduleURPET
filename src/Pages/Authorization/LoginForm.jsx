import React, { useState } from 'react'
import './Form.css'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		// Создаем строку с параметрами для отправки
		const formData = new URLSearchParams()
		formData.append('username', username)
		formData.append('password', password)

		try {
			const response = await fetch('http://127.0.0.1:8000/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(),
			})

			if (!response.ok) {
				throw new Error('Неверный логин или пароль')
			}

			const data = await response.json()

			localStorage.setItem('token', data.access_token)

			localStorage.setItem('refresh_token', data.refresh_token)
			const token = localStorage.getItem('token')

			if (token) {
				const decodedToken = jwtDecode(token)
				console.log(decodedToken)

				const userRole = decodedToken.sub
				console.log('User Role:', userRole)
				if (userRole === 'admin') {
					navigate('/admin')
				} else {
					navigate('/user')
				}
			}

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
					<label>email</label>
					<input
						type="email"
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
