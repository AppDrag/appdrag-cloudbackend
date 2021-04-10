var appdrag = require('../index');
const axios = require('axios');

var process = {
  env : {
    APIKEY : '',
    APPID : ''
  }
}

appdrag.init(process.env.APIKEY, process.env.APPID);
appdrag.enableDevMode();

/*
 appdrag.sqlSelect('SELECT * FROM Leads WHERE id = ? and Field7 = ? LIMIT 5', [1, "Disabled"]).then(
     function (response) {
       console.log(JSON.parse(response).Table);
     }
 );
 */

 /*appdrag.sqlExecuteRawQuery(`INSERT INTO Demo_Users (email) VALUES ('oui')`).then(
  function (response) {
    console.log(response);
  }
);*/



 /*axios.get("https://static1.srcdn.com/wordpress/wp-content/uploads/2019/12/SpongeBob-gay-controversy.jpg",
 {
     responseType: 'arraybuffer',
     headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/pdf'
     }
 })
 .then((response) => {
  appdrag.fileBinaryWrite("wawa.jpg", response.data).then( function(response) {
    console.log(response);
});
 });

*/