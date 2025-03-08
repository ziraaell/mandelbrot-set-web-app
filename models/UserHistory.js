const mongoose = require('mongoose');

const UserHistory = new mongoose.Schema(    
{
        user_id: {
            type: String,
            required: true
        },
        x_right: {
            type: Number,
            required: true
        },

        x_left: {
            type: Number,
            required: true
        },

        y_bottom: {
            type: Number,
            required: true
        },

        y_top: {
            type: Number,
            required: true
        },

        iterations: {
            type: Number,
            required: true,
        }
    }
);

const History = mongoose.model('History', UserHistory, "projekt2");
module.exports = History;