import React, { useState } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, Modal, View, Dimensions } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Importamos los íconos

export default function ImageScreen() {
  const [modalVisible, setModalVisible] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null); 

  // Lista de imágenes locales
  const images = [
    { src: require('../assets/Stgo.jpg') },
    { src: require('../assets/foto1.png') },
    { src: require('../assets/Foto2.png') },
  ];

  // Función que se activa al tocar una imagen
  const handleImagePress = (image) => {
    setSelectedImage(image.src); // Guardar la imagen seleccionada
    setModalVisible(true); // Mostrar el modal
  };

  // Función para manejar la subida de imágenes (por ahora solo es un placeholder)
  const handleAddImage = () => {
    console.log("Botón de subir imagen presionado");
    // Aquí puedes agregar la lógica para subir una imagen
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>MiChile</Text>
      <Text style={{ fontSize: 24 }}>Fotos subidas</Text>
      
      {/* Renderizamos las imágenes y las hacemos clickeables */}
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
          <Image source={image.src} style={{ width: 200, height: 200, margin: 10 }} />
        </TouchableOpacity>
      ))}

      {/* Modal para agrandar la imagen */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Cerrar el modal cuando el usuario toque fuera de la imagen
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro semi-transparente
          }}
        >
          {/* Imagen ampliada dentro del modal */}
          {selectedImage && (
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={selectedImage}
                style={{
                  width: Dimensions.get('window').width, // Ampliar la imagen al ancho de la pantalla
                  height: Dimensions.get('window').height * 0.8, // Ajustar la altura
                  resizeMode: 'contain', // Asegurar que la imagen se mantenga en escala
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Modal>

      {/* Botón "+" en la esquina superior derecha */}
      <TouchableOpacity
        onPress={handleAddImage} // Llamar a la función para subir imagen
        style={{
          position: 'absolute',
          top: 30,
          right: 30,
          backgroundColor: 'blue',
          borderRadius: 50,
          padding: 10,
        }}
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </ScrollView>
  );
}
