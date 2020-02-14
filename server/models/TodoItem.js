const mongoose = require('mongoose');
const toJSON = require('../helpers/mongoose');

const TodoItemSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

TodoItemSchema.options.toJSON = toJSON;

module.exports = mongoose.model('TodoItem', TodoItemSchema);