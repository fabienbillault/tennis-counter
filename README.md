# tennis-counter

## Table of Contents
1. [General Info](#general-info)
2. [Installation](#installation)
4. [Start script](#start-script)
4. [Some methods](#some-methods)
### General Info
***
Small script for counting points during a tennis match.
## Installation
***
```
$ git clone https://github.com/fabienbillault/tennis-counter/new/master
$ cd ../path/to/the/file
```
## Start script
***
Launch index.html in browser, then start the script in the console :
```
$ tc.init()
```
## Some methods
***
To give the point to the first player
```
$ tc.playerOneScores()
```
To give the point to the second player
```
$ tc.playerTwoScores()
```
To enter one or two sets already played
```
$ tc.setScore([6,4])
$ tc.setScore([6,4],[2,6])
```
