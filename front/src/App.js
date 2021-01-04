import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Welcome } from './Components/Welcome/Welcome'
import {Login} from './Components/Login/Login'
import { RegisterProvider } from './Contexts/RegisterContext'
import { LoginProvider } from './Contexts/LoginContext'
import { ExternalRegisterSuccessful } from './Components/external-register-successful/ExternalRegisterSuccessful'
import { WelcomeUserForm } from './Components/info-user-form/WelcomeUserForm'
import { UserFormAllergens } from './Components/info-user-form/UserFormAllergens'
import { SignUp } from './Components/SignUp/SignUp'
// import { Error } from './Components/Advices/Error'
import { Dashboard } from './Components/Dashboard/Dashboard'


export const App = () => {

    const [registerUserInfo, setRegisterUserInfo] = useState({});
    const [loginUserInfo, setLoginUserInfo] = useState({});

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
                    <Route path="/guest">
                        <Dashboard />
                    </Route>

                    <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                        <Route path="/Register">
                            <SignUp />
                        </Route>
                        <Route path="/external-register-successful">
                            <ExternalRegisterSuccessful />
                        </Route>
                        <Route path="/welcome-user-form">
                            <WelcomeUserForm />
                        </Route>
                        <Route path="/user-form-allergens">
                            <UserFormAllergens />
                        </Route>
                    </RegisterProvider>

                    <LoginProvider value={{...loginUserInfo, setLoginUserInfo}}>
                        <Route path="/login-successful">
                            <Dashboard />
                        </Route>
                    </LoginProvider>

                    <Route path="/error/:id"></Route>
                    
                </Switch>
            </Router>
        </>
    )
}
