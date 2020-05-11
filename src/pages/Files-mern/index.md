---
title: Dealing with files via MERN stack 
date: "2020-03-05T22:12:03.284Z"
tags: "ExpressJS MongoDB NodeJS React"
---

## This article meant to be written for everything you need to know about file upload MERN stack specifically.

if you want to escape this article for the code you can find here<br>
<a href="https://github.com/IbrahimShamma99/file-upload">Source Code</a>

# Let's get started <br/><br/>

## 1.Creating Server and Client instances <br/><br/>

I assume you have already installed npm, NodeJS & MongoDB, we need to create a react app.
NOTE: remember to put your repos on an organized folder structure.
Open the terminal and use the following commands:
```sh
npx create-react-app file-upload-mern
cd ./file-upload-mern
```
Also, we want to use axios to send the file to the server instance, to install axios:

```sh
npm i axios
```

here we created the react client-side app, we end with a file structure like this:
```jsx
file-upload-mern
├── .gitignore
├── public
├── package.json    
├── src
│   └── App.js
│   └── index.js
│   └── App.css
│   └── index.css
│   └── serverWorker.js
│   └── setupTests.js
├── README.md
```

Now, we need now to create the server-side app also, on the folder `file-upload-mern` write the following on the terminal:

```sh
mkdir server
cd ./server
npm init -y
touch server.js
touch model.js
mkdir public
```
 * server.js => is where the server instance will be
 * model.js => Where the file schema on mongoDB

To make sure we are on the same page this is the final file structure scheme:
```jsx
file-upload-mern
├── .gitignore
├── public
├── package.json    
├── src
│   └── App.js
│   └── index.js
│   └── App.css
│   └── index.css
│   └── serverWorker.js
│   └── setupTests.js
├── server
│   └── package.json
│   └── public 
│   └── server.js
│   └── node_modules
│   └── model.js
├── README.md
```

To install the backend dependencies:
```sh
npm i express
npm i mongoose
npm i multer
```
To make things clear about the dependencies we installed:
* Express is the API library for nodeJS.
* Mongoose is a MongoDB object modeling tool aka nodeJS driver. 
* Multer is a node.js middleware for handling multipart/form-data 	

Now we created the server and the client sides so move to the next point.
<br/><br/>

## 2.Write the code 
First, we will start with the client code by heading to /src/App.js
to write the following: 
```jsx
// destination  /src/App.js

import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state ={
          file: null
      };
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e){
      e.preventDefault();
      const formData = new FormData();
      formData.append('myfile',this.state.file);
      const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
      axios.post("http://localhost:5000/upload",formData,config)
          .then((response) => {
              alert("The file is successfully uploaded");
          }).catch((error) => {
      });
  }

  onChange(e) {
      this.setState({file:e.target.files});
  }

  render() {
      return (
          <form onSubmit={this.onFormSubmit}>
              <h1>File Upload</h1>
              <input type="file" className="custom-file-input" name="myImage" onChange= {this.onChange} />
              {console.log(this.state.file)}
              <button className="upload-button" type="submit">Upload to DB</button>
          </form>
      )
  }
}

export default App;

```

Here we created a form in which the user uploads the file and saves it in the app component state which after submitting will be transferred for the server-side.

Now let head into the side we start with the /server/model.js
```jsx
var mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    meta_data:{}
});

mongoose.model("file",fileSchema);
```

And this is how we built the user schema sounds easy right? 
<br/><br/>
Now let's build the server instance which will listen on port 5000 on /server/server.js

```jsx
// destination /server/server.js
const express = require("express");
const path = require("path");
const multer = require("multer");
const mongoose  = require("mongoose");
const app = express();
const PORT = 5000;
require("./model")
const File = mongoose.model("file");
const router = express.Router();

const storage = multer.diskStorage({
   destination: "./public/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myfile");

const obj =(req,res) => {
   upload(req, res, () => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);//Here you get file.
      const file = new File();
      file.meta_data = req.file;
      file.save().then(()=>{
      res.send({message:"uploaded successfully"})
      })
      /*Now do where ever you want to do*/
   });
}

router.post("/upload", obj);

app.use(router);

app.get("/",(req,res)=>{
   return res.send("<p>hello!</p>");
});

mongoose.connect("mongodb://localhost/file-upload",{
   useUnifiedTopology: true,
   useNewUrlParser: true,
   useCreateIndex: true,
}).then(()=>{console.log("DB is connected")})

app.listen(PORT,()=>{
   console.log("\u{1F525}\u{1F680} app listen on port",PORT,"\u{1F525}\u{1F680}")
});
```
Note: path library is a built in NodeJS library to deal with file systems paths operations and dealing with it is more recommended than using RegEx.

## 3.Running the code 
First, make sure you are on the root directory of the project via terminal and open two instances of terminals one for the client and second for the server-side of the project:
To run the server 
```sh
node ./server/server.js
```
To run the client
```sh
npm start
```
# Conclusion 
We discussed simple details in terms of MERN stack development note that you may get a CORS permission error and that happens because the client fetches data from different origin API and fixing it from your browser by allowing all origins of APIs and it has an extension on chrome to handle it properly.
Happy coding.


