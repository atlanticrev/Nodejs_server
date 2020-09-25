exports.sendReqParam = (req, res) => {
    res.send(req.params['fruit']);
};

exports.sendPostSuccess = (req, res) => {
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    res.send('POST successful');
};

exports.sendQuery = (req, res) => {
    console.log('Query:', req.query);
    res.send('Hello, Universe');
};

exports.logQueryPath = (req, res, next) => {
    console.log(`Request made to: ${req.url}`);
    next();
};

exports.respondWithName = (req, res) => {
    // let name = req.params['nameVar'];
    res.render('index', {name});
};