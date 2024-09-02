const express = require('express');
const rateLimit = require('express-rate-limit');
const { morganMiddleware } = require('./src/helpers/logger.helper');

const app = express();

// ใช้ morganMiddleware ก่อนการตั้งค่า rateLimiter
app.use(morganMiddleware);

// ใช้ body parsers
app.use(express.json()); // สำหรับการรับข้อมูล JSON
app.use(express.urlencoded({ extended: true })); // สำหรับการรับข้อมูลจากฟอร์ม

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