import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import '../styles/dashboard.css'

//Components
import Nav from './Nav'
import TopNav from './TopNav'

function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
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
        <div className="dashboard">
            <Nav />
            <div className="content-container">
                <TopNav />
            </div>
        </div>
    )
}

export default Dashboard
