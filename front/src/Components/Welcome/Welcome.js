import React, { useState } from 'react'
import { Login } from '../Login/Login'
import WelcomeCss from './Welcome.module.css'

export const Welcome = () => {

    // const [state, setState] = useState(initialState)

    const handleClick = (e) =>{
        e.preventDefault();
        e.target.id === "login" && <Login />
    }

    return (
        <>
            <div className={WelcomeCss.mainContainer}>
                <img src="../../background.jpg" alt="Background" className={WelcomeCss.BG} />
                <div className={WelcomeCss.gradientBG}></div>
            </div>

            <div className={WelcomeCss.btnRegisterContainer}><button type="button" className={WelcomeCss.registerBtn} >Registrarme</button></div>

            <div className={WelcomeCss.comingInSeparator}>
                <hr className={WelcomeCss.Separator} />
                <p className={WelcomeCss.comingIn}>Entrar con</p>
                <hr className={WelcomeCss.Separator} />
            </div>

            <div className={WelcomeCss.loginSocialBtnContainer}>
                <button type="button" className={`${WelcomeCss.loginSocialBtn} ${WelcomeCss.google}`}><img src="../../login-google.png" alt="login google button" className={WelcomeCss.loginSocialGImg} /></button>
                <button type="button" className={`${WelcomeCss.loginSocialBtn} ${WelcomeCss.facebook}`} ><img src="../../login-facebook.png" alt="login facebook button" className={WelcomeCss.loginSocialFImg} /></button>
            </div>

            <hr className={WelcomeCss.downSeparator} />
            
            <div className={WelcomeCss.loginContainer}>
                <button type="button" id="login" className={WelcomeCss.loginBtn} onClick={handleClick}>Iniciar sesion con email</button>
                <a className={WelcomeCss.comeInAsGuest} href="#">Entrar sin iniciar sesión</a>
            </div>

        </>
    )
}
