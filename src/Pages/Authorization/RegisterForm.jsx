import React, { useState } from 'react'
import './Form.css'

const RegisterForm = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [loading, setLoading] = useState(false)

	const phoneRegex = /^\+7\d{10}$/

	const showNotification = (message, type = 'success') => {
		const notification = document.createElement('div')
		notification.classList.add('notification', type, 'show')
		notification.textContent = message
		document.body.appendChild(notification)

		// Убираем уведомление через 5 секунд
		setTimeout(() => {
			notification.classList.remove('show')
			setTimeout(() => {
				document.body.removeChild(notification)
			}, 500)
		}, 5000)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		setLoading(true)

		// Проверка на совпадение паролей
		if (password !== confirmPassword) {
			showNotification('Пароли не совпадают', 'error')
			setLoading(false)
			return
		}

		// Проверка на формат номера телефона
		if (!phoneRegex.test(phoneNumber)) {
			showNotification('Неверный формат номера телефона', 'error')
			setLoading(false)
			return
		}

		const role = 'student'
		const user = { username, email, phoneNumber, role, password }
		console.log(user)

		try {
			// Отправка данных на сервер
			const response = await fetch('http://127.0.0.1:8000/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			})

			if (!response.ok) {
				throw new Error('Ошибка регистрации')
			}

			const data = await response.json()

			localStorage.setItem('token', data.token)

			setLoading(false)
			showNotification('Регистрация успешна!')
		} catch (err) {
			showNotification(err.message, 'error') // Показываем ошибку с сервера
			setLoading(false)
		}
	}

	return (
		<div>
			<h2>Регистрация</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
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
				<div>
					<label>Подтверждение пароля</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Номер телефона</label>
					<input
						type="tel"
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						placeholder="+7xxxxxxxxxx"
						required
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? 'Загрузка...' : 'Зарегистрироваться'}
				</button>
			</form>
		</div>
	)
}

export const Register = () => RegisterForm()
