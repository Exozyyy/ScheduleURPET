import React, { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import * as XLSX from 'xlsx'

const TableHac = () => {
	const [timetable, setTimetable] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('/schedule.xlsx')
				if (!response.ok) {
					throw new Error('Ошибка при загрузке файла')
				}
				const abuf = await response.arrayBuffer()

				const workbook = XLSX.read(abuf, { type: 'array' })
				const sheetName = workbook.SheetNames[0]
				const sheet = workbook.Sheets[sheetName]
				const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })

				const parsedData = parseExcelData(data)
				setTimetable(parsedData)
				console.log(parsedData)
				setLoading(false)
			} catch (error) {
				setError(error)
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const parseExcelData = (data) => {
		const timetableData = []
		let currentDate = ''
		let currentSessions = []

		data.forEach((row, index) => {
			if (index < 1) return // Пропускаем первые строки

			const [date, ...sessions] = row

			if (date && date.includes('пара')) {
				if (currentDate) {
					timetableData.push({ date: currentDate, sessions: currentSessions })
				}
				currentDate = date
				currentSessions = sessions.map((session, i) => {
					const time = row[i * 2] // Время для пары
					const group = session || '' // Название группы
					const location = row[i * 2 + 1] || '' // Номер кабинета

					return {
						time,
						group,
						location,
					}
				})
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
					<tr></tr>
				</thead>
				<tbody>
					{timetable.map((day, index) => (
						<tr key={index}>
							<td rowSpan={day.sessions.length}>{day.date}</td>
							{day.sessions.map((session, i) => (
								<React.Fragment key={i}>
									<td>
										<div>
											{/* {`${date}`} */}
											{`${session.group}`}
										</div>
									</td>
								</React.Fragment>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TableHac
