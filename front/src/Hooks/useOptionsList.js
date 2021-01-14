import { useEffect, useState } from 'react'
import { Fetch } from './useFetch';

export const useOptionsList = (url, opt = "{}") => {

    const [dataState, setDataState] = useState({
        data : [],
        isLoading : true

    })

    useEffect(() => {
        
        const timeOut = setTimeout(() => {
            Fetch(url, JSON.parse(opt))
            .then(data => {
                console.log(data)
                if(data){
                    setDataState({
                        data : data,
                        isLoading : false
                    })
                } else {
                    setDataState({data: [], isLoading: false});
                }
            })

        },1000)

        return () => clearTimeout(timeOut)

    }, [url,opt]);

    return [dataState, setDataState];
}
