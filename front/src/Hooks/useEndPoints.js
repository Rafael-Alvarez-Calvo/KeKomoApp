import { useState } from "react"

export const useEndPoints = (initialUrl = `http://localhost:8888/`) => {

    const [url, setUrl] = useState(initialUrl)

    const fetchLogin = () =>{
        setUrl({url : `${url}login`});
    }
    // const increment = (factor = 1) =>{
    //     setstate(state + factor);
    // }

    // const decrement = () =>{
    //     setCounter(counter - 1);
    // }
    // // const decrement = (factor = 1) =>{
    // //     setstate(state - factor);
    // // }

    // const reset = () =>{
    //     setCounter(initialState);
    // }

    return {
        url,
        fetchLogin
    }
}