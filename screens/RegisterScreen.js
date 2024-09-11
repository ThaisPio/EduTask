import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpfEmail, setCpfEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validação de email usando regex
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  };

  // Validação de CPF (apenas números, sem formatação)
  const isValidCPF = (cpf) => {
    const regex = /^\d{11}$/;  // CPF deve ter exatamente 11 dígitos numéricos
    return regex.test(cpf);
  };

  // Validação do número de celular (somente números, deve ter 11 dígitos)
  const isValidPhone = (phone) => {
    const regex = /^\d{11}$/;  
    return regex.test(phone);
  };

  // Validação da senha com letras, números e caracteres especiais
  const isValidPassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = () => {
    // Validação dos campos
    if (!name || !phone || !cpfEmail || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Verificar se o campo CPF ou e-mail contém um e-mail válido ou CPF válido 
    if (!isValidEmail(cpfEmail) && !isValidCPF(cpfEmail)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail ou CPF válido (CPF deve ter 11 dígitos)');
      return;
    }

    // Verificar se o número de telefone é válido 
    if (!isValidPhone(phone)) {
      Alert.alert('Erro', 'Por favor, insira um número de celular válido com 11 dígitos (apenas números)');
      return;
    }

    // Verificar se a senha é válida 
    if (!isValidPassword(password)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.');
      return;
    }

   
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    
    // Depois de cadastrar, redirecionar para a tela de login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Criar cadastro</Text>

      <TextInput 
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        style={styles.input}
        placeholder="Número de celular (somente números)"
        value={phone}
        onChangeText={setPhone}
        keyboardType="numeric"  // Permite apenas números no teclado
      />
      <TextInput 
        style={styles.input}
        placeholder="CPF ou e-mail"
        value={cpfEmail}
        onChangeText={setCpfEmail}
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input}
        placeholder="Senha (8 Dígitos, letras, números e caracteres especiais)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
