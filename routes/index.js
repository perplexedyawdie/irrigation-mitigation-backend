var express = require('express');
var router = express.Router();
var soilTexture = require('../bin/soilTexture');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/soiltexture', function (req, res, next) { 
  let sand = req.body.clay;
  let clay = req.body.silt;
  let silt = req.body.sand;
  const textureClassification = {
    "Cl": "Clay",
     "SiCl": "Silty Clay",
     "SaCl": "Sandy Clay",
     "ClLo": "Clay Loam",
     "SiClLo": "Silty Clay Loam",
     "SaClLo": "Sandy Clay Loam",
     "Lo": "Loam",
     "SiLo": "Silt Loam",
     "SaLo": "Sandy Loam",
     "Si": "Silt",
     "LoSa": "Loamy Sand",
     "Sa": "Sand"

  }
  soilTexture.generate({ clay, sand, silt })
  .then((result) => {
    console.log(result)
    let soilTextures = result.split(';').map((soil) => {
      return {
        "soilType": textureClassification[soil]
      }
    })
    res.send(soilTextures)
  }).catch((err) => {
    res.send(err)
  });

 })

module.exports = router;
