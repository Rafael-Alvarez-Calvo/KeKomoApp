import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Welcome } from './Components/Welcome/Welcome'
import {Login} from './Components/Login/Login'

export const App = () => {

    return (
        <>
            <Router>
                {/* <p>{process.env.REACT_APP_backUrl}</p> */}
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/external-login-succesfull">
                    </Route>
                    
                </Switch>
            </Router>
        </>
    )
}
