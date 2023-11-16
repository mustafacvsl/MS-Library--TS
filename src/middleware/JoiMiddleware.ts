import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IAuthor } from '../Domain/User/auth.entity';
import { IBook } from '../Domain/Book/Book';
import memberEntity, { IMember } from '../Domain/Member/member.entity';
import Logging from '../infrastructure/Logging';

export const JoiMiddleware = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    author: {
        create: Joi.object<IAuthor>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        update: Joi.object<IAuthor>({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    book: {
        create: Joi.object<IBook>({
            author: Joi.string().required(),
            title: Joi.string().required()
        }),
        update: Joi.object<IBook>({
            author: Joi.string().required(),
            title: Joi.string().required()
        })
    }
};
