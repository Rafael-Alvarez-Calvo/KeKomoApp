import React, { useContext, useState } from 'react'
import { useRedirect } from '../../../Hooks/useRedirect';
import OptionsSuppliersCss from './OptionsSuppliers.module.css';
import { DashboardContext } from '../../../Contexts/DashboardContext';
import { LoginContext } from '../../../Contexts/LoginContext';

export const OptionsSuppliers = ({Certificaciones, Emb}) => {

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    const Redirect = useRedirect();

    const [infoSelected, setInfoSelected] = useState(false);

    return <>
                <div className={OptionsSuppliersCss.suppliersInfoContainer}>
                    <div onClick={e => {
                        // LoginCtxt.setLoginUserInfo({...LoginCtxt});
                        // DashboardCtxt.setDashBoardInfo({...DashboardCtxt});
                            // setProductSelected(true);
                            setTimeout(() => {
                                Redirect("/home/product-list/product-detail/info-supplier", e)
                            }, 650)
                        //Podria ponerse en una funcion pero la reservo por si hago el scroll al div de la siguiente pagina
                    }} className={OptionsSuppliersCss.aboutSuppliersInfoContainer}>
                        <img src="/IconosBotones/aboutSupplier.svg" alt="icon"/>
                        <p className={OptionsSuppliersCss.aboutSuppliersTitle}>Sobre el productor</p>

                    </div>
                    <div onClick={e => {
                        // LoginCtxt.setLoginUserInfo({...LoginCtxt});
                        // DashboardCtxt.setDashBoardInfo({...DashboardCtxt});
                            // setProductSelected(true);
                            setTimeout(() => {
                                Redirect("/home/product-list/product-detail/info-supplier", e)
                            }, 650)
                        //Podria ponerse en una funcion pero la reservo por si hago el scroll al div de la siguiente pagina
                    }} className={OptionsSuppliersCss.CertificatesInfoContainer}>
                        <img src="/IconosBotones/certificatesIcon.svg" alt="icon"/>
                        <p className={OptionsSuppliersCss.CertificatesTitle}>Certificados y sellos</p>
                    </div>
                </div>
            </>
}
