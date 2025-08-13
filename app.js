const express = require('express');
const connectDB = require('./config/database');
const Employee = require('./models/employee');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create Employee
app.post('/api/employees', async (req, res) => {
  try {
        const { name, position, office, salary } = req.body;
      const newEmp = new Employee({ name, position, office, salary });
        await newEmp.save();
        res.status(201).json(newEmp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Employees
app.get('/api/employees', async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
});

// Get Employee by ID
app.get('/api/employees/:id', async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id);
        if (!emp) return res.status(404).json({ message: 'Employee not found' });
        res.json(emp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(8000, () => console.log('Server running on port 8000'));

// app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
// const mongoose = require('mongoose');
// const path = require('path');
// const dotenv = require('dotenv');

// // Import your database configuration and movie model
// const database = require('./config/database');
// const Movie = require('./models/movie');

// // Import API routes
// const movieRoutes = require('./api/index');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 8000;

// // 2. Middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // 3. Handlebars View Engine Setup
// app.engine('hbs', exphbs.engine({
//     extname: '.hbs',
//     defaultLayout: 'main',
//     layoutsDir: path.join(__dirname, 'views/layouts'),
//     helpers: {
//         // Define your custom helpers here
//         formatDate: function(date) {
//             // Check if the date is a valid date object
//             if (date instanceof Date) {
//                 const options = { year: 'numeric', month: 'long', day: 'numeric' };
//                 return date.toLocaleDateString('en-US', options);
//             }
//             return date; // Return the original value if not a valid date
//         }
//     }
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

// // 4. Connect to MongoDB Atlas
// mongoose.connect(database.url, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB Atlas connected');
//         // Start server only after successful DB connection
//         app.listen(port, () => {
//             console.log(`App listening on port: ${port}`);
//         });
//     })
//     .catch(err => {
//         console.error('Connection error:', err);
//     });

// // 5. Routes
// // API route (mount router)
// app.use('/api/movies', movieRoutes);

// // View route for the main page, displays all movies
// app.get('/', async (req, res) => {
//     try {
//         const movies = await Movie.find().lean();
//         res.render('movies', { movies });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error loading movies');
//     }
// });

// // View route for displaying a single movie
// app.get('/movie/:id', async (req, res) => {
//     try {
//         const movie = await Movie.findById(req.params.id).lean();
//         if (!movie) {
//             return res.status(404).render('movie', { message: 'Movie not found.' });
//         }
//         res.render('movie', { movie });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error loading movie');
//     }
// });

// // View route for the CRUD forms
// app.get('/forms', (req, res) => {
//     res.render('form');
// });

// // Route to show Find Movie form
// app.get('/forms/find', (req, res) => {
//   res.render('find-movie'); // renders find-movie.hbs
// });

// app.get('/forms/find-movie', (req, res) => {
//   res.render('find-movie'); // your find movie form
// });

// // Route to show Delete Movie form
// app.get('/forms/delete', (req, res) => {
//   res.render('delete-movie'); // Make sure delete-movie.hbs exists in views folder
// });

// // Route to show Update Movie form
// app.get('/forms/update', (req, res) => {
//     res.render('update-movie'); // Make sure update-movie.hbs exists in views folder
// });

// // Post route to handle insertion from the form
// app.post('/insert-movie', async (req, res) => {
//     try {
//         const { title, year, released } = req.body;
//         const newMovie = new Movie({ title, year, released });
//         await newMovie.save();
//         res.redirect('/');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error inserting movie.');
//     }
// });

// // Post route to find a specific movie from the form
// app.post('/find-movie', async (req, res) => {
//     try {
//         const { query, type } = req.body;
//         let movie;
//         if (type === 'id' && mongoose.Types.ObjectId.isValid(query)) {
//             movie = await Movie.findById(query).lean();
//         } else if (type === 'title') {
//             movie = await Movie.findOne({ title: query }).lean();
//         }
//         if (movie) {
//             res.redirect(`/movie/${movie._id}`);
//         } else {
//             res.render('form', { message: 'No movie found.' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error finding movie.');
//     }
// });

// // Delete a movie by _id or movie_id
// // POST route to delete a movie by movie_id
// app.post('/delete-movie', async (req, res) => {
//   try {
//     const { movie_id } = req.body;

//     // Try to delete by _id first if it's a valid Mongo ObjectId
//     let result;
//     if (mongoose.Types.ObjectId.isValid(movie_id)) {
//       result = await Movie.findByIdAndDelete(movie_id);
//     }

//     // If not found by _id, try deleting by movie_id field
//     if (!result) {
//       result = await Movie.findOneAndDelete({ movie_id: movie_id });
//     }

//     if (result) {
//       res.render('delete-movie', { message: `Movie "${result.title}" deleted successfully.` });
//     } else {
//       res.render('delete-movie', { message: 'No movie found with the given ID.' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).render('delete-movie', { message: 'Error deleting movie.' });
//   }
// });
