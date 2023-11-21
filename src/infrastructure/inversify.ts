import { Container } from 'inversify';
import { AuthController } from '../Controller/auth.controller';
import { BookController } from '../Controller/book.controller';
import AuthService from '../Domain/User/Auth.service';
import BookService from '../Domain/Book/Book.service';
import BookApplicationService from '../ApplicationService/BookApplicationService';
import AuthRepository from '../Domain/User/Auth.repository';
import BookRepository from '../Domain/Book/Book.repository';
import { AuthApplicationService } from '../ApplicationService/AuthApplicationService';
import ExecutiveService from '../Domain/Executive/executive.service';
import { ExecutiveApplicationService } from '../ApplicationService/ExecutiveApplicationService';
import { ExecutiveController } from '../Controller/executive.controller';

const container = new Container();
container.bind<AuthApplicationService>(AuthApplicationService).toSelf();
container.bind<AuthController>(AuthController).toSelf();
container.bind<BookController>(BookController).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<BookService>(BookService).toSelf();
container.bind<BookApplicationService>(BookApplicationService).toSelf();
container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<BookRepository>(BookRepository).toSelf();
container.bind<ExecutiveService>(ExecutiveService).toSelf();
container.bind<ExecutiveApplicationService>(ExecutiveApplicationService).toSelf();
container.bind<ExecutiveController>(ExecutiveController).toSelf();

export default container;
