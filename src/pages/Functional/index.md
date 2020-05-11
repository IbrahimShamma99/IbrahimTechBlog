---
title: Functional programming 
date: "2020-01-05T22:12:03.284Z"
spoiler: Practical guide for FP
tags: "Coding JS FP SoftwareParadigms"
---

### <b> <i> In many ways, the concepts of functional programming (often abbreviated FP) predate programming itself. This paradigm is strongly based on the lambda-calculus invented by Alonzo Church in the 1930s.
## Don’t let all the new buzzwords scare you away. It’s a lot easier than it sounds.
A programming paradigm is a way of thinking when constructing software, other examples of programming paradigms include object-oriented programming and procedural programming.

FP is the process of building software by composing pure functions, avoiding shared state, mutable data(changeable), and side-effects. Functional programming is declarative rather than imperative, and the application state flows through pure functions. Contrast with object-oriented programming, where the application state is usually shared and colocated with methods in objects or sometimes the state is being separated into its own object.
###### Sounds Nerdy? :nerd_face: we will explain every word said above :rose:  

### pure functions
This is when the same input that gives the same output always in some way it is similar to the stateless object(Has no side-effects).

### Function composition
This is when the process of combining two or more functions in order to produce a new function or perform some computation. For example, composition f . g (the dot means “composed with”) is equivalent to f(g(x)) in JavaScript.This is really useful when applying the dependency inversion principle. Better check this article out!
<a href="/Depedency-Inversion/">The dependency inversion principle </a>  

### Shared State
Meanwhile, This is any variable, object, or memory space that exists in a shared scope, can be delivered to any function as a parameter as the property of an object being passed between scopes. A shared scope can include global scope or closure scopes. Often, in object-oriented programming, objects are shared between scopes by adding properties to other objects.

### Immutation## This article meant to be written for everything you need to know about file upload MERN stack specifically. :rocket:

if you want to escape this article for the code you can find here :upside_down_face:	
{% github https://github.com/IbrahimShamma99/file-upload %}

# Let's get started :fire:<br/><br/>

## 1.Creating Server and Client instances :building_construction:<br/><br/>

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
* Express is the API library for nodeJS. :cowboy_hat_face:
* Mongoose is a MongoDB object modeling tool aka nodeJS driver. :sunglasses:
* Multer is a node.js middleware for handling multipart/form-data :scream:	

Now we created the server and the client sides so move to the next point.
<br/><br/>

## 2.Write the code :computer:
First, we will start with the client :unicorn: :top: code by heading to /src/App.js
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

Now let head into the :back::end: side we start with the /server/model.js
```jsx
var mongoose = require('mongoose');


const fileSchema = new mongoose.Schema({
    meta_data:{}
});

mongoose.model("file",fileSchema);
```

And this is how we built the user schema sounds easy right? :nerd_face:
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

## 3.Running the code :fire: :bug:
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


s 
An immutable object is an object that can’t be modified(Changes) after it’s created. Conversely, a mutable object is any object which can be modified after it’s created.
Immutability is the most important concept of functional programming because, without it, the data flow in your program is messed up, state history is abandoned, and strange bugs can creep into your software.
I recommend you to check this medium article out it has some in-depth Immutations details

<a href="https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd"> the-dao-of-immutability  </a>
