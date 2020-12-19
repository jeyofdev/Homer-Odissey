import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import requireAuth from './hoc/requireAuth';
import requireNotAuth from './hoc/requireNotAuth';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {
  return (
    <MuiThemeProvider>
      <Grid
        container
        alignItems="center"
        style={{ height: '100%', maxWidth: '1200px', margin: '0 auto' }}
      >
        <Grid
          item
          xs={12}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Router>
            <Switch>
              <Redirect exact from="/" to="/profile" />
              <Route path="/signin" exact component={requireNotAuth(SignIn)} />
              <Route path="/signup" exact component={requireNotAuth(SignUp)} />
              <Route path="/profile" exact component={requireAuth(Profile)} />
            </Switch>
          </Router>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
