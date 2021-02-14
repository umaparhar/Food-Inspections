import logo from './resources/carrot.png';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import DataListView from './pages/DataListView'
import HomePage from './pages/HomePage'
import AlertForm from './pages/AlertForm'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/data-view" component={DataListView} />
          <Route exact path="/alerts-form" component={AlertForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
