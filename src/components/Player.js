import React from 'react'

function Player(props) {
    const { name, email, phoneNumber, usah, status, number, index } = props

    if(index % 2) {
        return (
            <div className="player-container player-container-odd">
                <p className="table-row table-large-column">{name}</p>
                <p className="table-row table-largest-column">{email}</p>
                <p className="table-row table-large-column">{phoneNumber}</p>
                <p className="table-row table-large-column">{usah}</p>
                <p className="table-row table-small-column">{status}</p>
                <p className="table-row table-small-column">{number}</p>
            </div>
        )
    }

    return (
        <div className="player-container player-container">
            <p className="table-row table-large-column">{name}</p>
            <p className="table-row table-largest-column">{email}</p>
            <p className="table-row table-large-column">{phoneNumber}</p>
            <p className="table-row table-large-column">{usah}</p>
            <p className="table-row table-small-column">{status}</p>
            <p className="table-row table-small-column">{number}</p>
        </div>
    )
}

export default Player
