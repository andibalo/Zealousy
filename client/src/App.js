import React, { Fragment, useEffect } from 'react';
import Dashboard from './components/Dashboard/Dashboard'
import LoginLanding from './components/Layout/LoginLanding'
import RegisterLanding from './components/Layout/RegisterLanding'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import { loadUser } from './actions/auth'

//REDUX
import { Provider } from 'react-redux'
import store from './store'
import Alerts from './components/Layout/Alerts';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alerts />

          <Switch>
            <Route exact path="/" component={RegisterLanding} />
            <Route exact path="/login" component={LoginLanding} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
