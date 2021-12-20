import React, {useState, useRef} from 'react'

function PlayerAdd(props) {
    const { reload } = props

    const [editable, setEditable] = useState(false)

    const playerInput = useRef()
    const API = 'http://localhost:5000/api/players'
    const gameAPI = 'http://localhost:5000/api/games'

    const handlePlayerSubmit = async(e) => {
        e.preventDefault()
        let reqBody = {}

        reqBody.firstName = e.target[0].value
        e.target[0].value = ''

        reqBody.lastName = e.target[1].value
        e.target[1].value = ''

        reqBody.email = e.target[2].value
        e.target[2].value = ''

        reqBody.phoneNumber = e.target[3].value
        e.target[3].value = ''

        if(e.target[4].value) {
            reqBody.usah = e.target[4].value
            e.target[4].value = ''
        }

        reqBody.status = e.target[5].value
        e.target[5].value = ''

        reqBody.number = e.target[6].value
        e.target[6].value = ''


        try {
            const playerResponse = await fetch(API, {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: { 'Content-Type': 'application/json' }
            })

            console.log(playerResponse)

            const gameResponse = await fetch(gameAPI)
            const gameData = await gameResponse.json()

            gameData.forEach(async game => {
                const player = await fetch(`${API}/${reqBody.email}`)
                const playerData = await player.json()

                let isUndecided = game.isUndecided
                isUndecided.push(playerData)

                const gameDataResponse = await fetch(`${gameAPI}/${game.number}`, {
                    method: 'PATCH',
                    body: JSON.stringify({isUndecided: isUndecided}),
                    headers: { 'Content-Type': 'application/json' }
                })
            })

            await reload()
            setEditable(false)
            reqBody = {}
        } catch(err) {
            console.log({message: err})
            reqBody = {}
        }
    }

    if(!editable) {
        return <div className="player-root-container">
            <button className="player-add-new-btn" onClick={() => setEditable(true)} >
                <svg width="75" height="75" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0ZM21.0083 10.91H28.9917V21.0083H39.09V28.9917H28.9917V39.09H21.0083V28.9917H10.91V21.0083H21.0083V10.91Z" fill="var(--lightbluehover)"/>
                </svg>
            </button>
        </div>
    }

    return (
        <form  onSubmit={(e) => {
            handlePlayerSubmit(e)
        }} className="player-root-container">
            <div ref={playerInput} className="player-container">
                <input style={{marginLeft: '10px'}} type="text" id="firstName" placeholder="First Name" required className="table-row table-small-column" />
                <input type="text" id="lastName" placeholder="Last Name" required className="table-row table-small-column" />
                <input type="text" id="email" placeholder="Email" required className="table-row table-largest-column" />
                <input type="text" id="phoneNumber" placeholder="Phone Number" className="table-row table-large-column" />
                <input type="text" id="usah" placeholder="USAH #" className="table-row table-large-column" />
                <select name="status" id="status" className="table-row table-small-column table-dropdown">
                    <option name="status" id="status">Full</option>
                    <option value="Half">Half</option>
                    <option value="Sub">Sub</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" id="number" placeholder="Number" required className="table-row table-small-column" />
            </div>
            <button type="submit" className="player-edit player-edit-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19.375C15.1777 19.375 19.375 15.1777 19.375 10C19.375 4.82233 15.1777 0.625 10 0.625C4.82233 0.625 0.625 4.82233 0.625 10C0.625 15.1777 4.82233 19.375 10 19.375Z" fill="#2D5B75"/>
                        <path d="M14.375 4.375L7.8125 11.125L5.625 8.875L3.4375 11.125L7.8125 15.625L16.5625 6.625L14.375 4.375Z" fill="white"/>
                    </svg>
            </button>
            <div onClick={() => setEditable(false)} className="player-edit">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1C5.47 1 1 5.47 1 11C1 16.53 5.47 21 11 21C16.53 21 21 16.53 21 11C21 5.47 16.53 1 11 1ZM16 14.59L14.59 16L11 12.41L7.41 16L6 14.59L9.59 11L6 7.41L7.41 6L11 9.59L14.59 6L16 7.41L12.41 11L16 14.59Z" fill="#2D5B75"/>
                </svg>
            </div>
        </form>
    )
}

export default PlayerAdd
