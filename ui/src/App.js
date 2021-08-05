import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home'
import Subscribe from './components/Subscribe'

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/subscribe' component={Subscribe} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
