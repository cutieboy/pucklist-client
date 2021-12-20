import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/login.css'

function Signup(props) {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const playerNumberRef = useRef()
    const phoneNumberRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const { transitions } = props

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        if(phoneNumberRef.current.value.length !== 10) {
            return setError('Phone number should be 10 digits ex. 4085555555')
        }

        const userData = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            number: playerNumberRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            email: emailRef.current.value,
            password: firstNameRef.current.value,
        }

        try {
            setError('')
            setLoading(true)
            await signup(userData)
            history.push("/")
        } catch(err) {
            setError(err.message)
        }
        setLoading(false)
    }
    
    return (
        <>
            <div className="input-root">
                <motion.div
                className="input-container signup-container"
                exit="out"
                animate="in"
                initial="out"
                variants={transitions}
                transition={{type: 'spring', bounce: '0.05', duration: 0.3}}
                >
                    <h3 className="content-title">Sign Up</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" id="firstName">
                            <label>First Name</label>
                            <input className="auth-input" ref={firstNameRef} type="text" required />
                        </div>
                        <div className="form-group" id="lastName">
                            <label>Last Name</label>
                            <input className="auth-input" ref={lastNameRef} type="text" required />
                        </div>
                        <div className="form-group" id="playerNumber">
                            <label>Player Number</label>
                            <input className="auth-input" ref={playerNumberRef} type="text" required />
                        </div>
                        <div className="form-group" id="phoneNumber">
                            <label>Phone Number</label>
                            <input className="auth-input" ref={phoneNumberRef} placeholder="ex. 4081234567" type="text" required />
                        </div>
                        <div className="form-group" id="email">
                            <label>Email</label>
                            <input className="auth-input" ref={emailRef} type="email" required />
                        </div>
                        <div className="form-group" id="password">
                            <label>Password</label>
                            <input className="auth-input" ref={passwordRef} type="password" required />
                        </div>
                        <div className="form-group" id="password-confirmation">
                            <label>Password Confirmation</label>
                            <input className="auth-input" ref={passwordConfirmRef} type="password" required />
                        </div>
                        <button disable={loading} className="auth-button" type="submit">Sign Up</button>
                    </form>
                </motion.div>
                <div className="input-nav">
                Already have an account? <Link className="input-link" to="/login">Log In</Link>
                </div>
            </div>
        </>
    )
}

export default Signup
