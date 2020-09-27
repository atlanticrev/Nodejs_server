exports.logErrors = (err, req, res, next) => {œ
    console.error(err.stack);
    next(err);
};