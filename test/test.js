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
var imgURL = "https://upload.wikimedia.org/wikipedia/en/0/0b/Nickelodeon_SpongeBob_SquarePants_Characters_Cast.png";



request.get(imgURL, function (err, res, body) {
  var attachments =[{
    filename : "test22Z.jpg",
    content: body
  }];
  var imgURL2 = 'https://ae01.alicdn.com/kf/HTB13iC5QFXXXXX4XVXXq6xXFXXXe/Europe-New-Sexy-Woman-Printing-Bra-S-2XL-Fashion-Triangle-Underwear-Gathered-Thin-Lingerie-Comfortable-Breathable.jpg_640x640.jpg';
  request.get(imgURL2, function (err, res, body) {
    attachments.push({
     filename : "test222Z.jpg",
     content: body
   });
appdrag.sendEmailAdvanced("wass08@gmail.com", "WASSIMO", "samad.wassim@gmail.com", "wass08@gmail.com;taazezezaezaest@yopmail.com;z51biz@gmail.com", "wass08@gmail.com", "Salut tu veux rencontrer des femmes chaudes sur Jérusalem?", "Ca va?", attachments, false).then(function (response) {
  console.log(response);
});
});
});


/*var request = require('request').defaults({ encoding: null });
var imgURL = "https://upload.wikimedia.org/wikipedia/en/0/0b/Nickelodeon_SpongeBob_SquarePants_Characters_Cast.png";
var filename = "test22Z.jpg";
request.get(imgURL, function (err, res, body) {

appdrag.fileBinaryWrite(filename, body).then( function(response) {
        console.log(response);
    });
  });
  */
/*


appdrag.fileBinaryWrite("wawa.jpg", request('https://cdn.vox-cdn.com/thumbor/Or0rhkc1ciDqjrKv73IEXGHtna0=/0x0:666x444/1200x800/filters:focal(273x193:379x299)/cdn.vox-cdn.com/uploads/chorus_image/image/59384673/Macaca_nigra_self-portrait__rotated_and_cropped_.0.jpg')).then( function(response) {
        console.log(response);
    });
*/
