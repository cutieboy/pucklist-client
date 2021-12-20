import React, { useRef, useState } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

function UpdateProfile(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { updateEmail, updatePassword, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { transitions } = props

    function handleUpdateProfile(e) {
        e.preventDefault()
        setError('')

        if(passwordRef.current.value !== confirmPasswordRef.current.value) return setError('Passwords do not match')

        const promises = []
        if(emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push('/')
        }).catch((err) => {
            setError(err.message)
        }).finally(() => {
            setLoading(false)
        })
    }
    
    return (
        <>
            <div className="input-root">
                <motion.div 
                    className="input-container"
                    exit="out"
                    animate="in"
                    initial="out"
                    variants={transitions}
                    transition={{type: 'spring', bounce: '0.05', duration: 0.3}}
                >
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h3 className="content-title">Update Profile</h3>
                    <form onSubmit={handleUpdateProfile}>
                        <div className="form-group" id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="auth-input" ref={emailRef} type="email" defaultValue={currentUser.email} required />
                        </div>
                        <div className="form-group" id="password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control className="auth-input" ref={passwordRef} type="password" placeholder="Leave blank to keep the same" />
                        </div>
                        <div className="form-group" id="password">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control className="auth-input" ref={confirmPasswordRef} type="password" placeholder="Passwords must match" />
                        </div>
                        <button disable={loading} className="auth-button" style={{color: 'white'}} type="submit">Update</button>
                    </form>
                </motion.div>
            </div>
        </>
    )
}

export default UpdateProfile
