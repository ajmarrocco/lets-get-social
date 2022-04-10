const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            // validation
            required: 'You need to provide a pizza name!',
            trim: true
        },
        email: {
            type: String,
            // validation
            required: 'You need to provide your name!',
            trim: true
        },
        // instructs parent to keep track of children
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                // tells Pizza model which documents to refer to
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                // tells Pizza model which documents to refer to
                ref: 'User'
            }
        ]
    },
    {
        // tells schema that it can use virtuals
        toJSON: {
            virtuals: true,
            getters: true
        },
        // this is an id that Mongoose returns and in this case, we don't need it
        id: false
    }
);

// get total count of comments and replies on retrieval
// creates virtual property `commentCount` with a value of comments.length
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;