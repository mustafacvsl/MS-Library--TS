import { inject, injectable } from 'inversify';
import MemberRepository from './member.repository';
import authEntity from '../User/auth.entity';
import memberEntity, { IMemberModel } from './member.entity';

@injectable()
class MemberService {
    constructor(@inject(MemberRepository) private memberRepository: MemberRepository) {}

    async createUserAsMember(userId: string, email: string): Promise<IMemberModel | null> {
        const existingMember = await this.memberRepository.findMemberByEmail(email);
        if (existingMember) {
            return null;
        }

        const newMemberAsMember = new memberEntity({
            userId,
            email
        });

        try {
            const savedUserAsMember = await newMemberAsMember.save();
            return savedUserAsMember;
        } catch (error) {
            throw error;
        }
    }
}

export default MemberService;
