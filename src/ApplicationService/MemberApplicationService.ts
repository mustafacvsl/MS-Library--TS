import MemberService from '../Domain/Member/member.service';
import { IMemberModel } from '../Domain/Member/member.entity';
import { inject, injectable } from 'inversify';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService) {}

    async createUserAsMember(userId: string, email: string): Promise<IMemberModel | null> {
        const userAsMember = await this.memberService.createUserAsMember(userId, email);
        return userAsMember;
    }
}

export default MemberApplicationService;
