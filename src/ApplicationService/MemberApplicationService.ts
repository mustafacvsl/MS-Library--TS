import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MemberService from '../Domain/Member/MemberService';
import MemberRepository from '../Domain/Member/MemberRepository';
import AuthRepository from '../Domain/User/AuthRepository';
import { Result } from '../infrastructure/Result';

@injectable()
export class MemberApplicationService {
    constructor(
        @inject(MemberService) private memberService: MemberService,
        @inject(AuthRepository) private authRepository: AuthRepository,
        @inject(MemberRepository) private memberRepository: MemberRepository
    ) {}

    async addMember(name: string, email: string): Promise<Result<void>> {
        const userExists = await this.authRepository.findUserByEmail(email);

        if (!userExists) {
            return {
                success: false,
                error: {
                    message: 'A user with this email already exists.'
                }
            };
        }

        const existingMember = await this.memberRepository.findMemberByEmail(email);

        if (existingMember) {
            return {
                success: false,
                error: {
                    message: 'A member already exists with this email.'
                }
            };
        }

        return this.memberService.addMember(name, email);
    }
}
