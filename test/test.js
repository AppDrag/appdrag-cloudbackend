var appdrag = require('../index');

var process = {
  env : {
    APIKEY : 'dc81439e-d103-4a5a-8442-8e9e64c7ef77',
    APPID : 'asdfasdf-2b4c49'
  }
}

appdrag.init(process.env.APIKEY, process.env.APPID);
appdrag.enableDevMode();

// appdrag.sqlSelect('SELECT * FROM table').then(
//     function (response) {
//       console.log(response);
//     }
// );

var request = require('request').defaults({ encoding: null });
var imgURL = "https://upload.wikimedia.org/wikipedia/en/0/0b/Nickelodeon_SpongeBob_SquarePants_Characters_Cast.png";
var filename = "test22Z.jpg";
request.get(imgURL, function (err, res, body) {
  appdrag.fileBinaryWrite(filename, body).then( function(response) {
    console.log(response);
  });
});



  /*
appdrag.fileBinaryWrite("wawa.jpg", request('https://cdn.vox-cdn.com/thumbor/Or0rhkc1ciDqjrKv73IEXGHtna0=/0x0:666x444/1200x800/filters:focal(273x193:379x299)/cdn.vox-cdn.com/uploads/chorus_image/image/59384673/Macaca_nigra_self-portrait__rotated_and_cropped_.0.jpg')).then( function(response) {
        console.log(response);
    });
*/
