import { AuthProvider } from '../contexts/AuthContext'
import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

//Components
import PrivateRoute from './PrivateRoute'
import Signup from './Signup'
import Login from './Login'
import UpdateProfile from './UpdateProfile'
import ForgotPassword from './ForgotPassword'
import Nav from './Nav'
import Games from './Games'
import Standings from './Standings'
import Stats from './Stats'
import Roster from './Roster'

//Styles
import '../styles/App.css'
import '../styles/dashboard.css'
import TopNav from './TopNav'

function App() {
  const location = useLocation()

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
      <div className="App">
        <div className="dashboard-container">
            <AuthProvider>
            <Nav />
              <div className="dashboard">
                <TopNav />
                <AnimatePresence exitBeforeEnter>
                  <Switch location={location} key={location.pathname}>
                    <PrivateRoute exact path="/"><Games transitions={pageTransitions} /></PrivateRoute>
                    <PrivateRoute path="/standings"><Standings transitions={pageTransitions} /></PrivateRoute>
                    <PrivateRoute path="/stats"><Stats transitions={pageTransitions} /></PrivateRoute>
                    <PrivateRoute path="/roster"><Roster transitions={pageTransitions} /></PrivateRoute>
                    <PrivateRoute path="/update-profile"><UpdateProfile transitions={pageTransitions} /></PrivateRoute>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                  </Switch>
                </AnimatePresence>
              </div>
            </AuthProvider>
        </div>
      </div>
    
  );
}

export default App
