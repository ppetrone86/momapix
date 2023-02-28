const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

const MOMAPOX_ENDPOINT = 'https://prova.momapix.com'

// Configura il middleware per gestire le richieste con il parametro CORS
app.use(cors());


const logger = (req, res, next) => {
  console.log(`Received ${req.method} request for ${req.originalUrl}`);
  next();
};

// Configura il middleware di logging
app.use(logger);

// Configura i proxy per ogni endpoint
const searchProxy = createProxyMiddleware('/search', {
  target: `${MOMAPOX_ENDPOINT}/rest/search`,
  changeOrigin: true,
  pathRewrite: {
    '^/search': ''
  }
});

const itemsProxy = createProxyMiddleware('/items', {
  target: `${MOMAPOX_ENDPOINT}/rest/items`,
  changeOrigin: true,
  pathRewrite: {
    '^/items': ''
  }
});

const sessionProxy = createProxyMiddleware('/session', {
  target: `${MOMAPOX_ENDPOINT}/rest/session`,
  changeOrigin: true,
  pathRewrite: {
    '^/session': ''
  }
});

const loginProxy = createProxyMiddleware('/login', {
  target: `${MOMAPOX_ENDPOINT}/rest/session/login`,
  changeOrigin: true,
  pathRewrite: {
    '^/login': ''
  }
});

const logoutProxy = createProxyMiddleware('/logout', {
  target: `${MOMAPOX_ENDPOINT}/rest/session/logout`,
  changeOrigin: true,
  pathRewrite: {
    '^/logout': ''
  }
});

const downloadProxy = createProxyMiddleware('/download', {
  target: `${MOMAPOX_ENDPOINT}/rest/download`,
  changeOrigin: true,
  pathRewrite: {
    '^/download': ''
  }
});

// Configura il middleware per utilizzare i proxy
app.use(searchProxy);
app.use(itemsProxy);
app.use(sessionProxy);
app.use(loginProxy);
app.use(logoutProxy);
app.use(downloadProxy);

app.listen(port, '0.0.0.0', () => {
  console.log(`Proxy server listening http://0.0.0.0 ${port}`);
});
