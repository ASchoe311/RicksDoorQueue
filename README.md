# GroupMe NodeJS Chat Bot for Ricks American Cafe

## Purpose

Rick's employees often need to have coworkers take their shifts as a result of other obligations, especially school. Due to this there are many occasions where multiple employees desire to have their shifts taken on the same night. In order to make things fair, we instituted a policy for shift take requests of "first come, first serve". I created this chat bot to keep track of the order of this shift request queue to maintain a fair environment.

## Usage

/queue {day1} {day2} {day3} ...
: Adds the message sender to the queue for each of the specified days

/unqueue {day1} {day2} {day3} ...
: Removes the message sender from the queue for each of the specified days

/queuecheck {day1} {day2} {day3} ...
: Posts a message in chat with the status of the queues for any given days

/queuecheck all
: Posts a message in chat with the status of the queues for all days

/queuesite
: Posts a message in chat with the link to a web frontend for the queues where they can be viewed and interacted with

/queuehelp
: Posts a message in the chat providing information on how to use QueueBot

## This bot is no longer in use, but here are some screenshots of it functioning
