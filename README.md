# appdrag-cloudbackend

<br/>

This is the official CloudBackend SDK for JavaScript, available for browsers and mobile devices, or Node.js backends. It is actively maintained by [AppDrag](https://appdrag.com "AppDrag") directly. AppDrag is a Cloud CMS & Backend made for web professionals and hosted on Amazon AWS. With AppDrag produce 5 times faster websites, blog e-commerce, Databases & API's.

### Features in this package
- Cloud Database: Execute SQL Queries and Non-queries
- Cloud FileSystem: Write & upload files, create/rename/delete/list files and folders
<br/>

# Getting Started

### Obtain an API Key and AppID

Once the package is installed your can require it and Initialize it with your **API Key **&** AppID**. You can find your AppID and API Key in **CloudBackend Portal**:

- Go to **https://prod.appdrag.com/cloudbackend.html**
- Login if you are not already logged in, or create a free account
- Select an existing project or create a new one
- In the left menu click on **API**
- There you will find your AppID in the top left corner, and the APIKey will appear when you press the APIKey button

![CloudBackend API Dashboard](https://cf.appdrag.com/cloudbackend/assets/AppDrag-API-Dashboard.png "CloudBackend API Dashboard")

### Installing with NPM
The preferred way to install the CloudBackend SDK for Node.js is to use the npm package manager for Node.js. Simply type the following into a terminal window:

`$ npm install appdrag-cloudbackend`
<br/><br/>

### Installing with CloudBackend
If your are inside a cloud function in CloudBackend, click on the "Open library manager" button then check the last checkbox named "appdrag-cloudbackend" then save.

![CloudBackend API Dashboard](https://cf.appdrag.com/cloudbackend/assets/AppDrag-Cloudbackend-API-NPM-Manager.jpg "CloudBackend NPM Manager")

<br/><br/>

## Initialization
```
var cloudbackend = require('appdrag-cloudbackend');
// INIT FROM CODE VARIABLES
cloudbackend.init('your_api_key', 'your_app_id');
// INIT FROM ENVIRONMENT VARIABLES
cloudbackend.init(process.env.APIKEY, process.env.APPID);
```

<br/>

## SQL
### sqlSelect(query) - Static query
```
cloudbackend.sqlSelect("SELECT * FROM Products WHERE category = 'Software'")
.then( function(response) {
	console.log(response);
});
```

If you want to compose the final SQL query by yourself you must escape the input parameters with cloudbackend.escape() like this:

```
cloudbackend.sqlSelect("SELECT * FROM Products WHERE category = " + cloudbackend.escape( event.POST.category ))
.then( function(response) {
	console.log(response);
});
```

### sqlSelect(query, arrayOfValues) - Query with parameters (Recommended)
You can use <b>?</b> characters as placeholders for values you would like to have escaped. Multiple placeholders are mapped to values in the same order as passed.

```
cloudbackend.sqlSelect("SELECT * FROM Products WHERE category = ? and id > ?", ["Software", 500])
.then( function(response) {
	console.log(response);
});
```


### sqlExecuteRawQuery(query) - Static query
```
cloudbackend.sqlExecuteRawQuery("UPDATE Products SET qty = qty - 1, lastUpdate = NOW() WHERE id = 54").then( function(response) {
	console.log(response);
});
```

### sqlExecuteRawQuery(query, arrayOfValues) - Query with parameters (Recommended)
```
cloudbackend.sqlExecuteRawQuery("UPDATE Products SET title = ?, lastUpdate = NOW() WHERE id = ?", ["Great product title", 42]).then( function(response) {
	console.log(response);
});
```

You can also use sqlExecuteRawQuery to create tables, add an index or anything you can do with a regular MySQL database.
<br/>
<br/>



## Email
### sendEmail(from, sender, to, subject, content, isHtml)
```
cloudbackend.sendEmail("john.doe@yopmail.com", "John Doe", "barbara.dess@yopmail.com", "Hello", "How are you?", false)
.then(function(response) {
		console.log(response);
});
```

### sendEmailAdvanced(from, sender, to, cc, bcc, subject, content, attachments, isHtml, replyTo)
```
var request = require('request').defaults({ encoding: null });
var imgURL = "https://upload.wikimedia.org/wikipedia/en/0/0b/Nickelodeon_SpongeBob_SquarePants_Characters_Cast.png";


request.get(imgURL, function (err, res, body) {
  var attachments =[{
    filename : "mypicture.jpg",
    content: body
  }];
	var replyTo = [{
		email : "johnny.doe@yopmail.com",
		name : "Johnny Doe"
		}];

	cloudbackend.sendEmailAdvanced("john.doe@yopmail.com", "John Doe", "barbara.dess@yopmail.com", "michel.ane@yopmail.com;sarah.croche@yopmail.com;jeremy.sciglio@yopmail.com", "frank.spritz@yopmail.com", "Hello", "How are you?", attachments, false, replyTo)
	.then(function(response) {
			console.log(response);
	});
});
```

### newslettersInsertContactsIntoLists(list, contacts)
```
cloudbackend.newslettersInsertContactsIntoLists('my list', [{
	email : 'john.doe@gmail.com',
	firstName : 'john',
	lastName : 'doe'
	}]).then(
    function (response) {
      console.log(response);
    }
);
```

### newslettersDeleteContactsFromLists(list, contacts)
```
cloudbackend.newslettersDeleteContactsFromLists('my list', [{
	email : 'john.doe@gmail.com'
	}]).then(
    function (response) {
      console.log(response);
    }
);
```

### newslettersDeleteList(list, contacts)
```
cloudbackend.newslettersDeleteList('my list').then(
    function (response) {
      console.log(response);
    }
);
```

### newslettersGetFailedMail(fromDate)
```
cloudbackend.newslettersGetFailedMail('2019-01-01').then(
    function (response) {
      console.log(response);
    }
);
```

## Filesystem
### fileTextWrite(filekey, content)
```
cloudbackend.fileTextWrite("mysubfolder/testfile1.html", "this is the content to save")
.then( function(response) {
		console.log(response);
});
```


### fileBinaryWrite(filekey, content)
```
var request = require('request').defaults({ encoding: null });
var imgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Macaca_sinica_-_01.jpg/220px-Macaca_sinica_-_01.jpg";
var filename = "test.jpg";
request.get(imgURL, function (err, res, body) {

cloudbackend.fileBinaryWrite(filename, body).then( function(response) {
        console.log(response);
  });
});
```

### fileDelete(filekey)
```
cloudbackend.fileDelete("mysubfolder/testfile1.html")
.then( function(response) {
		console.log(response);
});
```
### fileRename(filekey, destkey)
```
cloudbackend.fileRename("mysubfolder/testfile1.html", "mysubfolder/testfile2.html")
.then( function(response) {
		console.log(response);
});
```
### fileCopy(filekey, destkey)
```
cloudbackend.fileCopy("mysubfolder/testfile1.html", "mysubfolder/testfile2.html")
.then( function(response) {
		console.log(response);
});
```
### fileSaveUploaded(tmpfilekey, destkey)
This special function must be called to save a file uploaded to a cloud function in the CloudBackend storage for that AppID. in the destkey you can either indicate a destination path of your choice or use the original filename.
```
cloudbackend.fileSaveUploaded( event["FILES"][0]["path"], "newfilename.jpg").then( function(response) {
		console.log(response);
});
```

### downloadRemoteFile(url, destkey)
Download a remote file from it's URL and save it inside CloudBackend filesystem
```
cloudbackend.downloadRemoteFile("https://cf.appdrag.com/cloudbackend/assets/AppDrag-Cloudbackend-API-NPM-Manager.jpg", "img1.jpg").then( function(response) {
		console.log(response);
});
```

### directoryCreate(directoryPath)
Create a subfolder at directoryPath (can contains subdirectories like subdir1/subdir2/...)
```
cloudbackend.directoryCreate("subfolder1").then( function(response) {
		console.log(response);
});
```

### directoryList(directoryPath)
List all files and subdirectories of the specified directoryPath
```
cloudbackend.directoryList("subfolder1").then( function(response) {
		console.log(response);
});
```

### directoryRename(directoryPath, destDirectoryPath)
```
cloudbackend.directoryRename("subfolder1", "subfolder2").then( function(response) {
		console.log(response);
});
```

### directoryDelete(directoryPath)
```
cloudbackend.directoryDelete("subfolder1")
.then( function(response) {
		console.log(response);
});
```

<br/>



# Support
Post your issues or suggestions here on Github

You can also check our documentation here:
https://support.appdrag.com
