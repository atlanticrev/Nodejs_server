const { getFile } = require('./utils');

const http = require('http');
const router = require('./router');
const contentTypes = require('./contentTypes');

const PORT = 3000;

const server = http.createServer(router.handleRoute);

// Routes registration
// GET
router.get('/', (req, res) => {
    res.writeHead(200, contentTypes.html);
    getFile(`views/index.html`, res);
});

router.get('/courses', (req, res) => {
    res.writeHead(200, contentTypes.html);
    getFile(`views/courses.html`, res);
});

router.get('/contact', (req, res) => {
    res.writeHead(200, contentTypes.html);
    getFile(`views/contact.html`, res);
});

// POST
router.post('/', (req, res) => {
    res.writeHead(200, contentTypes.text);
    res.end('posted!');
});

server.listen(PORT);
console.log(`Server running at http://127.0.0.1:${PORT}/`);