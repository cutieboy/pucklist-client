import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

//Components
import Loader from './Loader'
import Game from './Game'

function Games() {
    const { currentUser } = useAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [gameData, setGameData] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const loadGameData = async() => {
        const gameAPI = 'http://localhost:5000/api/games'
        const playerAPI = "http://localhost:5000/api/players"

        const gameResponse = await fetch(gameAPI)
        const gameResponseData = await gameResponse.json()

        const playerResponse = await fetch(playerAPI)
        const playerResponseData = await playerResponse.json()

        setGameData(gameResponseData)
        setCurrentUserProfile(playerResponseData.find(player => player.email === currentUser.email))
        console.log(gameResponseData)

        setIsLoading(false)
    }
    
    useEffect(() => {
        loadGameData()
    }, [])
    
    if(isLoading) {
        return <Loader />
    }

    return (
        <div className="dashboard">
            <div className="content-container">
                <h3 className="content-title">Games</h3>
                <div className="content table-container">
                    <div className="table-header">
                        <p className="table-column table-small-column game-column game-btn-container"></p>
                        <p className="table-column table-small-column game-column">Date</p>
                        <p className="table-column table-small-column game-column">Time</p>
                        <p className="table-column table-medium-column game-column">Rink</p>
                        <p className="table-column table-medium-column game-column">Home</p>
                        <p className="table-column table-small-column game-column">Score (H)</p>
                        <p className="table-column table-medium-column game-column">Away</p>
                        <p className="table-column table-small-column game-column">Score (A)</p>
                        <p className="table-column table-small-column game-column">Status</p>
                        <p className="table-column table-small-column game-column">Playing</p>
                    </div>
                    {gameData.map((game, i) => {
                        return <Game currentUserProfile={currentUserProfile} game={game} gameIndex={i} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Games
