const bcrypt = require("bcryptjs");
const { User, RefreshToken } = require("../models");
const TokenError = require("../errors/TokenError");
const NotFoundError = require("../errors/NotFound");
const InvalidDataError = require("../errors/InvalidDataError");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../services/tokenService");

module.exports.signUpUser = async (req, res, next) => {
  try {
    const { body, passwordHash } = req;
    const createdUser = await User.create({ ...body, passwordHash });
    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.signInUser = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    const foundUser = await User.findOne({
      email: email,
    });
    if (foundUser) {
      const result = await bcrypt.compare(password, foundUser.passwordHash);
      if (result) {
        const accessToken = await createAccessToken({
          userId: foundUser._id,
          email: foundUser.email,
        });
        const refreshToken = await createRefreshToken({
          userId: foundUser._id,
          email: foundUser.email,
        });

        const addedToken = await RefreshToken.create({
          token: refreshToken,
          userId: foundUser._id,
        });

        res
          .status(200)
          .send({ data: foundUser, tokens: { accessToken, refreshToken } });
      } else {
        throw new InvalidDataError("Invalid credentials");
      }
    } else {
      throw new NotFoundError("User not found");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getOneUser = async (req, res, next) => {
  try {
    const {
      payload: { userId },
    } = req;
    const user = await User.findById(userId);
    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.refreshSession = async (req, res, next) => {
  const {
    body,
    body: { refreshToken },
  } = req;
  let verifyPayload;
  try {
    verifyPayload = await verifyRefreshToken(refreshToken); /// throw errors
  } catch (error) {
    next(new TokenError("Invalid refresh token"));
  }

  try {
    if (verifyPayload) {
      const foundUser = await User.findOne({
        email: verifyPayload.email,
      });
      const rtFromDB = await RefreshToken.findOne({
        $and: [
          {
            token: refreshToken,
          },
          {
            userId: foundUser._id,
          },
        ],
      }); /// RefreshToken not found

      if (rtFromDB) {
        const removeRes = await rtFromDB.deleteOne();
        /// Робимо нову пару токенів
        const newAccessToken = await createAccessToken({
          userId: foundUser._id,
          email: foundUser.email,
        });
        const newRefreshToken = await createRefreshToken({
          userId: foundUser._id,
          email: foundUser.email,
        });
        const added = await RefreshToken.create({
          token: newRefreshToken,
          userId: foundUser._id,
        });

        res.status(200).send({
          tokens: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        });
      } else {
        throw new TokenError("Token not found");
      }
    }
  } catch (error) {
    next(error);
  }
};
