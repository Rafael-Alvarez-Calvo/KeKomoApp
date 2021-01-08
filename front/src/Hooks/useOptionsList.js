import { useEffect, useState } from 'react'
import { Fetch } from './useFetch';

export const useOptionsList = ({url}) => {

    const [dataState, setDataState] = useState({
        data : [],
        isLoading : true

    })

    useEffect(() => {

        Fetch(url)
            .then(data => {
                if(data){
                    setDataState({
                        data :data,
                        loading : false
                    })
                } 
    
            })

    }, [url, dataState]);

    return {dataState, setDataState};
}
