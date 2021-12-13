import React, {useState, useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'

//Components
import Loader from './Loader'
import Player from './Player'
import PlayerAdmin from './PlayerAdmin'
import PlayerAdd from './PlayerAdd'

function Roster() {
    const { currentUser } = useAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [playerData, setPlayerData] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({})
    let playerIndex = 0

    const loadPlayerData = async() => {
        const API = 'http://localhost:5000/api/players'

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
        loadPlayerData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                playerIndex = i
                return <PlayerAdmin key={`player-${i}`} index={i} name={`${player.firstName} ${player.lastName}`} email={player.email} phoneNumber={player.phoneNumber} usah={player.usah} status={player.status} number={player.number} />
            }) : playerData.map((player, i) => {
                playerIndex = i
                if(player.email === currentUser.email) return <PlayerAdmin index={i} name={`${player.firstName} ${player.lastName}`} email={player.email} phoneNumber={player.phoneNumber} usah={player.usah} status={player.status} number={player.number} />
                return <Player key={`player-${i}`} index={i} name={`${player.firstName} ${player.lastName}`} email={player.email} phoneNumber={player.phoneNumber} usah={player.usah} status={player.status} number={player.number} />
            })}
            {currentUserProfile.role === 'Admin' && <PlayerAdd reload={loadPlayerData} />}
            </div>
        </div>
    )
}

export default Roster
