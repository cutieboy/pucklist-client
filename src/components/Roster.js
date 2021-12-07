import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

//Components
import Loader from './Loader'
import AdminRoster from './AdminRoster'
import PlayerRoster from './PlayerRoster'

function Roster() {
    const { currentUser } = useAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [playerData, setPlayerData] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const API = 'http://localhost:5000/api/players'

    const loadPlayerData = async(API) => {
        const response = await fetch(API)
        const data = await response.json()

        setPlayerData(data)
        data.forEach((player) => {
            if(player.email === currentUser.email) {
                setCurrentUserProfile(player)
            }
        })

        setIsLoading(false)
    }

    useEffect(() => {
        loadPlayerData(API)
    }, [])

    if(isLoading) {
        return <Loader />
    }

    return (
        <div className="dashboard">
            <div className="content-container">
                {currentUserProfile.role === 'Admin' ? <AdminRoster /> : <PlayerRoster />}
            </div>
        </div>
    )
}

export default Roster
