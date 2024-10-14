import { insertUser, validateUserLogin } from "../models/User";

//Adicionar um novo usuário ao banco de dados
export const handleAddUser = (name, cpf_email, phone, password, successCallback) => {
    insertUser(name, cpf_email, phone, password, (result) => {
        successCallback(result);
    });
};
//Valida o login de um usuário - verifica se o CPF/e-mail e senha fornecidos estão corretos.
export const getUser = (cpf_email, password, successCallback) => {
    validateUserLogin(cpf_email, password, (user) => {
      successCallback(user); // Passa o objeto `user` completo com `id`
    });
  };
