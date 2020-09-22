const contentTypes = require('./contentTypes');
const utils = require('./utils');

const routes = {
    'GET': {
        '/info': (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text.plain' });
            res.end("Welcome to the Info Page!");
        }
    },
    'POST': {}
};

exports.handle = (req, res) => {
    try {
        routes[req.method][req.url](req, res);
    } catch (ex) {
        res.writeHead(200, contentTypes['html']);
        utils.getFile('views/error.html', res);
    }
};

// Register routes
exports.get = (url, action) => {
    routes['GET'][url] = action;
};

exports.post = (url, action) => {
    routes['POST'][url] = action;
};