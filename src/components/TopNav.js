import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

import '../styles/nav.css'

function TopNav() {
    //TODO: Find a better way to store the display name ?? maybe useEffectOnce or store displayName upon login
    const { currentUser, getUserData } = useAuth()
    const [displayName, setDisplayName] = useState('')

    const findUser = async() => {
        try {
            const playerData = await getUserData()
            setDisplayName(playerData.firstName + " " + playerData.lastName)
        } catch(err) {
            console.log(err)
        }
    }

    if(currentUser) {
        findUser()
    }

    return (
        <div className="top-nav-container">
            <div className="profile-container">
                <img alt="profile" className="profile-pic" src="profile-pic-test.png" />
                {currentUser && <p>{displayName}</p>}
            </div>
        </div>
    )
}

export default TopNav
