import React, { useState, useEffect } from 'react'
import './app.css' // Импортируем CSS файл для стилей таблицы

const TableHac = () => {
	const [schedule, setSchedule] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [group, setGroup] = useState('ИСИП-306') // Изначально группа 'ИСИП-306'

	const groupOptions = [
		'ИСИП-118',
		'ТН-101',
		'Э-114',
		'ОДЛ-120',
		'ЮР-146',
		'ПН-101',
		'ИСИП-213',
		'ИСИП-215',
		'ИСИПу-216',
		'ИСИП-306',
		'ИСИП-309',
		'ИСИП-414(314)',
		'ИСИП-402',
		'ИСИП-403',
		'ЗУ-201',
		'Э-213',
		'ОДЛу-116(216)',
		'ОДЛу-119(219)',
		'ОДЛ-313(213)',
		'ПСОу-145(245)',
		'ПСА-201',
		'ПСО-328(238)',
		'ПСО-339(239)',
	]

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch(`http://localhost:8000/ras${group}`)
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				const data = await response.json()
				setSchedule(data.schedule)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [group]) // Загрузка данных при изменении группы

	const handleGroupChange = (e) => {
		setGroup(e.target.value) // Обновляем группу при изменении
	}

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	return (
		<div className="timetable-container">
			<div className="group-select">
				<label htmlFor="group-select">Выберите группу: </label>
				<select id="group-select" value={group} onChange={handleGroupChange}>
					{groupOptions.map((groupOption) => (
						<option key={groupOption} value={groupOption}>
							{groupOption}
						</option>
					))}
				</select>
			</div>

			<table>
				<thead>
					<tr>
						<th>Время</th>
						<th>Предмет</th>
						<th>Преподаватель</th>
						<th>Кабинет</th>
					</tr>
				</thead>
				<tbody>
					{schedule.map((day, index) => (
						<React.Fragment key={index}>
							<tr>
								<td colSpan="5" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
									{new Date(day.date).toLocaleDateString()}
								</td>
							</tr>
							{day.sessions.map((session, sessionIndex) => (
								<tr key={sessionIndex}>
									<td>{session.time}</td>
									<td>{session.subject}</td>
									<td>{session.teacher}</td>
									<td>{session.cabinet}</td>
								</tr>
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	)
}

export const PageUser = () => <TableHac />
