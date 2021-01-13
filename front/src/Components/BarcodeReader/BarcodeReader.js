import Quagga from "quagga"
import React, { useEffect, useRef, useState } from 'react';
import { Fetch } from "../../Hooks/useFetch";
import BarcodeReaderCss from './BarcodeReader.module.css';

export const BarcodeReader = () => {

  const VideoRef = useRef();

  const [barcode, setBarcode] = useState(null)
  
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
              console.log(data)
            })
            // setBarcode(result.codeResult.code)

            
          }
        }
      });
    });

  }, []) 

  
    return (
      <div ref={VideoRef} className={`${BarcodeReaderCss.BarcodeWindow} BarcodeWindow`} >
      </div>
    );
 

  
    
  
}
