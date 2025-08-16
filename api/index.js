const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../models/movie');

// // GET all movies
// // Route: /api/movies
// //router.get('/', async (req, res) => {
// //  try {
//         const movies = await Movie.find();
//         res.json(movies);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// // GET a specific movie by _id or title
// // Route: /api/movies/:idOrTitle
// router.get('/:idOrTitle', async (req, res) => {
//     try {
//         let movie;
//         const query = req.params.idOrTitle;

//         if (mongoose.Types.ObjectId.isValid(query)) {
//             movie = await Movie.findById(query);
//         } else {
//             movie = await Movie.findOne({ title: query });
//         }

//         if (!movie) {
//             return res.status(404).json({ message: 'Movie not found' });
//         }

//         res.json(movie);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// // INSERT a new movie
// // Route: /api/movies
// router.post('/', async (req, res) => {
//     try {
//         const newMovie = new Movie({
//             title: req.body.title,
//             year: req.body.year,
//             released: req.body.released
//         });
//         const savedMovie = await newMovie.save();
//         res.status(201).json(savedMovie);
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid movie data', error: err.message });
//     }
// });

// // DELETE a movie by _id or title
// // Route: /api/movies/:idOrTitle
// router.delete('/:idOrTitle', async (req, res) => {
//     try {
//         let deletedMovie;
//         const query = req.params.idOrTitle;

//         if (mongoose.Types.ObjectId.isValid(query)) {
//             deletedMovie = await Movie.findByIdAndDelete(query);
//         } else {
//             deletedMovie = await Movie.findOneAndDelete({ title: query });
//         }

//         if (!deletedMovie) {
//             return res.status(404).json({ message: 'Movie not found' });
//         }

//         res.json({ message: 'Movie deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });

// UPDATE a movie by _id or title
// Route: /api/movies/:idOrTitle
// router.patch('/:idOrTitle', async (req, res) => {
//     try {
//         const query = req.params.idOrTitle;
//         const updates = req.body;

//         let updatedMovie;
//         const options = { new: true };

//         if (mongoose.Types.ObjectId.isValid(query)) {
//             updatedMovie = await Movie.findByIdAndUpdate(query, updates, options);
//         } else {
//             updatedMovie = await Movie.findOneAndUpdate({ title: query }, updates, options);
//         }

//         if (!updatedMovie) {
//             return res.status(404).json({ message: 'Movie not found' });
//         }

//         res.json(updatedMovie);
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid update data', error: err.message });
//     }
// });

// module.exports = router;