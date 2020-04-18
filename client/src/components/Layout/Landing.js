import React from 'react'
import RegisterLanding from './RegisterLanding'
import LoginLanding from './LoginLanding'
import { BrowserRouter as Switch, Route } from 'react-router-dom'



const Landing = props => {

    return (

        <Switch>
            <Route exact path="/" component={RegisterLanding} />
            <Route exact path="/login" component={LoginLanding} />
        </Switch>
    )
}

export default Landing
