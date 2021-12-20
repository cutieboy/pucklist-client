import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

//Components
import Loader from './Loader'
import Game from './Game'

function Games(props) {
    const { currentUser } = useAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [gameData, setGameData] = useState([])
    const [currentUserProfile, setCurrentUserProfile] = useState({})

    const { transitions } = props

    const loadGameData = async() => {
        const gameAPI = 'http://localhost:5000/api/games'
        const playerAPI = "http://localhost:5000/api/players"

        const gameResponse = await fetch(gameAPI)
        const gameResponseData = await gameResponse.json()

        gameResponseData.sort((a, b) => {
            return new Date(a.date.split(' ')[1]) - new Date(b.date.split(' '[1]))
        })

        const playerResponse = await fetch(playerAPI)
        const playerResponseData = await playerResponse.json()
        if(currentUser) setCurrentUserProfile(playerResponseData.find(player => player.email === currentUser.email))

        setGameData(gameResponseData)

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
                <motion.h3 
                className="content-title"
                exit="out"
                animate="in"
                initial="out"
                variants={transitions}
                transition={{type: 'spring', bounce: '0.1', duration: 0.2}}
                >Games</motion.h3>
                <motion.div 
                className="content table-container"
                exit="out"
                animate="in"
                initial="out"
                variants={transitions}
                transition={{type: 'spring', bounce: '0.1', duration: 0.2}}
                >
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
                        return <Game reload={loadGameData} currentUserProfile={currentUserProfile} game={game} gameIndex={i} />
                    })}
                </motion.div>
            </div>
        </div>
    )
}

export default Games
