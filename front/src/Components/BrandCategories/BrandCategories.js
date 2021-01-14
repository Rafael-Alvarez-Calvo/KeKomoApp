import React, { useContext, useState } from 'react'
import { LoginContext } from '../../Contexts/LoginContext';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { BackgroundShort } from '../Templates/Backgrounds/BackgroundShort';
import { useRedirect } from '../../Hooks/useRedirect';
import { useHistory, useLocation } from 'react-router-dom';
import { CategoriesListYScroll } from '../CategoriesList/CategorieListScrollY/CategoriesListYScroll';
import { HeaderLogo } from '../Templates/Headers/HeaderLogo';
import { NavBar } from '../Templates/NavBar/NavBar';
import BrandCategoriesCss from './BrandCategories.module.css';



export const BrandCategories = () => {

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    // console.log(DashboardCtxt);
    const history = useHistory();

    // const { pageStatus } = DashboardCtxt;

    const [pageState, setPageState] = useState({
        BrandCatListScrollY : true,
        BrandCatListScrollX : false,

    })

    const { BrandCatListScrollY, BrandCatListScrollX } = pageState;
    const [url, setUrl] = useState(`${process.env.REACT_APP_backUrl}/get-info-categories`);

    // const Redirect = useRedirect();
    // const location = useLocation();

    const paintCategoriesListYScrollContainer = () =>{
        if(BrandCatListScrollY && !BrandCatListScrollX)
            return <CategoriesListYScroll url={url} />
    }


    return (
        <>
        
            <BackgroundShort className={BrandCategoriesCss.BGcontainer} />
            <HeaderLogo  onClick={() => {history.go(-1)}}/>
            {/* {ShowModalWindow()} */}
            {/* {showResponseDBError()} */}
            <section className={BrandCategoriesCss.SMarketSection}>
                <div className={BrandCategoriesCss.SMarketContainer}>
                    <div className={BrandCategoriesCss.imgSMarketContainer}>
                        <img src={DashboardCtxt.dataSMarket.Logo} alt={DashboardCtxt.dataSMarket.Marca} className={BrandCategoriesCss.imgSMarket}/>
                    </div>
                    {/* <p className={BrandCategoriesCss.SMarketTitle}>{DashboardCtxt.data.Marca}</p> */}
                </div>       
            </section>

            <section>
                {paintCategoriesListYScrollContainer()}
            </section>
        </>
    )
}
