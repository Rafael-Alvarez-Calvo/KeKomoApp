import { useEffect, useState } from 'react'
import { Fetch } from './useFetch';

export const useOptionsList = (url) => {

    const [dataState, setDataState] = useState({
        data : [],
        isLoading : true

    })

    useEffect(() => {
        console.log(url);
        Fetch(url)
        .then(data => {
            if(data){
                console.log(data);
                setDataState({
                    data : data,
                    isLoading : false
                })
            } else {
                setDataState({data: [], isLoading: false});
            }
        })
        .catch(e => {console.log(e)})

    }, [url]);

    return [dataState, setDataState];
}
