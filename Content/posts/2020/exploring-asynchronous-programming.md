---
title: Exploring Asynchronous Programming
tags: NodeJS
date: 2020-07-9 0:00
description: A reflection on my latest project. I explore server-side programming through Node.js thanks to a brief introduction while working on a bot.
image: images/posts/2020/async.jpg
---
# Exploring Asynchronous Programming
## Background

Recently, I've been managing a Discord server for the incoming wave of Systems Design Engineering students at Waterloo. The Discord is being used as a communication platform as well as a virtual meeting place to help us get to know each other.
There was only one problem. There were already over 200 members in the server yet there were only around 100 people coming into the program this year.

There was a clear problem with the fact that almost anyone could join the server. Verifying that they were meant to be in the server was just an inefficient process.
We needed a verification system. To solve this problem, I decided to make a discord bot that would work with the University of Waterloo's Open Data APIs. This would allow me to check someone's department and email them a verification token to confirm their identity.

This would be my first real server-side project as well as one of my first times using Node.js. The main code itself only took about a week to develop into a working state, but I ended up learning a whole lot about server-side development and asynchronous programming.

For information about the code and how it works click on [this GitHub link.](https://github.com/shivam-sh/goose-bot) The code is completely open-source on my GitHub so feel free to check it out.

## Newly Explored

An unprecedented consequence I faced with Node.js was the asynchronous execution of code. This means that multiple parts of the code can be running at the same time rather than the chain of events that occurs during synchronous programs.

This shift in the way code is executed ended up meaning that I'd use a day just to take a deep dive into the world of asynchronous code execution, and promises. I couldn't just call my own functions and deal with the return values right away. I would have to ensure that the returns were accessible to the next steps of the program so the parts that had to run in sync knew when their information was ready.

I found two main ways in which this balance between synchronous and asynchronous operations are kept. Either through promises, or through async/await.

### Promises
``` javascript
new Promise((resolve, reject) => {
  // Run a certain task that takes time 
  // End by either resolving or rejecting/throwing an error
})
  .then((result) => {
    // Take in the result of the previous promise and perform a task with it 
    // .then can even return another promise itself to make a "promise chain"
  })
  .catch((err) => {
    // Runs if the promises above it throw an error or aren't resolved. 
    // You can have multiple catches in a promise chain for error correction
  });
```
Promises are the first way in which synchronicity is managed. They either return a usable value, or will return an error that was created during their run. Their main feature is their ability to alert the program when they are done with their task. This means that the next portion of the code knows exactly when it should run.

Promises either complete, or return an error. This means it is relatively easy to manage the next steps in the operation. One can either continue on with the operation, or catch the error and manage it. The .then() and .catch() blocks capture these two possibilities and take in what is returned in either case. This makes for a fairly intuitive way of managing tasks that have to be executed in order in an otherwise asynchronous program.


### Async/Await
``` javascript
async function() {

  async function doSomething() {
    // Carries out a task that takes time then returns something
    return true;
  }

  await doSomething();

  // Continue with something else after doSomething() finishes
  // The await keyword told the program to wait for the function to stop
}
```

The second way to manage synchronous blocks of code is with async and await. This method simply exposes another interface for dealing with promises. Under the hood they both work the same way. 

Note that the example code this time is running inside a function initialized with the async keyword. The async keyword ensures that the function returns a promise and runs in the background, preventing the rest of your code from having to pause while waiting for a result.
This is necessary in order to allow the `await` keyword to be used. Await tells the program to wait for the code that you have just called to finish executing before carrying on with the next steps.

Await can be used to call any function labeled with async, or in other words, any promise.

### Mix & Match
Promises and async/await work the same way behind the scenes. The shared frameworks that back up promises and async/await mean that the two can be used together. The `await` keyword can be used when calling any promises, and the `.then()` and `.catch()` code blocks can be used when you call any functions initialized with async since they are actually just promises!

```
async function doSomething() {
  // Carries out a task that takes time then returns something

  return true;
}

doSomething()
  .then((json) => {
   // Do something else
  })
  .catch(() => {
   // Manage error
  });

```

In fact, the two variants allow you to carry out the exact same task just with different syntax. Here is some code that accesses a json based API from the web written to accomplish the same task using both methods.

``` javascript
// Import fetch function to pull json from web
const fetch = require("node-fetch");

// Fetching JSON from the web with a promise
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((result) => result.json())
  .then((json) => {
    console.log("Done fetching data with Promises!");
    console.log(json);
  })
  .catch((err) => {
    console.log("Uh Oh! Something went wrong with my promise!");
  });

// Fetching JSON from the web with async & await
runAsync();

async function runAsync() {
  async function doSomething() {
    let result = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    result = result.json();
    return result;
  }

  try {
    let json = await doSomething();

    console.log("Done fetching data with Async/Await!");
    console.log(json);
  } catch {
    console.log(
      "Uh Oh! Something went wrong during when I tried to doSomething!"
    );
  }
}
```

## Wrap-Up

Exploring some asynchronous programming thanks to my work on a identity-verification bot allowed me to develop a far better understanding of how information is dealt with on the web and on servers.
This is definitely a topic I'm looking forward to digging deeper on so keep an eye out for future projects and blog posts that'll expand on the basics in this post.

As for Goose Bot, I'm definitely going to be adding more features to it to help out with the Discord server. So if you want to see how it works or how to implement something similar [the GitHub](https://github.com/shivam-sh/goose-bot) should be pretty helpful. I tried my best to ensure that the code is either self explanatory or commented to be easy to understand.

Shivam Sh
