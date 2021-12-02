import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

import '../styles/nav.css'

function TopNav() {
    const { getUserData } = useAuth()
    const [displayName, setDisplayName] = useState('')

    const findUser = async() => {
        try {
            const playerData = await getUserData()
            setDisplayName(playerData.firstName + " " + playerData.lastName)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        findUser()
    }, [])

    return (
        <div className="top-nav-container">
            <div className="profile-container">
                <img className="profile-pic" src="profile-pic-test.png" />
                <p>{displayName}</p>
            </div>
        </div>
    )
}

export default TopNav
