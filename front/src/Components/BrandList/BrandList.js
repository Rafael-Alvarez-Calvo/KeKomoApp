import React from 'react';
import { useOptionsList } from '../../Hooks/useOptionsList';
import BrandListCss from './BrandList.module.css';

import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core'

export const BrandList = ({url}) => {

    const {data, loading, setDataState} = useOptionsList(url);

    const getData = () => {

        if(data && !loading){

            const {res, Marcas} = data;

            if(res === "1" && Marcas ){
                return (
                    <>
                        <div className={BrandListCss.superMarketsTitleContainer}>
                            <label>Todos los supermercados</label> 
                            <i id={BrandListCss.filterIconOptions} className="fas fa-sliders-h"></i>
                        </div>

                        {Marcas.map(data => {
                            const { Marca } = data;
                            return <>
                                        <Carousel key={Marca}>
                                            <ImageMarket key={Marca} item={Marca}/>
                                        </Carousel>
                                    </>
                            // setDataState({
                            //     data : Marca,
                            //     loading : false
                            // })

                        })}
                        
                    </>
                )

            } else {
                return (
                    <>
                        <div className={BrandListCss.ErrorMessage}>
                            <p>Lo sentimos en estos momentos no podemos mostrarte esta informacion, inténtalo de nuevo mas tarde</p>
                        </div>
                    </>
                )
            }

        } else {
            console.log("No data from useOptionsList")
        }

    }

    const ImageMarket = ({Marca}) => {
        return (
            <Paper>
                {/* <img /> */}
            </Paper>
        )
    }

    return (
        <>
            {loading && <img src="/loading.svg" className={BrandListCss.loadingSVG} alt="arco superior" />}

            {!loading && getData()}
        </>
    )
}
