const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// connect my router with my model
let Book = require('../models/Book');

/* Read Operation */
router.get('/',async(req,res,next) => {
    try {
        const Books = await Book.find();
        res.render('Books/table',{
            title:'Books',
            Books:Books
        })
    }
    catch (err){
        console.log(err);
        res.render('Books/table',{
            error:'Error on Server'
        })
    }
})

/* Create Operation */

router.get('/add',async(req,res,next)=>{
    try {
        res.render('Books/add', {
            title: 'Add book to Database'
        })
    }
    catch (err){
        console.log(err);
        res.render('Books/list',{
            error:'Error on Server'
        })
    }
});

/* Update Operation */

/* Delete Operation */

module.exports = router;