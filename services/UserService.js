export const loginUser = async (email, password) => {
  // Implementação do login
  // Verificar no banco de dados ou API se as credenciais são válidas
  try {
    // Exemplo de chamada a uma API
    const response = await fetch('https://api.meusite.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      return data.user;
    } else {
      throw new Error('Credenciais inválidas');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
