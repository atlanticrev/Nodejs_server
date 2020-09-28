// const fs = require('fs');
// const contentTypes = require('./contentTypes');

// function sendError (response) {
//     response.writeHead(404, { 'Content-Type': 'text/html'  });
//     response.end('<h1>File not found</h1>');
// }

// module.exports = {
//     getFile: (file, res) => {
//         fs.readFile(`./${file}`, (err, data) => {
//             if (err) {
//                 res.writeHead(500, contentTypes['html']);
//                 res.end('There was an error serving content!');
//             }
//             res.end(data);
//         });
//     }
// };
