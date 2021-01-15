import React, { Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { BackgroundShort } from '../../Templates/Backgrounds/BackgroundShort'
import { HeaderLogo } from '../../Templates/Headers/HeaderLogo'
import { DashboardContext } from '../../../Contexts/DashboardContext';
// import { LoginContext } from '../../../Contexts/LoginContext';
import ScoreCategoryCss from './ScoreCategory.module.css';
import { useOptionsList } from '../../../Hooks/useOptionsList';


export const ScoreCategory = () => {

    const history = useHistory();

    // const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    const { dataCat, dataSMarket } = DashboardCtxt;
    // console.log(DashboardCtxt)

    const [{data, isLoading}] = useOptionsList(`${process.env.REACT_APP_backUrl}/get-scores-by-category`, JSON.stringify({method: "POST", data : {dataCat, dataSMarket}}))
    // console.log(data)

    const NutriscoreValuesContainer = () => {
        if(data && data.data){
            return <>
                    <p className={ScoreCategoryCss.valueNutriscore}>{Math.floor(data.data.pct_nutriscore_a * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNutriscore}>{Math.floor(data.data.pct_nutriscore_b * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNutriscore}>{Math.floor(data.data.pct_nutriscore_c * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNutriscore}>{Math.floor(data.data.pct_nutriscore_d * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNutriscore}>{Math.floor(data.data.pct_nutriscore_e * 100)}%</p>
                    {/* <p className={ScoreCategoryCss.valueNutriscore}>{data.data.pct_nutriscore_a !== "" ?`${Math.floor(data.data.pct_nutriscore_a * 100)}%` : "Sin datos"}</p> */}
                   </>
        } else {
            //Hacer
        }
    }

    const NovascoreValuesContainer = () => {
        if(data && data.data){
            return <>
                    <p className={ScoreCategoryCss.valueNovascore}>{Math.floor(data.data.pct_nova_1 * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNovascore}>{Math.floor(data.data.pct_nova_2 * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNovascore}>{Math.floor(data.data.pct_nova_3 * 100)}%</p>
                    <p className={ScoreCategoryCss.valueNovascore}>{Math.floor(data.data.pct_nova_4 * 100)}%</p>
                   </>
        } else {
            //Hacer
        }
    }

    const NoEvaluatedProductsContainer = () => {
        if(data && data.data){
            return <>
                    <div className={ScoreCategoryCss.NotScoredNutriscoreContainer}>
                        <div className={ScoreCategoryCss.NotScoredinfoContainer}>
                            <img src="/Scores/NoNutriscore.svg" alt="No nutriscore" className={ScoreCategoryCss.NoNutriscoreimg}/>
                            <p className={ScoreCategoryCss.valueNoNutriscore}>{Math.floor(data.data.pct_nutriscore_nan * 100)}%</p>
                        </div>
                        
                    </div>

                    <div className={ScoreCategoryCss.NotScoredNovascoreContainer}>
                        <div className={ScoreCategoryCss.NotScoredinfoContainer}>
                            <img src="/Scores/NoNova.svg" alt="No novascore" className={ScoreCategoryCss.NoNovascoreimg}/>
                            <p className={ScoreCategoryCss.valueNoNutriscore}>{Math.floor(data.data.pct_nova_nan * 100)}%</p>
                        </div>
                    </div>
                   </>
        } else {
            //Hacer
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
                    {/* {(data && data.data) && <p className={ScoreCategoryCss.globalScoreCategory}>{Math.floor(data.data.Categoria * 100)}%</p>} */}
                    <p>Aquí te mostramos los porcentajes de productos, que {DashboardCtxt.dataSMarket.Marca} tiene valorados por Nutri-Score y Novascore para esta categoría.</p>
                    <div className={ScoreCategoryCss.ScoresContainer}>
                        <div className={ScoreCategoryCss.NutriscoreContainer}>
                            <img src="/infoScores/NutriscoreTitle.svg" alt="info NutriScore"/>
                            <div className={ScoreCategoryCss.infoValuesNutrisCoreContainer}>
                                <div className={ScoreCategoryCss.NutriscoreimgsContainer}>
                                    <img src="/infoScores/NutriScore-A.svg" alt="A" className={ScoreCategoryCss.imgNutriscore}/>
                                    <img src="/infoScores/NutriScore-B.svg" alt="B" className={ScoreCategoryCss.imgNutriscore}/>
                                    <img src="/infoScores/NutriScore-C.svg" alt="C" className={ScoreCategoryCss.imgNutriscore}/>
                                    <img src="/infoScores/NutriScore-D.svg" alt="D" className={ScoreCategoryCss.imgNutriscore}/>
                                    <img src="/infoScores/NutriScore-E.svg" alt="E" className={ScoreCategoryCss.imgNutriscore}/>
                                </div>
                                <div className={ScoreCategoryCss.NutriscoreValuesContainer}>
                                    {NutriscoreValuesContainer()}
                                </div>
                            </div>

                        </div>
                        <div className={ScoreCategoryCss.NovascoreContainer}>
                            <img src="/infoScores/NovascoreTitle.svg" alt="NovaTitle"/>
                            <div className={ScoreCategoryCss.infoValuesNovascoreContainer}>
                                <div className={ScoreCategoryCss.NovascoreimgsContainer}>
                                    <img src="/infoScores/NovaScore-1.svg" alt="1" className={ScoreCategoryCss.imgNovascore}/>
                                    <img src="/infoScores/NovaScore-2.svg" alt="2" className={ScoreCategoryCss.imgNovascore}/>
                                    <img src="/infoScores/NovaScore-3.svg" alt="3" className={ScoreCategoryCss.imgNovascore}/>
                                    <img src="/infoScores/NovaScore-4.svg" alt="4" className={ScoreCategoryCss.imgNovascore}/>  
                                </div>
                                <div className={ScoreCategoryCss.NutriscoreValuesContainer}>
                                    {NovascoreValuesContainer()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className={ScoreCategoryCss.alsoFoundText}>* Tambien hemos encontrado estos porcentajes de productos de {DashboardCtxt.dataSMarket.Marca} los cuales no están evaluados por ninguna de estas valoraciones</p>
                    <div className={ScoreCategoryCss.NotScoredProductsContainer}>
                        {NoEvaluatedProductsContainer()}
                    </div>

                </section>
                
                
           </>
    
}
