var appdrag = require('../index');

appdrag.init(process.env.APIKEY, process.env.APPID);

/*appdrag.downloadRemoteFile(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Chimpanzee-Head.jpg/220px-Chimpanzee-Head.jpg",
   "wass.jpg"
).then(
    function (response) {
      console.log(response);
    }
);*/
var request = require('request').defaults({ encoding: null });
request.get("https://cdn.vox-cdn.com/thumbor/Or0rhkc1ciDqjrKv73IEXGHtna0=/0x0:666x444/1200x800/filters:focal(273x193:379x299)/cdn.vox-cdn.com/uploads/chorus_image/image/59384673/Macaca_nigra_self-portrait__rotated_and_cropped_.0.jpg", function (err, res, body) {

appdrag.fileBinaryWrite("wawa22.jpg", body).then( function(response) {
        console.log(response);
    });
  });
/*
appdrag.fileBinaryWrite("wawa.jpg", request('https://cdn.vox-cdn.com/thumbor/Or0rhkc1ciDqjrKv73IEXGHtna0=/0x0:666x444/1200x800/filters:focal(273x193:379x299)/cdn.vox-cdn.com/uploads/chorus_image/image/59384673/Macaca_nigra_self-portrait__rotated_and_cropped_.0.jpg')).then( function(response) {
        console.log(response);
    });
*/
