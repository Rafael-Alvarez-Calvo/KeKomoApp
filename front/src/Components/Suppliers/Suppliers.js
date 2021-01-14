import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { BackgroundLarge } from '../Templates/Backgrounds/BackgroundLarge';
import { InfoSuppliers } from './InfoSuppliers/InfoSuppliers';
import SuppliersCss from './Suppliers.module.css'

export const Suppliers = () => {

    const history = useHistory();
    const LoginCtxt = useContext(LoginContext);
    const DashboardCtxt = useContext(DashboardContext);

    const { product } = DashboardCtxt;
    const { Foto, Producto, Marca, NovaScore, Nutriscore, Certificaciones, Emb } = product;

    console.log(DashboardCtxt);

    const ScoresPainter = ({NovaScore, Nutriscore}) => {
        return <div className={SuppliersCss.ScoresContainer}>
                    {Nutriscore ?
                            <img src={`/Scores/NutriScore-${Nutriscore}.svg`} alt={`Nutriscore ${Nutriscore}`} className={SuppliersCss.imgNutriscore} />
                                :
                            <p className={SuppliersCss.NoNutriscore}>Nutriscore</p>
                    }

                    {NovaScore ?
                            <img src={`/Scores/Nova-${NovaScore}.svg`} alt={`NovaScore ${NovaScore}`} className={SuppliersCss.imgNovascore} />
                               :
                            <p className={SuppliersCss.NoNovascore}>Novascore</p>
                    }

               </div>
    }
    
    return (
        <>
          <BackgroundLarge />
          <div className={SuppliersCss.headerContainer}>
                <button className={SuppliersCss.backBtn} onClick={() => {history.go(-1)}}>
                    <i id={SuppliersCss.iconBackBtn} className="fas fa-chevron-left"></i>
                </button>
                <h1 className={SuppliersCss.headerTitle}>Acerca del productor</h1>
          </div>
          <div className={SuppliersCss.CardContainer}>
                <div className={SuppliersCss.imgProductContainer}>
                    <img src={Foto} alt="Imagen de producto" className={SuppliersCss.imgProduct} />
                    <div className={SuppliersCss.FavShareContainer}>
                        <button className={SuppliersCss.FavBtn}>
                                <img src="/heartFavEmpty.svg" alt="Favoritos" className={SuppliersCss.iconHeart}/>
                        </button>
                        <button className={SuppliersCss.ShareBtn}>
                                <img src="/shareBtnEmpty.svg" alt="Compartir" className={SuppliersCss.iconShare}/>
                        </button>
                    </div>
                </div>
                <div className={SuppliersCss.infoProductContainer}>
                    <h2 className={SuppliersCss.nameProduct}>{Producto}</h2>
                    <h3 className={SuppliersCss.nameBrand}>{Marca}</h3>
                </div>
                <ScoresPainter Nutriscore={Nutriscore} NovaScore={NovaScore} />
          </div>
          <section>
            <InfoSuppliers url={`${process.env.REACT_APP_backUrl}/get-info-brands`, {data : Emb}} Certificaciones={Certificaciones} />    
          </section>  
        </>
    )
}
