const { Sequelize } = require('sequelize');
const config = require("../config/app");

// สร้าง Sequelize กับ PostgreSQL
const sequelize = new Sequelize(config.pgsql_db, config.pgsql_user, config.pgsql_pass, {
    host: config.pgsql_host,
    dialect: 'postgres',
    logging: false,
    // logging: console.log, // เปิดการบันทึก SQL queries (สามารถปิดได้โดยใช้ false)
});

// ทดสอบการเชื่อมต่อ
sequelize.authenticate()
    .then(() => {
        console.log('การเชื่อมต่อถูกต้อง');
    })
    .catch(err => {
        console.error('ไม่สามารถเชื่อมต่อกับฐานข้อมูล:', err);
    });

module.exports = sequelize;