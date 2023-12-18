const errorResposerHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        status: "Error",
        message: err.message,
    })
}

const invalidPathHandler = (req,res,next) => {
    const error = new Error("Invalid Path");
    error.statusCode = 404;
    next(error);
}

module.exports = {errorResposerHandler, invalidPathHandler};