import { Router } from 'express';
import HelloController from './controllers/HelloController';
import UsersController from './controllers/UsersController';
import RepoController from './controllers/RepoController';

const routes = new Router();

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
