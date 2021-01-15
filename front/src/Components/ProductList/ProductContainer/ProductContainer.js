import React, { useContext, useState } from 'react'
import { useRedirect } from '../../../Hooks/useRedirect';
import { DashboardContext } from '../../../Contexts/DashboardContext';
import { LoginContext } from '../../../Contexts/LoginContext';
import ProductContainerCss from './ProductContainer.module.css';

export const ProductContainer = ({product}) => {

    const { Foto, Producto, Marca, NovaScore, Nutriscore } = product;

    const Redirect = useRedirect();
    const DashboardCtxt = useContext(DashboardContext);
    const LoginCtxt = useContext(LoginContext);
    const [ProductSelected, setProductSelected] = useState(false)


    const ScoresPainter = ({NovaScore, Nutriscore}) => {
        return <div className={ProductContainerCss.ScoresContainer}>
                    {Nutriscore ?
                            <img src={`/Scores/NutriScore-${Nutriscore}.svg`} alt={`Nutriscore ${Nutriscore}`} className={ProductContainerCss.imgNutriscore} />
                                :
                                <img src={`/Scores/NoNutriScore.svg`} alt="No nutri-score" className={ProductContainerCss.imgNutriscore} />
                    }

                    {NovaScore ?
                            <img src={`/Scores/Nova-${NovaScore}.svg`} alt={`NovaScore ${NovaScore}`} className={ProductContainerCss.imgNovascore} />
                               :
                            <img src={`/Scores/NoNova.svg`} alt="No nova score" className={ProductContainerCss.imgNovascore} />
                    }

               </div>
    }

    return <div className={ProductContainerCss.ProductListContainer} onClick={e => {
            LoginCtxt.setLoginUserInfo({...LoginCtxt});
            DashboardCtxt.setDashBoardInfo({...DashboardCtxt, product});
                setProductSelected(true);
                setTimeout(() => {

                    Redirect("/home/product-list/product-detail", e)

                }, 650)    
            }}>
                <div className={ProductSelected ? `${ProductContainerCss.imgProductContainerActive}` : `${ProductContainerCss.imgProductContainer}`}>
                    <img src={Foto} alt="Imagen de producto" className={ProductContainerCss.imgProduct} />
                </div>
                <div className={ProductSelected ? `${ProductContainerCss.infoProductContainerActive}` : `${ProductContainerCss.infoProductContainer}`}>
                    <div className={ProductContainerCss.infoColumn}>
                        <p className={ProductContainerCss.nameProduct}>{Producto}</p>
                        <p className={ProductContainerCss.nameBrand}>{Marca}</p>
                        <ScoresPainter NovaScore={NovaScore} Nutriscore={Nutriscore} />
                    </div>
                    <div className={ProductContainerCss.FavShareAddContainer}>
                        <div className={ProductContainerCss.FavShareContainer}>
                            <button className={ProductContainerCss.FavBtn}>
                                <img src="/heartFavEmpty.svg" alt="Favoritos"/>
                            </button>
                            <button className={ProductContainerCss.ShareBtn}>
                                <img src="/shareBtnEmpty.svg" alt="Compartir"/>
                            </button>
                        </div>
                        <div className={ProductContainerCss.AddToListBtnContainer}>
                            <button className={ProductContainerCss.AddToListBtn}>Añadir a la lista</button>
                            <div className={ProductContainerCss.CounterContainer}>
                                <button className={ProductContainerCss.CounterLessBtn}>
                                    <img src="/lessBtn.svg" alt="lessBtn"/>
                                </button>
                                <p className={ProductContainerCss.numberCounter}> 1 </p>
                                <button className={ProductContainerCss.CounterPlusBtn}>
                                    <img src="/plusBtn.svg" alt="plusBtn"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}
