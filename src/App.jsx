import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageUser } from './components/Users/Table'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PageUser />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
