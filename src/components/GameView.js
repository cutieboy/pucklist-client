import React, {useState, useEffect} from 'react'

function GameView(props) {
    const { game, reload } = props
    const { isUndecided, isNotPlaying, isMaybePlaying, isPlaying } = game

    const handleStatus = async(currentStatus, newStatus, index) => {
        let gameAPI = `http://localhost:5000/api/games/${game.number}`

        try {
            const gameResponse = await fetch(gameAPI)
            const gameData = await gameResponse.json()

            gameData[newStatus].push(gameData[currentStatus][index])
            gameData[currentStatus].splice(index, 1)
            
            console.log(gameData[currentStatus])
            console.log(gameData[newStatus])

            const gamePatch = await fetch(gameAPI, {
                method: 'PATCH',
                body: JSON.stringify({[currentStatus]: gameData[currentStatus], [newStatus]: gameData[newStatus]}),
                headers: { 'Content-Type': 'application/json' }
            })

            await reload()

        } catch(err) {
            console.log({message: err})
        }

    }

    return (
        <div className="game-details">
            <div style={{border: '2px solid #6CC153'}} className="game-details-status">
                <h3 style={{background: '#6CC15E'}}>Playing</h3>
                {isPlaying.map((player, i) => {
                    return <div className="game-view-player">
                        <p onClick={() => console.log(player)} className="game-view-name">{player.firstName} {player.lastName}</p>
                        <div className="game-view-status">
                            <button onClick={() => handleStatus('isPlaying', 'isPlaying', i)} style={{background: '#6CC15E'}}></button>
                            <button onClick={() => handleStatus('isPlaying', 'isMaybePlaying', i)} style={{background: '#CFAE37'}}></button>
                            <button onClick={() => handleStatus('isPlaying', 'isNotPlaying', i)} style={{background: '#CA5D71'}}></button>
                        </div>
                    </div>
                })}
            </div>
            <div style={{border: '2px solid #CFAE37'}} className="game-details-status">
                <h3 style={{background: '#CFAE37'}}>Maybe</h3>
                {isMaybePlaying.map((player, i) => {
                    return <div className="game-view-player">
                        <p className="game-view-name">{player.firstName} {player.lastName}</p>
                        <div className="game-view-status">
                            <button onClick={() => handleStatus('isMaybePlaying', 'isPlaying', i)} style={{background: '#6CC15E'}}></button>
                            <button onClick={() => handleStatus('isMaybePlaying', 'isMaybePlaying', i)} style={{background: '#CFAE37'}}></button>
                            <button onClick={() => handleStatus('isMaybePlaying', 'isNotPlaying', i)} style={{background: '#CA5D71'}}></button>
                        </div>
                    </div>
                })}
            </div>
            <div style={{border: '2px solid #CA5D71'}} className="game-details-status">
                <h3 style={{background: '#CA5D71'}}>Not Playing</h3>
                {isNotPlaying.map((player, i) => {
                    return <div className="game-view-player">
                        <p className="game-view-name">{player.firstName} {player.lastName}</p>
                        <div className="game-view-status">
                            <button onClick={() => handleStatus('isNotPlaying', 'isPlaying', i)} style={{background: '#6CC15E'}}></button>
                            <button onClick={() => handleStatus('isNotPlaying', 'isMaybePlaying', i)} style={{background: '#CFAE37'}}></button>
                            <button onClick={() => handleStatus('isNotPlaying', 'isNotPlaying', i)} style={{background: '#CA5D71'}}></button>
                        </div>
                    </div>
                })}
            </div>
            <div style={{border: '2px solid #555'}} className="game-details-status">
                <h3 style={{background: '#555'}}>Undecided</h3>
                {isUndecided.map((player, i) => {
                    return <div className="game-view-player">
                        <p className="game-view-name">{player.firstName} {player.lastName}</p>
                        <div className="game-view-status">
                            <button onClick={() => handleStatus('isUndecided', 'isPlaying', i)} style={{background: '#6CC15E'}}></button>
                            <button onClick={() => handleStatus('isUndecided', 'isMaybePlaying', i)} style={{background: '#CFAE37'}}></button>
                            <button onClick={() => handleStatus('isUndecided', 'isNotPlaying', i)} style={{background: '#CA5D71'}}></button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default GameView
