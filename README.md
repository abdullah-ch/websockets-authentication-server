# websockets-authentication-server

This Repository implements a Websocket Server built in Node Js along ws library.

## Features
It offers the following features:-

* It only allows authenticated clients to make a websocket connection
* It sends ping messages to connected clients after regular intervals to ensure that the connection is still alive
* It checks the clients' heartbeat status and terminates the connection if it does not receive any response from the client after a certain interval

## Getting started
To get started with this server, you'll need to have Node.js and npm installed on your machine. You'll also need to clone this repository to your local machine.

Once you have the repository cloned, you can install the necessary dependencies by running:

### `npm install`
You can then start the server by running:

### `npm run dev`
