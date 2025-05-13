const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // ✅ إضافة مكتبة cors
require('dotenv').config();
const userRoutes = require('./routes/userRouter');

const app = express();
connectDB();

// ✅ تفعيل CORS – السماح بالطلبات من أكثر من origin
app.use(cors({
    origin: ['http://localhost:3000', 'https://shop-nest-frontend-7ikwlgdw4-ahmed623-bits-projects.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // إذا كنت تستخدم الكوكيز أو توكنات مصادقة
}));

// لتفسير بيانات JSON القادمة في الطلبات
app.use(express.json());

// الراوتر
app.use('/api/users', userRoutes);

// إعداد المنفذ
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
