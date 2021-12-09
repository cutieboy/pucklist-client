import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

//Components
import Loader from './Loader'
import Player from './Player'
import PlayerAdmin from './PlayerAdmin'

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
            <h3 className="content-title">Roster</h3>
            <div className="content table-container">
                <div className="table-header">
                    <p className="table-column table-large-column">Name</p>
                    <p className="table-column table-largest-column">Email</p>
                    <p className="table-column table-large-column">Phone Number</p>
                    <p className="table-column table-large-column">USAH #</p>
                    <p className="table-column table-small-column">Status</p>
                    <p className="table-column table-small-column" style={{marginRight: '50px'}}>Number</p>
                </div>
            </div>
            {currentUserProfile.role === 'Admin' ? playerData.map((player, i) => {
                return <PlayerAdmin index={i} name={`${player.firstName} ${player.lastName}`} email={player.email} phoneNumber={player.phoneNumber} usah={player.usah} status={player.status} number={player.number} />
            }) : playerData.map((player, i) => {
                if(player.email === currentUser.email) return <PlayerAdmin index={i} name={`${player.firstName} ${player.lastName}`} email={player.email} phoneNumber={player.phoneNumber} usah={player.usah} status={player.status} number={player.number} />
                return <Player index={i} name={`${player.firstName} ${player.lastName}`} email={player.email} phoneNumber={player.phoneNumber} usah={player.usah} status={player.status} number={player.number} />
            })}
            </div>
        </div>
    )
}

export default Roster
