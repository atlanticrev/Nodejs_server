exports.logErrors = (err, req, res, next) => {œ
    console.error(err.stack);
    next(err);
};

exports.respondNoResourceFound = (req, res) => {
    let errorCode = 404;
    res.status(errorCode);
    res.sendFile(`./public/${errorCode}.html`, {root: './'});
};

exports.respondInternalError = (err, req, res, next) => {
    let errorCode = 500;
    console.log(`ERROR occured: ${err.stack}`);
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, out application is experiencing a problem!`);
};