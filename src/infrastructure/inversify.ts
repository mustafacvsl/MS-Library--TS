import { Container } from 'inversify';
import { AuthController } from '../Auth-Service/controllers/auth.controller';
import { BookController } from '../Book-Service/controllers/book.controller';
import AuthService from '../Auth-Service/domain/User/Auth.service';
import BookService from '../Book-Service/domain/Book/Book.service';
import BookApplicationService from '../Book-Service/applicationService/BookApplicationService';
import AuthRepository from '../Auth-Service/domain/User/Auth.repository';
import BookRepository from '../Book-Service/domain/Book/Book.repository';
import ApplicationService from '../Auth-Service/ApplicationService/UserApplicationService';

const container = new Container();
container.bind<ApplicationService>(ApplicationService).toSelf();
container.bind<AuthController>(AuthController).toSelf();
container.bind<BookController>(BookController).toSelf();
container.bind<AuthService>(AuthService).toSelf();
container.bind<BookService>(BookService).toSelf();
container.bind<BookApplicationService>(BookApplicationService).toSelf();
container.bind<AuthRepository>(AuthRepository).toSelf();
container.bind<BookRepository>(BookRepository).toSelf();

export default container;
