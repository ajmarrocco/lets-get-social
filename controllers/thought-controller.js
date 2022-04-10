const { Thought, User} = require('../models');

const thoughtController = {
    // add comment to pizza
    // GET /api/thougts
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            // sorts in descending order
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one thought by id
    // destructured params from req
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
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
                    { _id: body.userId },
                    // pushes comment to array
                    { $push: { thoughts: _id } },
                    // will return collection not updated if set to false
                    // when set to true it will return pizza with updated comment
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // update thought by id
    // PUT /api/thoughts/:id
    updateThought({ params, body }, res) {
        // set third parameter to true because if it will return original document if not
        // Updates and returns as a response through the find one
        // need to add runValidators to true to let it know that it needs to validate info when updating data
        Thought.findOneAndUpdate({ _id: params.id }, body,  { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user
    // DELETE /api/thought/:id
    deleteThought({ params }, res) {
        // Updates and returns as a response through the find one
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
};

module.exports = thoughtController;