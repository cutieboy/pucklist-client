import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const { updateEmail, updatePassword, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

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
                <div className="input-container">
                    {error && <Alert variant="danger">{error}</Alert>}
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
                        <button disable={loading} className="input-link" style={{color: 'white'}} type="submit">Update</button>
                    </form>
                </div>
            </div>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile
