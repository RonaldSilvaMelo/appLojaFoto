import { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Firebase from './Firebase';

export default function Acesso({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function dados(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  function logar() {
    Firebase.auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        if (user) {
          alert('Usuario não existe.');
          return;
        }
        navigation.navigate('Home', { email });
      })
      .catch((error) => {
        alert(error);
        navigation.navigate('Acesso');
      });
  }

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(function (user) {
      const uid = user.uid;
      const email = user.email;
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Aplicativo de fotos</Text>
      <Image source={require('../assets/snack-icon.png')} style={styles.img} />
      <TextInput
        style={styles.input}
        onChangeText={(email) => setEmail(email)}
        value={email}
        placeholder="Digite o e-mail"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={(senha) => setSenha(senha)}
        value={senha}
        placeholder="Digite sua senha"
      />
      <TouchableOpacity
        style={styles.txtButtonAcessar}
        onPress={() => {
          logar();
        }}>
        <Text style={styles.botao}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text
          style={styles.botao}
          onPress={() => navigation.navigate('Cadastro')}>
          Cadastrar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  titulo: {
    margin: 24,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  img: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  txtButtonAcessar: {},
  input: {
    backgroundColor: '#fff',
    fontSize: 20,
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  botao: {
    backgroundColor: '#fff',
    fontSize: 20,
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  },
});
