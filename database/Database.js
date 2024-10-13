import * as SQLite from 'expo-sqlite/legacy';

// Abre o banco de dados
export const db = SQLite.openDatabase('db2EduTask.db');

// Função para configurar o banco de dados
export const setupDatabase = () => {
  db.transaction(tx => {
    // Criação de tabela de usuários
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        cpf_email TEXT UNIQUE,
        phone TEXT UNIQUE,
        password TEXT
      )`,
      [],
      () => { console.log("Tabela users criada com sucesso."); },
      (_, error) => { console.log("Erro ao criar tabela users:", error); }
    );

/*     tx.executeSql(
      `DROP TABLE IF EXISTS tasks`, 
      [],
      () => { console.log("Tabela tasks apagada."); },
      (_, error) => { console.log("Erro ao apagar tabela tasks:", error); }
    ); */

    // Criação de tabela de tarefas
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        due_date TEXT,
        priority TEXT,  
        service TEXT, 
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      [],
      () => { console.log("Tabela tasks criada com sucesso."); },
      (_, error) => { console.log("Erro ao criar tabela tasks:", error); }
    );
  });
};
