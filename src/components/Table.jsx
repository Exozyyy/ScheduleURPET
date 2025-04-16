import React, { useState, useEffect } from 'react'

const Timetable = () => {
	const [timetable, setTimetable] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const localData = [
			{
				date: '07.04.2025',
				sessions: [
					{
						time: '9:00-10:30',
						subject: 'Обеспечение качества функционирования КС',
						teacher: 'Бушева Е.В.',
						location: 'вебинар',
					},
					{
						time: '10:45-12:15',
						subject: 'Обеспечение качества функционирования КС',
						teacher: 'Бушева Е.В.',
						location: 'вебинар',
					},
					{
						time: '13:00-14:30',
						subject: 'Внедрение и поддержка компьютерных систем',
						teacher: 'Бушева Е.В.',
						location: 'вебинар',
					},
					{
						time: '14:40-16:10',
						subject: 'Внедрение и поддержка компьютерных систем',
						teacher: 'Бушева Е.В.',
						location: 'вебинар',
					},
					{
						time: '16:20-17:50',
						subject: 'Системное программирование',
						teacher: 'Старцев К.М.',
						location: 'Кабинет 308',
					},
					{
						time: '18:00-19:30',
						subject: 'Системное программирование',
						teacher: 'Старцев К.М.',
						location: 'Кабинет 308',
					},
				],
			},
			{
				date: '08.04.2025',
				sessions: [
					{
						time: '9:00-10:30',
						subject: 'Обеспечение качества функционирования КС',
						teacher: 'Бушева Е.В.',
						location: 'вебинар',
					},
					{
						time: '10:45-12:15',
						subject: 'Обеспечение качества функционирования КС',
						teacher: 'Бушева Е.В.',
						location: 'вебинар',
					},
					{
						time: '13:00-14:30',
						subject: 'Системное программирование',
						teacher: 'Старцев К.М.',
						location: 'Кабинет 308',
					},
					{
						time: '14:40-16:10',
						subject: 'Системное программирование',
						teacher: 'Старцев К.М.',
						location: 'Кабинет 308',
					},
					{
						time: '16:20-17:50',
						subject: 'Системное программирование',
						teacher: 'Старцев К.М.',
						location: 'Кабинет 308',
					},
					{
						time: '18:00-19:30',
						subject: 'Системное программирование',
						teacher: 'Старцев К.М.',
						location: 'Кабинет 308',
					},
				],
			},
		]

		setTimeout(() => {
			setTimetable(localData)
			setLoading(false)
		}, 1000)
	}, [])

	// useEffect(() => {
	//   fetch('/api/timetable')
	//     .then((response) => {
	//       if (!response.ok) {
	//         throw new Error('Ошибка сети');
	//       }
	//       return response.json();
	//     })
	//     .then((data) => {
	//       setTimetable(data);
	//       setLoading(false);
	//     })
	//     .catch((error) => {
	//       setError(error);
	//       setLoading(false);
	//     });
	// }, []);
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
						<th>1 пара</th>
						<th>2 пара</th>
						<th>3 пара</th>
						<th>4 пара</th>
						<th>5 пара</th>
						<th>6 пара</th>
					</tr>
				</thead>
				<tbody>
					{timetable.map((day, index) => (
						<tr key={index}>
							<td>{day.date}</td>
							{day.sessions.map((session, i) => (
								<td key={i}>
									<div>{session.time}</div>
									<div>{session.subject}</div>
									<div>{session.teacher}</div>
									<div>{session.location}</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Timetable
