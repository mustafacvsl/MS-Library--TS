import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import MemberService from '../Domain/Member/MemberService';

@injectable()
export class MemberApplicationService {
    constructor(@inject(MemberService) private memberService: MemberService) {}

    async addMember(name: string, email: string): Promise<void> {
        const addedMember = await this.memberService.addMember(name, email);

        return addedMember;
    }
}
