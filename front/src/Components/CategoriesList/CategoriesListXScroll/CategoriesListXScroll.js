import React from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';
import { SliderCategories } from './SliderCategories/SliderCategories';
import CategoriesListXScrollCss from './CategoriesListXScroll.module.css';

export const CategoriesListXScroll = ({url}) => {

    const [{isLoading, data}] = useOptionsList(url);

    const getListXScroll = () => {
        if (data && !isLoading){
            const {res, Categorias} = data;

            if(res === "1" && Categorias ){
                return(
                    <>
                        <div className={CategoriesListXScrollCss.XCategoriesContainerX}>
                            {Categorias.length && Categorias.map(dataCat => {
                                const { Categoria, Id } = dataCat;
                                return <SliderCategories key={Id} Categoria={Categoria} dataCat={dataCat}
                                                    //   onClick={
                                                        //   e => handleClickOptionSMarket(e, Marca, DashboardCtxt.dataCat.Categoria)
                                                            // DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataCat});
                                                            // Redirect("/home/brand-categories", e)
                                                    //   } 
                                                        
                                        />
                                                            
                            })}
                        </div>  
                    </>
                ) 
            }
        }
    }
    return (
        <>
            <section>
                {isLoading && <div className={CategoriesListXScrollCss.loadingSVGContainer}><img src="/loading.svg" className={CategoriesListXScrollCss.loadingSVG} alt="loading icon" /></div>}
                {!isLoading && getListXScroll()}
            </section>
        </>
    )
}
