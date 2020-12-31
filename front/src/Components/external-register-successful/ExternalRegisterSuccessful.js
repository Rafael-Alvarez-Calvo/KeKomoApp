import React, { useContext, useEffect } from 'react'
import { Fetch } from '../../Hooks/useFetch'
import { useRedirect } from '../../Hooks/useRedirect';
import { RegisterContext } from '../../Contexts/RegisterContext';

export const ExternalRegisterSuccessful = () => {

    const Redirect = useRedirect();
    const Register = useContext(RegisterContext);

    useEffect(() => {

        console.log(Register);
        Fetch(`${process.env.REACT_APP_backUrl}/get-oauth-user-data`)
        .then((userData) => {
            if(!userData.error){

                Register.setRegisterUserInfo(userData)
                Redirect("/info-user-form");
            } else {
                Redirect("/");
            }
        })
        .catch(() => Redirect("/"));
    })

    return (
        <>
        </>
    )
}

