import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import '../styles/dashboard.css'

function Dashboard() {
    const [error, setError] = useState('')
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('./login')
        } catch(err) {
            setError(err.message)
        }
    }

    return (
        <div className="root-container">
            <div className="content"></div>
        </div>
    )
}

export default Dashboard
