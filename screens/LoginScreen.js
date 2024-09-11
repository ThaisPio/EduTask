import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const validCredentials = {
    email: 'user@example.com',
    password: 'Password123!',
  };

  // Função para validar o login
  const handleLogin = () => {
    // Verifica se os campos estão preenchidos
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Validação local das credenciais 
    if (email === validCredentials.email && password === validCredentials.password) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
    }
  };

  const handleForgotPassword = () => {
    // Navegar para a tela de recuperação de senha
    navigation.navigate('ForgotPassword'); 
  };

  return (
    <View style={styles.container}>
      {/* Adicionando a logo no topo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.label}>EduTask</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email ou CPF"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.smallButton, styles.forgotPasswordButton]} onPress={handleForgotPassword}>
          <Text style={styles.buttonText}>Esqueceu senha</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
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
  loginButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallButton: {
    flex: 1,
    backgroundColor: '#109c1e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  forgotPasswordButton: {
    backgroundColor: '#109c1e',
    marginRight: 0,
  },
});
