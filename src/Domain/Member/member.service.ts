import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import memberEntity from './member.entity';
import MemberRepository from './member.repository';

@injectable()
export class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository) {}

    async makeMember(authorName: string, email: string): Promise<void> {
        const existingMember = await this.memberRepository.findMemberByEmail(email);

        if (!existingMember) {
            const newMember = new memberEntity({ authorName, email });
            await newMember.save();
        } else {
            throw new Error('User is already a member');
        }
    }
}
