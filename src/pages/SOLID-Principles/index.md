---
title: The "SOLID" Principles in designing software
date: '2019-08-12'
spoiler: brief introduction to the SOLID principles in programming
tags: "SOLID JS Priciplal_Learning Coding"
---
As with everything in life, using these principles mindlessly
can cause more harm than good. The cost of applying these
principles into a program’s architecture might be making it
more complicated than it should be. there’s no successful software product in which all of these principles are applied at once. Striving for these principles is good, but always try to be pragmatic and don’t take everything written here as dogma.
 
These principles called the S.O.L.I.D principles is an acronym derived by Michael Feathers. S: Single Responsibility Principle O: Open-Closed Principle L: Liskov Substitution Principle I: Interface Segregation Principle D: Dependency Inversion Principle.
So let's start with them briefly:

1-**Single Responsibility Principle**

A class should have just one reason to change.
Try to make every class responsible for a single part of 
the functionality provided by the software.
Make that responsibility entirely encapsulated.
One reason to change
Notice The main goal of this principle is to reduce complexity.
You don’t need to invent a sophisticated design for a program that
only has about 200 lines of code. Make a dozen methods pretty,
and you’ll be fine.
The real problems emerge when your program constantly grows and changes.
 
2- **Open/Closed Principle**

Classes should be open for extension.
But at the same time close for modification.
The main idea of this principle is to keep existing 
code from breaking when you implement new features.

3- **Liskov Substitution Principle**

When extending a class, remember that you should be
able to pass objects of the subclass in place of objects of
the parent class without breaking the client code.
This means that the subclass should remain compatible with the behavior of the superclass. When overriding a method,
extend the base behavior rather than replacing it with something else entirely.

This concept is critical when developing libraries and 
frameworks because your classes are going to be used
by other people whose code you can’t directly access and change.

Invariants are conditions in which an object makes sense. 
For example, invariants of a cat are having 
four legs, a tail, the ability to meow, etc.

 
4- **Interface Segregation Principle** (ISP)

Clients shouldn’t be forced to depend on methods they do not use.
ISP splits interfaces that are very large into smaller and more specific ones so that clients will only have to know about the methods that are of interest to them. Such shrunken interfaces are also called role interfaces.
And notice Correct abstraction is the key to Interface Segregation Principle.

5- **Dependency Inversion Principle** (DIP)
 
High-level classes shouldn’t depend on low-level classes.
Both should depend on abstractions. Abstractions shouldn’t depend on details. Details should depend on
abstractions.

To make a distinction between low and high-level classes
• Low-level classes implement basic operations such as working
    with a disk, transferring data over a network, connecting to a
    database, etc.
• High-level classes contain complex business logic that directs
    low-level classes to do something.

In quick words how to implement DIP
A-Build low-level classes 
B-Build its interface based on abstraction
C-Build high-level classes

**Conclusion**

We discussed briefly the solid principles when designing software,
although you would never implement them each project you wok with,
In the other hand; it is good to put those principles on notice when 
coding or when design the software by the architect.
