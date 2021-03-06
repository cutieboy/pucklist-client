import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import '../styles/nav.css'

function Nav() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const location = useLocation()
    const splitLocation = location.pathname.split('/')
    
    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/login')
        } catch(err) {
            setError(err.message)
        }
    }

    return (
        <nav className="nav-container">
            <h2 className="nav-title">Pucklist</h2>
            {error && <div>error</div>}
            <p className="nav-section-title">Hockey</p>
            <NavLink activeClassName={splitLocation[1] === "" ? "active-link" : ""} to="/" className="nav-link-container">
                <div className="nav-icon-container">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 13V16H2V12H1C0.45 12 0 12.45 0 13ZM7 12H3V16L7.69 15.99C8.07 15.99 8.41 15.78 8.58 15.44L9.45 13.54L7.86 10.06L7 12ZM19.71 12.29C19.6167 12.1972 19.5059 12.1238 19.384 12.074C19.2621 12.0242 19.1316 11.9991 19 12H18V16H20V13C20 12.72 19.89 12.47 19.71 12.29ZM11.6 8.84L15.65 0H12.3L10.54 3.97L10.05 5.07L10 5.21L7.7 0H4.35L8.4 8.84L9.92 12.16L10 12.34L11.42 15.44C11.59 15.78 11.93 15.99 12.31 15.99L17 16V12H13L11.6 8.84Z" fill="#E5E1E7"/>
                    </svg>
                </div>
                <p className="nav-link-text">Games</p>
            </NavLink>
            <NavLink activeClassName={splitLocation[1] === "standings" ? "active-link" : ""} to="/standings" className="nav-link-container">
                <div className="nav-icon-container">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_47_2773)">
                        <path d="M6.625 1.75H20.125V3.25H6.625V1.75Z" fill="#E5E1E7"/>
                        <path d="M6.625 9.25H20.125V10.75H6.625V9.25Z" fill="#E5E1E7"/>
                        <path d="M6.625 16.75H20.125V18.25H6.625V16.75Z" fill="#E5E1E7"/>
                        <path d="M3.625 5.5V-0.125H0.625V1.375H2.125V5.5H3.625Z" fill="#E5E1E7"/>
                        <path d="M0.625 10.2865V12.625H4.375V11.125H2.30205L4.375 10.0885V7H0.625V8.5H2.875V9.16145L0.625 10.2865Z" fill="#E5E1E7"/>
                        <path d="M0.625 18.625V20.125H4.375V14.125H0.625V15.625H2.875V16.375H1.75V17.875H2.875V18.625H0.625Z" fill="#E5E1E7"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_47_2773">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
                <p className="nav-link-text">Standings</p>
            </NavLink>
            <NavLink activeClassName={splitLocation[1] === "stats" ? "active-link" : ""} to="/stats" className="nav-link-container">
                <div className="nav-icon-container">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_47_2781)">
                        <path d="M0.35301 10.5731C-0.33099 12.4711 -0.42199 14.4471 0.79101 15.6721L1.02501 15.9101C2.02955 16.9266 3.03755 17.9396 4.04901 18.9491C5.32901 20.2291 7.35301 20.2491 9.33701 19.6091C11.364 18.9541 13.587 17.5481 15.563 15.5721C17.539 13.5961 18.945 11.3721 19.6 9.34613C20.24 7.36213 20.22 5.33713 18.94 4.05713C17.9737 3.08914 17.01 2.11847 16.049 1.14513L15.686 0.779134L15.684 0.781134C14.459 -0.432866 12.483 -0.342866 10.584 0.341134C8.61901 1.05013 6.43501 2.48413 4.46501 4.45413C2.49501 6.42413 1.06101 8.60813 0.35301 10.5731ZM15.49 4.87013V4.87313L15.489 4.87713L15.487 4.88813L15.48 4.92513C15.4413 5.11905 15.3956 5.31151 15.343 5.50213C15.239 5.88213 15.068 6.41513 14.799 7.04413C14.0769 8.71954 13.0417 10.2418 11.749 11.5291C10.0115 13.2536 7.8928 14.5454 5.56401 15.3001C5.36583 15.3631 5.16574 15.4197 4.96401 15.4701L4.92601 15.4781L4.91501 15.4811H4.91001L4.90701 15.4821C4.90701 15.4821 4.15801 15.5661 4.01601 14.9071C3.97439 14.7132 4.01132 14.5106 4.11871 14.3438C4.22611 14.177 4.39521 14.0595 4.58901 14.0171L4.59001 14.0161H4.59301L4.61501 14.0101L4.71401 13.9851C4.80401 13.9621 4.93901 13.9251 5.11201 13.8691C5.46001 13.7601 5.95901 13.5831 6.54901 13.3161C8.08749 12.6222 9.48902 11.6579 10.687 10.4691C11.8448 9.31677 12.772 7.95407 13.419 6.45413C13.658 5.89513 13.807 5.42813 13.896 5.10413C13.938 4.95312 13.9747 4.8007 14.006 4.64713C14.079 4.24313 14.452 3.94013 14.87 4.00913C14.9673 4.02493 15.0605 4.05973 15.1443 4.11156C15.2281 4.16338 15.3008 4.23121 15.3584 4.31117C15.416 4.39113 15.4572 4.48165 15.4798 4.57756C15.5024 4.67347 15.5059 4.77289 15.49 4.87013Z" fill="#E5E1E7"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_47_2781">
                        <rect width="20" height="20" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
                <p className="nav-link-text">Stats</p>
            </NavLink>
            <NavLink activeClassName={splitLocation[1] === "roster" ? "active-link" : ""} to="/roster" className="nav-link-container">
                <div className="nav-icon-container">
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5.33325H14V6.66659H8V5.33325Z" fill="#E5E1E7"/>
                        <path d="M8 8H14V9.33333H8V8Z" fill="#E5E1E7"/>
                        <path d="M8 10.6667H14V12.0001H8V10.6667Z" fill="#E5E1E7"/>
                        <path d="M8 13.3333H14V14.6666H8V13.3333Z" fill="#E5E1E7"/>
                        <path d="M8 16H14V17.3333H8V16Z" fill="#E5E1E7"/>
                        <path d="M5.33331 5.33325H6.66665V6.66659H5.33331V5.33325Z" fill="#E5E1E7"/>
                        <path d="M5.33331 8H6.66665V9.33333H5.33331V8Z" fill="#E5E1E7"/>
                        <path d="M5.33331 10.6667H6.66665V12.0001H5.33331V10.6667Z" fill="#E5E1E7"/>
                        <path d="M5.33331 13.3333H6.66665V14.6666H5.33331V13.3333Z" fill="#E5E1E7"/>
                        <path d="M5.33331 16H6.66665V17.3333H5.33331V16Z" fill="#E5E1E7"/>
                        <path d="M16.6667 1.33325H3.33333C2.97971 1.33325 2.64057 1.47373 2.39052 1.72378C2.14048 1.97382 2 2.31296 2 2.66659V21.3333C2 21.6869 2.14048 22.026 2.39052 22.2761C2.64057 22.5261 2.97971 22.6666 3.33333 22.6666H16.6667C17.0203 22.6666 17.3594 22.5261 17.6095 22.2761C17.8595 22.026 18 21.6869 18 21.3333V2.66659C18 2.31296 17.8595 1.97382 17.6095 1.72378C17.3594 1.47373 17.0203 1.33325 16.6667 1.33325ZM16.6667 21.3333H3.33333V2.66659H16.6667V21.3333Z" fill="#E5E1E7"/>
                    </svg>
                </div>
                <p className="nav-link-text">Roster</p>
            </NavLink>
            <p className="nav-section-title">Profile</p>
            <NavLink activeClassName={splitLocation[1] === "update-profile" ? "active-link" : ""} to="/update-profile" className="nav-link-container">
                <div className="nav-icon-container">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3C9.74168 3 10.4667 3.21993 11.0834 3.63199C11.7001 4.04404 12.1807 4.62971 12.4646 5.31494C12.7484 6.00016 12.8226 6.75416 12.6779 7.48159C12.5333 8.20902 12.1761 8.8772 11.6517 9.40165C11.1272 9.9261 10.459 10.2833 9.73159 10.4279C9.00416 10.5726 8.25016 10.4984 7.56494 10.2145C6.87972 9.93072 6.29405 9.45007 5.88199 8.83339C5.46994 8.2167 5.25 7.49168 5.25 6.75C5.25 5.75544 5.64509 4.80161 6.34835 4.09835C7.05161 3.39509 8.00544 3 9 3ZM9 1.5C7.96165 1.5 6.94662 1.80791 6.08326 2.38478C5.2199 2.96166 4.54699 3.7816 4.14963 4.74091C3.75227 5.70022 3.64831 6.75582 3.85088 7.77422C4.05345 8.79262 4.55347 9.72808 5.28769 10.4623C6.02192 11.1965 6.95738 11.6966 7.97578 11.8991C8.99418 12.1017 10.0498 11.9977 11.0091 11.6004C11.9684 11.203 12.7883 10.5301 13.3652 9.66674C13.9421 8.80339 14.25 7.78835 14.25 6.75C14.25 5.35761 13.6969 4.02226 12.7123 3.03769C11.7277 2.05312 10.3924 1.5 9 1.5Z" fill="#E5E1E7"/>
                        <path d="M16.5 22.5H15V18.75C15 17.7554 14.6049 16.8016 13.9017 16.0983C13.1984 15.3951 12.2446 15 11.25 15H6.75C5.75544 15 4.80161 15.3951 4.09835 16.0983C3.39509 16.8016 3 17.7554 3 18.75V22.5H1.5V18.75C1.5 17.3576 2.05312 16.0223 3.03769 15.0377C4.02226 14.0531 5.35761 13.5 6.75 13.5H11.25C12.6424 13.5 13.9777 14.0531 14.9623 15.0377C15.9469 16.0223 16.5 17.3576 16.5 18.75V22.5Z" fill="#E5E1E7"/>
                        <path d="M16.5 3H24V4.5H16.5V3Z" fill="#E5E1E7"/>
                        <path d="M16.5 6.75H24V8.25H16.5V6.75Z" fill="#E5E1E7"/>
                        <path d="M16.5 10.5H21.75V12H16.5V10.5Z" fill="#E5E1E7"/>
                    </svg>
                </div>
                <p className="nav-link-text">Update Profile</p>
            </NavLink>
            {currentUser && <a className="nav-link-container logout" onClick={() => handleLogout()}>
                <div className="nav-icon-container">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 6L14.59 7.41L17.17 10H7V12H17.17L14.59 14.58L16 16L21 11L16 6ZM3 4H11V2H3C1.9 2 1 2.9 1 4V18C1 19.1 1.9 20 3 20H11V18H3V4Z" fill="white"/>
                    </svg>
                </div>
                <p className="nav-link-text">Logout</p>
            </a>}
        </nav>
    )
}

export default Nav
