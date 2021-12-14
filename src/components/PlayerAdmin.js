import React, {useState, useRef} from 'react'

function PlayerAdmin(props) {
    const { name, email, phoneNumber, usah, status, number, index } = props
    const [editable, setEditable] = useState(false)
    const [playerPhoneNumber, setPlayerPhoneNumber] = useState(phoneNumber)
    const [playerUsah, setPlayerUsah] = useState(usah)
    const [playerStatus, setPlayerStatus] = useState(status)
    const [playerNumber, setPlayerNumber] = useState(number)

    const playerInput = useRef()
    const API = 'http://localhost:5000/api/players'

    const handlePlayerSubmit = async(e) => {
        e.preventDefault()
        let reqBody = {}

        const changePlayerState = async() => {
            if(reqBody.phoneNumber) {
                setPlayerPhoneNumber(reqBody.phoneNumber)
            }
            if(reqBody.usah) {
                setPlayerUsah(reqBody.usah)
            }
            if(reqBody.status) {
                setPlayerStatus(reqBody.status)
            }
            if(reqBody.number) {
                setPlayerNumber(reqBody.number)
            }
        }

        try {
            if(e.target[0].value) {
                reqBody.phoneNumber = e.target[0].value
            }
            if(e.target[1].value) {
                reqBody.usah = e.target[1].value
            }
            if(e.target[2].value) {
                reqBody.status = e.target[2].value
            }
            if(e.target[3].value) {
                reqBody.number = e.target[3].value
            }

            const response = await fetch(`${API}/${email}`, {
                method: 'PATCH',
                body: JSON.stringify(reqBody),
                headers: { 'Content-Type': 'application/json' }
            })
            if(response.ok) {
                changePlayerState()
            }

            reqBody = {}
        } catch(err) {
            console.log({message: err})
            reqBody = {}
        }
    }

    if(index % 2) {
        if(editable) {
            return (
            <form onSubmit={(e) => {
                handlePlayerSubmit(e)
                setEditable(false)
            }} className="player-root-container player-root-container-odd">
                <div ref={playerInput} className="player-container player-container-odd">
                    <p className="table-row table-large-column" style={{color: "var(--lightblue)"}}>{name}</p>
                    <p className="table-row table-largest-column">{email}</p>
                    <input type="text" placeholder={playerPhoneNumber} className="table-row table-large-column" />
                    <input type="text" placeholder={playerUsah ? playerUsah : "USAH #"} className="table-row table-large-column" />
                    <select name="status" id="status" className="table-row table-small-column table-dropdown">
                        <option name="status" id="status">Full</option>
                        <option value="Half">Half</option>
                        <option value="Sub">Sub</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="text" placeholder={playerNumber} className="table-row table-small-column" />
                </div>
                <button type="submit" className="player-edit player-edit-odd player-edit-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19.375C15.1777 19.375 19.375 15.1777 19.375 10C19.375 4.82233 15.1777 0.625 10 0.625C4.82233 0.625 0.625 4.82233 0.625 10C0.625 15.1777 4.82233 19.375 10 19.375Z" fill="#2D5B75"/>
                        <path d="M14.375 4.375L7.8125 11.125L5.625 8.875L3.4375 11.125L7.8125 15.625L16.5625 6.625L14.375 4.375Z" fill="var(--paleblue)"/>
                    </svg>
                </button>
                <div onClick={() => setEditable(false)} className="player-edit player-edit-odd">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 1C5.47 1 1 5.47 1 11C1 16.53 5.47 21 11 21C16.53 21 21 16.53 21 11C21 5.47 16.53 1 11 1ZM16 14.59L14.59 16L11 12.41L7.41 16L6 14.59L9.59 11L6 7.41L7.41 6L11 9.59L14.59 6L16 7.41L12.41 11L16 14.59Z" fill="#2D5B75"/>
                    </svg>
                </div>
            </form>
            )
        }
        return (
        <div className="player-root-container">
            <div ref={playerInput} className="player-container player-container-odd">
                <p className="table-row table-large-column" style={{color: "var(--lightblue)"}}>{name}</p>
                <p className="table-row table-largest-column">{email}</p>
                <p className="table-row table-large-column">{playerPhoneNumber}</p>
                <p className="table-row table-large-column">{playerUsah}</p>
                <p className="table-row table-small-column">{playerStatus}</p>
                <p className="table-row table-small-column">{playerNumber}</p>
            </div>
            <div className="player-edit player-edit-odd">
                <svg></svg>
            </div>
            <div onClick={() => setEditable(true)} className="player-edit player-edit-odd">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.87534 10.311L1.0309 13.9555C1.00177 14.0887 1.00277 14.2268 1.03382 14.3595C1.06488 14.4923 1.1252 14.6165 1.21039 14.723C1.29558 14.8295 1.40349 14.9156 1.52622 14.975C1.64895 15.0345 1.78342 15.0658 1.91979 15.0666C1.98333 15.073 2.04736 15.073 2.1109 15.0666L5.77756 14.2222L12.8176 7.20882L8.88868 3.28882L1.87534 10.311Z" fill="#2D5B75"/>
                        <path d="M15.0311 3.6979L12.4089 1.07568C12.2365 0.904151 12.0032 0.807861 11.76 0.807861C11.5168 0.807861 11.2835 0.904151 11.1111 1.07568L9.65332 2.53346L13.5778 6.4579L15.0355 5.00012C15.1209 4.91438 15.1884 4.81266 15.2344 4.70077C15.2803 4.58889 15.3038 4.46904 15.3034 4.34809C15.3029 4.22714 15.2787 4.10745 15.232 3.99589C15.1853 3.88432 15.117 3.78306 15.0311 3.6979Z" fill="#2D5B75"/>
                </svg>
            </div>
        </div>
        )
    }

    if(editable) {
        return (
        <form  onSubmit={(e) => {
            handlePlayerSubmit(e)
            setEditable(false)
        }} className="player-root-container">
            <div ref={playerInput} className="player-container">
                <p className="table-row table-large-column" style={{color: "var(--lightblue)"}}>{name}</p>
                <p className="table-row table-largest-column">{email}</p>
                <input type="text" placeholder={playerPhoneNumber} className="table-row table-large-column" />
                <input type="text" placeholder={playerUsah} className="table-row table-large-column" />
                <input type="text" placeholder={playerStatus} className="table-row table-small-column" /> 
                <input type="text" placeholder={playerNumber} className="table-row table-small-column" />
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
    return (
    <div className="player-root-container">
        <div ref={playerInput} className="player-container">
            <p className="table-row table-large-column" style={{color: "var(--lightblue)"}}>{name}</p>
            <p className="table-row table-largest-column">{email}</p>
            <p className="table-row table-large-column">{playerPhoneNumber}</p>
            <p className="table-row table-large-column">{playerUsah}</p>
            <p className="table-row table-small-column">{playerStatus}</p>
            <p className="table-row table-small-column">{playerNumber}</p>
        </div>
        <div className="player-edit player-edit-blank">
            <svg></svg>
        </div>
        <div onClick={() => setEditable(true)} className="player-edit">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.87534 10.311L1.0309 13.9555C1.00177 14.0887 1.00277 14.2268 1.03382 14.3595C1.06488 14.4923 1.1252 14.6165 1.21039 14.723C1.29558 14.8295 1.40349 14.9156 1.52622 14.975C1.64895 15.0345 1.78342 15.0658 1.91979 15.0666C1.98333 15.073 2.04736 15.073 2.1109 15.0666L5.77756 14.2222L12.8176 7.20882L8.88868 3.28882L1.87534 10.311Z" fill="#2D5B75"/>
                    <path d="M15.0311 3.6979L12.4089 1.07568C12.2365 0.904151 12.0032 0.807861 11.76 0.807861C11.5168 0.807861 11.2835 0.904151 11.1111 1.07568L9.65332 2.53346L13.5778 6.4579L15.0355 5.00012C15.1209 4.91438 15.1884 4.81266 15.2344 4.70077C15.2803 4.58889 15.3038 4.46904 15.3034 4.34809C15.3029 4.22714 15.2787 4.10745 15.232 3.99589C15.1853 3.88432 15.117 3.78306 15.0311 3.6979Z" fill="#2D5B75"/>
            </svg>
        </div>
    </div>
    )
}

export default PlayerAdmin
