import './App.css';
import './assets/css/global.scss'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import UserContextProvider from './context/userContext';
import CourseContextProvider from './context/courseContext';
import Routes from './routing/Routing'

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <CourseContextProvider>
          <Router>
            <Switch>
              <Routes/>
            </Switch>
          </Router>
        </CourseContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
