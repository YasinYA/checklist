module.exports = {
    sendViewMiddleware: (req, res, next) => {
        res.sendView = function(view) {
            return res.sendFile(__dirname + "/public/" + view);
        }
        next();
    }
}
