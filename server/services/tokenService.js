const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const ACCESS_SECRET_VALUE = 'super-secret';

const REFRESH_SECRET_VALUE = 'refresh-super-secret';

const ACCESS_TIME = 60*60;
const REFRESH_TIME = 60*60;

const promisifySignJWT = promisify(jwt.sign);
const promisifyVerifyJWT = promisify(jwt.verify);

module.exports.createAccessToken = async ({userId, email}) =>  await promisifySignJWT({userId, email}, ACCESS_SECRET_VALUE, {
        expiresIn: ACCESS_TIME
    });

module.exports.verifyAccessToken = async(token) => await promisifyVerifyJWT(token, ACCESS_SECRET_VALUE);

module.exports.createRefreshToken = async ({userId, email}) =>  await promisifySignJWT({userId, email}, REFRESH_SECRET_VALUE, {
    expiresIn: REFRESH_TIME
});

module.exports.verifyRefreshToken = async(token) => await promisifyVerifyJWT(token, REFRESH_SECRET_VALUE);

/*
1 Токен -> кожен запит цей токен приходить в заголовку запиту разом з запитом.
Перевіряємо, якщо токен валідний - все ок, надаємо відповідь.
Якщо невалідний (або просрочений ) - змушуємо користувача перелогінитись, щоб отримати свіжий токен і прислати з наступним запитом його.


2 токени -
1 багаторазовий, але живе коротко (accessToken)
2 - одноразовий, але живе довго (refreshToken). Використовується ОДИН раз, щоби оновити сесію (згенерувати свіжу пару токенів) без необхідності користувачу перелогінюватись.


Алгоритм дій.
1. Приходить запит з accessToken.
Якщо все ок - то все ок, надаємо відповідь з сервера.
Якщо AT невалідний (просрочений) - надсилаємо певну помилку, що токен невалідний.
Frontend отримує цю помилку і дивиться, чи є refreshToken.
Якщо є - надсилає запит на оновлення сессії.
Якщо RT немає або RT невалідний - змушує користувача перелогінитись.
 



*/