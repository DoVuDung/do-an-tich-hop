import './App.css';
import './assets/css/global.scss'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Routes from './routing/routing'

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
              <Routes/>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
