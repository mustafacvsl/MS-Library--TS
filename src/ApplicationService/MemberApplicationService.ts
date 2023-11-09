import { injectable, inject } from 'inversify';
import MemberService from '../Domain/Member/member.service';
import { IMemberModel } from '../Domain/Member/member.entity';
import 'reflect-metadata';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService) {}

    async registerMember(authorname: string, email: string) {
        const member = await this.memberService.register(authorname, email);
        return { member };
    }
}

export default MemberApplicationService;
