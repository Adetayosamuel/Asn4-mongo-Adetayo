const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number
    },
    released: {
        type: String,
        required: true
    }
}, { collection: 'movies' });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;