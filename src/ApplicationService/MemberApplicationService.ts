import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { MemberService } from '../Domain/Member/member.service';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService) {}

    async makeMember(authorName: string, email: string): Promise<void> {
        await this.memberService.makeMember(authorName, email);
    }
}
