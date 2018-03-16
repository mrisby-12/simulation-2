module.exports = (req, res, next) => {
    if(!req.session.user) {
        console.log("new session");
        req.session.user = {
            id: '',
            username: ''
        };
    }
    next();
};