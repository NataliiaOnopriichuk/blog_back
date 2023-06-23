import { body } from 'express-validator';

export const productValidation = [
    body('name', 'Productʼs name must be at least 3 characters').isLength({ min: 3 }).isString(),
    body('type', 'Productʼs type must be at least 9 characters').isLength({ min: 9 }).isString(),
    body('imageUrl', 'Wrong picture link').optional().isString(),
];

