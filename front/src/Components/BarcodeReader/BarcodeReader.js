import Quagga from "quagga"
import React, { Component } from 'react';

export class BarcodeReader extends Component {
  constructor() {
    super();
    this.state = {
      VideoRef: React.createRef()
    }
  }
  render() {
    return (
      <div ref={this.state.VideoRef} className="App" >
      </div>
    );
  }

  componentDidMount() {
    this.q = Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.state.VideoRef.current// Or '#yourElement' (optional)
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
            console.log(result.codeResult);
            let img = document.querySelector(".App video");
            let canvas = document.querySelector(".App canvas");
            console.log(img, canvas);
            canvas.getContext("2d").drawImage(img, 0, 0);
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            Quagga.offProcessed(qP);
            Quagga.stop();
          }
        }
      });
    });
  }
}
