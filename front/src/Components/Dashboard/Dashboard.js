import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm';
import { usePreferences } from '../../Hooks/usePreferences';
import { Background } from '../Templates/Background';
// import Carousel from 'react-swiping-carousel';
import DashboardCss from './Dashboard.module.css';
import { useRedirect } from '../../Hooks/useRedirect';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Fetch } from '../../Hooks/useFetch';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

export const Dashboard = () => {

    const preferences = usePreferences();
    const location = useLocation();
    const Redirect = useRedirect();

    const [formValues, handleInputChange] = useForm({
        search : "",
    });

    const {search} = formValues


    const [optionContainer, setOptionContainer] = useState({
        brands : true,
        products : false
    })

    const {brands, products} = optionContainer;

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpenMW = () => {
      setOpen(true);
    };
  
    const handleCloseMW = () => {
      setOpen(false);
    };

    const ShowModalWindow = () => {
        if(open){
            return (
                <div className={DashboardCss.modalWindowContainer}>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={DashboardCss.modalWindow}
                    open={open}
                    onClose={handleCloseMW}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}>
                    <Fade in={open}>
                      <div className={classes.paper}>
                        <h2 id="transition-modal-title">Transition modal</h2>
                        <p id="transition-modal-description">react-transition-group animates me.</p>
                      </div>
                    </Fade>
                  </Modal>
                </div>
            );
        }
    };

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
        console.log("heeeey", brands, products)
        if(brands && !products){

            Fetch(`${process.env.REACT_APP_backUrl}/get-info-brands`)
            .then((data) => {
                if(data){
                    const {res, Marcas} = data;

                    if(res === "1" && Marcas ){
                        return (
                            <>
                                <div className={DashboardCss.superMarketsTitleContainer}>
                                    <label>Todos los supermercados</label> 
                                    <i id={DashboardCss.filterIconOptions} className="fas fa-sliders-h"></i>
                                </div>

                                {Marcas.map(data => {
                                    
                                    const {Marca} = data;
                                    return <Carousel key={Marca}>
                                                <ImageMarket key={Marca} item={Marca}/>
                                            </Carousel>
                                    
                                    
                                })}
                                
                            </>
                        )
                    } else {
                        return (
                            <>
                                <div className={DashboardCss.ErrorMessage}>
                                    <p>Lo sentimos en estos momentos no podemos mostrarte esta informacion, inténtalo de nuevo mas tarde</p>
                                </div>
                            </>
                        )
                    }
                } else {
                    console.log("hola")
                }
            })

            

        } else {

            // return (
            //     <>
            //         <div className={DashboardCss.superMarketsTitleContainer}>
            //             <label>Todos los supers</label> 
            //             <i id={DashboardCss.filterIconOptions} className="fas fa-sliders-h"></i>
            //         </div>
            //         {Object.keys(preferences).map(prefColl => {
            //             if(preferences[prefColl].length){
            //                 return <Carousel align={{first : "left", nth : "center", last : "right"}} 
            //                 margin={20} scrollDistance={20}>

            //                         { preferences[prefColl].map((pref) => 
            //                                 <p>{pref.name}</p>)}

            //                         </Carousel>
            //             }
                
            //         })}
            //     </>
            // )

        }
    };
 
    const ImageMarket = ({Marca}) => {
        return (
            <Paper>
                {/* <img /> */}
            </Paper>
        )
    }

    return (
        <>
            
            <Background />
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
                <button className={DashboardCss.filterBtn} onClick={handleOpenMW}>
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
            <img src="/navRectangle.svg" className={DashboardCss.navRectangle} alt="arco superior" />
                <nav className={DashboardCss.navContainer}>
                    <button className={`${DashboardCss.navBtn} ${location.pathname === "/guest-user-home" ? DashboardCss.isActive: ""}`} onClick={(e) => Redirect("/guest-user-home", e)}>
                        <i id={DashboardCss.homeIcon} className="fas fa-home"></i>
                        {/* Inicio */}
                    </button>
                    <button className={DashboardCss.navBtn} onClick={(e) => Redirect("/guest-user-history", e)}>
                        <i id={DashboardCss.historyIcon} className="fas fa-history"></i>
                        {/* Historial */}
                    </button>
                    <button className={DashboardCss.navBtn} onClick={(e) => Redirect("/guest-user-favourites", e)}>
                        <i id={DashboardCss.heartIcon} className="fas fa-heart"></i>
                        {/* Favoritos */}
                    </button>
                    <button className={DashboardCss.navBtn} onClick={(e) => Redirect("/guest-user-shopping-lists", e)}>
                        <i id={DashboardCss.shoppingListIcon} className="fas fa-tasks"></i>
                        {/* Listas de la compra */}
                    </button>

                </nav>
            </section>
            
            
            
        </>
    )
}
