var appdrag = require('../index');

appdrag.init("Put your APIKey", "Put your appID");

appdrag.downloadRemoteFile(
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Chimpanzee-Head.jpg/220px-Chimpanzee-Head.jpg",
   "wass.jpg"
).then(
    function (response) {
      console.log(response);
    }
);
