import MemberEntity from './member.entity';
import { ClientSession, Schema } from 'mongoose';

export class MemberRepository {
    async findMemberByEmail(email: string, session: ClientSession) {
        return MemberEntity.findOne({ email }).session(session);
    }

    async findById(memberId: string, session: ClientSession): Promise<any> {
        return MemberEntity.findById(memberId).session(session);
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

    async addBorrowedBook(memberId: string, bookId: string, borrowDate: Date, returnDate: Date, session: ClientSession): Promise<any> {
        await MemberEntity.findByIdAndUpdate(memberId, { $push: { borrowedBooks: { bookId, borrowDate, returnDate } } }, { session, new: true });
    }
}

export default MemberRepository;
