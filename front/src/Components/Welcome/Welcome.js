import React, { useState } from 'react'
import { Login } from '../Login/Login'
import './Welcome.css'

export const Welcome = () => {

    // const [state, setState] = useState(initialState)

    const handleClick = (e) =>{
        e.preventDefault();
        e.target.id === "login" && <Login />

    }

    return (
        <>
            <div className="mainContainer">
                <img src="../../background.jpg" alt="Background" className="BG" />
                <div className="gradientBG"></div>
            </div>

            <button type="button" className="registerBtn" >Registrarme</button>

            <div className="comingInSeparator">
                <hr className="Separator" />
                <p className="comingIn">Entrar con</p>
                <hr className="Separator" />
            </div>

            <div className="loginSocialBtnContainer">
                <button type="button" className="loginSocialBtn google" ><img src="../../login-google.png" alt="login google button" className="loginSocialGImg" /></button>
                <button type="button" className="loginSocialBtn facebook" ><img src="../../login-facebook.png" alt="login facebook button" className="loginSocialFImg" /></button>
            </div>

            <hr className="downSeparator" />
            
            <div className="loginContainer">
                <button type="button" id="login" className="loginBtn" onClick={handleClick}>Iniciar sesion con email</button>
                <a className="comeInAsGuest" href="#">Entrar sin iniciar sesión</a>
            </div>

        </>
    )
}
