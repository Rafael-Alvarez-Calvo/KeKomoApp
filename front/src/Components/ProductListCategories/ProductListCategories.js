import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { BrandCategories } from '../BrandCategories/BrandCategories';
import { BrandList } from '../BrandList/BrandList';
import { BackgroundShort } from '../Templates/BackgroundShort';
import ProductListCategoriesCss from './ProductListCategories.module.css';


export const ProductListCategories = () => {

    const history = useHistory();
    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    console.log(DashboardCtxt);
    console.log(LoginCtxt);

    const [url, setUrl] = useState(``);
    
    const [optionContainer, setOptionContainer] = useState({
        OtherMarkets : true,
        ThisMarket : false
    });

    const [statePage, setStatePage] = useState({
        BrandCategoriesPage : false,
        ProductListPage : true
    });

    const { OtherMarkets, ThisMarket } = optionContainer;

    const handleOtherMarketsContainer = (e) => {

        e.preventDefault();
        
        setOptionContainer({
            ...optionContainer,
            OtherMarkets : OtherMarkets ? OtherMarkets : !OtherMarkets,
            ThisMarket: false

        });
    }
    const handleThisMarketContainer = (e) => {

        e.preventDefault();
        
        setOptionContainer({
            ...optionContainer,
            ThisMarket : ThisMarket ? !ThisMarket : !ThisMarket,
            OtherMarkets : false
        });  
    }

    const showOtherMarketsOptions = () => {

        if(OtherMarkets && !ThisMarket && url !== `${process.env.REACT_APP_backUrl}/get-info-brands`){
            setUrl(`${process.env.REACT_APP_backUrl}/get-info-brands`)
            
        }
        if (OtherMarkets && !ThisMarket){

            return <BrandList url={url} pageState={statePage} />
        }
    } 

    const showThisMarketsOptions = () => {

        if(!OtherMarkets && ThisMarket && url !== `${process.env.REACT_APP_backUrl}/get-info-categories`){
            setUrl(`${process.env.REACT_APP_backUrl}/get-info-categories`)
            
        }
        if (!OtherMarkets && ThisMarket){

            return <BrandCategories pageProductListState={statePage} />
        }
    } 

    return (
        <>
            <BackgroundShort className={ProductListCategoriesCss.BGcontainer} />
            <div className={ProductListCategoriesCss.userContainer}>
                <button className={ProductListCategoriesCss.backBtn} onClick={() => {history.go(-1)}}>
                    <i id={ProductListCategoriesCss.iconBackBtn} className="fas fa-chevron-left"></i>
                </button>
                <h1 className={ProductListCategoriesCss.queComoTitle}>QuéComo</h1>
                <button className={ProductListCategoriesCss.notificationsBtn}>
                    <i id={ProductListCategoriesCss.bellIcon} className="far fa-bell"></i>
                </button>
                <button className={ProductListCategoriesCss.userProfileBtn}>
                    {/* <i id={ProductListCategoriesCss.userProfileIcon} className="fas fa-user-cog"></i> */}
                    <img src="../../../userProfile.svg" className={ProductListCategoriesCss.userProfileSVG} alt="arco superior" />
                </button>
            </div>
            <div className={ProductListCategoriesCss.titleContainer}>
                <h1 className={ProductListCategoriesCss.titleCategorySelected}>{DashboardCtxt.dataCat.Categoria}</h1>
                <h2 className={ProductListCategoriesCss.titleSMarketSelected}>{DashboardCtxt.dataSMarket.Marca}</h2>
            </div>
            <section className={ProductListCategoriesCss.optionsBtnSection}>
                <div className={ProductListCategoriesCss.optionsBtnContainer}>
                    <button className={OtherMarkets ? `${ProductListCategoriesCss.OSMarketsBtnActive}` : `${ProductListCategoriesCss.OSMarketsBtn}`} onClick={handleOtherMarketsContainer}>Otros Supermercados</button>
                    <button className={ThisMarket ? `${ProductListCategoriesCss.TSMarketsBtnActive}` : `${ProductListCategoriesCss.TSMarketsBtn}` } onClick={handleThisMarketContainer} >Otras Categorías</button>
                </div>
            </section>
            <section className={ProductListCategoriesCss.OptionsSection}>
                {showOtherMarketsOptions()}
                {showThisMarketsOptions()}
            </section>
        </>
    )
}
