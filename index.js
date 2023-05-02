const http = require('http');
const { validateClient } = require('./src/utils');
const { wss } = require('./src/web-sockets');

require('dotenv').config();
const port = process.env.PORT || 3069;

const server = http.createServer();
// Handle WebSocket upgrade requests
server.on('upgrade', async (req, socket, head) => {
  // Get the access token from the request URL
  const accessToken = getAccessTokenFromUrl(req.url);

  if (!validateClient()) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }

  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

server.listen(port, () => {
  console.info(`Server running on port: ${port}`);
});
