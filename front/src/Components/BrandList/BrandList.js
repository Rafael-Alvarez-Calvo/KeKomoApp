import React, { useContext, useState } from 'react';
import { useOptionsList } from '../../Hooks/useOptionsList';
import BrandListCss from './BrandList.module.css';
import { useRedirect } from '../../Hooks/useRedirect';
import { DashboardContext } from '../../Contexts/DashboardContext';
// import { Fetch } from '../../Hooks/useFetch';

export const BrandList = ({url, pageState}) => {

    const [{isLoading,data}] = useOptionsList(url);
    const { DashboardPage, ProductPage } = pageState

    const Redirect = useRedirect();
    const DashboardCtxt = useContext(DashboardContext);
    
    const [pageStatus, setPageState] = useState({
        BrandListPage : true,
        ProductListPage : false
    });


    const BrandListXScroll = () => {
        if(data && !isLoading){

            const {res, Marcas} = data;

            if(res === "1" && Marcas ){
                return (
                    <>
                        <div className={BrandListCss.XSMarketsContainerX}>
                            {Marcas.length && Marcas.map(dataSMarket => {
                                const { Marca, Id } = dataSMarket;
                                return <SliderMarkets key={Id} 
                                                    //   onClick={
                                                        //   e => handleClickOptionSMarket(e, Marca, DashboardCtxt.dataCat.Categoria)
                                                            // DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataSMarket});
                                                            // Redirect("/home/brand-categories", e)
                                                    //   } 
                                                      Marca={Marca}
                                        />
                                                            
                            })}
                        </div>  
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

    const BrandListYScroll = () => {
        if(data && !isLoading){

            const {res, Marcas} = data;

            if(res === "1" && Marcas ){
                return (
                    <>
                        <div className={BrandListCss.SMarketsContainer}>
                            {Marcas.length && Marcas.map(dataSMarket => {
                                const { Marca, Logo } = dataSMarket;
                                return <div key={Marca} className={BrandListCss.brandsContainer}>
                                            <ImageMarket onClick={e => {
                                                    DashboardCtxt.setDashBoardInfo({...DashboardCtxt, dataSMarket, pageStatus});
                                                    Redirect("/home/brand-categories", e)
                                                }
                                            } Marca={Marca} Logo={Logo}/>
                                        </div>
                                // setDataState({
                                    //     data : Marca,
                                    //     loading : false
                                    // })
                                                    
                            })}
                        </div>
                        

                        {/* <Carousel className={BrandListCss.Carousel}
                                  autoPlay={settingsBrandList.autoPlay}
                                  timer={settingsBrandList.timer}
                                  animation={settingsBrandList.animation}
                                  indicators={settingsBrandList.indicators}
                                  timeout={settingsBrandList.timeout}
                                  navButtonsAlwaysVisible={settingsBrandList.navButtonsAlwaysVisible}
                                  navButtonsAlwaysInvisible={settingsBrandList.navButtonsAlwaysInvisible}
                                  next={(next, active = 1) => next + active }
                                  prev={(prev, active = 1) => prev - active }
                                  onChange={(now, prev) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${prev}`)}> */}
                                      
                                        
                        {/* </Carousel> */}
                        
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
                <img src={Logo} onClick={onClick} alt={Marca} className={BrandListCss.imgSMarket}/>
        )
    }

    const SliderMarkets = ({Marca, onClick}) => {
        return (
            <button className={BrandListCss.XSMarketBtnX} onClick={onClick}>
                {Marca}
            </button>
        )
    }

    const paintBrandListContainer = () => {

        if(DashboardPage && !ProductPage){
            return <BrandListYScroll />
            
        } else {
            return <BrandListXScroll />
        }
    }

    return (
        <>
            {(isLoading && DashboardPage) && <div className={BrandListCss.loadingSVGContainer}><img src="/loading.svg" className={BrandListCss.loadingSVG} alt="loading icon" /></div>}
            {!isLoading && paintBrandListContainer()}
        </>
    )
}
