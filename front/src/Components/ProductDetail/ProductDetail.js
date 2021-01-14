import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { OptionsSuppliers } from './OptionsSuppliers/OptionsSuppliers';
import { Background } from '../Templates/Backgrounds/Background';
import ProductDetailCss from './ProductDetail.module.css';
import { AboutProduct } from './AboutProduct/AboutProduct';
import { BackgroundLarge } from '../Templates/Backgrounds/BackgroundLarge';

export const ProductDetail = () => {

    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);
    const { product } = DashboardCtxt;
    const { Foto, Producto, Marca, NovaScore, Nutriscore, Aditivos, Alergenos_Trazas, Certificaciones, Emb, Informacion_Nutricional } = product;

    const history = useHistory();


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
                <button className={ProductDetailCss.backBtn} onClick={() => {history.go(-1)}}>
                    <i id={ProductDetailCss.iconBackBtn} className="fas fa-chevron-left"></i>
                </button>
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
           <section className={ProductDetailCss.aboutSuppliersContainer}>
                <label className={ProductDetailCss.labelAboutSuppliers}>Acerca del productor ó fabricante</label>
                <OptionsSuppliers />
                <label className={ProductDetailCss.labelAboutProduct}>Acerca del producto</label>
           </section>

           <section className={ProductDetailCss.aboutProductContainer}>
               <AboutProduct url={`${process.env.REACT_APP_backUrl}/get-additives-of-product`} opt={{method: "POST", data : JSON.stringify(Aditivos)}} Aditivos={Aditivos} Alergenos_Trazas={Alergenos_Trazas} Informacion_Nutricional={Informacion_Nutricional} />
           </section>
           <BackgroundLarge />
        </>
    )
}
