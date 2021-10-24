const express = require('express');
const searchController = require('../controllers/search');

const Router = express.Router();

//GET: /api/v1/search/?{query here}

//---- query
//s={searchString}
//page={number}
//count={number}

//---- usage:
//this search api will accept search string {searchString}
//if {searchString} is empty => not return anything
//1st: if {searchString} match category => return courses by category
//2nd: if {searchString} match topic => return courses by topic
//3rd: => courses include {searchString}

//--- scope:
//public //pagination
//search course, topic, category...
Router.get('/search/', searchController.searchMain);

module.exports = Router;
