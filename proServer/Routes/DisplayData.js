const express = require('express');
const router = express.Router();
const fetchData = require('../db');

// Middleware function to fetch data from the database
const fetchDataMiddleware = async (req, res, next) => {
  try {
    const data = await fetchData();

    // Store the fetched items and categories in global variables
    global.items = data.items;
    global.categories = data.categories;
    next();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    res.status(500).send('Server Error');
  }
};

//to display all food datas
router.post('/foodData', fetchDataMiddleware, (req, res) => {
  res.send([global.items,global.categories]);
});

module.exports = router;