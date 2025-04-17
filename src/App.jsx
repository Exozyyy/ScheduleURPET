import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageUser } from './components/Users/Table'
import { PageAdmin } from './components/Admin/adminTable'
import { HomePage } from './Pages/HomePage'
import { Register } from './Pages/Authorization/RegisterForm'
import { Login } from './Pages/Authorization/LoginForm'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/user" element={<PageUser />} />
				<Route path="/admin" element={<PageAdmin />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
