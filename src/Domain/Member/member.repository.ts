import { injectable } from 'inversify';
import 'reflect-metadata';
import memberEntity, { IMemberModel } from './member.entity';

@injectable()
export default class MemberRepository {
    async findMemberByEmail(email: string): Promise<IMemberModel | null> {
        try {
            const member = await memberEntity.findOne({ email });
            return member;
        } catch (error: any) {
            throw new Error(`Error finding member by email: ${error.message}`);
        }
    }
}
