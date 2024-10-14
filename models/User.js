import { db } from '../database/database'
//Esta função é responsável por inserir um novo usuário na tabela users do banco de dados
export const insertUser = async (name, cpf_email, phone, password, successCallback) => {
    try {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO users (name, cpf_email, phone, password) VALUES (?, ?, ?, ?)',
                [name, cpf_email, phone, password],
                (_, result) => successCallback(result),
                (_, error) => console.log('Erro ao inserir usuário:', error)
            );
        });
    } catch (error) {
        console.log('Erro ao inserir usuário:', error);
    }
};
//Esta função é usada para verificar se o login de um usuário é válido, ou seja, se o CPF/e-mail e a senha estão corretos
export const validateUserLogin = async (cpf_email, password, successCallback, errorCallback) => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id FROM users WHERE cpf_email = ? AND password = ?',
          [cpf_email, password],
          (_, { rows }) => {
            if (rows.length > 0) {
              const user = rows._array[0]; // Captura o primeiro usuário retornado
              successCallback(user); // Passa o objeto do usuário com o `id`
            } else {
              successCallback(null); // Nenhum usuário encontrado, login inválido
            }
          },
          (_, error) => {
            console.log('Erro ao validar login:', error);
            errorCallback(error);
          }
        );
      });
    } catch (error) {
      console.log('Erro ao validar login:', error);
      errorCallback(error);
    }
  };
  
