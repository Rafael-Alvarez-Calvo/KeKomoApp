import React, { Fragment } from 'react'
import ProductListCss from '../../Components/ProductList/ProductList.module.css';
import { useOptionsList } from '../../Hooks/useOptionsList';
import { ProductContainer } from './ProductContainer/ProductContainer';

export const ProductList = ({url, opt}) => {
    
    const [{data, isLoading}] = useOptionsList(url, JSON.stringify(opt));
    
    const getDataSearch = () => {
        
        if(data && !isLoading){
            const {res, Results} = data;
            if(res === "1" && Results){
                // console.log(Results)
                return Results.map(product => {
                    if(product){
                        return <Fragment key={product.Product_id}>
                                    <ProductContainer product={product}/>
                                </Fragment>
                        
                    }
                })
                
            }

            

            // if(res === "-2" && error){
            //     DashboardCtxt.setDashBoardInfo({...DashboardCtxt, error});
            //     Login.setLoginUserInfo({...Login});
            //     Redirect("/home/product-list");
            // }

            // if(res === "-3"){
            //     return <div className={BrandListCss.ErrorInCredentials}>
            //              <p>Recuerda que debes añadir algo en la barra de búsqueda o en los filtros, estos no pueden estar vacíos.</p>
            //            </div>
            // }
        }
    }

    return (
        <>
            {isLoading && <div className={ProductListCss.loadingSVGContainer}><img src="/loading.svg" className={ProductListCss.loadingSVG} alt="loading icon" /></div>}
            {!isLoading && getDataSearch()}
        </>
    )
}
