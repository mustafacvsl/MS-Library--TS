import { inject, injectable } from 'inversify';
import MemberRepository from './member.repository';
import { IMemberModel } from './member.entity';
import { errorHandlerMiddleware } from '../../middleware/errorhandlerMiddleware';

@injectable()
class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository) {}

    @errorHandlerMiddleware
    async register(authorname: string, email: string): Promise<IMemberModel> {
        const member = await this.memberRepository.createMember(authorname, email);
        return member;
    }
}

export default MemberService;
