const express = require('express');
const router = express.Router();
const {isLoggedIn } = require('../lib/auth')
const pool = require('../database');

router.get('/add',isLoggedIn,(req,res)=>{
    res.render('links/add');
});

router.post('/add',isLoggedIn,async (req,res)=>{
    const {titulo,url,descripcion} = req.body;
    const newLink={
        titulo,
        url,
        descripcion,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO links set ?',[newLink]);
    req.flash('success','link agregado satisfactoriamente');
    res.redirect('/links');
});

router.get('/',isLoggedIn,async (req,res)=>{
    const links = await pool.query('SELECT * FROM links where user_id=?',[req.user.id]);
    console.log(links);
    res.render('links/list',{links});

});

router.get('/delete/:id',isLoggedIn,async (req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?',[id]);
    mensaje='Enlace'+id+' removido satisfactoriamente';
    req.flash('success',mensaje);
    res.redirect('/links');
});
router.get('/edit/:id',isLoggedIn,async (req,res)=>{
    const {id} = req.params;
    const link  = await pool.query('SELECT * FROM links WHERE ID = ?',[id]);
    res.render('links/edit',{ link : link[0] });
    
});
router.post('/edit/:id',isLoggedIn,async (req,res)=>{
    const {id} = req.params;
    const {titulo,url,descripcion} = req.body;
    const editLink = {
        titulo,
        descripcion,
        url
        
    }
    await pool.query('UPDATE links set ? WHERE id = ?',[editLink,id]);
    req.flash('success','Enlace rditado satisfactoriamente');
    res.redirect('/links');
    
});

module.exports=router;