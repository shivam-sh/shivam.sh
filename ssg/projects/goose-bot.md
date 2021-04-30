---
title: Goose Bot
tags: NodeJS, server-side
date: 2020-07-01
description: An identity verification system built to bring increased security to Discord servers
---
# Goose Bot
## Discord Verification System

<img class="image" src="../../../assets/goose-bot/notes.jpeg"></img>

Goose Bot is a bot designed to provide an email-based identity verification service for Discord servers.

The bot solved the problem our Systems Design Engineering cohort was facing. There were about 100 people in our program, but the Discord server had over 200 members before classes even began!

The bot hooks into the UW Open API and verifies the student status of people looking to access the server. As people join the server, they enter their Waterloo IDs and verify their identities with a verification token sent to their University of Waterloo emails.

By linking a user's Waterloo ID to their Discord, we can be sure that the server remains secure by limiting access to those who are part of the program or let in by server admins.


This project was a welcome new experience for me. Before its creation, I had limited experience in creating servers. My experience with NodeJS had been solely in running small servers for local networking needs.
I had to figure out how I should respond to requests in an asynchronous manner while reliably updating a database. 

This project was very research heavy as I explored new concepts to improve the reliability and functionality of the code that I wrote.

One of the most unexpectedly enjoyable parts of working on this program was ensuring that there weren't any holes in my reasoning. People don't always use the program just as the creators expect. As the number of people that use a program increases, so do the chances of an unaccounted-for interaction. I had to program while accounting for use cases that I wasn't even aware existed.

I kept everything organized by creating a visual depiction of the data models. I referred back to these whenever adding new features, or managing unexpected states within the code. My notes were relatively simple for this project, but their existence as a guide to refer to was incredibly helpful when designing and implementing features.

Shivam Sh