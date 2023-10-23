const { tokenVerifier } = require("../helpers/jsonwebtoken");
const createError = require("./createError");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) {
        return next(createError(401, "You must be logged in"));
    }

    tokenVerifier(token, (err, user)=> {
        if(err) {
            return next(createError(403, "Token is invalid"));
        }
        req.user = user;
        next();
    });
}

const verifyUser = async (req, res, next) => {
    verifyToken(req, res, (err)=> {
        if(err){
            return next(err);
        }
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You do not have permission!"))
        }
    });
}

const verifyUserBooking = async (req, res, next) => {
    verifyToken(req, res, (err)=> {
        if(err){
            return next(err);
        }
        if(req.user.id) {
            next();
        } else {
            return next(createError(403, "You do not have permission!"))
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err)=> {
        if(err){
            return next(err);
        }
        if(req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You do not have permission!"))
        }
    });
}

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
    verifyUserBooking
}