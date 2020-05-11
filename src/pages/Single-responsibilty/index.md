---
title: the SRP principle
date: '2019-03-04'
spoiler: Why many developers missunderstand the SRP principle
tags: "SRP JS Priciplal_Learning Coding SOLID"
---

Of all the SOLID principles, the Single Responsibility Principle (SRP) would be the least well understood. That’s likely because it has a particularly inappropriate name. It is too easy for programmers to hear the name and then assume that it means that every module should do just one thing.
I discussed all the SOLID principles here, you can check it out!<br>
<a href="/SOLID-Principles/">The-solid-principles-in-designing-software </a>  
After finding the suitable definition from the Design Patterns: Elements of Reusable Object-Oriented Software aka (The gang of four) which is:
#### A module should have one, and only one reason to change.
##### Let's have an example 
Suppose we are working on an imaging app that creates huge Geo images that would be 2GB of size or even more, we now stitch multiple satellite images to get one huge image then we need to save the image in the available hardware, the implementation would be:
The first thought would be to store image we convert the image to the demanded format then we store it in the local machine.
That would be like this:
```jsx
class StoreGeoImage {
    
    function converttoTiff(){
        //convert the image to tiff format
    }

    function FileStore(){
        //Store the image in the local machine
    }
}
```
Although this might work out this implementation violates the SRP, this class has more than one reason to change 
### What if we need to save the image in SVS format?
### What if we don't want to store the image on local machine but instead we want to stream the image to the cloud?
After looking at those assumptions 
we end up with an implementation like this:

```jsx
class ConvertGeoImage {
    
    function converttoTiff(){
        //convert the image to tiff format
    }
    function converttoSvs(){
        //convert the image to svs format
    }
}

class Store(){
    function localStore(){
        //Store the image on the local machine
    }

    function cloudStore(){
        //Store the image on the cloud
    }
}
```

## Conclusion: design improves with domain enlightenment

When we understand the domain, at an architectural level:

| Conclusions                                  |      
|----------------------------------------------|
| we’re able to identify the actors of change (convert & store)  | 
| we’re able to split out code into subdomains(two independent classes instead of one)|    
| we’re able to implement package by module (module is just a file of code)   | 
