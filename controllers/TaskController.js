import { getTasks as getTasksFromModel, insertTask, deleteTask, updateTask } from '../models/Task';

export const handleAddTask = (title, description, dueDate, priority, service, user_id, successCallback) => {
  insertTask(title, description, dueDate, priority, service, user_id, (result) => {
      successCallback(result);
  });
};

export const getTasks = (user_id, successCallback) => {
  getTasksFromModel(user_id, (result) => {
    successCallback(result);
  });
};

export const handleDeleteTask = (id, successCallback) => {
  deleteTask(id, (result) => {
    successCallback(result);
  });
};

// Atualiza a função handleUpdateTask para passar todos os parâmetros necessários
export const handleUpdateTask = (id, title, description, dueDate, priority, service, successCallback) => {
  updateTask(id, title, description, dueDate, priority, service, (result) => {
    successCallback(result);
  });
};



