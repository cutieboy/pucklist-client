import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/login.css'

function Login(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { transitions } = props

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }
    
    return (
        <div className="input-root">
            <motion.div 
                className="login-container input-container"
                exit="out"
                animate="in"
                initial="out"
                variants={transitions}
                transition={{type: 'spring', bounce: '0.05', duration: 0.3}}
            >
                <h3 className="content-title">Login</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" id="email">
                        <label>Email</label>
                        <input className="auth-input" ref={emailRef} type="email" required />
                    </div>
                    <div className="form-group" id="password">
                        <label>Password</label>
                        <input className="auth-input" ref={passwordRef} type="password" required />
                    </div>
                    <button className="auth-button" disable={loading} type="submit">Login</button>
                    <div>
                        <Link className="input-link" to="forgot-password">Forgot Password?</Link>
                    </div>
                </form>
            </motion.div>
            <div className="input-nav">
                Don't have an account? <Link className="input-link" to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default Login
