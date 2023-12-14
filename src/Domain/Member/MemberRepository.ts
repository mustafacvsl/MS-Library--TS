import MemberEntity from './MemberEntity';
import { injectable } from 'inversify';
@injectable()
export class MemberRepository {
    async findMemberByEmail(email: string) {
        return MemberEntity.findOne({ email });
    }

    async findById(memberId: string): Promise<any> {
        return MemberEntity.findById(memberId);
    }

    async addMember(name: string, email: string) {
        const member = new MemberEntity({
            name,
            email
        });

        return await member.save({});
    }
}

export default MemberRepository;
