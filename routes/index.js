var express = require('express');
var router = express.Router();
var soilTexture = require('../bin/soilTexture');
/* GET home page. */
router.get('/', function (req, res, next) {
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

        if (soil == "Sa" ||
          soil == "LoSa" ||
          soil == "Si") {
          return {
            "soilType": textureClassification[soil],
            "msg": "Your soil drains water rather quickly. You may water again soon after it rains."
          }
        }

        if (soil == "SaClLo" ||
          soil == "Cl" ||
          soil == "SiCl" ||
          soil == "SaCl" ||
          soil == "ClLo" ||
          soil == "SiClLo") {
          return {
            "soilType": textureClassification[soil],
            "msg": "Your soil holds water well but doesn't drain rapidly. You can greatly reduce your watering schedule after it rains."
          }
        }


        if (soil == "Lo" ||
          soil == "SiLo" ||
          soil == "SaLo") {
          return {
            "soilType": textureClassification[soil],
            "msg": "Your soil is perfect for your plants! You can reduce your watering schedule."
          }
        }



      })
      res.send(soilTextures)
    }).catch((err) => {
      res.send(err)
    });

})

module.exports = router;
