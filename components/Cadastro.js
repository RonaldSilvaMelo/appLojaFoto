import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Firebase from './Firebase';

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState(null);
  const [senha, setSenha] = useState(null);

  function cadastrar() {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, senha)
      .then(() => {
        Alert.alert('Atenção', 'Dados cadastrados com sucesso. Faça login..');
        navigation.navigate('Login', { email });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          Alert.alert('Atenção', 'Este e-mail já tem cadastro.');
        } else if (errorCode == 'auth/weak-password') {
          Alert.alert('Atenção', 'Deve ter no mínimo 6 caracteres.');
        } else if (errorCode == 'auth/invalid-email') {
          Alert.alert('Atenção', 'Este email é inválido.');
        }
        Alert.alert(errorCode);
      });
  }

  return (
    <View style={estilo.container}>
      <Image source={require('../assets/snack-icon.png')} style={estilo.img} />

      <Text style={estilo.titulo}> Cadastre seus Dados </Text>
      <TextInput
        style={estilo.campo}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="Digite o seu Email"
        required
      />
      <TextInput
        style={estilo.campo}
        secureTextEntry={true}
        onChangeText={(senha) => setSenha(senha)}
        value={senha}
        placeholder="Digite a sua Senha"
        required
      />
      <TouchableOpacity
        style={estilo.btn}
        onPress={() => {
          cadastrar();
        }}>
        <Text style={estilo.btntxt}> Cadastrar </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Acesso')}>
        <Text style={estilo.btntxt2}> Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}
const estilo = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  campo: {
    width: 300,
    backgroundColor: '#77aaff',
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#af163d',
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  btntxt: {
    fontSize: 25,
    color: '#ffffff',
  },
  img: {
    width: 250,
    height: 200,
    borderRadius: 30,
  },
  titulo: {
    marginVertical: 40,
    fontSize: 30,
  },
  btntxt2: {
    marginVertical: 30,
    fontSize: 22,
  },
});
