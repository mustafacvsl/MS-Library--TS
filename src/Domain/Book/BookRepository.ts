import Book, { IBookModel } from './BookEntity';
import { injectable } from 'inversify';

@injectable()
class BookRepository {
    async createBook(bookData: string): Promise<IBookModel> {
        const newBook: IBookModel = new Book(bookData);
        return newBook.save();
    }

    async findById(bookId: string): Promise<IBookModel | null> {
        return Book.findById(bookId);
    }

    async updateBook(bookId: string, updates: any): Promise<IBookModel | null> {
        const updatedBook: IBookModel | null = await Book.findByIdAndUpdate(bookId, updates, { new: true });
        if (!updatedBook) {
            throw new Error('Book not found');
        }
        return updatedBook;
    }

    async deleteBook(bookId: string): Promise<IBookModel | null> {
        const deletedBook: IBookModel | null = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            throw new Error('Book not found');
        }
        return deletedBook;
    }

    async getAllBooks(): Promise<IBookModel[]> {
        const books: IBookModel[] = await Book.find();

        return books;
    }

    async updateBookStatus(bookId: string, status: string): Promise<IBookModel | null> {
        const book: IBookModel | null = await Book.findByIdAndUpdate(bookId, { status }, { new: true });
        return book;
    }
}

export default BookRepository;
