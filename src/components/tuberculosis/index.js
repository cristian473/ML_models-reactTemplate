import React, { useEffect, useState } from 'react'
import './tuberculosisStyles.css'
import * as tf from '@tensorflow/tfjs'

const Tuberculosis = () => {
    const [imgToSee, setImgToSee] = useState(null)
    const [model, setModel] = useState(null)
    const [predictions, setPredictions] = useState([])
    
    useEffect(() => {
        (async () => {
            const URL = 'http://localhost:8080/models/tuberculosis'           
            let modelLoaded = await tf.loadGraphModel(URL)
            setModel(modelLoaded)
        })()
    }, [])

    const inputUpload = async (e) => {
        let imgUploaded = e.target.files[0]
        if (imgUploaded) {
            let reader = new FileReader()
            reader.onloadend = async () => {
                setImgToSee(reader.result)
            }
            reader.readAsDataURL(imgUploaded);
        }
    }

    const predict = async () => {
        let imgToPredict = document.getElementsByTagName('img')
        let tensor = tf.browser.fromPixels(imgToPredict[0])
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
            .reverse(-1)
        const predictions = await model.predict(tensor).data()
        setPredictions(predictions)
    }


    return (
        <div className='tuberculosisContainer'>
            <div className="buttons">
                <label for="file" className="btn btn-primary">
                    Subir imagen
                    <input id='file' type="file" className='d-none' onChange={inputUpload} />
                </label>
                <button className='btn btn-primary' onClick={predict}>Predecir</button>
            </div>
            <div className="imagePrediction">
                <div className="img">
                    {imgToSee &&
                        <img src={imgToSee} alt={imgToSee.name} />
                    }
                </div>
                <div className='prediction'>
                    {predictions.length && (
                        <>
                            <span>Saludables: {parseFloat(predictions[0] * 100).toFixed(2)}%</span>
                            <span>Tuberculosis: {parseFloat(predictions[1] * 100).toFixed(2)}%</span>
                        </>
                    )}
                </div>
            </div>
            <div className="leyenda">
                <h5 className="text-center">
                    Aplicación muy basica para predecir a partir de una radiografía e inteligencia artificial <br /> si una persona tiene tuberculosis o no
                </h5>
            </div>
        </div>
    )
}

export default Tuberculosis