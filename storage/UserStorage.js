import AsyncStorage from '@react-native-async-storage/async-storage';

// Função para armazenar os dados do usuário
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(user));  // Armazena o objeto de usuário no formato JSON
    console.log('Usuário salvo com sucesso!');
  } catch (e) {
    console.error('Erro ao salvar o usuário:', e);
  }
};

// Função para recuperar os dados do usuário
export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('@user');  // Recupera o dado armazenado
    return user ? JSON.parse(user) : null;  // Converte de volta para o formato objeto, ou retorna null se não houver
  } catch (e) {
    console.error('Erro ao buscar o usuário:', e);
    return null;
  }
};

// Função para remover os dados do usuário (logout)
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('@user');
    console.log('Usuário removido com sucesso!');
  } catch (e) {
    console.error('Erro ao remover o usuário:', e);
  }
};
