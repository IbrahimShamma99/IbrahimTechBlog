---
title: What is depedency inversion 
date: "2019-07-05T22:12:03.284Z"
---

Here we go 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Imagine what software development was like before a safe and convenient mechanism for polymorphism was available, it was manually handled via pointers in C and other old languages.

## Dependency Inversion 
In the typical calling tree, main functions called high-level functions, which called mid-level functions, which called low-level functions. In that calling tree, however, source code dependencies inexorably followed the flow of control.
####Sounds interesting?

#####But let's take a look at how the process flows

Let's say that the main function calls out high-level function,
the middle-level function acts as an interface for F(), however, that the source code dependency (the inheritance relationship)
between ML1 and the interface, I point in the opposite direction compared to the flow of control. 
####The fact that OO languages provide safe and convenient polymorphism means that any source code dependency, no matter where it is, can be inverted.
With this approach:nerd_face:, architects who working in systems written in OO languages have absolute control over the direction of all source code dependencies flow in the system. They are not constrained to align those dependencies with the flow of control they can add more dependencies as a sort of plugin thanks to polymorphism:heart:.
###Also this principle makes your program functionality clear and agile.
No matter which module does the calling and which module is called, the software architect can point the source code dependency in either direction.
#####That is power! That is the power that OO provides. That’s what OO is really.
All about at least from the architect’s point of view.
What can you do with that power? As an example, you can rearrange the source code dependencies of your system so that the database and the user interface (UI) depend on the business rules, rather than the other way around.


This means that the UI is the main function, the database and business logic can be plugins to the system's rules. It means that the source code of the business rules never mentions the UI or the database.
And this will help in software fast delivery.
For further check out the book of architecture called clean architecture by Robert-C,-Martin.