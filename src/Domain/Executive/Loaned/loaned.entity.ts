export interface ILoanedModel {
    id: string;
    memberId: string;
    bookId: string;
    borrowedDate: Date;
    returnedDate?: Date;
}

export class LoanedModel implements ILoanedModel {
    id: string;
    memberId: string;
    bookId: string;
    borrowedDate: Date;
    returnedDate?: Date;

    constructor(id: string, memberId: string, bookId: string, borrowedDate: Date, returnedDate?: Date) {
        this.id = id;
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowedDate = borrowedDate;
        this.returnedDate = returnedDate;
    }
}
