const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create Schema
const IdeamSchema = new Schema({
    title: {
        type:     String,
        requires: true,
    },
    details: {
        type:     String,
        required: true
    },
    date: {
        type:    Date,
        default: Date.now
    }
});

mongoose.model('ideas', IdeamSchema);