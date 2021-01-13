import React, {useContext, useState} from 'react'
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { useRedirect } from '../../Hooks/useRedirect';
import CategoriesListCss from './CategorieList.module.css';

export const CategoriesList = ({Categoria, dataCat}) => {

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    const Redirect = useRedirect();
    const [categorySelected, setCategorySelected] = useState(false)

    return (
            <div onClick={e => {
                LoginCtxt.setLoginUserInfo({...LoginCtxt});
                DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataCat});
                setCategorySelected(true);
                console.log(categorySelected)
                setTimeout(() => {

                    Redirect("/home/brand-categories/product-list", e)

                }, 650)
            }} className={categorySelected ? `${CategoriesListCss.CategorieContainerActive}` : `${CategoriesListCss.CategorieContainer}`}>

                <div className={CategoriesListCss.CategoryTitleContainer}>
                    <p className={categorySelected ? `${CategoriesListCss.CategoryTitleActive}` : `${CategoriesListCss.CategoryTitle}`}>{Categoria}</p>
                </div>
                <div className={CategoriesListCss.scoreContainer}>
                    <button className={CategoriesListCss.scoreBtn}>Nota Media</button>
                    <i id={categorySelected ? `${CategoriesListCss.iconChevronActive}` : `${CategoriesListCss.iconChevron}`} className="fas fa-chevron-right"></i>
                
                </div>
            </div>
    )
}