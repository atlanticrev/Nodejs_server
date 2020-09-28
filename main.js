const express = require('express');
const layouts = require('express-ejs-layouts');

const homeController = require("./controllers/homeController");
const contactController = require("./controllers/contactController");
const coursesController = require("./controllers/coursesController");
const errorController = require("./controllers/errorController");

// App
const app = express();

// Globals
app.set('port', process.env.port || 3000);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(homeController.logQueryPath);
app.use(layouts); // ejs
app.use(errorController.logErrors);

// Routes
app.get('/', homeController.sendQuery);
app.get('/fruits/:fruit', homeController.sendReqParam);
app.post('/', homeController.sendPostSuccess);
app.get('/name/:nameVar', homeController.respondWithName);
app.get('/contact', contactController.respondWithContact);
app.get('/courses', coursesController.respondWithCourses);

// Errors
app.use(errorController.logErrors);

// Start server
app.listen(app.get('port'), () => console.log(`Express server has started and is listening on port number: ${app.get('port')}`));
