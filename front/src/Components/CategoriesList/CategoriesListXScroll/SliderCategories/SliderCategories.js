import React, { useContext, useState } from 'react';
import { DashboardContext } from '../../../../Contexts/DashboardContext';
import { LoginContext } from '../../../../Contexts/LoginContext';
import { useRedirect } from '../../../../Hooks/useRedirect';
import SliderCategoriesCss from './SliderCategories.module.css';


export const SliderCategories = ({Categoria, dataCat}) => {

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    const Redirect = useRedirect();
    const [categorySelected, setCategorySelected] = useState(false)

    return (
        <>
            <button className={SliderCategoriesCss.XCategoriesBtnX} onClick={e => {
                LoginCtxt.setLoginUserInfo({...LoginCtxt});
                DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataCat});
                setCategorySelected(true);
                // console.log(categorySelected)
                setTimeout(() => {

                    Redirect("/home/brand-categories/product-list", e)

                }, 650)
            }}>
                {Categoria}
            </button>
        </>
    )
}
