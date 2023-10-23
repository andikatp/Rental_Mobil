const route = require('express').Router();
const mobilRoutes = require('./mobil');
const rentalRoutes = require('./rental');
const userRoutes = require('./user');
const authRoutes = require('./auth');

route.use('/api/auth', authRoutes);
route.use('/api/mobil', mobilRoutes);
route.use('/api/rental', rentalRoutes);
route.use('/api/user', userRoutes);

route.use((err, req, res, next) => {
    const errorName = err.name || "Unknown";
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        name: errorName,
        code: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

route.use('/', (req, res) => {
    res.status(200).json({ello: "Yellow!"});
});

module.exports = route