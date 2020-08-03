const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const server = http.createServer(onRequest);

// const contentByRouteMap = {
//     '/': 'views/index.html',
//     '/info': '<h1>Info</h1>',
//     '/contact': '<h1>Contact</h1>',
//     '/error': 'Page not found.',
// };

function getViewByURL (url) {
    return `views${url}.html`;
}

function onRequest (request, response) {
    console.log('url: ', request.url);
    console.log('method:', request.method);

    // Request body handling (POST request)
    if (request.method === 'POST') {
        let requestBody = [];
        request.on('data', (chunk) => {
            requestBody.push(chunk);
        });
        request.on('end', () => {
            requestBody = Buffer.concat(requestBody).toString();
            console.log(`requestBody contents: ${requestBody}`);
        });
    }

    // Routing
    let path = getViewByURL(request.url);
    fs.readFile(path, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('views/404.html', (error, content) => {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });
    // let path = request.url;
    // if (path === '/') {
    //     fs.readFile(contentByRouteMap[path], (error, content) => {
    //         if (error) {
    //             if (error.code === 'ENOENT') {
    //                 fs.readFile('./404.html', (error, content) => {
    //                     response.writeHead(200, { 'Content-Type': contentType });
    //                     response.end(content, 'utf-8');
    //                 });
    //             }
    //             else {
    //                 response.writeHead(500);
    //                 response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
    //                 response.end();
    //             }
    //         }
    //         response.writeHead(200, { 'Content-Type': 'text/html' });
    //         response.end(content, 'utf-8');
    //     });
    // } else if (path === '/info') {
    //     setTimeout(() => {
    //         response.writeHead(200, { 'Content-Type': 'text/html' });
    //         response.end(contentByRouteMap[path], 'utf-8');
    //     }, 2000);
    // } else if (path === '/contact') {
    //     setTimeout(() => {
    //         response.writeHead(200, { 'Content-Type': 'text/html' });
    //         response.end(contentByRouteMap[path], 'utf-8');
    //     }, 5000);
    // } else if (path === '/error') {
    //     response.writeHead(404, { 'Content-Type': 'text/html' });
    //     response.end(contentByRouteMap[path], 'utf-8');
    // }

    // const extname = String(path.extname(filePath)).toLowerCase();

    // let contentType = 'text/html';
    // const mimeTypes = {
    //     '.html': 'text/html',
    //     '.js': 'text/javascript',
    //     '.css': 'text/css',
    //     '.json': 'application/json',
    //     '.png': 'image/png',
    //     '.jpg': 'image/jpg',
    //     '.gif': 'image/gif',
    //     '.wav': 'audio/wav',
    //     '.mp4': 'video/mp4',
    //     '.woff': 'application/font-woff',
    //     '.ttf': 'application/font-ttf',
    //     '.eot': 'application/vnd.ms-fontobject',
    //     '.otf': 'application/font-otf',
    //     '.svg': 'application/image/svg+xml'
    // };
    // contentType = mimeTypes[extname] || 'application/octet-stream';
}

server.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);