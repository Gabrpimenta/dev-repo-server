import { Router } from 'express';
import HelloController from './controllers/HelloController';
import UsersController from './controllers/UsersController';
import RepoController from './controllers/RepoController';
import auth from './middlewares/auth';
import SessionsController from './controllers/SessionsController';

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.use(auth);

routes.get('/hello', HelloController.index);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.get('/users/:user_id/repositories', RepoController.index);
routes.post('/users/:user_id/repositories', RepoController.create);
routes.delete('/users/:user_id/repositories', RepoController.delete);

export default routes;
