import React, {useState, useEffect} from 'react'

import TopNav from './TopNav'
import Loader from './Loader'

function Stats() {
    const [isLoading, setIsLoading] = useState(true)
    const [playerData, setPlayerData] = useState([])

    const API = 'http://localhost:5000/api/stats'

    const loadStandingsData = async(API) => {
        const response = await fetch(API)
        const data = await response.json()

        data.sort((a, b) => Number(a.points) < Number(b.points))

        setPlayerData(data)
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
                <h3 className="content-title">Stats</h3>
                <div className="content table-container">
                    <div className="table-header">
                        <p className="table-column table-large-column">Player</p>
                        <p className="table-column table-small-column">#</p>
                        <p className="table-column table-small-column">GP</p>
                        <p className="table-column table-small-column">G</p>
                        <p className="table-column table-small-column">A</p>
                        <p className="table-column table-small-column">PPG</p>
                        <p className="table-column table-small-column">SHG</p>
                        <p className="table-column table-small-column">SHA</p>
                        <p className="table-column table-small-column">GWG</p>
                        <p className="table-column table-small-column">GWA</p>
                        <p className="table-column table-small-column">PSG</p>
                        <p className="table-column table-small-column">ENG</p>
                        <p className="table-column table-small-column">SOG</p>
                        <p className="table-column table-small-column">PTS</p>
                    </div>
                    {playerData.map((player, i) => {
                        if(i % 2) {
                            return <div className="player-container player-container-odd">
                            <p className="table-row table-large-column" style={{color: 'var(--lightblue)'}}><strong>{player.name}</strong></p>
                            <p className="table-row table-small-column">{player.number}</p>
                            <p className="table-row table-small-column">{player.gamesPlayed}</p>
                            <p className="table-row table-small-column">{player.goals}</p>
                            <p className="table-row table-small-column">{player.assists}</p>
                            <p className="table-row table-small-column">{player.ppg}</p>
                            <p className="table-row table-small-column">{player.ppa}</p>
                            <p className="table-row table-small-column">{player.shg}</p>
                            <p className="table-row table-small-column">{player.gwg}</p>
                            <p className="table-row table-small-column">{player.gwa}</p>
                            <p className="table-row table-small-column">{player.psg}</p>
                            <p className="table-row table-small-column">{player.eng}</p>
                            <p className="table-row table-small-column">{player.sog}</p>
                            <p className="table-row table-small-column">{player.points}</p>
                        </div>
                        }

                        return <div className="player-container">
                            <p className="table-row table-large-column" style={{color: 'var(--lightblue)'}}><strong>{player.name}</strong></p>
                            <p className="table-row table-small-column">{player.number}</p>
                            <p className="table-row table-small-column">{player.gamesPlayed}</p>
                            <p className="table-row table-small-column">{player.goals}</p>
                            <p className="table-row table-small-column">{player.assists}</p>
                            <p className="table-row table-small-column">{player.ppg}</p>
                            <p className="table-row table-small-column">{player.ppa}</p>
                            <p className="table-row table-small-column">{player.shg}</p>
                            <p className="table-row table-small-column">{player.gwg}</p>
                            <p className="table-row table-small-column">{player.gwa}</p>
                            <p className="table-row table-small-column">{player.psg}</p>
                            <p className="table-row table-small-column">{player.eng}</p>
                            <p className="table-row table-small-column">{player.sog}</p>
                            <p className="table-row table-small-column">{player.points}</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Stats
