/**
 * This is a Node.js script that sets up a WebSocket server using the `ws` library.
 * The WebSocket server listens for incoming connections and keeps track of connected clients.
 * It sends ping messages to connected clients after regular intervals to ensure that the connection is still alive.
 * It also checks the clients' heartbeat status and terminates the connection if it does not receive any response from the client after a certain interval.
 */

const WebSocket = require('ws');
const crypto = require('crypto');

const wss = new WebSocket.Server({ noServer: true });

const pingInterval = 10_000;
const intervalForCheckingClientsHeartBeat = 50_000;
const clientsPingIntervalMap = {};

function heartbeat() {
  this.isAlive = true;
}

wss.on('connection', async (ws) => {
  console.log('CLIENT HAS BEEN CONNECTED SUCCESSFULLY !!!');
  ws.uuid = crypto.randomUUID();
  ws.isAlive = true;
  ws.on('error', console.error);
  ws.on('pong', heartbeat);

  // Ping after regular interval of times
  clientsPingIntervalMap[ws.uuid] = setInterval(() => {
    ws.send(
      JSON.stringify({
        type: 'PING',
      })
    );
  }, pingInterval);

  ws.on('message', async (data) => {
    const parsedMessage = JSON.parse(data.toString('utf-8'));
    if (parsedMessage?.type === 'PONG') {
      ws.ping(); // make the client's heartbeat alive
    }

    // sending dummy information to the client
    ws.send(JSON.stringify('I Love LANA DEL REY !!!!'));
  });

  ws.on('close', async () => {
    clearInterval(clientsPingIntervalMap[ws.uuid]);
    delete clientsPingIntervalMap[ws.uuid];
  });
});

/**
 * Check heartbeat status of all connected clients after regular intervals
 * Terminates Those Clients who heart beat is not alive
 */

const interval = setInterval(() => {
  wss.clients.forEach((ws, i) => {
    if (!ws.isAlive) {
      // clearing because we dont want to ping terminated connections !
      clearInterval(clientsPingIntervalMap[ws.uuid]);
      delete clientsPingIntervalMap[ws.uuid];
      return ws.terminate();
    }
    ws.isAlive = false;
  });
}, intervalForCheckingClientsHeartBeat);

wss.on('close', () => {
  clearInterval(interval);
  clientsPingIntervalMap = {};
});

module.exports = {
  wss,
};
