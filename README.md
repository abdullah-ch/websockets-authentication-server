# websockets-authentication-server

This Repository implements a Authenticated Websocket Server built in Node Js along ws library.

## Features

### Authenticated connections only
This server only allows authenticated clients to make a WebSocket connection. If an unauthenticated client attempts to connect, the server will destroy the socket connection request and send a 401 Unauthorized response.

### Ping messages
To ensure that the connection is still alive, the server sends ping messages to connected clients after regular intervals. This helps to prevent the connection from being terminated due to inactivity.

### Heartbeat monitoring
The server monitors the heartbeat status of clients and terminates the connection if it does not receive any response from the client after a certain interval. This ensures that the server can free up resources and prevent idle connections from consuming unnecessary resources.

## Getting started
To get started with this server, you'll need to have Node.js and npm installed on your machine. You'll also need to clone this repository to your local machine.

Once you have the repository cloned, you can install the necessary dependencies by running:

### `npm install`
You can then start the server by running:

### `npm run dev`
