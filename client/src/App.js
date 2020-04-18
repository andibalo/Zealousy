import React, { Fragment } from 'react';
import Dashboard from './components/Dashboard/Dashboard'
import LoginLanding from './components/Layout/LoginLanding'
import RegisterLanding from './components/Layout/RegisterLanding'
//REDUX
import { Provider } from 'react-redux'
import store from './store'
import Alerts from './components/Layout/Alerts';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {



  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alerts />
          <Route exact path="/" component={RegisterLanding} />
          <Switch>
            <Route exact path="/login" component={LoginLanding} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
