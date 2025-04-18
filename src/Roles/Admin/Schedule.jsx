import React, { useState, useEffect } from 'react'
import './Schedule.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import LogoutButton from './ButtonLogout'

const TeacherScheduleSearch = () => {
	const [teacherName, setTeacherName] = useState('')
	const [schedule, setSchedule] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			alert('Пожалуйста, войдите в систему!')
			navigate('/login')
			return
		}

		const decodedToken = jwtDecode(token)
		const userRole = decodedToken.sub

		if (userRole !== 'admin') {
			alert('У вас нет доступа к этой странице!')
			navigate('/user')
		}
	}, [navigate])
	const handleInputChange = (e) => {
		setTeacherName(e.target.value)
	}

	const handleSearch = async () => {
		if (!teacherName.trim()) {
			alert('Пожалуйста, введите имя преподавателя!')
			return
		}

		setLoading(true)
		setError(null)
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/by-teacher?name=${encodeURIComponent(teacherName)}`
			)
			if (!response.ok) {
				throw new Error('Ошибка при загрузке данных')
			}
			const data = await response.json()
			setSchedule(data)
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<div>
				<label htmlFor="teacherName">Введите имя преподавателя:</label>
				<input
					type="text"
					id="teacherName"
					value={teacherName}
					onChange={handleInputChange}
					placeholder="Введите фамилию"
				/>
			</div>

			<button onClick={handleSearch} disabled={loading}>
				{loading ? 'Поиск...' : 'Найти расписание'}
			</button>

			{error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}

			{schedule.length > 0 && (
				<table>
					<thead>
						<tr>
							<th>Преподаватель</th>
							<th>Группа</th>
							<th>Дата</th>
							<th>Время</th>
							<th>Предмет</th>
							<th>Кабинет</th>
						</tr>
					</thead>
					<tbody>
						{schedule.map((item, index) => (
							<tr key={index}>
								<td>{item.teacher}</td>
								<td>{item.group}</td>
								<td>{item.date}</td>
								<td>{item.time}</td>
								<td>{item.subject}</td>
								<td>{item.cabinet}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			{schedule.length === !0 && !loading && <div>{teacherName} отдыхает</div>}
		</div>
	)
}

export const PageTeachers = () => <TeacherScheduleSearch />
