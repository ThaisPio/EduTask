import { db } from '../database/database';

// Função para inserir uma nova tarefa
export const insertTask = (title, description, dueDate, priority, service, user_id, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO tasks (title, description, due_date, priority, service, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, dueDate, priority, service, user_id],
      (_, result) => { successCallback(result); },
      (_, error) => { console.log('Erro ao inserir tarefa:', error); }
    );
  });
};

// Função para buscar as tarefas pelo user_id
export const getTasks = (user_id, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM tasks WHERE user_id = ?',
      [user_id],
      (_, { rows }) => { successCallback(rows._array); },
      (_, error) => { console.log('Erro ao buscar tarefas:', error); }
    );
  });
};

// Função para excluir uma tarefa
export const deleteTask = (id, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM tasks WHERE id = ?',
      [id],
      (_, result) => { successCallback(result); },
      (_, error) => { console.log('Erro ao excluir tarefa:', error); }
    );
  });
};

// Função para atualizar uma tarefa
export const updateTask = (id, title, description, dueDate, priority, service, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, priority = ?, service = ? WHERE id = ?',
      [title, description, dueDate, priority, service, id],
      (_, result) => { successCallback(result); },
      (_, error) => { console.log('Erro ao atualizar tarefa:', error); }
    );
  });
};


