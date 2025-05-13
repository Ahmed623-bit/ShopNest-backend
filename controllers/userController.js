const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// تسجيل مستخدم جديد
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
};

// تسجيل الدخول
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// جلب بيانات المستخدم المسجل حالياً
const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};

const logoutUser = (req, res) => {
    // لا حاجة للقيام بأي شيء في قاعدة البيانات. ببساطة نقوم بإلغاء التوكن في الجلسة
    res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, getProfile, logoutUser };
