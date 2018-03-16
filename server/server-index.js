//REQUIRE DEPENDENCIES
const express = require('express');
const {json} = require('body-parser');
const cors = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const session = require('express-session');

const app = express();

//CONTROLLERS
const authController = require('./controllers/auth_controller')

const propController = require('./controllers/prop_controller')

//MIDDLEWARES
const checkForSession = require('./middlewares/checkForSession');

//CONNECT TO DATABASE
massive( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance) );

app.use( json() );
app.use( cors() );
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
 }));
 app.use( checkForSession );
 app.use( express.static( `${__dirname}/build` ) );

app.use( ( req, res, next) => {
    console.log( 'req.session:', req.session)
    next();
})

//AUTHORIZATION ENDPOINTS

app.post( '/api/auth/login', authController.login );
app.post( '/api/auth/register', authController.register );
app.post( '/api/auth/logout', authController.logout );
app.get( 'api/auth/user', authController.getUserSession );

//PROPERTIES ENDPOINTS

app.post( '/api/properties', propController.createNewProp );
app.get( '/api/properties', propController.getUserProp);
app.delete( '/api/properties/:id', propController.deleteProp)

const port = process.env.PORT || 3001;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );