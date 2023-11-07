import Author from '../User/auth.entity';
import Book, { IBook, IBookModel } from '../Book/Book';
import loanedEntity from './Loaned/loaned.entity';

class ExecutiveRepository {
    async findUserByEmail(email: string) {
        return Author.findOne({ email });
    }

    async findUserById(userId: string) {
        return Author.findById(userId);
    }

    async getAllUsers() {
        return Author.find({}, 'name email');
    }

    async updateUserById(userId: string, updatedUserInfo: any) {
        return Author.findByIdAndUpdate(userId, updatedUserInfo, { new: true });
    }

    async deleteUserById(userId: string) {
        return Author.findByIdAndDelete(userId);
    }

    //

    async borrowBook(memberId: string, bookId: string): Promise<IBookModel | null> {
        const member = await Author.findById(memberId);
        const book = await Book.findById(bookId);

        if (!member || !book || book.stock.count <= 0) {
            throw new Error(!member ? 'member not found' : 'Book not found or out of stock');
        }

        const borrowedBook = new loanedEntity({
            memberId: memberId,
            bookId: bookId,
            borrowedDate: new Date()
        });

        book.stock.count -= 1;
        await Promise.all([book.save(), borrowedBook.save()]);

        return book;
    }

    async returnBook(memberId: string, bookId: string): Promise<IBookModel | null> {
        const member = await Author.findById(memberId);
        const book = await Book.findById(bookId);
        const borrowedBook = await loanedEntity.findOne({ memberId, bookId });

        if (!member || !book || !borrowedBook) {
            throw new Error(!member ? 'member not found' : 'Member, book, or loan record not found');
        }

        book.stock.count += 1;
        await Promise.all([book.save(), borrowedBook.remove()]);

        return book;
    }
}

export default ExecutiveRepository;
