import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const API = 'http://localhost:5000/api/players'

    async function signup(obj) {
        const playerData = {
            firstName: obj.firstName,
            lastName: obj.lastName,
            email: obj.email,
            phoneNumber: obj.phoneNumber,
            number: obj.number
        }

        await fetch(API, {
                method: 'POST',
                body: JSON.stringify(playerData),
                headers: { 'Content-Type': 'application/json' }
        })
        return auth.createUserWithEmailAndPassword(obj.email, obj.password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function forgotPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function returnUserData() {
        return console.log(currentUser)
        // return currentUser.getIdToken().then((val) => {
        //     console.log(val)
        // })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
    
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        forgotPassword,
        updateEmail,
        updatePassword,
        returnUserData
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
