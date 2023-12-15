import { Container } from 'inversify';
import { AuthController } from '../Controller/AuthController';
import AuthService from '../Domain/User/AuthService';
import AuthRepository from '../Domain/User/AuthRepository';
import TransactionHandler from '../middleware/TransactionManager';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import BookService from '../Domain/Book/BookService';
import BookRepository from '../Domain/Book/BookRepository';
import BookController from '../Controller/BookController';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import ExecutiveService from '../Domain/Executive/ExecutiveService';
import { ExecutiveRepository } from '../Domain/Executive/ExecutiveRepository ';
import { ExecutiveController } from '../Controller/ExecutiveController';
import { MemberApplicationService } from '../ApplicationService/MemberApplicationService';
import MemberService from '../Domain/Member/MemberService';
import MemberRepository from '../Domain/Member/MemberRepository';
import { MemberController } from '../Controller/MemberController';
import AuthApplicationService from '../ApplicationService/AuthApplicationService';

const container = new Container();

container.bind<AuthApplicationService>(AuthApplicationService).to(AuthApplicationService).inSingletonScope();
container.bind<AuthService>(AuthService).to(AuthService).inSingletonScope();
container.bind<AuthRepository>(AuthRepository).to(AuthRepository).inSingletonScope();
container.bind<TransactionHandler>(TransactionHandler).to(TransactionHandler).inSingletonScope();
container.bind<AuthController>(AuthController).to(AuthController).inSingletonScope();
//!Book container

container.bind<BookApplicationService>(BookApplicationService).to(BookApplicationService).inSingletonScope();
container.bind<BookService>(BookService).to(BookService).inSingletonScope();
container.bind<BookRepository>(BookRepository).to(BookRepository).inSingletonScope();
container.bind<BookController>(BookController).to(BookController).inSingletonScope();

//? Executive container

container.bind<ExecutiveApplicationService>(ExecutiveApplicationService).to(ExecutiveApplicationService).inSingletonScope();
container.bind<ExecutiveService>(ExecutiveService).to(ExecutiveService).inSingletonScope();
container.bind<ExecutiveRepository>(ExecutiveRepository).to(ExecutiveRepository).inSingletonScope();
container.bind<ExecutiveController>(ExecutiveController).to(ExecutiveController).inSingletonScope();

//? Member container

container.bind<MemberApplicationService>(MemberApplicationService).to(MemberApplicationService).inSingletonScope();
container.bind<MemberService>(MemberService).to(MemberService).inSingletonScope();
container.bind<MemberRepository>(MemberRepository).to(MemberRepository).inSingletonScope();
container.bind<MemberController>(MemberController).to(MemberController).inSingletonScope();

export { container };
