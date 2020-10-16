const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  try {
    if (token) {
      const secret = process.env.JWT_SECRET || "This is a secret";
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          authenticate.status(401).json({ message: "Invalid information" });
        } else {
          req.decodedJwt = decoded;
          next();
        }
      });
    } else {
      res.status(400).json({ message: "Incorrect Username or Password" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authenticate;
