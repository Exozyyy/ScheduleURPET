import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'

const Timetable = () => {
	const [timetable, setTimetable] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch('/schedule.xlsx')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Ошибка при загрузке файла')
				}
				return response.arrayBuffer()
			})
			.then((abuf) => {
				const workbook = XLSX.read(abuf, { type: 'array' })
				const sheetName = workbook.SheetNames[0]
				const sheet = workbook.Sheets[sheetName]
				const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })

				const parsedData = parseExcelData(data)
				setTimetable(parsedData)
				setLoading(false)
			})
			.catch((error) => {
				setError(error)
				setLoading(false)
			})
	}, [])

	const parseExcelData = (data) => {
		const timetableData = []
		let currentDate = ''
		let currentSessions = []

		data.forEach((row, index) => {
			if (index === 0) return

			const [date, time, subject, teacher, location] = row

			if (date) {
				if (currentDate) {
					timetableData.push({ date: currentDate, sessions: currentSessions })
				}
				currentDate = date
				currentSessions = []
			}

			if (time && subject) {
				currentSessions.push({ time, subject, teacher, location })
			}
		})

		if (currentDate) {
			timetableData.push({ date: currentDate, sessions: currentSessions })
		}

		return timetableData
	}

	if (loading) {
		return <div>Загрузка...</div>
	}

	if (error) {
		return <div>Ошибка: {error.message}</div>
	}

	return (
		<div className="timetable-container">
			<table>
				<thead>
					<tr>
						<th>Дата</th>
						<th>Время</th>
						<th>Предмет</th>
						<th>Преподаватель</th>
						<th>Место</th>
					</tr>
				</thead>
				<tbody>
					{timetable.map((day, index) => (
						<tr key={index}>
							<td rowSpan={day.sessions.length}>{day.date}</td>
							{day.sessions.map((session, i) => (
								<React.Fragment key={i}>
									{i > 0 && <tr></tr>}
									<td>{session.time}</td>
									<td>{session.subject}</td>
									<td>{session.teacher}</td>
									<td>{session.location}</td>
								</React.Fragment>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Timetable
