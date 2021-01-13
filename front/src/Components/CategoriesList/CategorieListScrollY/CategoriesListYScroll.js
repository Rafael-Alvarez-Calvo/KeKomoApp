import React, { Fragment } from 'react'
import { useOptionsList } from '../../../Hooks/useOptionsList';
import { CategoriesList } from '../CategorieList';
import CategoriesListYScrollCss from './CategoriesListYScroll.module.css';

export const CategoriesListYScroll = ({url}) => {

    const [{isLoading, data}] = useOptionsList(url);

    const getListYScroll = () => {
        if (data && !isLoading){
            const {res, Categorias} = data;

            if(res === "1" && Categorias ){
                return(
                    <>
                        <div className={CategoriesListYScrollCss.CategoriesListContainer}>
                            {Categorias.length && Categorias.map(dataCat => {
                                    const { Categoria, Id } = dataCat;
                                    return <Fragment key={Id}>
                                                <div>
                                                    <CategoriesList key={Categoria} Categoria={Categoria} dataCat={dataCat}/>
                                                </div>
                                                <hr className={CategoriesListYScrollCss.Separator}/>
                                            </Fragment>                
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

                {isLoading && <div className={CategoriesListYScrollCss.loadingSVGContainer}><img src="/loading.svg" className={CategoriesListYScrollCss.loadingSVG} alt="loading icon" /></div>}

                {!isLoading && getListYScroll()}

            </section>
        </>
    )
}
