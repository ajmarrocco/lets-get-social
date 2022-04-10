const { Thought, User} = require('../models');

const thoughtController = {
    // add comment to pizza
    // GET /api/users
    getAllThoughts(req, res) {
        Thought.find({})
            // .populate({
            //     path: 'friends',
            //     // the minus sign in front of __v indicates we want to return everything except the __v
            //     select: '-__v'
            // })
            // .select('-__v')
            // // sorts in descending order
            // .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one user by id
    // destructured params from req
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            // .populate({
            //     path: 'friends',
            //     select: '-__v'
            // })
            // .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    // sets id to the pizza ID of choice
                    { _id: params.userId },
                    // pushes comment to array
                    { $push: { thoughts: _id } },
                    // will return collection not updated if set to false
                    // when set to true it will return pizza with updated comment
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    }
        // // remove reply
        // removeReply({ params }, res) {
        //     Comment.findOneAndUpdate(
        //         { _id: params.commentId },
        //         // removes specific reply, matches replyId in the past route
        //         { $pull: { replies: { replyId: params.replyId } } },
        //         { new: true }
        //     )
        //         .then(dbPizzaData => res.json(dbPizzaData))
        //         .catch(err => res.json(err));
        // }
};

module.exports = thoughtController;