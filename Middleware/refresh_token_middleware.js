const BaseError = require("../Utils/base.error");
const jwt = require("jsonwebtoken");
const { refreshToken, accesssToken } = require("../Utils/token_generator");

const refreshTokenMiddleware = (req, res, next) => {
  const Token = req.headers.cookie;
  if (!Token) {
    throw BaseError.Unauthorized("Token topilmadi");
  }
  const refresh = Token.split(" ")[1].slice(13);

  if (!refresh) {
    throw BaseError.Unauthorized("Refersh   Token topilmadi");
  }
  const decode = jwt.verify(refresh, process.env.REFRESH_SEKRET_KEY);

  if (!decode) {
    throw BaseError.Unauthorized("Token topilmadi");
  }

  req.user = decode;
  const payload = {
    email: req.user.email,
    id: req.user.id,
    role: req.user.role,
  };
  const accesssResult = accesssToken(payload);
  const refreshResult = refreshToken(payload);
  res.cookie("accessToken", accesssResult, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshResult, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return next();
};

module.exports = {
  refreshTokenMiddleware,
};
