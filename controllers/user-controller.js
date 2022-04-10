const { User } = require('../models');

const userController = {
  // the functions will go in here as methods
    // get all users
    // GET /api/users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                // the minus sign in front of __v indicates we want to return everything except the __v
                select: '-__v'
            })
            .select('-__v')
            // sorts in descending order
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    // get one user by id
    // destructured params from req
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // createuser
    // POST /api/users
    // destructred body from req
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // update user by id
    // PUT /api/users/:id
    updateUser({ params, body }, res) {
        // set third parameter to true because if it will return original document if not
        // Updates and returns as a response through the find one
        // need to add runValidators to true to let it know that it needs to validate info when updating data
        User.findOneAndUpdate({ _id: params.id }, body,  { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete user
    // DELETE /api/users/:id
    deleteUser({ params }, res) {
        // Updates and returns as a response through the find one
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend({ body }, res) {
        User.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    // sets id to the user ID of choice
                    { _id: params.userId },
                    // pushes comment to array
                    { $push: { friends: _id } },
                    // will return collection not updated if set to false
                    // when set to true it will return user with updated comment
                    { new: true, runValidators: true }
                )
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    removeFriend({ params }, res) {
        // Updates and returns as a response through the find one
        User.findOneAndDelete({ _id: params.id })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { friends: params.userId } },
                    { new: true }
                );
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

};

module.exports = userController;