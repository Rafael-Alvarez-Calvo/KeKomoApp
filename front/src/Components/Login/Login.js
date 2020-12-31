import React, { useState, useEffect, useContext } from 'react';
import { useForm } from '../../Hooks/useForm';
import { Fetch } from '../../Hooks/useFetch';
import { useRedirect } from '../../Hooks/useRedirect';
import { useValidator } from '../../Hooks/useValidator';
import { LoginContext } from '../../Contexts/LoginContext';
import { Error } from '../Advices/Error';
import LoginCss from './Login.module.css';

export const Login = () => {

    const Redirect = useRedirect();
    const Login = useContext(LoginContext);
    const {validateCredentials, validateEmail, validatePsw} = useValidator();

    const [formValues, handleInputChange] = useForm({
        email : "",
        psw : "",
    })

    const [statePsw, setStatePsw] = useState({
        type : "password",   
        placeholder : "**********"
    })

    let {email, psw} = formValues;
    const {type, placeholder} = statePsw;

    const HandlePswVisibility = (e) => {

        e.preventDefault();

        const psw = document.querySelector('#psw');
        
        setStatePsw({
            ...statePsw,
            type : "password" ? "text" : "password",
            placeholder : "**********" ? "123ytube" : "**********"
        });

        psw.type = statePsw.type
        psw.placeholder = statePsw.placeholder

        e.target.className = e.target.className === 'fas fa-eye' ? 'fas fa-eye-slash' : 'fas fa-eye';
    }

    useEffect(() => {
        
    }, [statePsw])

    const handleSubmit = (e) =>{

        e.preventDefault();

        if(!validateEmail(email)){
            email = "";
            document.querySelector("#email").className = `${LoginCss.ErrorInput}`;
            setTimeout(() => {
                document.querySelector("#email").className = ""
            },1500)

        }

        if(!validatePsw(psw)){
            psw = "";
            document.querySelector("#psw").className = `${LoginCss.ErrorInput}`;
            setTimeout(() => {
                document.querySelector("#psw").className = "";
            },1500)
        }

        if(validateCredentials(email, psw)){

            Fetch(`${process.env.REACT_APP_backUrl}/login`, {method : "post", data : {...formValues}})
            .then(data => {
                // console.log(data);
                if(data){
                    const {res, msg, result} = data;
                    console.log(res);

                    switch(res){

                        case "1" :
                            Login.setLoginUserInfo(result)
                            Redirect("/login-successful");
                            break;
                        case "-1" :
                            
                            break;
                        case "-2" :
                            console.log(Error)
                            return <Error res={res} msg={msg} />;
                        case "-3" :
                            
                            break;
                        case "-4" :
                            return <Error res={res} msg={msg}/>;
                    
                    }
                }
            })

        } else {

            email = "";
            psw = "";
            document.querySelector("#email").className = `${LoginCss.ErrorInput}`;
            document.querySelector("#psw").className = `${LoginCss.ErrorInput}`;
            setTimeout(() => {
                document.querySelector("#email").className = "";
                document.querySelector("#psw").className = "";
            },1500)
            return (
                <div className={LoginCss.ErrorInCredentials}>
                    <p>El email o contraseña que has introducido no son correctas, recuerda que la contraseña debe ser:</p>
                    <ul>
                        <li>Al menos una letra y un número</li>
                        <li>No puede contener carácteres alfanuméricos</li>
                        <li>Contener al menos seis carácteres</li>
                    </ul>

                </div>
            );
        }
        
    }

    return (
        <>
            <div className={LoginCss.mainContainer}>
                <img src="../../background.jpg" alt="Background" className={LoginCss.BG} />
                <div className={LoginCss.gradientBG}></div>
            </div>
            <form onSubmit={handleSubmit} className={LoginCss.loginForm}>
                <h1 className={LoginCss.titleLogin}>Iniciar sesión</h1>
                <label>Tu email</label>
                <input 
                    id="email"
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}/>
                <i id={LoginCss.envelope} className="far fa-envelope"></i>   

                <label>Tu contraseña</label>
                <input 
                    id="psw"
                    type={type}
                    name="psw"
                    placeholder={placeholder}
                    autoComplete="off"
                    value={psw}
                    onChange={handleInputChange} />
                <i id={LoginCss.key} className="fas fa-key"></i>
                <i id={LoginCss.eye} className="fas fa-eye" onClick={HandlePswVisibility}></i>

                <button type="submit" className={LoginCss.loginBtn}>Iniciar sesión</button>
                <button type="button" className={LoginCss.forgotPsw} onClick={(e) => Redirect("/change-password", e)}>¿Has olvidado tu contraseña?</button>
                {/* <button className={LoginCss.backBtn} onClick={() => {redirect("/")}}>&lt;</button> */}
            </form>
        </>
    )
}
