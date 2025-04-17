import React, { useState } from 'react'
import './Form.css'

const RegisterForm = () => {
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [group, setGroup] = useState('')
	const [groupNumber, setGroupNumber] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const groupOptions = [
		'ИСИП',
		'ТН',
		'Э',
		'ОДЛ',
		'БР',
		'ПН',
		'ИСИПУ',
		'ОДЛУ',
		'ПСО',
		'ПСОУ',
		'ПСА',
	]

	const phoneRegex = /^\+7\d{10}$/

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (password !== confirmPassword) {
			setError('Пароли не совпадают')
			setLoading(false)
			return
		}

		if (!phoneRegex.test(phoneNumber)) {
			setError('Неверный формат номера телефона')
			setLoading(false)
			return
		}

		const user = { email, username, password, group, groupNumber, phoneNumber }

		try {
			const response = await fetch('/api/register', {
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
			alert('Регистрация успешна!')
		} catch (err) {
			setError(err.message)
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
				<div className="group-container">
					<div>
						<label>Группа</label>
						<select value={group} onChange={(e) => setGroup(e.target.value)} required>
							<option value="">Направление</option>
							{groupOptions.map((option, index) => (
								<option key={index} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<div>
						<label>Номер группы</label>
						<input
							type="text"
							value={groupNumber}
							onChange={(e) => setGroupNumber(e.target.value)}
							placeholder="Номер группы"
							required
						/>
					</div>
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
			{error && <div>{error}</div>}
		</div>
	)
}

export const Register = () => RegisterForm()
