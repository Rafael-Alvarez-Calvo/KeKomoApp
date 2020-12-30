import React, { useState } from 'react'
import { useForm } from '../../Hooks/useForm'
import { Fetch, useFetch } from '../../Hooks/useFetch'
import LoginCss from './Login.css'
import { useRedirect } from '../../Hooks/useRedirect'

export const Login = () => {

    const redirect = useRedirect();

    const [formValues, handleInputChange] = useForm({
        email : "",
        psw : "",
    })

    // const [statePsw, setStatePsw] = useState({
    //     type : 'psw',
    //     className : 'fas fa-eye'
    // })

    const {email, psw} = formValues;

    const handlePswVisibility = (e) => {

        e.preventDefault();

        const psw = document.querySelector('#psw');
        const type = psw.type === 'psw' ? 'text' : 'psw';        
        const placeholder = psw.placeholder === '**********' ? 'psw' : '**********';     

        e.target.className = e.target.className === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
        psw.type = type;
        psw.placeholder = placeholder;

        // const psw = document.querySelector('#psw');
        // const type = psw.type === 'psw' ? setStatePsw({type : 'text'}) : statePsw;
        // psw.setAttribute('type', type);
        // const className = e.target.className === statePsw.className ? setStatePsw({className : 'fas fa-eye-slash'}) : statePsw.className
        // e.target.className = className

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        Fetch(`${process.env.REACT_APP_backUrl}/login`, {method : "post", data : {...formValues}})
        .then(data => {
            console.log(data);
        })
        
    }

    return (
        <>
            <div className="mainContainer">
                <img src="../../background.jpg" alt="Background" className="BG" />
                <div className="gradientBG"></div>
            </div>
            <form onSubmit={handleSubmit} className="loginForm">
                <h1 className="titleLogin">Iniciar sesión</h1>
                <label>Tu email</label>
                <input 
                    type="text"
                    name="email"
                    className="email-control"
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}/>
                <i className="far fa-envelope"></i>   

                <label className="label">Tu contraseña</label>
                <input 
                    id="psw"
                    type="password"
                    name="psw"
                    className="psw-control"
                    placeholder="**********"
                    autoComplete="off"
                    value={psw}
                    onChange={handleInputChange} />
                <i className="fas fa-key"></i>
                <i className="fas fa-eye" onClick={handlePswVisibility}></i>

                <button type="submit" className="LoginCss.loginBtn">Entrar</button>
                <button onClick={() => {redirect("/")}}>Algo</button>
            </form>
        </>
    )
}
