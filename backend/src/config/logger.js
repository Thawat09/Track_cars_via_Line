const winston = require('winston');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// กำหนดการตั้งค่าของ winston
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// ฟังก์ชันสำหรับรูปแบบของข้อความ log
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return `${formattedDate} [${level}]: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        // Transport สำหรับ info level
        new winston.transports.File({
            filename: path.join(logDir, 'info.log'),
            level: 'info'
        }),
        // Transport สำหรับ warn level
        new winston.transports.File({
            filename: path.join(logDir, 'warn.log'),
            level: 'warn'
        }),
        // Transport สำหรับ error level
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        }),
        // Transport สำหรับ console
        new winston.transports.Console()
    ]
});

// ตั้งค่า morgan
const morganMiddleware = morgan((tokens, req, res) => {
    const status = tokens.status(req, res);
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const responseTime = tokens['response-time'](req, res);

    let logLevel = 'info'; // Default log level

    // กำหนดระดับ log ตามสถานะ HTTP
    if (status >= 500) {
        logLevel = 'error'; // For error status
    } else if (status >= 400) {
        // ตรวจสอบว่าเป็นคำขอที่เกี่ยวข้องกับการสร้างหรือการอัปเดต
        if (method === 'POST' || method === 'PUT') {
            logLevel = 'warn'; // For create or update status
        } else {
            logLevel = 'error'; // For client error status
        }
    }

    const message = [
        method,
        url,
        `status=${status}`,
        `response-time=${responseTime}ms`
    ].join(' ');

    logger.log(logLevel, message);
}, {
    stream: {
        write: () => { } // Morgan's default log output is disabled
    }
});

module.exports = { logger, morganMiddleware };