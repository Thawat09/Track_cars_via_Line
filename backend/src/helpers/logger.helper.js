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

const loggerInfo = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'info.log'),
            level: 'info'
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        })
    ]
});

const loggerWarn = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'warn.log'),
            level: 'warn'
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        })
    ]
});

const loggerError = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({
            filename: path.join(logDir, 'error.log'),
            level: 'error'
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                logFormat
            )
        })
    ]
});

// ตั้งค่า morgan
const morganMiddleware = morgan((tokens, req, res) => {
    const status = tokens.status(req, res);
    const method = tokens.method(req, res);
    const url = tokens.url(req, res);
    const responseTime = tokens['response-time'](req, res);

    let logLevel = 'info'; // ระดับ log เริ่มต้น

    // กำหนดระดับ log ตามสถานะ HTTP
    if (status >= 500) {
        logLevel = 'error'; // ข้อผิดพลาดจากเซิร์ฟเวอร์
    } else if (status >= 400) {
        logLevel = 'error'; // ข้อผิดพลาดจากฝั่งลูกค้า
    } else if ((method === 'POST' || method === 'PUT') && status >= 201) {
        logLevel = 'warn'; // การสร้างหรืออัปเดตที่สำเร็จ
    } else if (status === 200 && (method === 'GET' || method === 'POST')) {
        logLevel = 'info'; // คำขอ GET หรือ POST ที่มีสถานะ 200
    }

    const message = [
        method,
        url,
        `status=${status}`,
        `response-time=${responseTime}ms`
    ].join(' ');

    // บันทึกลงไฟล์ตามระดับ log
    if (status === 404) {
        loggerError.error(message); // บันทึกลงไฟล์ error.log สำหรับสถานะ 404
    } else {
        // สำหรับสถานะอื่นๆ ใช้การบันทึกตามระดับที่กำหนด
        if (logLevel === 'info') {
            loggerInfo.info(message);
        } else if (logLevel === 'warn') {
            loggerWarn.warn(message);
        } else if (logLevel === 'error') {
            loggerError.error(message);
        }
    }
}, {
    stream: {
        write: () => { } // ปิดการบันทึก log ของ Morgan โดยค่าเริ่มต้น
    }
});

module.exports = { loggerInfo, loggerWarn, loggerError, morganMiddleware };