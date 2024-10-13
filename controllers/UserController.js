import { insertUser, validateUserLogin } from "../models/User";


export const handleAddUser = (name, cpf_email, phone, password, successCallback) => {
    insertUser(name, cpf_email, phone, password, (result) => {
        successCallback(result);
    });
};

export const getUser = (cpf_email, password, successCallback) => {
    validateUserLogin(cpf_email, password, (user) => {
      successCallback(user); // Passa o objeto `user` completo com `id`
    });
  };