import './App.css';
import './assets/css/global.scss'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import UserContextProvider from './context/userContext';
import Routes from './routing/Routing'

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
            <Switch>
              <Routes/>
            </Switch>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
