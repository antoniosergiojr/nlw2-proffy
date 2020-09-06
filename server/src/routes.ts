import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

// Route params: identificar qual recurso quero atualizar ou deletar (Ex.: id = http://localhost:3333/users/1)
// Query params: paginação, filtros, ordenação

//Ex.: http://localhost:3333/users
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;