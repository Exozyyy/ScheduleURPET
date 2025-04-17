import React, { useState, useEffect } from 'react'

const TableHacAdmin = () => {
	const [schedule, setSchedule] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [editedCell, setEditedCell] = useState({})
	const [isEditing, setIsEditing] = useState(false)
	const [editedSchedule, setEditedSchedule] = useState(null) // Track edited data
	const [group, setGroup] = useState('ИСИП-309')
	const [teacher, setTeacher] = useState('') // Track teacher name
	const [isSaved, setIsSaved] = useState(true) // To track whether the data is saved

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch(`http://localhost:8000/ras${group}`)
				if (!response.ok) {
					throw new Error('Ошибка при загрузке данных')
				}
				const data = await response.json()
				console.log(data)
				setSchedule(data.schedule)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [group])
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch(`http://127.0.0.1:8000/by-teacher?name=${teacher}`)
				if (!response.ok) {
					throw new Error('Ошибка при загрузке данных')
				}
				const data = await response.json()
				console.log(data)
				setSchedule(data.schedule)
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
	})

	const handleCellClick = (dayIndex, sessionIndex, field) => {
		setEditedCell({ dayIndex, sessionIndex, field })
		setIsEditing(true)
	}

	const handleChange = (e) => {
		const { value } = e.target
		const { dayIndex, sessionIndex, field } = editedCell
		const updatedSchedule = [...schedule]
		updatedSchedule[dayIndex].sessions[sessionIndex][field] = value

		// Update the edited schedule state
		setEditedSchedule(updatedSchedule)
		setIsSaved(false) // Mark as unsaved
	}

	const handleBlur = () => {
		setIsEditing(false)
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			setIsEditing(false)
		}
	}

	const handleGroupChange = (e) => {
		setGroup(e.target.value)
	}

	const handleSave = async () => {
		if (editedSchedule) {
			setLoading(true)
			try {
				const response = await fetch(`http://localhost:8000/ras${group}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ schedule: editedSchedule }),
				})

				if (!response.ok) {
					throw new Error('Ошибка при сохранении данных')
				}

				const result = await response.json()
				console.log(result)

				setSchedule(editedSchedule)
				setIsSaved(true)
				alert('Расписание успешно сохранено!')
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
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
			<button id="buttonForTeacher" onClick={() => (window.location.href = '/scheduleteachers')}>
				Расписание для учителей
			</button>

			<div className="group-select">
				<label htmlFor="group-select">Выберите группу: </label>
				<select id="group-select" value={group} onChange={handleGroupChange}>
					<option value="ИСИП-118">ИСИП-118</option>
					<option value="ТН-101">ТН-101</option>
					<option value="Э-114">Э-114</option>
					<option value="ОДЛ-120">ОДЛ-120</option>
					<option value="ЮР-146">ЮР-146</option>
					<option value="ПН-101">ПН-101</option>
					<option value="ИСИП-213">ИСИП-213</option>
					<option value="ИСИП-215">ИСИП-215</option>
					<option value="ИСИПу-216">ИСИПу-216</option>
					<option value="ИСИП-306">ИСИП-306</option>
					<option value="ИСИП-309">ИСИП-309</option>
					<option value="ИСИП-414(314)">ИСИП-414(314)</option>
					<option value="ИСИП-402">ИСИП-402</option>
					<option value="ИСИП-403">ИСИП-403</option>
					<option value="ЗУ-201">ЗУ-201</option>
					<option value="Э-213">Э-213</option>
					<option value="ОДЛу-116(216)">ОДЛу-116(216)</option>
					<option value="ОДЛу-119(219)">ОДЛу-119(219)</option>
					<option value="ОДЛ-313(213)">ОДЛ-313(213)</option>
					<option value="ПСОу-145(245)">ПСОу-145(245)</option>
					<option value="ПСА-201">ПСА-201</option>
					<option value="ПСО-328(238)">ПСО-328(238)</option>
					<option value="ПСО-339(239)">ПСО-339(239)</option>
				</select>
			</div>

			{!isSaved && <button onClick={handleSave}>Сохранить изменения</button>}
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
								<td colSpan="5">{day.date}</td>
							</tr>
							{/* Сессии для этой даты */}
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
