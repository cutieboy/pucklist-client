import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import '../styles/login.css'

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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
            <div className="login-container input-container">
                <h2>Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" id="email">
                        <label>Email</label>
                        <input ref={emailRef} type="email" required />
                    </div>
                    <div className="form-group" id="password">
                        <label>Password</label>
                        <input ref={passwordRef} type="password" required />
                    </div>
                    <button disable={loading} type="submit">Login</button>
                    <div>
                        <Link to="forgot-password">Forgot Password?</Link>
                    </div>
                </form>
            </div>
            <div className="input-nav">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}

export default Login
