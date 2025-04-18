import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageUser } from './Roles/Users/Table'
import { PageAdmin } from './Roles/Admin/adminTable'
import { HomePage } from './Pages/HomePage'
import { Register } from './Pages/Authorization/RegisterForm'
import { Login } from './Pages/Authorization/LoginForm'
import { PageTeachers } from './Roles/Admin/Schedule'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/user" element={<PageUser />} />
				<Route path="/admin" element={<PageAdmin />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/scheduleteachers" element={<PageTeachers />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
