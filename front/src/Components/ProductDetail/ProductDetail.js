import React, { useContext } from 'react';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { Background } from '../Templates/Backgrounds/Background';
import ProductDetailCss from './ProductDetail.module.css';

export const ProductDetail = () => {

    const DashboardCtxt = useContext(DashboardContext);
    const { product } = DashboardCtxt;
    const { Foto, Producto, Marca, NovaScore, Nutriscore } = product;

    const LoginCtxt = useContext(LoginContext);

    const ScoresPainter = ({NovaScore, Nutriscore}) => {
        return <div className={ProductDetailCss.ScoresContainer}>
                    {Nutriscore ?
                            <img src={`/Scores/NutriScore-${Nutriscore}.svg`} alt={`Nutriscore ${Nutriscore}`} className={ProductDetailCss.imgNutriscore} />
                                :
                            <p className={ProductDetailCss.NoNutriscore}>Nutriscore</p>
                    }

                    {NovaScore ?
                            <img src={`/Scores/Nova-${NovaScore}.svg`} alt={`NovaScore ${NovaScore}`} className={ProductDetailCss.imgNovascore} />
                               :
                            <p className={ProductDetailCss.NoNovascore}>Novascore</p>
                    }

               </div>
    }
    

    return (
        <>
           
           <section className={ProductDetailCss.ProductCard}>
               <div className={ProductDetailCss.infoProductContainer}>
                    <img src={Foto} alt="Imagen de producto" className={ProductDetailCss.imgProduct} />
                    <h1 className={ProductDetailCss.nameProduct}>{Producto}</h1>
                    <h2 className={ProductDetailCss.nameBrand}>{Marca}</h2>
                    <ScoresPainter NovaScore={NovaScore} Nutriscore={Nutriscore}/>
               </div>
               <div className={ProductDetailCss.favShareAddContainer}>
                    <button className={ProductDetailCss.FavBtn}>
                            <img src="/heartFavEmpty.svg" alt="Favoritos" className={ProductDetailCss.iconHeart}/>
                    </button>
                    <button className={ProductDetailCss.ShareBtn}>
                            <img src="/shareBtnEmpty.svg" alt="Compartir" className={ProductDetailCss.iconShare}/>
                    </button>
                    <button className={ProductDetailCss.AddToListBtn}>
                           Añadir a la lista
                           <img src="/IconosBotones/addToList.svg" className={ProductDetailCss.shopListIcon}/>
                    </button>
               </div>

           </section>
           <Background />
        </>
    )
}
