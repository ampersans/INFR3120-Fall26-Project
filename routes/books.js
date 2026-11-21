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

/* Create Operation - GET*/
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

/* Create Operation - POST*/
router.post('/add',async(req,res,next) => {
    try {
        let newBook = Book({
            "title":req.body.title,
            "author":req.body.author,
            "isbn":req.body.isbn,
            "genre":req.body.genre,
            "copies":req.body.copies,
            "status":req.body.status,
            "createdAt":req.body.createdAt
        });
        Book.create(newBook).then(() => {
            res.redirect('/')
        });
    }
    catch (err) {
        console.log(err);
        res.render('Books/list',{
            error:'Error on Server'
        })
    }
});

/* Update Operation */
router.get('/edit/:id', async(req,res,next) => {
    try {
        const id = req.params.id;
        const dataToEdit = await Book.findById(id);
        res.render('Books/edit', {
            title:'Edit book data',
            Book: dataToEdit
        })
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/edit/:id', async(req,res,next) => {
    try {
        let id = req.params.id;
        const updateData = await Book({
            "_id":id,
            "title":req.body.title,
            "author":req.body.author,
            "isbn":req.body.isbn,
            "genre":req.body.genre,
            "copies":req.body.copies,
            "status":req.body.status,
            "createdAt":req.body.createdAt
        })
        Book.findByIdaAndUpdate(id,updatedBook).then(()=> {
            res.redirect('/')
        })
    } 
    catch (err) {
        console.error(err);
        res.render('Books/list',{
            error:'Error on Server'
        })
    }
});

/* Delete Operation */

module.exports = router;