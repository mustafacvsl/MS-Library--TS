import MemberEntity from './member.entity';
import { ClientSession } from 'mongoose';

class MemberRepository {
    async findMemberByEmail(email: string, session: ClientSession) {
        return MemberEntity.findOne({ email }).session(session);
    }

    async addMember(name: string, email: string, session: ClientSession) {
        const member = new MemberEntity({
            name,
            email
        });

        return await member.save({ session });
    }
}

export default MemberRepository;
