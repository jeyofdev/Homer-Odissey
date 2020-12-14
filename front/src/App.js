import './App.css';
import SignUp from './components/SignUp';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
function App() {
    return (
        <div className="App">
            <MuiThemeProvider>
                <SignUp />
            </MuiThemeProvider>
        </div>
    );
}

export default App;
