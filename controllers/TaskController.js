import { getTasks as getTasksFromModel, insertTask, deleteTask, updateTask } from '../models/Task';

//Adiciona uma nova tarefa no banco de dado
export const handleAddTask = (title, description, dueDate, priority, service, user_id, successCallback) => {
  insertTask(title, description, dueDate, priority, service, user_id, (result) => {
      successCallback(result);
  });
};
//Busca todas as tarefas de um determinado usuário no banco de dados.
export const getTasks = (user_id, successCallback) => {
  getTasksFromModel(user_id, (result) => {
    successCallback(result);
  });
};
// Exclui uma tarefa do banco de dados.
export const handleDeleteTask = (id, successCallback) => {
  deleteTask(id, (result) => {
    successCallback(result);
  });
};

// Atualiza tarefa existente.
export const handleUpdateTask = (id, title, description, dueDate, priority, service, successCallback) => {
  updateTask(id, title, description, dueDate, priority, service, (result) => {
    successCallback(result);
  });
};



