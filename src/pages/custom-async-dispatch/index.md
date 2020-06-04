---
title: Write your own custom asyncDispatch middleware
date: "2020-06-05T22:12:03.284Z"
spoiler: async-dispatch middleware
tags: "React Redux Javascript"
---

As the default dispatch provided by react-redux library is a synchronous call I needed to make calls to the server where I don't want to make changes to the structure to the code base 
Redux docs suggests writing your own custom middleware instead and it turns out being super easy 

```jsx 
//asyncDispatch.js 

const asyncDispatchMiddleware = (store) => (next) => (action) => {
  let syncActivityFinished = false;
  let actionQueue = [];

  function flushQueue() {
    actionQueue.forEach((a) => store.dispatch(a)); // flush queue
    actionQueue = [];
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

  next(actionWithAsyncDispatch);
  syncActivityFinished = true;
  flushQueue();
};

export default asyncDispatchMiddleware;
``` 

## when writing middleware `Store,` `next` state and `action` are your parameters 

Then bind this middleware into your collection of middleware using ```applyMiddleware ``` method provided by Redux 

```jsx 
//store.js
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import asyncDispatchMiddleware from './asyncDispatch';
import rootReducer from "./Reducer"; 
//Your reducers either root or combined version


const store = createStore(rootReducer,
    applyMiddleware(
    asyncDispatchMiddleware
    // your other middlewares ex thunkMiddleware orloggerMiddleware
)
  );

export default store;
```
Custom middlewares are very useful because of ease of extensibility <br/>

I have an even easier approach for you to implement it
<a herf="async-dispatch/"> click here </a>

Good luck
