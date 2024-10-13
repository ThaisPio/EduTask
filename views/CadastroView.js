import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { validateCPF, maskPhone } from '../utils/Masks';
import { handleAddUser } from '../controllers/UserController'; // Importar a função para adicionar o usuário

const CadastroView = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cpfEmail, setCpfEmail] = useState(''); // Campo que será CPF ou Email
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Verifica se é CPF ou Email
    const isCpf = /^\d{11}$/.test(cpfEmail); // Verifica se tem exatamente 11 dígitos (CPF)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cpfEmail); // Verifica se é um formato de email

    if (!isCpf && !isEmail) {
      Alert.alert('Login inválido', 'Insira um CPF válido ou um e-mail.');
      return;
    }

    // Validação do CPF
    if (isCpf && !validateCPF(cpfEmail)) {
      Alert.alert('CPF inválido');
      return;
    }

    // Verificação da senha
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[\W_]/.test(password)) {
      Alert.alert('A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    // Inserir no banco de dados
    handleAddUser(name, cpfEmail, phone, password, (result) => {
      try{
        Alert.alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Login'); // Redirecionar para a tela de login após o cadastro
      }catch{
        Alert.alert('Usuário já cadastrado!');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="CPF ou E-mail"
        value={cpfEmail}
        onChangeText={setCpfEmail}
        keyboardType="default"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Número de Celular (somente números)"
        value={maskPhone(phone)} // Aplicando a máscara ao valor
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Text style={styles.passwordHint}>
        A senha deve ter no mínimo 8 caracteres, contendo letras maiúsculas, minúsculas, números e símbolos.
      </Text>
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordHint: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
});

export default CadastroView;
