import MemberEntity from './MemberEntity';
import { ClientSession, Schema } from 'mongoose';
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

    async emailExists(email: string): Promise<boolean> {
        const member = await this.findMemberByEmail(email);
        return !!member;
    }

    async addBorrowedBook(memberId: string, bookId: string, borrowDate: Date, returnDate: Date): Promise<any> {
        await MemberEntity.findByIdAndUpdate(memberId, { $push: { borrowedBooks: { bookId, borrowDate, returnDate } } }, { new: true });
    }
}

export default MemberRepository;
