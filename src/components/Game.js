import React from 'react'

function Game(props) {
    const { currentUserProfile, game, gameIndex } = props

    return (
        <div className="game-container" style={{background: gameIndex % 2 ? 'var(--paleblue)' : 'white'}}>
            <div className="table-row table-small-column game-btn-container">
                <button className="game-btn">View</button>
            </div>
            <p className="table-row table-small-column">{game.date}</p>
            <p className="table-row table-small-column">{game.time}</p>
            <p className="table-row table-medium-column">{game.rink}</p>
            <p className="table-row table-medium-column" style={{fontWeight: game.homeScore > game.awayScore ? 'bold' : ''}}>{game.homeTeam}</p>
            <p className="table-row table-small-column" style={{fontWeight: game.homeScore > game.awayScore ? 'bold' : ''}}>{game.homeScore}</p>
            <p className="table-row table-medium-column" style={{fontWeight: game.awayScore > game.homeScore ? 'bold' : ''}}>{game.awayTeam}</p>
            <p className="table-row table-small-column" style={{fontWeight: game.awayScore > game.homeScore ? 'bold' : ''}}>{game.awayScore}</p>
            <p className="table-row table-small-column">Status</p>
            <p className="table-row table-small-column">{game.isPlaying.length}</p>
        </div>
    )
}

export default Game
