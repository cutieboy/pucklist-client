import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    const pageTransitions = {
        in: {
          opacity: 1,
          y: 0,
        },
        out: {
          opacity: 0,
          y: '2%',
        }
    }

    return (
        <Route
        {...rest}
        render={props => {
            return currentUser ? <Component {...props} transitions={pageTransitions} /> : <Redirect to="/login" />
        }}
        ></Route>
    )
}

export default PrivateRoute
