import Member from './member.entity';
import memberEntity, { IMemberModel } from './member.entity';

class MemberRepository {
    async findMemberByEmail(email: string) {
        return Member.findOne({ email });
    }

    async findMemberById(memberId: string) {
        return Member.findById(memberId);
    }

    async createMember(userId: string, email: string): Promise<IMemberModel> {
        const newMember = new Member({
            userId,
            email
        });

        await newMember.save();
        return newMember;
    }
}

export default MemberRepository;
