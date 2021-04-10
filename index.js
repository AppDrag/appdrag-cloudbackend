var SqlString = require('sqlstring');
var FormData = require('form-data');
const axios = require('axios');
var APIUrl = 'https://api.appdrag.com/CloudBackend.aspx';
var APIZapierUrl = 'https://api.appdrag.com/Zapier.aspx';
var config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformResponse: (res) => {
    // Do your own parsing here if needed ie JSON.parse(res);
    return res;
  },
}
var APIKey = "";
var appID = "";

exports.init = function(_APIKey, _appID) {
  APIKey = _APIKey;
  appID = _appID;
}
exports.enableDevMode = function () {
  APIUrl = 'https://api-dev.appdrag.com/CloudBackend.aspx';
  APIZapierUrl = 'https://api-dev.appdrag.com/Zapier.aspx';
}


exports.newslettersInsertContactsIntoLists = function(list, contacts) {
  var mails = '';
  var firstNames = '';
  var lastNames = '';
  contacts.forEach(function (contact) {
    if (mails != '') {
      mails += ',';
      firstNames += ',';
      lastNames += ',';
    }
    mails += contact.email;
    firstNames += contact.firstName;
    lastNames += contact.lastName;
  });
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "NewslettersInsertContactsIntoLists",
        "APIKey" : APIKey,
        "appID" : appID,
        "listsToAdd" : list,
        "contactsMail" : mails,
        "contactsFirstName" : firstNames,
        "contactsLastName" : lastNames,
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIZapierUrl,postParameters,config).then(function(response) {
        return resolve(response.body);
      }
    );
  });
}


exports.newslettersDeleteList = function(list, contacts) {

  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "NewslettersDeleteLists",
        "APIKey" : APIKey,
        "appID" : appID,
        "listsToDelete" : list,
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIZapierUrl,postParameters,config).then(function(response){
        return resolve(response.data);
      }
    );
  });
}


exports.newslettersGetFailedMail = function(fromDate) {
  if (typeof(fromDate) == 'undefined') {
    fromDate = '';
  }

  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "NewslettersGetFailedMail",
        "APIKey" : APIKey,
        "appID" : appID,
        "fromDate" : fromDate
    };

    postParameters = new URLSearchParams(postParameters);
    axios.post(APIZapierUrl,postParameters,config).then(function(response){
        return resolve(response.data);
      }
    );
  });
}


exports.newslettersDeleteContactsFromLists = function(list, contacts) {
  var mails = '';
  contacts.forEach(function (contact) {
    if (mails != '') {
      mails += ',';
    }
    mails += contact.email;
  });
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "NewslettersDeleteContactsFromLists",
        "APIKey" : APIKey,
        "appID" : appID,
        "listsToDelete" : list,
        "contactsMail" : mails,
    };

    postParameters = new URLSearchParams(postParameters);
    axios.post(APIZapierUrl,postParameters,config).then(function(response){
        return resolve(response.data);
      }
    );
  });
}



exports.fileTextWrite = function(filekey, content) {

  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "WriteTextFile",
        "APIKey" : APIKey,
        "appID" : appID,
        "filekey" : filekey,
        "content" : content
    };

    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
        return resolve(response.data);
      }
    );
  });
}


exports.fileBinaryWrite = function (filekey, content) {
  return new Promise((resolve, reject) => {
    var form = new FormData();
    form.append('command', 'WriteBinaryFile');
    form.append('APIKey', APIKey);
    form.append('appID', appID);
    form.append('filekey', filekey);
    form.append('file', content, {filename : filekey});
    axios.post(APIUrl,form, { headers: form.getHeaders(), transformResponse: (res) => {
      // Do your own parsing here if needed ie JSON.parse(res);
      return res;
    }})
      .then(function (response) {
          return resolve(response.data);
    });
  });
}
// exports.fileBinaryWrite = function (filekey, content) {
//   return new Promise((resolve, reject) => {
//     var r = request.post(
//     {
//         url:APIUrl
//       }, function(err,httpResponse,body){
//         return resolve(body);
//       }
//     );
//     var form = r.form();
//     form.append('command', 'WriteBinaryFile');
//     form.append('APIKey', APIKey);
//     form.append('appID', appID);
//     form.append('filekey', filekey);
//     form.append('file', content, {filename : filekey});
//   });
// }

exports.fileDelete = function (filekey) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "FileDelete",
        "APIKey" : APIKey,
        "appID" : appID,
        "filekey" : filekey
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response) {
        return resolve(response.body);
      }
    );
  });
}

exports.fileRename = function (filekey, destkey) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "FileRename",
        "APIKey" : APIKey,
        "appID" : appID,
        "filekey" : filekey,
        "destkey" : destkey
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
        return resolve(response.data);
    });
  });
}

exports.fileCopy = function (filekey, destkey) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "FileCopy",
        "APIKey" : APIKey,
        "appID" : appID,
        "filekey" : filekey,
        "destkey" : destkey
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}

exports.fileSaveUploaded = function(filekey, destkey) {

  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "SaveUploadedFile",
        "APIKey" : APIKey,
        "appID" : appID,
        "filekey" : filekey,
        "destkey" : destkey
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}


exports.directoryCreate = function (directoryName) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "DirectoryCreate",
        "APIKey" : APIKey,
        "appID" : appID,
        "directory" : directoryName
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}

exports.directoryList = function (directoryName) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "DirectoryList",
        "APIKey" : APIKey,
        "appID" : appID,
        "directory" : directoryName
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}

exports.directoryRename = function (directoryName, destDirectory) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "DirectoryRename",
        "APIKey" : APIKey,
        "appID" : appID,
        "directory" : directoryName,
        "destDirectory" : destDirectory
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}

exports.directoryDelete = function (directoryName) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "DirectoryDelete",
        "APIKey" : APIKey,
        "appID" : appID,
        "directory" : directoryName
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}

exports.sendEmailAdvanced = function (from, sender, to, cc, bcc, subject, content, attachments, isHtml, replyTo) {
  return new Promise((resolve, reject) => {
    var form = new FormData();
    form.append('command', 'CloudAPISendEmail');
    form.append('APIKey', APIKey);
    form.append('appID', appID);
    form.append('from', from);
    form.append('sender', sender);
    if (typeof(replyTo) != "undefined" && replyTo != "") {
      form.append('replyTo', JSON.stringify(replyTo));
    }
    form.append('to', to);
    form.append('cc', cc);
    form.append('bcc', bcc);
    form.append('subject', subject);
    form.append('content', content);
    form.append('isHtml', isHtml === true ? "1" : "0");
    for (var i = 0; attachments != null && i < attachments.length; i++) {
      var attachment = attachments[i];
      form.append('file' + i, attachment.content, {filename : attachment.filename});
    }
    axios.post(APIUrl,form, { headers: form.getHeaders() })
      .then(function (response) {
          return resolve(response.data);
    });
  });
}


exports.sendEmail = function (from, sender, to, subject, content, isHtml) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "CloudAPISendEmail",
        "APIKey" : APIKey,
        "appID" : appID,
        "from" : from,
        "sender" : sender,
        "to" : to,
        "subject" : subject,
        "content": content,
        "isHtml": isHtml === true ? "1" : "0"
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    });
  });
}

exports.downloadRemoteFile = function (url, filekey) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "DownloadRemoteFile",
        "APIKey" : APIKey,
        "appID" : appID,
        "url" : url,
        "filekey" : filekey
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
        return resolve(response.data);
    });
  });
}

exports.escape = function (toEscape) {
    return SqlString.escape(toEscape);
}

exports.sqlSelect = function (query, arrayParams) {

  if ( arrayParams != null && arrayParams.length > 0) {
    query = SqlString.format(query, arrayParams);
  }

  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "CloudDBGetDataset",
        "APIKey" : APIKey,
        "appID" : appID,
        "query" : query
    };
    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
        return resolve(response.data);
      }
    );
  });
}

exports.sqlExecuteRawQuery = function (query, arrayParams) {

  if ( arrayParams != null && arrayParams.length > 0) {
    query = SqlString.format(query, arrayParams);
  }

  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "CloudDBExecuteRawQuery",
        "APIKey" : APIKey,
        "appID" : appID,
        "query" : query
    };

    postParameters = new URLSearchParams(postParameters);
    axios.post(APIUrl,postParameters,config).then(function(response){
      return resolve(response.data);
    }
  );
  });
}
