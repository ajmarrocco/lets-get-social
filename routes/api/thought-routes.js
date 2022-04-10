const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought
} = require('../../controllers/thought-controller');


// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getThoughtById)

// // /api/comments/<pizzaId>
// router.route('/:pizzaId').post(addComment);

// // /api/comments/<pizzaId>/<commentId>
// router
//     .route('/:pizzaId/:commentId')
//     .put(addReply)
//     .delete(removeComment)

// // /api/comments/<pizzaId>/<commentId>/<replyId>
// // new route because you need ID of original reply
// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;