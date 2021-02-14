import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import DataListView from '../pages/DataListView'
import AlertForm from './pages/AlertForm'


function NavigationRouter() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/data-list" component={DataListView} />
            <Route exact path="/alerts-form" component={AlertForm} />
          </Switch>
        </div>
      </Router>
    );
}
  
export default NavigationRouter;