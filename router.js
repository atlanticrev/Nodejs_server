const utils = require('./utils');
const contentTypes = require('./contentTypes');

class Router {

    constructor () {
        this.routes = {
            'GET': {},
            'POST': {}
        };
    }

    handleRoute = (req, res) => {
        const { method, url } = req;
        try {
            this.routes[method][url](req, res);
        } catch (e) {
            res.writeHead(200, contentTypes['html']);
            utils.getFile('views/404.html', res);
        }
    };

    get = (url, action) => {
        this.routes['GET'][url] = action;
    };

    post = (url, action) => {
        this.routes['POST'][url] = action;
    };

}

module.exports = new Router();