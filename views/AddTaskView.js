import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { handleAddTask } from '../controllers/TaskController';

const AddTaskView = () => {
  const [title, setTitle] = useState(''); //Armazena o título da tarefa
  const [description, setDescription] = useState(''); // Armazena a descrição da tarefa
  const [dueDate, setDueDate] = useState(''); //Armazena a data de vencimento da tarefa.

  //Esta função é chamada quando o usuário clica no botão "Adicionar Tarefa".
  const addTask = () => {
    handleAddTask(title, description, dueDate, () => {
      setTitle('');
      setDescription('');
      setDueDate('');
      console.log('Tarefa adicionada!');
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Data de Vencimento"
        value={dueDate}
        onChangeText={setDueDate}
      />
      <Button title="Adicionar Tarefa" onPress={addTask} />
    </View>
  );
};

export default AddTaskView;
