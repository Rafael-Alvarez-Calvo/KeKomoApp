import React from 'react';
import { Fetch } from '../../../Hooks/useFetch';
import { useRedirect } from '../../../Hooks/useRedirect';
import HeaderLogoCss from './HeaderLogo.module.css';

export const HeaderLogo = ({onClick}) => {

    const Redirect = useRedirect();

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
            <div className={HeaderLogoCss.userContainer}>
                <button className={HeaderLogoCss.backBtn} onClick={onClick ? onClick : logOut}>
                    <i id={HeaderLogoCss.iconBackBtn} className="fas fa-chevron-left"></i>
                </button>
                <div className={HeaderLogoCss.LogoContainer}>
                    <img src="/LogoHeader.svg" className={HeaderLogoCss.LogoHeaderSVG} alt="Logo de QuéComo" />
                </div>
                <button className={HeaderLogoCss.notificationsBtn}>
                    <i id={HeaderLogoCss.bellIcon} className="far fa-bell"></i>
                </button>
                <button className={HeaderLogoCss.userProfileBtn}>
                    {/* <i id={HeaderLogoCss.userProfileIcon} className="fas fa-user-cog"></i> */}
                    <img src="../../../userProfile.svg" className={HeaderLogoCss.userProfileSVG} alt="imagen de perfil" />
                </button>
            </div>
        </>
    )
}
