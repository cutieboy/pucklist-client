import React from 'react'
import { useState, useEffect } from 'react'
import TopNav from './TopNav'
import Loader from './Loader'

function Standings() {
    const [isLoading, setIsLoading] = useState(true)

    const API = 'http://localhost:5000/api/stats'

    const loadStandingsData = async(API) => {
        const response = await fetch(API)
        const data = await response.json()

        data.forEach((team) => {
            console.log(team)
        })

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
                <h3 className="content-title">Standings</h3>
                <div className="content table-container">
                    <div className="table-header">
                        <p className="table-column table-large-column">Team</p>
                        <p className="table-column table-small-column">GP</p>
                        <p className="table-column table-small-column">W</p>
                        <p className="table-column table-small-column">L</p>
                        <p className="table-column table-small-column">T</p>
                        <p className="table-column table-small-column">OTL</p>
                        <p className="table-column table-small-column">PTS</p>
                        <p className="table-column table-small-column">Streak</p>
                        <p className="table-column table-small-column">Tie Breaker</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Standings
