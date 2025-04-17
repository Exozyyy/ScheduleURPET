import React, { useState, useEffect } from 'react'
import './app.css'

const TableHac = () => {
	const [schedule, setSchedule] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch('/api/schedule')
				if (!response.ok) {
					throw new Error(response.statusText)
				}
				const data = await response.json()
				setSchedule(data.schedule)
				setLoading(false)
			} catch (error) {
				setError(error.message)
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error}</div>
	}

	return (
		<div className="timetable-container">
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
								<td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
									{new Date(day.date).toLocaleDateString()}{' '}
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
export const PageUser = () => TableHac()
