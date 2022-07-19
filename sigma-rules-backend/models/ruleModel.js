const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const ruleModel = new Schema({
    rule: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User',
            unique: true
        }
    ],
    comments: [
        {
            text: String,
            postedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ]
}, {
    timestamps: true
});

const Rule = model('Rule', ruleModel);

module.exports = Rule;