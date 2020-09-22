const getFile = require('./utils').getFile;

const http = require('http');
const router = require('./router');
const contentTypes = require('./contentTypes');

const port = 3000;
const server = http.createServer(router.handle);

// Routes registration
router.get('/', (req, res) => {
    res.writeHead(200, contentTypes.html);
    getFile(`./views/index.html`, res);
});
router.get('/courses', (req, res) => {
    res.writeHead(200, contentTypes.html);
    getFile(`./views/courses.html`, res);
});
router.get('/contact', (req, res) => {
    res.writeHead(200, contentTypes.html);
    getFile(`./views/contact.html`, res);
});
// router.get('/style.css', (req, res) => {
//     res.writeHead(200, contentTypes.css);
//     getFile(`./public/css/style.css`, res);
// });
// router.get('/Gallery.js', (req, res) => {
//     res.writeHead(200, contentTypes.js);
//     getFile(`./public/js/Gallery.js`, res);
// });
router.post('/', (req, res) => {
    res.writeHead(200, contentTypes.text);
    res.end('posted!');
});

server.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);