import React from 'react'

const LogoutButton = () => {
	const handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('userRole')

		window.location.href = '/login'
	}

	const styles = {
		logoutButton: {
			position: 'fixed',
			top: '10px',
			right: '10px',
			backgroundColor: '#f44336',
			color: 'white',
			border: 'none',
			padding: '10px 20px',
			fontSize: '16px',
			cursor: 'pointer',
			borderRadius: '8px',
			transition: 'background-color 0.3s',
		},
	}

	return (
		<button onClick={handleLogout} style={styles.logoutButton}>
			Выйти
		</button>
	)
}

export default LogoutButton
