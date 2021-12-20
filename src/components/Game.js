import React, { useState } from 'react'

import GameView from './GameView'

function Game(props) {
    const [gameView, setGameView] = useState(false)

    const { currentUserProfile, game, gameIndex, reload } = props

    return (
        <div className="game-container" style={{background: gameIndex % 2 ? 'var(--paleblue)' : 'white', height: gameView ? '460px' : '60px'}}>
            <div className="game-view-container">
                <div className="table-row table-small-column game-btn-container">
                    <button className="game-btn" onClick={() => setGameView(!gameView)}>View</button>
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
            {gameView && <GameView reload={reload} game={game} />}
        </div>
    )
}

export default Game
