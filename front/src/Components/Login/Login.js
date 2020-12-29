import React, { useState } from 'react'
import { useForm } from '../../Hooks/useForm'
import { useEndPoints } from '../../Hooks/useEndPoints'
import { useFetch } from '../../Hooks/useFetch'
import LoginCss from './Login.css'

export const Login = () => {

    const [formValues, handleInputChange] = useForm({
        email : "",
        password : "",
    })

    // const [statePsw, setStatePsw] = useState({
    //     type : 'password',
    //     className : 'fas fa-eye'
    // })

    const {email, password} = formValues;

    const handlePswVisibility = (e) => {

        e.preventDefault();

        const password = document.querySelector('#psw');
        const type = password.type === 'password' ? 'text' : 'password';        
        const placeholder = password.placeholder === '**********' ? 'password' : '**********';     

        e.target.className = e.target.className === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
        password.type = type;
        password.placeholder = placeholder;
        // const password = document.querySelector('#psw');
        // const type = password.type === 'password' ? setStatePsw({type : 'text'}) : statePsw;
        // password.setAttribute('type', type);
        // const className = e.target.className === statePsw.className ? setStatePsw({className : 'fas fa-eye-slash'}) : statePsw.className
        // e.target.className = className

    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetchLogin();
    }

    const {url,fetchLogin} = useEndPoints()
    const {data} = useFetch(`${url}`)

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
                    name="password"
                    className="psw-control"
                    placeholder="**********"
                    autoComplete="off"
                    value={password}
                    onChange={handleInputChange} />
                <i className="fas fa-key"></i>
                <i className="fas fa-eye" onClick={handlePswVisibility}></i>

                <button type="submit" className="LoginCss.loginBtn">Entrar</button>
            </form>
        </>
    )
}
