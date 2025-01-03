Продовжуйте створювати додаток для роботи з колекцією продуктів, розширте проєкт з попереднього уроку валідацією даних, фільтрацією, реєстрацією та аутентифікацією користувачів. Додайте можливість взаємодіяти користувачам тільки з власними продуктами.

TASK 1

Валідація вхідних даних
Додайте валідацію вхідних даних (body) для маршрутів POST і PATCH, згідно властивостей, описаних в моделі MongoDB. Створіть для цього middleware validateBody.

Валідація id
Додайте валідацію ідентифікатора, створивши middleware для перевірки валідності ID, згідно зі схемою Mongoose.

TASK 2

Додайте можливість фільтрації продуктів за категорією (властивість category) та за ціною (властивість price) у відповіді для маршруту GET /products. Для цього використовуйте такі query параметри запиту:

category - назва категорії
minPrice - мінімільна ціна продукту
maxPrice - максимальна ціна продукту

TASK 3

Створіть модель користувача User з такими полями:

name - string, required
email - string, email, unique, required
password - string, required
Створіть модель сесії Session з такими полями:

userId - string, required
accessToken - string, required
refreshToken - string, required
accessTokenValidUntil - Date, required
refreshTokenValidUntil - Date, required

Створіть роут POST /users/register для реєстрації нового користувача. Тіло запиту має в себе включати наступні властивості:

name - обов’язково
email - обов’язково
password - обов’язково
Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/users.js
Валідацію отриманих даних
Опис контролера для цього роута в файлі src/controllers/users.js
Створення сервісу в файлі src/services/users.js
Переконайтеся, що користувач із такою поштою ще не існує в системі, поверніть за допомогою бібілотеки createHttpError 409 помилку в іншому випадку і повідомлення 'Email in use’.
Відповідь сервера, в разі успішного створення нового користувача, має бути зі статусом 201 і містити об’єкт з наступними властивостями:
status — статус відповіді
message — повідомлення про результат виконання операції "Successfully registered a user!"
data — дані створеного користувача

TASK 4

Створіть роут POST /users/login для аутентифікації користувача. Тіло запиту має в себе включати наступні властивості:

email - обовʼязково
password - обовʼязково
Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/users.js
Валідацію отриманих даних
Опис контролера для цього роута в файлі src/controllers/users.js
Створення сервісу в файлі src/services/users.js
Переконайтеся, що користувач із такою поштою та паролем існує в системі, поверніть за допомогою бібліотеки createHttpError 401 помилку в іншому випадку.
Якщо користувача за переданими даними було знайдено, то створіть для нього сессію, в яку запишіть згенеровані access та refresh токени. Стара сесія, за її наявності, має бути видалена. Вкажіть час життя 15 хв для access токену та 30 днів для refresh токену.
Запишіть рефреш токен в cookies, а access токен поверніть в тілі відповіді.
Відповідь сервера, в разі успішного логіну, має бути зі статусом 200 і містити об’єкт з наступними властивостями:
status — статус відповіді
message — повідомлення про результат виконання операції "Successfully logged in an user!"
data — об'єкт з властивістю accessToken, що містить значення створеного access токена

TASK 5

Розширте модель Product обовʼязковим полем userId, яке буде вказувати на приналежність продукта певному користувачу.

Змініть логіку роута POST /products, щоб при створенні нового продукту також додавалося поле userId. Значення для userId візьміть із req.user.\_id.

Також змініть логіку для всіх інших роутів, які працюють з колекцією продуктів, щоб користувачі могли працювати лише з власними продуктами. Для цього у сервісних функціях використовуйте методи Mongoose такі як find(), findOne() тощо, щоб мати можливість шукати продукти окрім іншого і за значенням властивості userId.

TASK 6

Створіть middleware authenticate, який буде на основі access токену з заголовку Authorization у вигляді Bearer-токену, визначати користувача і додавати його до обʼєкту запиту(req) у вигляді властивості user. При цьому переконайтеся, що access токен не протермінований, інакше за допомогою бібліотеки createHttpError поверніть помилку зі статусом 401 і повідомленням “Access token expired”.

Застосуйте цей middleware до всіх роутів продуктів, щоб користувачі могли взаємодіяти тільки з власною колекцією продуктів.

TASK 7

Створіть роут POST /users/logout для видалення сесії на основі id сесії та токена, який записаний в cookies.

Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/users.js
Опис контролера для цього роута в файлі src/controllers/users.js
Створення сервісу в файлі src/services/users.js
Поточна сесія має бути видалена.
Відповідь сервера, в разі успішного логаута, має бути зі статусом 204, без тіла відповіді.

TASK 8

Створіть роут POST /users/refresh для оновлення сесії на основі рефреш токена, який записаний в cookies.

Обробка цього роута має включати:

Реєстрацію роута в файлі src/routers/users.js
Опис контролера для цього роута в файлі src/controllers/users.js
Створення сервісу в файлі src/services/users.js
Попередня сесія, за її наявності, має бути видалена, а нова створена за тим самим принципом, що і в POST /users/login.
Відповідь сервера, в разі успішного створення нового продукту, має бути зі статусом 200 і містити об’єкт з наступними властивостями:
status — статус відповіді
message — повідомлення про результат виконання операції "Successfully refreshed a session!"
data — об'єкт з властивістю accessToken, що містить значення новоствореного access токена
