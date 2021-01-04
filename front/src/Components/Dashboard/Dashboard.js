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
            <div className={DashboardCss.archContainer}>
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
            </div>
        </>
    )
}
