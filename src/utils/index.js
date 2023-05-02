const { URLSearchParams } = require('url');

function getAccessTokenFromUrl(url) {
  if (!url) return false;
  const queryParams = new URLSearchParams(url.split('?')[1]);
  return queryParams.get('accessToken') ?? false;
}

function validateClient() {
  return true;
}
module.exports = {
  getAccessTokenFromUrl,
  validateClient,
};
