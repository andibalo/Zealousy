import React from 'react';
import Landing from './components/Layout/Landing'

//REDUX
import { Provider } from 'react-redux'
import store from './store'
import Alerts from './components/Layout/Alerts';



const App = () => {



  return (
    <Provider store={store}>
      <Alerts />
      <Landing />
    </Provider>
  );
}

export default App;
