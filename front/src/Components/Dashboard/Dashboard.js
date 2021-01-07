import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm';
import { usePreferences } from '../../Hooks/usePreferences';
// import { background } from '../Templates/background';
import Carousel from 'react-swiping-carousel';
import DashboardCss from './Dashboard.module.css';

export const Dashboard = () => {

    const preferences = usePreferences();
    const location = useLocation();

    const [formValues, handleInputChange] = useForm({
        search : "",
    });

    const {search} = formValues


    const [optionContainer, setOptionContainer] = useState({
        brands : true,
        products : false
    })

    const {brands, products} = optionContainer;

    const handleBrandsContainer = (e) => {

        e.preventDefault();
        
        setOptionContainer({
            ...optionContainer,
            brands : brands ? brands : !brands,
            products: false

        });

    }
    const handleProductsContainer = (e) => {

        e.preventDefault();
        
        setOptionContainer({
            ...optionContainer,
            products : products ? !products : !products,
            brands : false
        });
    }

    const showOptionsContainer = () => {
        if(brands && !products){
            return (
                <>
                    <div className={DashboardCss.superMarketsTitleContainer}>
                        <label>Todos los supermercados</label> 
                        <i id={DashboardCss.filterIconOptions} className="fas fa-sliders-h"></i>
                    </div>
                    {Object.keys(preferences).map(prefColl => {
                        if(preferences[prefColl].length){
                            return <Carousel align={{first : "left", nth : "center", last : "right"}} 
                            margin={20} scrollDistance={20} key={prefColl}>

                                    { preferences[prefColl].map((pref) => 
                                            <p key={pref.name}>{pref.name}</p>)}

                                    </Carousel>
                        }
                
                    })}
                </>
            )

        } else {

            return (
                <>
                    <div className={DashboardCss.superMarketsTitleContainer}>
                        <label>Todos los supers</label> 
                        <i id={DashboardCss.filterIconOptions} className="fas fa-sliders-h"></i>
                    </div>
                    {Object.keys(preferences).map(prefColl => {
                        if(preferences[prefColl].length){
                            return <Carousel align={{first : "left", nth : "center", last : "right"}} 
                            margin={20} scrollDistance={20}>

                                    { preferences[prefColl].map((pref) => 
                                            <p>{pref.name}</p>)}

                                    </Carousel>
                        }
                
                    })}
                </>
            )

        }
    }

    return (
        <>
            <img src="../../../arco.svg" className={DashboardCss.arch} alt="arco superior" />
            {/* <background /> */}
            <div className={DashboardCss.userContainer}>
                <h1 className={DashboardCss.queComoTitle}>QuéComo</h1>
                <button className={DashboardCss.notificationsBtn}>
                    <i id={DashboardCss.bellIcon} className="far fa-bell"></i>
                </button>
            </div>
            <div className={DashboardCss.searchbarContainer}>
                <input 
                    id={DashboardCss.searchBar}
                    type="text"
                    name="search"
                    placeholder="Buscar"
                    autoComplete="off"
                    value={search}
                    onChange={handleInputChange}/>
                <button className={DashboardCss.searchBtn}>
                    <i id={DashboardCss.searchIcon} className="fas fa-search"></i>
                </button>
                <button className={DashboardCss.filterBtn}>
                    <i id={DashboardCss.filterIcon} className="fas fa-sliders-h"></i>
                    
                </button>
            </div>

            <div className={DashboardCss.optionsSection}>
                <button className={brands ? `${DashboardCss.brandsBtnActive}` : `${DashboardCss.brandsBtn}`} onClick={handleBrandsContainer}>Marcas</button>
                <button className={products ? `${DashboardCss.productsBtnActive}` : `${DashboardCss.productsBtn}` } onClick={handleProductsContainer} >Productos</button>
            </div>
            <section className={DashboardCss.OptionsSection}>
                {showOptionsContainer()}

            </section>

                
                
            <section className={DashboardCss.navSection}>
                <nav className={DashboardCss.navContainer}>
                    <button className={location.pathname == "/guest-user-home" && `${DashboardCss.navBtn} ${DashboardCss.isActive}`}>
                        <i id={DashboardCss.homeIcon} class="fas fa-home"></i>
                        {/* Inicio */}
                    </button>
                    <button className={DashboardCss.navBtn}>
                        <i id={DashboardCss.historyIcon} class="fas fa-history"></i>
                        {/* Historial */}
                    </button>
                    <button className={DashboardCss.navBtn}>
                        <i id={DashboardCss.heartIcon} class="fas fa-heart"></i>
                        {/* Favoritos */}
                    </button>
                    <button className={DashboardCss.navBtn}>
                        <i id={DashboardCss.shoppingListIcon} class="fas fa-tasks"></i>
                        {/* Listas de la compra */}
                    </button>

                </nav>
            </section>
            
            
            
        </>
    )
}
