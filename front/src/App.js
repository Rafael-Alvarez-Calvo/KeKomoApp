import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Welcome } from './Components/Welcome/Welcome'
import {Login} from './Components/Login/Login'
import { RegisterProvider } from './Contexts/RegisterContext'
import { ExternalRegisterSuccessful } from './Components/external-register-successful/ExternalRegisterSuccessful'
import { InfoUserForm } from './Components/info-user-form/InfoUserForm'


export const App = () => {

    const [registerUserInfo, setRegisterUserInfo] = useState({})

    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Welcome />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                        <Route path="/signup">
                            {/* <SignUp /> */}
                        </Route>
                        <Route path="/external-register-successful">
                            <ExternalRegisterSuccessful />
                        </Route>
                        <Route path="/info-user-form">
                            <InfoUserForm />
                        </Route>
                    </RegisterProvider>
                    <Route path="/login-successful"></Route>
                    <Route path="/error/:id"></Route>
                </Switch>
            </Router>
        </>
    )
}
