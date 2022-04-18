import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import searchRoutes from './routes/search.js'
import countriesRoutes from './routes/countries.js'
import genresRoutes from './routes/genres.js'

// To create the require function used in CommonJS for NodeJS
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const { username, password } = require("../database-credentials.json");

// Initialise Express app
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use('/search', searchRoutes);
app.use('/countries', countriesRoutes);
app.use('/genres', genresRoutes);

// Database connection 
const DATABASE_URL = `mongodb+srv://${username}:${password}@cluster0.qbmxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000;

mongoose.connect(
    DATABASE_URL, 
    () => app.listen(PORT, console.log(`Server started on port: ${PORT}`)), 
    (error) => console.log(error.message)
)