import React from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';

export const InfoSuppliers = ({url}) => {
    
    const [{isLoading, data}] = useOptionsList(url);
    return (
        <div>
            
        </div>
    )
}

