import { inject, injectable } from 'inversify';

import MemberRepository from './MemberRepository';
import AuthRepository from '../User/AuthRepository';

@injectable()
export class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository, @inject(AuthRepository) private authRepository: AuthRepository) {}

    async addMember(name: string, email: string): Promise<any> {
        const userExists = await this.authRepository.findUserByEmail(email);
        if (!userExists) {
            throw new Error('No user found with this email. Please register as a user first.');
        }

        const existingMember = await this.memberRepository.findMemberByEmail(email);
        if (existingMember) {
            throw new Error('A member already exists with this email');
        }

        const addedMember = await this.memberRepository.addMember(name, email);
        return addedMember;
    }
}

export default MemberService;
