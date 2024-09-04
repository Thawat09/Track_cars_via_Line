const sequelize = require('../../config/sequelize'); // นำเข้าการตั้งค่า Sequelize จากไฟล์ database.js
const { DataTypes } = require('sequelize');

// สร้างโมเดลตัวอย่าง
const User = sequelize.define('line_users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    line_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    profile_picture_url: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    registration_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    line_linked_date: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    auth_method: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    last_login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    last_update: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    notifications: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
});

// TODO ปรับปรุงโครงสร้างตารางที่มีอยู่ให้ตรงกับโมเดลโดยไม่ลบข้อมูล
// sequelize.sync({ alter: true }).then(() => {
//     console.log("Database & tables created!");
// });

// ! ไว้สำหรับเคลียร์ตาราง
// sequelize.sync({ force: true }).then(() => {
//     console.log("Database & tables created!");
// });

module.exports = User;