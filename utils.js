const fs = require('fs');
const contentTypes = require('./contentTypes');

module.exports = {
    getFile: function (file, res) {
        fs.readFile(file, (err, data) => {
            if (err) {
                res.writeHead(500, contentTypes['html']);
                res.end('There was an error serving content!');
            }
            res.end(data);
        });
    },

    sendError: function (res) {
        res.writeHead(404, contentTypes['html']);
        res.end('<h1>File not found</h1>');
    }
};
