import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  // Verificar permisos de la cámara
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Tomar foto usando la cámara
  const takePhoto = async () => {
    if (hasPermission) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.uri);
      }
    } else {
      alert("No tienes permiso para acceder a la cámara");
    }
  };

  if (hasPermission === null) {
    return <View><Text>Cargando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text>No se ha tomado ninguna foto.</Text>
      )}
      <Button title="Tomar Foto" onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
