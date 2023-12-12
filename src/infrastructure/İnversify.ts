import { Container } from 'inversify';
import { TYPES } from './Types';
import TransactionHandler from '../middleware/TransactionMiddleware';
import AuthApplicationService from '../ApplicationService/AuthApplicationLayer';
import { AuthController } from '../Controller/AuthController';
import BookController from '../Controller/BookController';
import AuthService from '../Domain/User/AuthService';
import BookService from '../Domain/Book/BookService';
import BookApplicationService from '../ApplicationService/BookApplicationLayer';
import AuthRepository from '../Domain/User/AuthRepository';
import BookRepository from '../Domain/Book/BookRepository';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationLayer';
import { ExecutiveController } from '../Controller/ExecutiveController';
import { MemberController } from '../Controller/MemberController';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationLayer';
import MemberService from '../Domain/Member/MemberService';
import MemberRepository from '../Domain/Member/MemberRepository';

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
