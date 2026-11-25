const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/', createProxyMiddleware({
    target: 'https://api.bybit.com',
    changeOrigin: true,
    secure: true,
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
        proxyReq.setHeader('Origin', 'https://api.bybit.com');
    },
    onError: (err, req, res) => {
        res.status(500).json({ error: 'Proxy error', message: err.message });
    }
}));

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Bybit Proxy running on port ${PORT}`);
});
