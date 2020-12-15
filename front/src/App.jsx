import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import './App.css';

function App() {
  return (
    <div className="App">
      <MuiThemeProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/signin" exact component={SignIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/profile" exact component={Profile} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
