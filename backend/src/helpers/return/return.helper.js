const methods = {
    async jsonResponse(res, data, status = 200, message = 'OK') {
        // เตรียมข้อมูลสำหรับการตอบกลับ
        const responseData = {
            code: status, // สถานะรหัส (เช่น 200, 404)
            message: message, // ข้อความที่ต้องการส่งกลับ (เช่น 'OK')
            ...data, // ข้อมูลเพิ่มเติมที่ส่งมา
        };

        // แนบข้อมูล tokenData ถ้ามีอยู่ใน res.locals
        if (res.locals.tokenData) {
            res.header('Access-Control-Expose-Headers', 'X-Custom-Token-Data');
            res.header('X-Custom-Token-Data', JSON.stringify(res.locals.tokenData));
        }

        // ส่งการตอบกลับเป็น JSON
        res.status(status).json(responseData);
    },
};

module.exports = {
    ...methods,
};