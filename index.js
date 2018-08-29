var request = require('request');
var APIUrl = 'https://api.appdrag.com/CloudBackend.aspx';
var APIKey = "";
var appID = "";

exports.init = function(_APIKey, _appID) {
  APIKey = _APIKey;
  appID = _appID;
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
  });
}

exports.fileBinaryWrite = function (filekey, content) {
  return new Promise((resolve, reject) => {
    var r = request.post(
    {
        url:APIUrl
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
    var form = r.form();
    form.append('command', 'WriteBinaryFile');
    form.append('APIKey', APIKey);
    form.append('appID', appID);
    form.append('filekey', filekey);
    form.append('file', content, {filename : filekey});
  });
}


exports.fileDelete = function (filekey) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "FileDelete",
        "APIKey" : APIKey,
        "appID" : appID,
        "filekey" : filekey
    };

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
  });
}

exports.sendEmailAdvanced = function (from, sender, to, cc, bcc, subject, content, attachments, isHtml) {
  return new Promise((resolve, reject) => {

    var r = request.post(
    {
        url:APIUrl
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
    var form = r.form();
    form.append('command', 'CloudAPISendEmail');
    form.append('APIKey', APIKey);
    form.append('appID', appID);
    form.append('from', from);
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
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

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
  });
}
exports.sqlSelect = function (query) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "CloudDBGetDataset",
        "APIKey" : APIKey,
        "appID" : appID,
        "query" : query
    };

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
  });
}

exports.sqlExecuteRawQuery = function (query) {
  return new Promise((resolve, reject) => {
    var postParameters = {
        "command" : "CloudDBExecuteRawQuery",
        "APIKey" : APIKey,
        "appID" : appID,
        "query" : query
    };

    request.post(
    {
        url:APIUrl,
        form: postParameters
      }, function(err,httpResponse,body){
        return resolve(body);
      }
    );
  });
}
