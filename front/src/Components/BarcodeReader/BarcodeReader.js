import Quagga from "quagga"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Fetch } from "../../Hooks/useFetch";
import { DashboardContext } from '../../Contexts/DashboardContext';
import { LoginContext } from '../../Contexts/LoginContext';
import BarcodeReaderCss from './BarcodeReader.module.css';
import { useRedirect } from "../../Hooks/useRedirect";

export const BarcodeReader = () => {

  const VideoRef = useRef();

  const [barcode, setBarcode] = useState(null)

  const [ResDB, setResDB] = useState(null)

  const [ProductoRes, setProductoRes] = useState(null)

  const LoginCtxt = useContext(LoginContext);
  const DashboardCtxt = useContext(DashboardContext);
  const Redirect = useRedirect();


  const ScoresPainter = ({NovaScore, Nutriscore}) => {
    if(ResDB === "1"){
    return <div className={BarcodeReaderCss.ScoresContainer}>
                {Nutriscore ?
                        <img src={`/Scores/NutriScore-${Nutriscore}.svg`} alt={`Nutriscore ${Nutriscore}`} className={BarcodeReaderCss.imgNutriscore} />
                            :
                        <p className={BarcodeReaderCss.NoNutriscore}>Nutriscore</p>
                }

                {NovaScore ?
                        <img src={`/Scores/Nova-${NovaScore}.svg`} alt={`NovaScore ${NovaScore}`} className={BarcodeReaderCss.imgNovascore} />
                           :
                        <p className={BarcodeReaderCss.NoNovascore}>Novascore</p>
                }

           </div>
    }
  }

  const ShowProduct = (product) =>{
    
    const {Foto, Producto, Marca, NovaScore, Nutriscore} = product
    return <section className={BarcodeReaderCss.ProductSection}>
              <div className={BarcodeReaderCss.ProductContainer}>
                <div className={BarcodeReaderCss.imgContainer}>
                  <img src={Foto} alt="Imagen de producto" className={BarcodeReaderCss.imgProduct} />
                </div>
                <div className={BarcodeReaderCss.infoProductContainer}>
                  <h1 className={BarcodeReaderCss.nameProduct}>{Producto}</h1>
                  <h2 className={BarcodeReaderCss.nameBrand}>{Marca}</h2>
                  <div className={BarcodeReaderCss.ScoresContainer}>
                    <ScoresPainter NovaScore={NovaScore} Nutriscore={Nutriscore}/>
                    <button className={BarcodeReaderCss.viewDetail} onClick={e => {
                        LoginCtxt.setLoginUserInfo({...LoginCtxt});
                        DashboardCtxt.setDashBoardInfo({...DashboardCtxt, product});
                        Redirect("/home/product-list/product-detail", e) 
                    }}>
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
          </section>
  }
  
  useEffect(() => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: VideoRef.current// Or '#yourElement' (optional)
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      console.log("Started");
      let qP = Quagga.onProcessed((result) => {
        var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
              return box !== result.box;
            }).forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
            });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
          }

          if (result.codeResult && result.codeResult.code) {
            console.log(result.codeResult.code)
            let barcode = result.codeResult.code;
            let img = document.querySelector(`.BarcodeWindow video`);
            let canvas = document.querySelector(`.BarcodeWindow canvas`);
            console.log(img, canvas);
            canvas.getContext("2d").drawImage(img, 0, 0);
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            Quagga.offProcessed(qP);
            Quagga.stop();
            console.log(barcode)
            Fetch(`${process.env.REACT_APP_backUrl}/search-barcode-from-code-reader`, {data : {barcode}})
            .then(data => {
              if(data){
                const { res, Product} = data;
                console.log(data, Product)
                switch(res){
                  case "0" :
                    setResDB("0");
                    break;
                  case "1" :
                    setResDB("1")
                    setProductoRes(Product)
                    break;
                  case "-1" :
                    setResDB("-1")
                    break;
                  case "-2" :
                    setResDB("-2");
                    break;
                }
              }
            })
            // setBarcode(result.codeResult.code)

            
          }
        }
      });
    });

  }, [])

    return (<>
              {ProductoRes && ShowProduct(ProductoRes)}
              <div ref={VideoRef} className={`${BarcodeReaderCss.BarcodeWindow} BarcodeWindow`} >
              </div>
            </>
      

    );
 

  
    
  
}
