const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token)
    return res
      .status(401)
      .send({ msg: "Authorization denied, Login / SignUp again" });
  try {
    //Verify token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).send({ msg: "Timeout!, Login / SignUp again" });
  }
};
