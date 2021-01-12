import React from 'react'
import { useLocation } from 'react-router-dom';
import { useRedirect } from '../../../Hooks/useRedirect'
import NavBarCss from './NavBar.module.css';

export const NavBar = ({PathHomeBtn}) => {

    const Redirect = useRedirect();
    const location = useLocation();
    return (
        <>
            <section className={NavBarCss.navSection}>
                <nav className={NavBarCss.navContainer}>
                    {/* <img src="/navRectangle.svg" className={NavBarCss.navRectangle} alt="arco superior" /> */}
                    <button className={`${NavBarCss.navBtn} ${location.pathname === PathHomeBtn ? NavBarCss.isActive: NavBarCss.navBtn}`} onClick={(e) => Redirect("/home", e)}>
                        <i id={NavBarCss.homeIcon} className="fas fa-home"></i>
                        {/* Inicio */}
                    </button>
                    <button className={NavBarCss.navBtn} onClick={(e) => Redirect("/guest-user-history", e)}>
                        <i id={NavBarCss.historyIcon} className="fas fa-history"></i>
                        {/* Historial */}
                    </button>
                    <button className={NavBarCss.barCodeBtn} onClick={(e) => Redirect("/barcode-reader", e)}>
                        <i id={NavBarCss.barCodeIcon} className="fas fa-barcode"></i>
                        {/* Historial */}
                    </button>
                    <button className={NavBarCss.navBtn} onClick={(e) => Redirect("/guest-user-favourites", e)}>
                        <i id={NavBarCss.heartIcon} className="fas fa-heart"></i>
                        {/* Favoritos */}
                    </button>
                    <button className={NavBarCss.navBtn} onClick={(e) => Redirect("/guest-user-shopping-lists", e)}>
                        <i id={NavBarCss.shoppingListIcon} className="fas fa-tasks"></i>
                        {/* Listas de la compra */}
                    </button>

                </nav>
            </section>
        </>
    )
}
