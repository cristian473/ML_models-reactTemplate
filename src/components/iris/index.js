import React, { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs';
import './irisStyles.css'
import virginica from './img/virginica.jpg'
import setosa from './img/setosa.jpg'
import versicolor from './img/versicolor.jpg'

const Iris = () => {
    const [model, setModel] = useState(null)
    const [Input, setInput] = useState({ 0: '', 1: '', 2: '', 3: '' })
    const [result, setResult] = useState('')
    const [probablities, setProb] = useState([])
    const [img, setImg] = useState(null)
    const processResult = (i) => {
        switch (i) {
            case 0:
                setImg(setosa)
                return 'setosa'
            case 1:
                setImg(versicolor)
                return 'versicolor'
            case 2:
                setImg(virginica)
                return 'virginica'
            default:
                break;
        }
    }
    useEffect(() => {
        (async () => {
            const mod = await tf.loadLayersModel('https://storage.googleapis.com/uma_t5_complaints/iris_test_tfjs/model.json');
            setModel(mod);
        })()
    }, [])

    const predict = () => {
        if (model) {
            const arr = [];
            for (const i in Input) {
                arr[i] = parseInt(Input[i]);
            }
            const tensor = tf.tensor(arr).reshape([-1, 4]);
            const prediction = model.predict(tensor).dataSync();
            //extraigo el resultado con mayor probabilidad
            const index = prediction.indexOf(Math.max(...prediction));
            const result = processResult(index);
            setResult(result);
            setProb(prediction);
        }
    }

    return (
        <div className="cont">
            <div className="container">
                {result && <h3>{result}</h3>}
                <img className='irisImg' src={img} alt={result} />
                {probablities.length > 0 && (
                    <>
                        <h4 className='prob'>setosa: {probablities[0].toFixed(2) * 100}%</h4>
                        <h4 className='prob'>versicolor: {probablities[1].toFixed(2) * 100}%</h4>
                        <h4 className='prob'>virginica: {probablities[2].toFixed(2) * 100}%</h4>
                    </>
                )}
                <div className="inputs">
                    <label htmlFor="0">Sepal length (cm)</label>
                    <input type="number" id='0' onChange={e => setInput({ ...Input, 0: e.target.value })} />
                    <label htmlFor="1">Sepal width (cm)</label>
                    <input type="number" id='1' onChange={e => setInput({ ...Input, 1: e.target.value })} />
                    <label htmlFor="2">Petal length (cm)</label>
                    <input type="number" id='2' onChange={e => setInput({ ...Input, 2: e.target.value })} />
                    <label htmlFor="3">Sepal width (cm)</label>
                    <input type="number" id='3' onChange={e => setInput({ ...Input, 3: e.target.value })} />
                </div>
                <button className='buttonPredict' onClick={predict}>
                    Predecir
            </button>
            </div>
        </div>
    )
}

export default Iris