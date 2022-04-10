const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// add prefix of `/comments` and `/pizzas` to routes created in `comment-routes` and `pizza-routes.js`
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;