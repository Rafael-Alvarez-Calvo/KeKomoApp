import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { BackgroundShort } from '../../Templates/Backgrounds/BackgroundShort'
import { HeaderLogo } from '../../Templates/Headers/HeaderLogo'
import { DashboardContext } from '../../../Contexts/DashboardContext';
import { LoginContext } from '../../../Contexts/LoginContext';
import ScoreCategoryCss from './ScoreCategory.module.css';
import { useOptionsList } from '../../../Hooks/useOptionsList';


export const ScoreCategory = () => {

    const history = useHistory();

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    const { dataCat, dataSMarket } = DashboardCtxt;
    console.log(DashboardCtxt)

    const [{data, isLoading}] = useOptionsList(`${process.env.REACT_APP_backUrl}/get-scores-by-category`, JSON.stringify({method: "POST", data : {dataCat, dataSMarket}}))
    console.log(data)

    const NutriscoreValuesContainer = () => {
        if(data && data.data){
            return <>
                        {/* {data.data.map(())} */}
                   </>
        }
    }

    return <>
                <BackgroundShort />
                <HeaderLogo onClick={() => {history.go(-1)}}/>
                
                <section className={ScoreCategoryCss.SMarketSection}>
                    <div className={ScoreCategoryCss.SMarketContainer}>
                        <div className={ScoreCategoryCss.imgSMarketContainer}>
                            <img src={DashboardCtxt.dataSMarket.Logo} alt={DashboardCtxt.dataSMarket.Marca} className={ScoreCategoryCss.imgSMarket}/>
                        </div>
                    </div>       
                </section>
                <h1 className={ScoreCategoryCss.titleCategorySelected}>{DashboardCtxt.dataCat.Categoria}</h1>
                
                <section className={ScoreCategoryCss.ScoresSection}>
                    {(data && data.data) && <p className={ScoreCategoryCss.globalScoreCategory}>{Math.floor(data.data.Categoria * 100)}%</p>}
                    <p>Te mostramos en porcentajes la cantidad de productos con cada puntuación en esta categoria.</p>
                    <div className={ScoreCategoryCss.ScoresContainer}>
                        <div className={ScoreCategoryCss.NutriscoreContainer}>
                            <img src="/infoScores/NutriscoreTitle.svg"/>
                            <div className={ScoreCategoryCss.NutriscoreValuesContainer}>

                            </div>

                        </div>

                    </div>

                </section>
                
                
           </>
    
}
