const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            // validation
            required: 'You need to provide a username!',
            trim: true
        },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true,
            // validate: {
            //     validator: () => Promise.resolve(false),
            //     message: 'Email validation failed'
            // }
        },
        // instructs parent to keep track of children
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                // tells User model which documents to refer to
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                // tells User model which documents to refer to
                ref: 'User'
            }
        ]
    },
    {
        // tells schema that it can use virtuals
        toJSON: {
            virtuals: true
        },
        // this is an id that Mongoose returns and in this case, we don't need it
        id: false
    }
);

// get total count of comments and replies on retrieval
// creates virtual property `commentCount` with a value of comments.length
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;