import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput, Modal, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { handleDeleteTask, handleAddTask, getTasks, handleUpdateTask } from '../controllers/TaskController';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TaskListView = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('P3');
  const [newTaskService, setNewTaskService] = useState('Elaborar aula');
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState('date');

  const route = useRoute();
  const { user_id } = route.params;

  const fetchTasks = () => {
    if (!user_id) {
      console.log('Usuário não está logado');
      return;
    }
    getTasks(user_id, (tasks) => {
      setTasks(tasks);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, [user_id]);

  const showMode = (currentMode) => {
    setShowDatePicker(true);
    setMode(currentMode);
  };

  const showDatePickerHandler = () => {
    showMode('date');
  };

  const showTimePickerHandler = () => {
    showMode('time');
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newTaskDueDate;
    setShowDatePicker(false);
    setNewTaskDueDate(currentDate);
  };

  const addTask = async () => {
    const currentDateTime = new Date();
    if (newTaskDueDate < currentDateTime) {
      Alert.alert('Erro', 'A data e hora selecionadas não podem ser retroativas.');
      return;
    }

    if (!newTaskTitle || !newTaskDescription || !newTaskDueDate || !newTaskPriority || !newTaskService) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    await handleAddTask(newTaskTitle, newTaskDescription, newTaskDueDate.toISOString(), newTaskPriority, newTaskService, user_id, fetchTasks);
    resetForm();
    fetchTasks();
  };

  const editTask = async () => {
    if (!selectedTask) return;

    await handleUpdateTask(selectedTask.id, newTaskTitle, newTaskDescription, newTaskDueDate.toISOString(), newTaskPriority, newTaskService, fetchTasks);
    resetForm();
    fetchTasks();
  };

  const selectTask = (task) => {
    setSelectedTask(task);
    setNewTaskTitle(task.title);
    setNewTaskDescription(task.description);
    setNewTaskDueDate(new Date(task.due_date));
    setNewTaskPriority(task.priority);
    setNewTaskService(task.service);
    setIsEditing(true);
    setModalVisible(true);
  };

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate(new Date());
    setNewTaskPriority('P3');
    setNewTaskService('Elaborar aula');
    setModalVisible(false);
    setIsEditing(false);
    setSelectedTask(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectTask(item)}> 
            <View style={styles.taskContainer}>
              <Text>{item.title || 'Título não definido'}</Text>
              <Text>{item.description || 'Descrição não definida'}</Text>
              <Text>{new Date(item.due_date).toLocaleString() || 'Data não definida'}</Text>
              <Text>{item.priority || 'Prioridade não definida'}</Text>
              <Text>{item.service || 'Serviço não definido'}</Text>
              <Button title="Excluir" onPress={() => handleDeleteTask(item.id, fetchTasks)} />
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Título da tarefa"
              value={newTaskTitle}
              onChangeText={setNewTaskTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição da tarefa"
              value={newTaskDescription}
              onChangeText={setNewTaskDescription}
              style={styles.input}
            />
            <Picker
              selectedValue={newTaskPriority}
              onValueChange={(itemValue) => setNewTaskPriority(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="P1 - Crítico" value="P1" />
              <Picker.Item label="P2 - Alto" value="P2" />
              <Picker.Item label="P3 - Moderado" value="P3" />
              <Picker.Item label="P4 - Baixo" value="P4" />
            </Picker>

            <Picker
              selectedValue={newTaskService}
              onValueChange={(itemValue) => setNewTaskService(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Elaborar aula" value="Elaborar aula" />
              <Picker.Item label="Elaborar Avaliação" value="Elaborar Avaliação" />
              <Picker.Item label="Elaborar Tarefa" value="Elaborar Tarefa" />
              <Picker.Item label="Dinâmica" value="Dinâmica" />
              <Picker.Item label="Aula" value="Aula" />
              <Picker.Item label="Reunião" value="Reunião" />
            </Picker>

            <TouchableOpacity onPress={showDatePickerHandler} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Selecionar Data</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={showTimePickerHandler} style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Selecionar Hora</Text>
            </TouchableOpacity>

            <Text style={styles.selectedDateText}>
              {newTaskDueDate.toLocaleString()}
            </Text>

            {showDatePicker && (
              <DateTimePicker
                value={newTaskDueDate}
                mode={mode}
                display="default"
                onChange={onDateChange}
              />
            )}

            <View style={styles.modalButtons}>
            <Button title={isEditing ? "Salvar Alterações" : "Adicionar"} onPress={isEditing ? editTask : addTask} />
              <Button title="Cancelar" onPress={resetForm} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  taskContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#4B9CE2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default TaskListView;
