---
title: Functional programming 
date: "2020-01-05T22:12:03.284Z"
---

##### In many ways, the concepts of functional programming (often abbreviated FP) predate programming itself. This paradigm is strongly based on the lambda-calculus invented by Alonzo Church in the 1930s.
## Don’t let all the new buzzwords scare you away. It’s a lot easier than it sounds.
A programming paradigm is a way of thinking when constructing software, other examples of programming paradigms include object-oriented programming and procedural programming.

FP is the process of building software by composing pure functions, avoiding shared state, mutable data(changeable), and side-effects. Functional programming is declarative rather than imperative, and the application state flows through pure functions. Contrast with object-oriented programming, where the application state is usually shared and colocated with methods in objects or sometimes the state is being separated into its own object.
###### Sounds Nerdy? :nerd_face: we will explain every word said above :rose:  

### pure functions
This is when the same input that gives the same output always in some way it is similar to the stateless object(Has no side-effects).

### Function composition
This is when the process of combining two or more functions in order to produce a new function or perform some computation. For example, composition f . g (the dot means “composed with”) is equivalent to f(g(x)) in JavaScript.This is really useful when applying the dependency inversion principle. Better check this article out!
{% post https://dev.to/ibrahimshamma99/what-is-dependency-inversion-54b9 %}

### Shared State
Meanwhile, This is any variable, object, or memory space that exists in a shared scope, can be delivered to any function as a parameter as the property of an object being passed between scopes. A shared scope can include global scope or closure scopes. Often, in object-oriented programming, objects are shared between scopes by adding properties to other objects.

### Immutations 
An immutable object is an object that can’t be modified(Changes) after it’s created. Conversely, a mutable object is any object which can be modified after it’s created.
Immutability is the most important concept of functional programming because, without it, the data flow in your program is messed up, state history is abandoned, and strange bugs can creep into your software.
I recommend you to check this medium article out it has some in-depth Immutations details

<a href="https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd"> the-dao-of-immutability  </a>

## Conclusion
We discussed what is functional programming although FP is good for reducing code redundancy, improving modularity, helping us to solve complex problems and most importantly increases maintainability by 
being able to test each functional component separately. 