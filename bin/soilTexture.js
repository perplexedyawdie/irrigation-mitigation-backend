var R = require("r-script");
var path = require("path");

function generate({ clay, sand, silt }) {
    return new Promise((resolve, reject) => {
        R(path.resolve(__dirname, "soiltexture.R"))
            .data({ clay, sand, silt })
            .call(function (err, d) {
                if (err) reject(err.toString());
                resolve(d)
            });
    })
}

module.exports = { generate }