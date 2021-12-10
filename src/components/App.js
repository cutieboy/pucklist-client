import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Signup from './Signup'
import Login from './Login'
import UpdateProfile from './UpdateProfile'
import ForgotPassword from './ForgotPassword'
import UserData from './UserData'
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

  return (
      <div className="App">
        <div className="dashboard-container">
          <Router>
            <AuthProvider>
            <Nav />
              <div className="dashboard">
              <TopNav />
                <Switch>
                  <PrivateRoute exact path="/" component={Games} />
                  <PrivateRoute path="/standings" component={Standings} />
                  <PrivateRoute path="/stats" component={Stats} />
                  <PrivateRoute path="/roster" component={Roster} />
                  <PrivateRoute path="/update-profile" component={UpdateProfile} />
                  <PrivateRoute path="/user-data" component={UserData} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
              </div>
            </AuthProvider>
          </Router>
        </div>
      </div>
    
  );
}

export default App
