import React from 'react';
import Landing from './components/Layout/Landing'

//REDUX
import { Provider } from 'react-redux'
import store from './store'
import Alerts from './components/Layout/Alerts';

import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {



  return (
    <Provider store={store}>
      <Router>
        <Alerts />
        <Landing />
      </Router>
    </Provider>
  );
}

export default App;
