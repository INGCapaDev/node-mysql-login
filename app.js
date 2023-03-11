/* spellchecker: disable */

import express from 'express';
import bodyparser from 'body-parser';
import ejs from 'ejs';
import { router } from './router/index.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { engine } from 'express-handlebars';
import myconnection from 'express-myconnection';
import mysql from 'mysql';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Conexion base datos
const connection = {
  host: 'localhost',
  user: 'root',
  password: 'helloworld',
  port: 3306,
  database: 'irenelogin',
};
app.use(myconnection(mysql, connection));

app.use(
  session({
    secret: 'secret',
    resave: 'true',
    saveUninitialized: true,
  })
);

// Cambiar extensiones HTML a EJS
app.engine('html', ejs.renderFile);
app.use(router);

// La pagina de error va siempre al final de get/post
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + '/public/error.html');
});

const puerto = 3009;

app.listen(puerto, () => {
  console.log('Servidor escuchando en el puerto ', puerto);
});
