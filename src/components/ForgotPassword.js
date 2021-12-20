import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function ForgotPassword(props) {
    const emailRef = useRef()
    const { forgotPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const { transitions } = props

    async function handleForgotPassword(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setMessage(`If the email exists, an email has been sent to ${emailRef.current.value}.`)
            setLoading(true)
            await forgotPassword(emailRef.current.value)
        } catch(err) {
            return null;
        }
        setLoading(false)
    }
    
    return (
        <>
            <div className="input-root">
                <motion.div
                className="input-container forgot-password-container"
                exit="out"
                animate="in"
                initial="out"
                variants={transitions}
                transition={{type: 'spring', bounce: '0.05', duration: 0.3}}
                >
                    <h3 className="content-title">Reset Password</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <form onSubmit={handleForgotPassword}>
                        <div className="form-group" id="email">
                            <label>Email</label>
                            <input className="auth-input" ref={emailRef} type="email" required />
                        </div>
                        <button disable={loading} className="auth-button" type="submit">Reset Password</button>
                        <div className="input-nav">
                            <Link className="input-link" to="/login">Back to Login</Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </>
    )
}

export default ForgotPassword
