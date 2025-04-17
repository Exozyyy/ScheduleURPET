import React, { useState, useEffect } from 'react'

const TableHacAdmin = () => {
	const [schedule, setSchedule] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [editedCell, setEditedCell] = useState({})
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch('/api/schedule')
				if (!response.ok) {
					throw new Error('Ошибка при загрузке данных')
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
	}, [])

	const handleCellClick = (dayIndex, sessionIndex, field) => {
		setEditedCell({ dayIndex, sessionIndex, field })
		setIsEditing(true)
	}

	const handleChange = (e) => {
		const { value } = e.target
		const { dayIndex, sessionIndex, field } = editedCell
		const updatedSchedule = [...schedule]
		updatedSchedule[dayIndex].sessions[sessionIndex][field] = value
		setSchedule(updatedSchedule)
	}

	const handleBlur = () => {
		setIsEditing(false)
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			setIsEditing(false)
		}
	}

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
					{schedule.map((day, dayIndex) => (
						<React.Fragment key={dayIndex}>
							<tr>
								<td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
									{day.date}
								</td>
							</tr>
							{day.sessions.map((session, sessionIndex) => (
								<tr key={sessionIndex}>
									<td>{session.time}</td>
									<td>
										{isEditing &&
										editedCell.dayIndex === dayIndex &&
										editedCell.sessionIndex === sessionIndex &&
										editedCell.field === 'subject' ? (
											<input
												type="text"
												value={session.subject}
												onChange={handleChange}
												onBlur={handleBlur}
												onKeyDown={handleKeyPress}
												autoFocus
											/>
										) : (
											<span
												onClick={() =>
													handleCellClick(dayIndex, sessionIndex, 'subject')
												}
											>
												{session.subject}
											</span>
										)}
									</td>
									<td>
										{isEditing &&
										editedCell.dayIndex === dayIndex &&
										editedCell.sessionIndex === sessionIndex &&
										editedCell.field === 'teacher' ? (
											<input
												type="text"
												value={session.teacher}
												onChange={handleChange}
												onBlur={handleBlur}
												onKeyDown={handleKeyPress}
												autoFocus
											/>
										) : (
											<span
												onClick={() =>
													handleCellClick(dayIndex, sessionIndex, 'teacher')
												}
											>
												{session.teacher}
											</span>
										)}
									</td>
									<td>
										{isEditing &&
										editedCell.dayIndex === dayIndex &&
										editedCell.sessionIndex === sessionIndex &&
										editedCell.field === 'cabinet' ? (
											<input
												type="text"
												value={session.cabinet}
												onChange={handleChange}
												onBlur={handleBlur}
												onKeyDown={handleKeyPress}
												autoFocus
											/>
										) : (
											<span
												onClick={() =>
													handleCellClick(dayIndex, sessionIndex, 'cabinet')
												}
											>
												{session.cabinet}
											</span>
										)}
									</td>
								</tr>
							))}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	)
}

export const PageAdmin = () => <TableHacAdmin />
