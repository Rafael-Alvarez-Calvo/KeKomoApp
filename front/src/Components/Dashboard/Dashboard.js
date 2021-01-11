import React, { useState, useContext } from 'react';
import {useHistory, useLocation } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm';
// import { usePreferences } from '../../Hooks/usePreferences';
import { Background } from '../Templates/Background';
import DashboardCss from './Dashboard.module.css';
import { useRedirect } from '../../Hooks/useRedirect';
import { Fetch } from '../../Hooks/useFetch';
import { LoginContext } from '../../Contexts/LoginContext';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { BrandList } from '../BrandList/BrandList';
import { ProductList} from '../ProductList/ProductList';





import { makeStyles } from '@material-ui/core/styles';

// import Modal from '@material-ui/core/Modal';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
// import { Fetch } from '../../Hooks/useFetch';


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
    const history = useHistory();
    const Login = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    // console.log(Login)

    const [formValues, handleInputChange] = useForm({
         
    });

    const {search_term} = formValues


    const [optionContainer, setOptionContainer] = useState({
        brands : true,
        products : false
    })
    
    const {brands, products} = optionContainer;

    const [url, setUrl] = useState(``);

    const [statePage, setStatePage] = useState({
        DashboardPage : true,
        ProductListPage : false
    });


    const classes = useStyles();
    const [open, setOpen] = useState(null);
  
    const handleOpenMW = () => {
      setOpen(true);
    };
  
    const handleCloseMW = () => {
      setOpen(null);
    };

    

    // const ShowModalWindow = () => {
        
    //     return (
    //         <div className={DashboardCss.modalWindowContainer}>
    //             <Modal
    //             aria-labelledby="transition-modal-title"
    //             aria-describedby="transition-modal-description"
    //             className={DashboardCss.modalWindow}
    //             open={open}
    //             onClose={handleCloseMW}
    //             closeAfterTransition
    //             BackdropComponent={Backdrop}
    //             BackdropProps={{
    //                 timeout: 500,
    //             }}>
    //                 {/* <Fade in={open}>
    //                     <div className={classes.paper}>
    //                     <h2 id="transition-modal-title">Transition modal</h2>
    //                     <p id="transition-modal-description">react-transition-group animates me.</p>
    //                     </div>
    //                 </Fade> */}
    //             </Modal>
    //         </div>
    //     ); 
    // };

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

    const showProductsOptionsContainer = () => {

        if(products && !brands && url !== `${process.env.REACT_APP_backUrl}/product-search`){
            setUrl(`${process.env.REACT_APP_backUrl}/product-search`)
            console.log(url);
        }

        if(products && !brands){
            return <ProductList url={url} opt={{method: "POST", data : {...formValues}}} /> 

        } 
        
        // else {
        //     return <>
        //             {showBrandsOptionsContainer()}
        //            </>
        // }
    }

    const showBrandsOptionsContainer = () => {;
        if(brands && !products && url !== `${process.env.REACT_APP_backUrl}/get-info-brands`){
            setUrl(`${process.env.REACT_APP_backUrl}/get-info-brands`)
            console.log(url);
        }
        if (brands && !products)
            return <BrandList url={url} pageState={statePage}/>
                   
        
    };

    const handleSubmitSearch = (e) => {
        
        e.preventDefault();
        // console.log(url)
        // if(url === `${process.env.REACT_APP_backUrl}/get-info-brands`){

        //     setUrl(`${process.env.REACT_APP_backUrl}/product-search`)
        //     console.log(url)
            
        // }
        // if(url){
        //     return <GetSeacrhRes url={`${process.env.REACT_APP_backUrl}/product-search`} method={"POST"} postData={{...formValues}} />

        // }
    }

    // const showResponseDBError = () => {
    //     console.log(stateResDB)
    //     if(stateResDB === "-1"){
            // handleOpenMW();
            // ShowModalWindow();
            // return (
            //     <>
            //         <div className={DashboardCss.modalWindowContainer}>
            //             Heyyyy
            //         <Modal
            //             aria-labelledby="transition-modal-title"
            //             aria-describedby="transition-modal-description"
            //             className={DashboardCss.modalWindow}
            //             open={open}
            //             onClose={handleCloseMW}
            //             closeAfterTransition
            //             BackdropComponent={Backdrop}
            //             BackdropProps={{
            //             timeout: 500,
            //             }}>
            //             <Fade in={open}>
            //             <div className={classes.paper}>
            //                 <h2 id="transition-modal-title">Transition modal</h2>
            //                 <p id="transition-modal-description">react-transition-group animates me.</p>
            //             </div>
            //             </Fade>
            //         </Modal>
            //         </div>
            //     </>
            // );
        // }
        
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
        
    // }

    const logOut = (e) => {
        e.preventDefault();
        Fetch(`${process.env.REACT_APP_backUrl}/logout`)
        .then(({res}) => {
            if(res === "1" || res === "-1")
                Redirect("/", e);
        })
    }

    return (
        <>
            
            <Background className={DashboardCss.BGcontainer} />
            <div className={DashboardCss.userContainer}>
                <button className={DashboardCss.backBtn} onClick={logOut}>
                    <i id={DashboardCss.iconBackBtn} className="fas fa-chevron-left"></i>
                </button>
                <h1 className={DashboardCss.queComoTitle}>QuéComo</h1>
                <button className={DashboardCss.notificationsBtn}>
                    <i id={DashboardCss.bellIcon} className="far fa-bell"></i>
                </button>
                <button className={DashboardCss.userProfileBtn}>
                    {/* <i id={DashboardCss.userProfileIcon} className="fas fa-user-cog"></i> */}
                    <img src="../../../userProfile.svg" className={DashboardCss.userProfileSVG} alt="arco superior" />
                </button>
            </div>
            {/* {ShowModalWindow()} */}
            {/* {showResponseDBError()} */}
            <div className={DashboardCss.searchbarContainer}>
                <input 
                    id={DashboardCss.searchBar}
                    type="text"
                    name="search_term"
                    placeholder="Buscar"
                    autoComplete="off"
                    value={search_term}
                    onChange={handleInputChange}
                    onSubmit={handleSubmitSearch}/>
                <button className={DashboardCss.searchBtn} onClick={handleSubmitSearch}>
                    <i id={DashboardCss.searchIcon} className="fas fa-search"></i>
                </button>
                <button className={DashboardCss.filterBtn} onClick={handleOpenMW}>
                    <i id={DashboardCss.filterIcon} className="fas fa-sliders-h"></i>
                    
                </button>
            </div>
            <section className={DashboardCss.optionsBtnSection}>
                <div className={DashboardCss.optionsBtnContainer}>
                    <button className={brands ? `${DashboardCss.brandsBtnActive}` : `${DashboardCss.brandsBtn}`} onClick={handleBrandsContainer}>Marcas</button>
                    <button className={products ? `${DashboardCss.productsBtnActive}` : `${DashboardCss.productsBtn}` } onClick={handleProductsContainer} >Productos</button>
                </div>
            </section>
            
            <section className={DashboardCss.OptionsSection}>
                    {showBrandsOptionsContainer()}
                    {showProductsOptionsContainer()}
            </section>
    
            <section className={DashboardCss.navSection}>
                <nav className={DashboardCss.navContainer}>
                    {/* <img src="/navRectangle.svg" className={DashboardCss.navRectangle} alt="arco superior" /> */}
                    <button className={`${DashboardCss.navBtn} ${location.pathname === "/home" ? DashboardCss.isActive: DashboardCss.navBtn}`} onClick={(e) => Redirect("/home", e)}>
                        <i id={DashboardCss.homeIcon} className="fas fa-home"></i>
                        {/* Inicio */}
                    </button>
                    <button className={DashboardCss.navBtn} onClick={(e) => Redirect("/guest-user-history", e)}>
                        <i id={DashboardCss.historyIcon} className="fas fa-history"></i>
                        {/* Historial */}
                    </button>
                    <button className={DashboardCss.barCodeBtn} onClick={(e) => Redirect("/barcode-reader", e)}>
                        <i id={DashboardCss.barCodeIcon} className="fas fa-barcode"></i>
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
