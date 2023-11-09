import memberEntity from './member.entity';

class MemberRepository {
    async createMember(authorname: string, email: string) {
        return memberEntity.create({ authorname, email });
    }
}

export default MemberRepository;
