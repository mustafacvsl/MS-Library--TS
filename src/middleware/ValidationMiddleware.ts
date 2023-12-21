import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';

export const ValidationMiddleware = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            console.log(error);

            res.status(422).json({ error });
        }
    };
};

export const Schema = {
    register: Joi.object({
        name: Joi.string().min(5).max(15).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30).required(),
        email: Joi.string().email().required()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    createBook: Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        stock: Joi.object({
            count: Joi.number().required()
        }).required(),
        location: Joi.object({
            corridor: Joi.string().required(),
            shelf: Joi.string().required(),
            cupboard: Joi.string().required()
        }).required()
    }),
    memberCreate: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    }),
    borrowBook: Joi.object({
        memberId: Joi.string().required(),
        bookId: Joi.string().required(),
        dueDate: Joi.string()
            .pattern(new RegExp(/^\d{2}\/\d{2}\/\d{4}$/))
            .required()
            .messages({
                'string.pattern.base': 'Invalid date format. Please use Day/Month/Year format (e.g., 01/12/2023)'
            })
    }),

    updateUser: Joi.object({
        userId: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    userId: Joi.object({
        userId: Joi.string().required()
    })
};
