import Member from './member.entity';

class MemberRepository {
    async findMemberByEmail(email: string) {
        return Member.findOne({ email });
    }

    async addMember(name: string, email: string) {
        const member = new Member({
            name,
            email
        });

        return await member.save();
    }
}

export default MemberRepository;
