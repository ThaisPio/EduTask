//Essa função valida se um número de CPF é válido 
export const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let sum = 0;
    let remainder;
  
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if ((remainder === 10) || (remainder === 11)) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  
    return true;
  };
//Essa função formata um número de telefone, inserindo parênteses ao redor do DDD e colocando um hífen no meio do número
  export const maskPhone = (phone) => {
    phone = phone.replace(/\D/g, ''); // Remove caracteres que não são números
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses no DDD
    phone = phone.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen no meio do número
    return phone;
  };
  
