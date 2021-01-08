import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm';
// import { usePreferences } from '../../Hooks/usePreferences';
import { Background } from '../Templates/Background';
import DashboardCss from './Dashboard.module.css';
import { useRedirect } from '../../Hooks/useRedirect';
// import { Fetch } from '../../Hooks/useFetch';
import { LoginContext } from '../../Contexts/LoginContext';
import { BrandList } from '../BrandList/BrandList';




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

    // const preferences = usePreferences();
    const location = useLocation();
    const Redirect = useRedirect();
    const Login = useContext(LoginContext);
    // console.log(Login)

    const [formValues, handleInputChange] = useForm({
        search_term : "",
        category :"",
        labels:[],
        brand:"",
        additives:"",
        allergens:[]
    });

    const {search_term} = formValues


    const [optionContainer, setOptionContainer] = useState({
        brands : true,
        products : false
    })

    const [url, setUrl] = useState(``);

    const [stateResDB, setStateResDB] = useState(null);

    const {brands, products} = optionContainer;

    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
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

    const showOptionsContainer = () => {;
        if(brands && !products && url !== `${process.env.REACT_APP_backUrl}/get-info-brands`){
            setUrl(`${process.env.REACT_APP_backUrl}/get-info-brands`)
        }
        if (brands && !products)
            return <BrandList url={url} />
        else {

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

    const hanldeSubmitSearch = (e) => {

        e.preventDefault();

        Fetch(`${process.env.REACT_APP_backUrl}/product-search`, {method : "post", data : {...formValues}})
        .then(data => {
            
            if(data){
                const {res, Results} = data;

                switch(res){
                    case "1" :
                        Login.setLoginUserInfo({...Login, Results});
                        console.log({...Login});
                        setStateResDB("1");
                        Redirect("/home/product-list");
                        break;
                    case "-1" :
                        setStateResDB("-1")
                        break;
                    case "-2" :
                        setStateResDB("-2");
                        break;
                    case "-3" :
                        setStateResDB("-3");
                        break;
                    case "-4" :
                        setStateResDB("-4");
                        break;
                    default :
                        break;
                }
            }
        })
    }

    const showResponseDBError = () => {

        if(stateResDB === "-1"){
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
        
        // if(Error === "-2"){
        //     return (
        //         <>
        //             <div className={DashboardCss.WarningInCredentials}>
        //                 <p>No hemos encontrado ningun usuario con ese email en nuestra base de datos, porfavor regístrate primero en la aplicación para poder entrar.</p>
        //                 <button className={DashboardCss.RegisterBtn} onClick={(e) => Redirect("/Register", e)}>Registrarme</button>
        //             </div>
        //             {/* <div> */}
        //                 {/* {setTimeout(() =>{ */}
        //                  {/* },1000) */}
        //                 {/* } */}

        //             {/* </div> */}
        //         </>
        //     )
        // }

        // if(Error === "-3" || Error === "-1"){
        //     return <div className={DashboardCss.ErrorInCredentials}>
        //                 <p>Lo sentimos, en estos momentos no podemos contactar con la base de datos, porfavor vuelva a intentarlo de nuevo mas tarde.</p>
        //             </div>
        // } 
        
        // if(Error === "-4" || !isValid.email || !isValid.psw){
        //     return <div className={DashboardCss.ErrorInCredentials}>
        //                 <p>El email o contraseña que has introducido no son correctos, recuerda que deben ser:</p>
        //                 <ul className={DashboardCss.ErrorInCredentialsList}>
        //                     <li>Ej: example@gmail.com</li>
        //                     <li>Ej: 9t7kfCqQt </li>
                                
        //                 </ul>

        //           </div>

        // } 
        
        // if(Error === "-5"){
        //     return <div className={DashboardCss.ErrorInCredentials}>
        //                 <p>Los campos de email y contraseña no pueden estar vacíos.</p>
        //           </div>
        // }
        
    }

    return (
        <>
            {ShowModalWindow()}
            {showResponseDBError()}
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
                    name="search_term"
                    placeholder="Buscar"
                    autoComplete="off"
                    value={search_term}
                    onChange={handleInputChange}
                    onSubmit={hanldeSubmitSearch}/>
                <button className={DashboardCss.searchBtn} onClick={hanldeSubmitSearch}>
                    <i id={DashboardCss.searchIcon} className="fas fa-search_term"></i>
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
