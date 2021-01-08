import React from 'react';
import { useOptionsList } from '../../Hooks/useOptionsList';
import BrandListCss from './BrandList.module.css';

import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core'
import { useOptionListSettings } from './useOptionListSettings';

export const BrandList = ({url}) => {

    const [{isLoading,data}] = useOptionsList(url);

    const {settingsBrandList} = useOptionListSettings();

    const getData = () => {

        if(data && !isLoading){

            const {res, Marcas} = data;

            if(res === "1" && Marcas ){
                return (
                    <>
                        <div className={BrandListCss.superMarketsTitleContainer}>
                            <label>Todos los supermercados</label> 
                            <i id={BrandListCss.filterIconOptions} className="fas fa-sliders-h"></i>
                        </div>

                        <Carousel autoPlay={settingsBrandList.autoPlay}
                                  timer={settingsBrandList.timer}
                                  animation={settingsBrandList.animation}
                                  indicators={settingsBrandList.indicators}
                                  timeout={settingsBrandList.timeout}
                                  navButtonsAlwaysVisible={settingsBrandList.navButtonsAlwaysVisible}
                                  navButtonsAlwaysInvisible={settingsBrandList.navButtonsAlwaysInvisible}
                                  next={(next, active = 1) => next + active }
                                  prev={(prev, active = 1) => prev - active }
                                  onChange={(now, prev) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${prev}`)}>
                                      
                                        {Marcas.length && Marcas.map(data => {
                                            const { Marca, Logo, Id } = data;
                                            return <div key={Marca}>
                                                        <ImageMarket onClick={
                                                            () => {
                                                                console.log(`clicked on ${Id}`)
                                                            }
                                                        } Marca={Marca} Logo={Logo}/>
                                                    </div>
                                            // setDataState({
                                                //     data : Marca,
                                                //     loading : false
                                                // })
                                                
                                        })}
                        </Carousel>
                        
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

    const ImageMarket = ({Marca, Logo, onClick}) => {
        return (
            <Paper>
                <img src={Logo} onClick={onClick} alt={Marca}/>
            </Paper>
        )
    }

    return (
        <>
            {isLoading && <img src="/loading.svg" className={BrandListCss.loadingSVG} alt="arco superior" />}

            {!isLoading && getData()}
        </>
    )
}
