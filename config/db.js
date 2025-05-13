const mongoose = require('mongoose');

// تحميل متغيرات البيئة من ملف .env
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // إنهاء التطبيق إذا فشل الاتصال بقاعدة البيانات
    }
};

module.exports = connectDB;
