import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Пароль должен быть не меньше 5 символов').isLength({ min: 5 }),
    body('fullName', 'Имя должно быть не меньше 3 символов').isLength({ min:3 }),
    body('avatarUrl', 'Не верная ссылка на аватарку').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Не верный формат почты').isEmail(),
    body('password', 'Не верный логин или пароль'),
];