// Account.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import db from '../firebase';
import { useNavigation } from '@react-navigation/native'; // Importar useNavigation

export default function Account() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigation = useNavigation(); // Inicializar useNavigation

  const guardarDatos = async () => {
    try {
      await addDoc(collection(db, "usuarios"), {
        nombre: nombre,
        correo: correo,
        telefono: telefono
      });
      Alert.alert('Datos guardados en Firestore!');
    } catch (error) {
      Alert.alert('Error guardando datos:', error.message);
    } finally {
      navigation.navigate('Inicio'); // Navegar a la pantalla Home independientemente del resultado
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>MiChile</Text>
      <Text>Mis datos</Text>
      <TextInput 
        placeholder="Nombre" 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput 
        placeholder="Correo" 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput 
        placeholder="Teléfono" 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        value={telefono}
        onChangeText={setTelefono}
      />
      <Button title="Guardar" onPress={guardarDatos} />
    </View>
  );
}
