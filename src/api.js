
//ejemplo que se me ocurrio para enviar el modelo desde el back al front

// const express = require('express');
// const modelRoute = express.Router();
// const TuberculosisJson = require('../models/tuberculosisAzura/model.json')

// const tuberculosisModelJson = (req,res,next) => {
//     try {
//         res.json(TuberculosisJson)
//     } catch (err) {
//         next(err);
//     }
// }
// const tuberculosisModelBin = (req,res,next) => {
//     try {
//         res.download('../models/tuberculosisAzura/weights.bin')
//     } catch (err) {
//         next(err);
//     }
// }

// modelRoute.get('/tuberculosis', tuberculosisModelJson)
// modelRoute.get('/weights.bin', tuberculosisModelBin)

// module.exports = modelRoute
