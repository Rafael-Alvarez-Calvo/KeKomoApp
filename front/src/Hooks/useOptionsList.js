import { useEffect, useState } from 'react'
import { Fetch } from './useFetch';

export const useOptionsList = (url, opt) => {

    const [dataState, setDataState] = useState({
        data : [],
        isLoading : true

    })

    useEffect(() => {
        console.log(url);
        Fetch(url, opt)
        .then(data => {
            if(data){
                setDataState({
                    data : data,
                    isLoading : false
                })
            } else {
                setDataState({data: [], isLoading: false});
            }
        })
        
        

    }, [url,opt]);

    return [dataState, setDataState];
}
