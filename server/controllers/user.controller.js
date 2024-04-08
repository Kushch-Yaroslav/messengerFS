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
      // Або пароль правильний, або ні.
      console.log(result);
      if (result) {
        /// Створити токен для юзера і відправити його у відповідь
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

/*
1. Приходить запит на рефреш (оновлення).
 - RT валідний, ми можемо оновити сесію, згенерувати і видати користувачу свіжу пару токенів.
    При цьому маємо ВИДАЛИТИ з БД старий RT і зберегти новий.
 - RT невалідний, ми не можемо оновити сесію. Ми маємо змусити користувача перелогінитись



*/

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
      console.log(foundUser);
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
        const removeRes = await rtFromDB.deleteOne(); // TODO: check if RT succefully deleted
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
