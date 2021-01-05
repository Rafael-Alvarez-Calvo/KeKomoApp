import React from 'react';
import { useForm } from '../../Hooks/useForm';
import DashboardCss from './Dashboard.module.css';

export const Dashboard = () => {

    const [formValues, handleInputChange] = useForm({
        search : "",
    });

    const {search} = formValues

    return (
        <>
            <img src="../../../arco.svg" className={DashboardCss.arch} />
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
                    Filters
                </button>
            </div>
        </>
    )
}
