const express = require('express');
const morgan =require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');


//inicializar
const app = express();

//configurar
app.set('port',process.env.PORT || 5554);
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',exphbs({
    defaultLayout: 'main',
    layoutsDir : path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'),'partials'),
    extname : 'hbs',
    helpers : require('./lib/handlebars')
}));

app.set('view engine','.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

//Variables globales
app.use((req,res,next)=>{
    next();
});

//Rutas
app.use(require('./routes'));
app.use(require('./routes/autenticacion'));
app.use('/links',require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname,'public')));

//Correr el servidor
app.listen(app.get('port'),()=>{
    console.log('Servidor ejecutando por el puerto: ',app.get('port'));
})