import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListView from './views/TaskListView';

import LoginView from './views/LoginView'; // Importando a tela de Login
import CadastroView from './views/CadastroView'; // Importando a tela de Cadastro
import { setupDatabase, resetDatabase } from './database/database'; // Remover dropUsersTable daqui

const Stack = createStackNavigator();

export default function App() {
  // Configura o banco de dados ao iniciar
  React.useEffect(() => {
  setupDatabase();  // Apenas cria as tabelas, sem excluir nenhuma
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> 
        <Stack.Screen name="Login" component={LoginView} options={{ title: 'Login' }} />
        <Stack.Screen name="Cadastro" component={CadastroView} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="TaskList" component={TaskListView} options={{ title: 'Lista de Tarefas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
