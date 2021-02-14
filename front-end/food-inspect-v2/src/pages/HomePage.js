import logo from '../resources/carrot.png';
import '../App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />  
      <h1>Infusion</h1>

      <Link to="/data-view">View Data</Link>

      </header>
    </div>
  );
}

export default withRouter(HomePage);