const jwt = require("jsonwebtoken");

const tokenMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const jwtToken = token.split(" ")[1];
        jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        req.token = token;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = tokenMiddleware;
