import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Login from './Login'
import UpdateProfile from './UpdateProfile'
import ForgotPassword from './ForgotPassword'
import UserData from './UserData'

//Styles
import '../styles/App.css'

function App() {
  return (
      <div className="App">
        <div>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <PrivateRoute path="/user-data" component={UserData} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </div>
    
  );
}

export default App
