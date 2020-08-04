const http = require('http');
const fs = require('fs');
const router = require('./router');

const port = 3000;
const server = http.createServer(router.handle);

// Utils
function sendErrorResponse (response) {
    response.writeHead(404, { 'Content-Type': 'text/html'  });
    response.write('<h1>File not found</h1>');
    response.end();
}

function readFile (path, response) {
    if (fs.existsSync(path)) {
        fs.readFile(path, (error, content) => {
            if (error) {
                console.log(error);
                sendErrorResponse(response);
                return;
            }
            response.write(content);
            response.end();
        });
    } else {
        sendErrorResponse(response);
    }
}

// Routes registration
router.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readFile(`./views/index.html`, res);
});
router.get('/index.html', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    readFile(`./views/index.html`, res);
});
router.get('/style.css', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    readFile(`./public/styles/style.css`, res);
});
router.get('/Gallery.js', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    readFile(`./public/scripts/Gallery.js`, res);
});

router.post('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('posted!');
});

server.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);