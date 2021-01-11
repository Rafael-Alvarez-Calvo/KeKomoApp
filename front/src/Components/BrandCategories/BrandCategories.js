import React, { useContext, useState } from 'react'
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { Background } from '../Templates/Background';
import BrandCategoriesCss from './BrandCategories.module.css';
import { useForm } from '../../Hooks/useForm';
import { useOptionsList } from '../../Hooks/useOptionsList';
import { useRedirect } from '../../Hooks/useRedirect';
import { useHistory, useLocation } from 'react-router-dom';


export const BrandCategories = ({pageProductListState}) => {

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    console.log(DashboardCtxt);
    const history = useHistory();

    const [formValues, handleInputChange] = useForm({
        search_term : "",
        category :"",
        labels:[],
        brand:"",
        additives:"",
        allergens:[]
    });

    const {search_term} = formValues;

    // const [pageState, setPageState] = useState(true);
    const { pageStatus } = DashboardCtxt;

    // const { DashboardPage, ProductListPage } = pageState

    const [categorySelected, setCategorySelected] = useState(false)
    const [url, setUrl] = useState(`${process.env.REACT_APP_backUrl}/get-info-categories`);

    const [{isLoading, data}] = useOptionsList(url);
    const Redirect = useRedirect();
    const location = useLocation();

    const handleSubmitSearch = () => {

    }

    // const handleProductListStatePage = (e) => {

    //     e.preventDefault();

    //     setPageState({
    //         ...pageState,
    //         ProductList : !ProductList && ProductList,
    //         CategoryList: false

    //     });
    // }

    const paintCategoriesListContainer = () =>{

        if(pageStatus.BrandListPage && !pageStatus.ProductListPage){
            // DashboardCtxt.setDashBoardInfo({...DashboardCtxt.pageStatus, BrandListPage : false, ProductListPage : true});
            return <CategoriesListYScroll />
        }

        if(!pageProductListState.BrandCategoriesPage && pageProductListState.ProductListPage){
            console.log("eeee")
            return <CategoriesListXScroll />

        }
    }

    const CategoriesListYScroll = () => {
        if (data && !isLoading){
            const {res, Categorias} = data;

            if(res === "1" && Categorias ){
                return(
                    <>
                        <div className={BrandCategoriesCss.CategoriesListContainer}>
                            {Categorias.length && Categorias.map(dataCat => {
                                    const { Categoria, Id } = dataCat;
                                    return <>
                                                <div key={Id} onClick={handleCategoryClick}>
                                                    <CategoriesList key={Categoria} Categoria={Categoria} onClick={e => {
                                                            LoginCtxt.setLoginUserInfo({...LoginCtxt});
                                                            DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataCat});
                                                            setTimeout(() => {
                                                                Redirect("/home/brand-categories/product-list", e)

                                                            }, 500)
                                                    }} />
                                                </div>
                                                <hr className={BrandCategoriesCss.Separator}/>
                                            </>                
                            })}

                        </div>
                    </>
                ) 
            }
        }
    }
    const CategoriesListXScroll = () => {
        if (data && !isLoading){
            const {res, Categorias} = data;

            if(res === "1" && Categorias ){
                return(
                    <>
                        <div className={BrandCategoriesCss.XCategoriesContainerX}>
                            {Categorias.length && Categorias.map(dataSMarket => {
                                const { Categoria, Id } = dataSMarket;
                                return <SliderCategories key={Id} 
                                                    //   onClick={
                                                        //   e => handleClickOptionSMarket(e, Marca, DashboardCtxt.dataCat.Categoria)
                                                            // DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataSMarket});
                                                            // Redirect("/home/brand-categories", e)
                                                    //   } 
                                                        Categoria={ Categoria }
                                        />
                                                            
                            })}
                        </div>  
                    </>
                ) 
            }
        }
    }

    const handleCategoryClick = (e) => {
        e.preventDefault();
        setCategorySelected(true);

    }

    const CategoriesList = ({Categoria, onClick}) => {
        return (
                <div onClick={onClick} className={categorySelected ? `${BrandCategoriesCss.CategorieContainerActive}` : `${BrandCategoriesCss.CategorieContainer}`}>
                    <div className={BrandCategoriesCss.CategoryTitleContainer}>
                        <p className={categorySelected ? `${BrandCategoriesCss.CategoryTitleActive}` : `${BrandCategoriesCss.CategoryTitle}`} onClick={onClick}>{Categoria}</p>
                    </div>
                    <div className={BrandCategoriesCss.scoreContainer}>
                        <button className={BrandCategoriesCss.scoreBtn}>Nota Media</button>
                        <i id={categorySelected ? `${BrandCategoriesCss.iconChevronActive}` : `${BrandCategoriesCss.iconChevron}`} className="fas fa-chevron-right" onClick={onClick}></i>
                    
                    </div>
                </div>
        )
    }

    const SliderCategories = ({Categoria, onClick}) => {
        return (
            <button className={BrandCategoriesCss.XCategoriesBtnX} onClick={onClick}>
                {Categoria}
            </button>
        )
    }

    return (
        <>
        
            <Background className={BrandCategoriesCss.BGcontainer} />
            <div className={BrandCategoriesCss.userContainer}>
                <button className={BrandCategoriesCss.backBtn} onClick={() => {history.go(-1)}}>
                    <i id={BrandCategoriesCss.iconBackBtn} className="fas fa-chevron-left"></i>
                </button>
                <h1 className={BrandCategoriesCss.queComoTitle}>QuéComo</h1>
                <button className={BrandCategoriesCss.notificationsBtn}>
                    <i id={BrandCategoriesCss.bellIcon} className="far fa-bell"></i>
                </button>
                <button className={BrandCategoriesCss.userProfileBtn}>
                    {/* <i id={BrandCategoriesCss.userProfileIcon} className="fas fa-user-cog"></i> */}
                    <img src="../../../userProfile.svg" className={BrandCategoriesCss.userProfileSVG} alt="arco superior" />
                </button>
            </div>
            {/* {ShowModalWindow()} */}
            {/* {showResponseDBError()} */}
            <div className={BrandCategoriesCss.searchbarContainer}>
                <input 
                    id={BrandCategoriesCss.searchBar}
                    type="text"
                    name="search_term"
                    placeholder="Buscar"
                    autoComplete="off"
                    value={search_term}
                    onChange={handleInputChange}
                    onSubmit={handleSubmitSearch}/>
                <button className={BrandCategoriesCss.searchBtn} onClick={handleSubmitSearch}>
                    <i id={BrandCategoriesCss.searchIcon} className="fas fa-search"></i>
                </button>
                <button className={BrandCategoriesCss.filterBtn}>
                    <i id={BrandCategoriesCss.filterIcon} className="fas fa-sliders-h"></i>
                </button>
            </div>
            <section className={BrandCategoriesCss.SMarketSection}>
                <div className={BrandCategoriesCss.SMarketContainer}>
                    <div className={BrandCategoriesCss.imgSMarketContainer}>
                        <img src={DashboardCtxt.dataSMarket.Logo} alt={DashboardCtxt.dataSMarket.Marca} className={BrandCategoriesCss.imgSMarket}/>
                    </div>
                    {/* <p className={BrandCategoriesCss.SMarketTitle}>{DashboardCtxt.data.Marca}</p> */}
                </div>
                
                    
            </section>

            <section>
                {isLoading && <div className={BrandCategoriesCss.loadingSVGContainer}><img src="/loading.svg" className={BrandCategoriesCss.loadingSVG} alt="loading icon" /></div>}
                {!isLoading && paintCategoriesListContainer()}
            </section>
            <section className={BrandCategoriesCss.navSection}>
                <nav className={BrandCategoriesCss.navContainer}>
                    {/* <img src="/navRectangle.svg" className={BrandCategoriesCss.navRectangle} alt="arco superior" /> */}
                    <button className={`${BrandCategoriesCss.navBtn} ${location.pathname === "/home" ? BrandCategoriesCss.isActive: ""}`} onClick={(e) => Redirect("/home", e)}>
                        <i id={BrandCategoriesCss.homeIcon} className="fas fa-home"></i>
                        {/* Inicio */}
                    </button>
                    <button className={BrandCategoriesCss.navBtn} onClick={(e) => Redirect("/guest-user-history", e)}>
                        <i id={BrandCategoriesCss.historyIcon} className="fas fa-history"></i>
                        {/* Historial */}
                    </button>
                    <button className={BrandCategoriesCss.barCodeBtn} onClick={(e) => Redirect("/barcode-reader", e)}>
                        <i id={BrandCategoriesCss.barCodeIcon} className="fas fa-barcode"></i>
                        {/* Historial */}
                    </button>
                    <button className={BrandCategoriesCss.navBtn} onClick={(e) => Redirect("/guest-user-favourites", e)}>
                        <i id={BrandCategoriesCss.heartIcon} className="fas fa-heart"></i>
                        {/* Favoritos */}
                    </button>
                    <button className={BrandCategoriesCss.navBtn} onClick={(e) => Redirect("/guest-user-shopping-lists", e)}>
                        <i id={BrandCategoriesCss.shoppingListIcon} className="fas fa-tasks"></i>
                        {/* Listas de la compra */}
                    </button>

                </nav>
            </section>
            
        </>
    )
}
