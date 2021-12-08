import React from 'react'
import Player from './Player'

function PlayerRoster(props) {
    const { playerData } = props
    
    return (
        <div className="player-roster">
            <div className="content table-container">
                <div className="table-header">
                    <p className="table-column table-large-column">Name</p>
                    <p className="table-column table-large-column">Email</p>
                    <p className="table-column table-large-column">Phone Number</p>
                    <p className="table-column table-large-column">USAH #</p>
                    <p className="table-column table-small-column">Status</p>
                    <p className="table-column table-small-column">Number</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerRoster
