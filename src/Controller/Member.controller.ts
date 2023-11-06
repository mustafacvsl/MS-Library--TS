import { NextFunction, Request, Response, Router } from 'express';
import container from '../infrastructure/inversify';
import memberEntity from '../Domain/Member/member.entity';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import MemberApplicationService from '../ApplicationService/MemberApplicationService';

@injectable()
export class MemberController {
    constructor(@inject('MemberApplicationService') private memberapplicationservice: MemberApplicationService) {}

    async register(req: Request, res: Response) {
        const { userId, email } = req.body;

        const user = await this.memberapplicationservice.registerUser(userId, email);

        res.status(201).json({ user });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const token = await this.memberapplicationservice.loginUser(email, password);

        res.status(200).json({ token });
    }
}
