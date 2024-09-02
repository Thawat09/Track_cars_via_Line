require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const { morganMiddleware } = require('./src/config/logger');

const app = express();

// ใช้ morganMiddleware ก่อนการตั้งค่า rateLimiter
app.use(morganMiddleware);

// ตั้งค่า rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 นาที
    max: 12, // จำกัดที่ 12 ครั้งต่อ IP
    message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);

// การตั้งค่า routing
app.use('/', require('./src/routes'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});