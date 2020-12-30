import React, { useContext } from 'react'
import { Fetch } from '../../Hooks/useFetch'
import { useRedirect } from '../../Hooks/useRedirect';
import { RegisterContext } from '../../Contexts/RegisterContext';

export const InfoUserForm = () => {

    const Register = useContext(RegisterContext);
    return (
        <div>
            <p>Hello {Register.name }</p>
        </div>
    )
}
