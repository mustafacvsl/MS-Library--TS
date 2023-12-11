import { Container } from 'inversify';
import { TYPES } from './Types';
import TransactionHandler from './Transaction/TransactionManager';
import AuthApplicationService from '../ApplicationService/AuthApplicationService';
import { AuthController } from '../Controller/auth.controller';
import BookController from '../Controller/book.controller';
import AuthService from '../Domain/User/Auth.service';
import BookService from '../Domain/Book/Book.service';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import AuthRepository from '../Domain/User/Auth.repository';
import BookRepository from '../Domain/Book/Book.repository';
import ExecutiveService from '../Domain/Executive/executive.service';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import { ExecutiveController } from '../Controller/executive.controller';
import { MemberController } from '../Controller/Member.controller';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import MemberService from '../Domain/Member/member.service';
import MemberRepository from '../Domain/Member/member.repository';

const configureContainer = (container: Container) => {
    container.bind<TransactionHandler>(TransactionHandler).to(TransactionHandler);
    container.bind<AuthApplicationService>(TYPES.AuthApplicationService).to(AuthApplicationService);
    container.bind<AuthController>(TYPES.AuthController).to(AuthController);
    container.bind<BookController>(TYPES.BookController).to(BookController);
    container.bind<AuthService>(TYPES.AuthService).to(AuthService);
    container.bind<BookService>(TYPES.BookService).to(BookService);
    container.bind<BookApplicationService>(TYPES.BookApplicationService).to(BookApplicationService);
    container.bind<AuthRepository>(TYPES.AuthRepository).to(AuthRepository);
    container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
    container.bind<ExecutiveService>(TYPES.ExecutiveService).to(ExecutiveService);
    container.bind<ExecutiveApplicationService>(TYPES.ExecutiveApplicationService).to(ExecutiveApplicationService);
    container.bind<ExecutiveController>(TYPES.ExecutiveController).to(ExecutiveController);
    container.bind<MemberApplicationService>(TYPES.MemberApplicationService).to(MemberApplicationService);
    container.bind<MemberController>(TYPES.MemberController).to(MemberController);
    container.bind<MemberService>(TYPES.MemberService).to(MemberService);
    container.bind<MemberRepository>(TYPES.MemberRepository).to(MemberRepository);
};

export default configureContainer;
