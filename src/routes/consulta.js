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

// router.get('/admin', (req,res,next) =>{
//     if(req.isAuthenticated()) return next();
//     res.redirect('/login');


//     conn.query('Select * from emprendedor', (err,resp,campos) => {
//         //console.log(resp);
//         res.render('administrador.ejs',   { datos: resp });
//     });
// });

router.post('/FormularioProducto',(req, res) => {
    const {nombre_usuario,precio, nombre_producto, imagen, descripcion_produc} = req.body;
    conn.query('INSERT into producto SET? ',{
        nombre_usuario: nombre_usuario,
        precio: precio,
        nombre_producto: nombre_producto,
        imagen: req.files[0].filename,
        descripcion_produc: descripcion_produc
    }, (err, result) => {
        if(!err) {
            res.redirect('/consulta');
        } else {
            console.log(err);
        }
    });
});

router.get('/admin', (req,res,next) =>{

    if(req.isAuthenticated()) return next();
    res.redirect('/login');

    //res.render('index.ejs');
    },(req,res,err) =>{
   
    conn.query('Select * from emprendedor', (err,resp,campos) => {
        conn.query('Select * from producto', (err,resp1,campos) => {
            res.render('administrador.ejs',   { datos: resp ,datos1: resp1});
        });
    });
});



router.post('/modificar/:nombre_usuario', (req,res,err) =>{
   
    
    conn.query('UPDATE emprendedor SET activo=1 WHERE nombre_usuario = ?', [req.params.nombre_usuario], (err, resp, campos) => {
        if(!err){
            console.log("emprendedor aceptado")
            res.redirect('/admin')
        }else{
            console.log(err);
        }
    });
});

router.post('/modificar1/:id_producto', (req,res,err) =>{
   
    conn.query('UPDATE producto SET activo=1 WHERE id_producto = ?', [req.params.id_producto], (err, resp, campos) => {
        if(!err){
            console.log("producto aceptado")
            res.redirect('/admin')
        }else{
            console.log(err);
        }
    });
});

router.get('/eliminar/:nombre_usuario', (req,res,err) =>{
   

    const { nombre_usuario } = req.params;
    console.log(req.params)
    conn.query('DELETE from emprendedor WHERE nombre_usuario = ?', [nombre_usuario], (err, resp, campos) => {
        if(!err){
            console.log("emprendedor rechazado")
            res.redirect('/admin')
        }else{
            console.log(err);
        }
    });
});

router.get('/eliminar1/:id_producto', (req,res,err) =>{
   

    const { id_producto } = req.params;
    console.log(req.params)
    conn.query('DELETE from producto WHERE id_producto = ?', [id_producto], (err, resp, campos) => {
        if(!err){
            console.log("producto rechazado")
            res.redirect('/admin')
        }else{
            console.log(err);
        }
    });
});

router.get('/login', (req,res) =>{
    res.render('login.ejs');
    
});

router.post('/login',passport.authenticate('local',{  
    successRedirect: "/admin",
    failureRedirect: "/login"
}));

module.exports = router;