import React, { useContext } from 'react'
import { LoginContext } from '../../Contexts/LoginContext'

export const ProductsList = () => {
    const Login = useContext(LoginContext);
    console.log({...Login});
    return (
        <div>
            
        </div>
    )
}
