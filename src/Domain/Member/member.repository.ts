import memberEntity from './member.entity';

class MemberRepository {
    async findUserByEmail(email: string) {
        return memberEntity.findOne({ email });
    }

    async findUserById(userId: string) {
        return memberEntity.findById(userId);
    }
}

export default MemberRepository;
