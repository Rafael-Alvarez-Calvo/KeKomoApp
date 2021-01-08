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
import { Error } from './Components/Advices/Error'
// import { usePreferences } from './Hooks/usePreferences'



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
                        <LoginProvider value={{...loginUserInfo, setLoginUserInfo}}>
                            <Login />
                        </LoginProvider>
                    </Route>

                    <Route path="/home">
                        <LoginProvider value={{...loginUserInfo, setLoginUserInfo}}>
                            <Dashboard />
                        </LoginProvider>
                    </Route>

                    <Route path="/guest-user-history">
                        
                    </Route>
                    <Route path="/guest-user-favourites">
                        
                    </Route>
                    <Route path="/guest-user-shopping-lists">
                        
                    </Route>

                    <Route path="/Register">
                        <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                            <SignUp />
                        </RegisterProvider>

                    </Route>
                    <Route path="/external-register-successful">
                        <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                            <ExternalRegisterSuccessful />
                        </RegisterProvider>
                    </Route>

                    <Route path="/welcome-user-form">
                        <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                            <WelcomeUserForm />
                        </RegisterProvider>
                    </Route>
                    <Route path="/user-form-allergens">
                        <RegisterProvider value={{...registerUserInfo, setRegisterUserInfo}}>
                            <UserFormAllergens />
                        </RegisterProvider>
                    </Route>

                    <Route path="/error/:id"></Route>
                    <Route path="/example"><Error /></Route>
                    
                </Switch>
            </Router>
        </>
    )
}
