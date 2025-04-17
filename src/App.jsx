import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserSchedule from './components/Users/Table'
import AdminTable from './components/Admin/adminTable'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/schedule" element={<Schedule />} />
			</Routes>
		</Router>
	)
}

export default App
