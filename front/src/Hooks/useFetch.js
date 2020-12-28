import { useEffect, useState } from "react"

export const useFetch = (url) => {
    
    const [state, setstate] = useState({
        data : null,
        error : null
    })

    useEffect(() =>{

        setstate({data : null, error: null})

        fetch(url)
            .then(res => res.json())
            .then((data,error) =>{

                if(error){
                    setstate({
                        error,
                        data : null
                    })
                } else if (data){
                    setstate({
                        error : null,
                        data
                    })
                }
            })
    },[url])

    return state
}