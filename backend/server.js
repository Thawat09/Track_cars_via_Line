const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { morganMiddleware } = require('./src/helpers/logger/logger.helper');
const config = require("./src/config/app");

const app = express();

// ใช้ morganMiddleware ก่อนการตั้งค่า rateLimiter
app.use(morganMiddleware);

// ตั้งค่า CORS
const corsOptions = {
    origin: 'https://117f-183-88-236-137.ngrok-free.app', // ระบุต้นทางที่ต้องการอนุญาต
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // ระบุ HTTP methods ที่ต้องการอนุญาต
    allowedHeaders: ['Content-Type', 'Authorization'], // ระบุ headers ที่ต้องการอนุญาต
};

app.use(cors(corsOptions));

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

app.listen(config.port, () => {
    console.log(`Server started on http://localhost:${config.port}`);
});