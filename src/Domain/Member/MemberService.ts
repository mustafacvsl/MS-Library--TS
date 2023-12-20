import { inject, injectable } from 'inversify';
import MemberRepository from './MemberRepository';
import AuthRepository from '../User/AuthRepository';

@injectable()
export class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository) {}

    async addMember(name: string, email: string): Promise<any> {
        const addedMember = await this.memberRepository.addMember(name, email);
        return addedMember;
    }
}

export default MemberService;
