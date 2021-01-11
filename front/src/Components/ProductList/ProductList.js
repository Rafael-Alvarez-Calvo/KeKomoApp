import React, { useContext } from 'react'
import { useRedirect } from '../../Hooks/useRedirect';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { useLocation } from 'react-router-dom';
import ProductListCss from '../../Components/ProductList/ProductList.module.css';
// import { Fetch, useFetch } from '../../Hooks/useFetch';
import { useOptionsList } from '../../Hooks/useOptionsList';

export const ProductList = ({url, opt}) => {
    
    const Redirect = useRedirect();
    const DashboardCtxt = useContext(DashboardContext);
    const Login = useContext(LoginContext);
    const location = useLocation();
    
    
    const {data, isLoading} = useOptionsList(url, opt);

    const getDataSearch = () => {

        if(data && !isLoading){
            console.log(data)
            const [{res, Results}] = data;
            // if((res === "1" && Results) || (res === "-1" && Results)){

            //     if(location.pathname !== "/home/product-list"){
            //         DashboardCtxt.setDashBoardInfo({...DashboardCtxt, Results});
            //         Login.setLoginUserInfo({...Login});
            //         Redirect("/home/product-list");

            //     } else {
            //         // return <ProductList />
            //         //los datos iran por props
            //     }
            // }

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
            <p>heyy</p>
            {!isLoading && getDataSearch()}
        </>
    )
}
