---
title: asynchronous dispatch is now on npm packages!
date: "2020-06-05T22:12:03.284Z"
spoiler: async-dispatch middleware
tags: "React Redux Javascript"
---

[![npm](https://img.shields.io/npm/v/async-dispatch.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/async-dispatch)

> async-dispatch is a middleware can be added with no time to privilage the asynchronous into your store

For more informatiom about the future of redux-logger, check out the [discussion here](https://github.com/IbrahimShamma99/asynDispatch-middleware/issues).

## Table of contents

- [Table of contents](#table-of-contents)
- [Install](#install)
- [Usage](#usage)
- [To Do](#to-do)
- [License](#license)

## Install

`npm i --save async-dispatch`

## Usage

```javascript
import asyncDispatchMiddleware from "async-dispatch";
import { createStore } from "redux";
import { applyMiddleware } from "redux";

const store = createStore(
  rootReducer,
  applyMiddleware(asyncDispatchMiddleware)
);
// Note passing middleware as the third argument requires redux@>=3.1.0
```

Then applying this middleware is simple as

```jsx
const LoginReducer = (state = intialState, action) => {
      login(action.userData).then((data) => {
        if (data.error) {
          action.asyncDispatch({
            type: actionTypes.ERROR,
            message: data.error,
          });
        } else {
          action.asyncDispatch({
            type: actionTypes.SUCCESS,
            user: data,
            message: "Logged successfully",
          });
        }
      });
      return { ...state };
})

```

## To Do

- [ ] Adding typeScript types

## License

MIT
