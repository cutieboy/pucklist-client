import React from 'react'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import { motion } from 'framer-motion'

function Standings(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [standingsData, setStandingsData] = useState([])

    const { transitions } = props

    const API = 'http://localhost:5000/api/standings'

    const loadStandingsData = async(API) => {
        const response = await fetch(API)
        const data = await response.json()

        data.sort((a, b) => Number(a.points) < Number(b.points))
        setStandingsData(data)

        setIsLoading(false)
    }

    useEffect(() => {
        loadStandingsData(API)
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
                transition={{type: 'spring', bounce: '0.1', duration: 0.3}}
                >Standings</motion.h3>
                <motion.div 
                className="content table-container"
                exit="out"
                animate="in"
                initial="out"
                variants={transitions}
                transition={{type: 'spring', bounce: '0.05', duration: 0.3}}
                >
                    <div className="table-header">
                        <p className="table-column table-large-column">Team</p>
                        <p className="table-column table-small-column">GP</p>
                        <p className="table-column table-small-column">W</p>
                        <p className="table-column table-small-column">L</p>
                        <p className="table-column table-small-column">T</p>
                        <p className="table-column table-small-column">OTL</p>
                        <p className="table-column table-small-column">Streak</p>
                        <p className="table-column table-small-column">Tie Breaker</p>
                        <p className="table-column table-small-column">PTS</p>
                    </div>
                    {standingsData.map((team, i) => {
                        if(i % 2) {
                            return <div key={`team-${i}`} className="player-container player-container-odd">
                                <p className="table-row table-large-column" style={{color: 'var(--lightblue)'}}>{team.team}</p>
                                <p className="table-row table-small-column">{team.gp}</p>
                                <p className="table-row table-small-column">{team.w}</p>
                                <p className="table-row table-small-column">{team.l}</p>
                                <p className="table-row table-small-column">{team.t}</p>
                                <p className="table-row table-small-column">{team.otl}</p>
                                <p className="table-row table-small-column">{team.streak}</p>
                                <p className="table-row table-small-column">{team.tieBreaker}</p>
                                <p className="table-row table-small-column">{team.points}</p>
                            </div>
                        }

                        return <div key={`team-${i}`} className="player-container">
                                <p className="table-row table-large-column" style={{color: 'var(--lightblue)'}}>{team.team}</p>
                                <p className="table-row table-small-column">{team.gp}</p>
                                <p className="table-row table-small-column">{team.w}</p>
                                <p className="table-row table-small-column">{team.l}</p>
                                <p className="table-row table-small-column">{team.t}</p>
                                <p className="table-row table-small-column">{team.otl}</p>
                                <p className="table-row table-small-column">{team.streak}</p>
                                <p className="table-row table-small-column">{team.tieBreaker}</p>
                                <p className="table-row table-small-column">{team.points}</p>
                            </div>
                    })
                }
                </motion.div>
            </div>
        </div>
    )
}

export default Standings
