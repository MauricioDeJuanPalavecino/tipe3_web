const express = require('express');
const passport = require('passport');
const router = express.Router();
const conn = require('../database'); // Buscando el archivo de conf de la base de datos
const multer = require('multer');

router.get('/consulta', (req,res) =>{
    res.render('consulta.ejs')
});

router.get('/', (req,res) =>{
    res.render('index.ejs')
});

module.exports = router;