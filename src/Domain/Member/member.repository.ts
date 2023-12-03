import MemberEntity from './member.entity';
import { ClientSession } from 'mongoose';

export class MemberRepository {
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

    async emailExists(email: string, session: ClientSession): Promise<boolean> {
        const member = await this.findMemberByEmail(email, session);
        return !!member;
    }
}

export default MemberRepository;
