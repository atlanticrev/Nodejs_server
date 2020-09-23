const homeController = require("./controllers/homeController");
const express = require('express');

const app = express();

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(homeController.logQueryPath);

// Routes
app.get('/', homeController.sendQuery);
app.get('/fruits/:fruit', homeController.sendReqParam);
app.post('/', homeController.sendPostSuccess);

// Start server
const port = 3000;
app.listen(port, () => console.log(`Express server has started and is listening on port number: ${port}`));