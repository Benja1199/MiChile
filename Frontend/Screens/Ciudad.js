import React, { useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';

export default function City() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para almacenar la imagen seleccionada

  // Lista de imágenes locales
  const images = [
    require('../assets/Stgo.jpg'),
    require('../assets/Stgo2.jpg'),
    require('../assets/Stgo3.jpg'),
    require('../assets/Stgo4.jpeg'),
    require('../assets/Stgo5.jpg'),
  ];

  // Función para manejar el toque de la imagen
  const handleImagePress = (image) => {
    setSelectedImage(image); // Establecer la imagen seleccionada
    setModalVisible(true); // Mostrar el modal
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Santiago de Chile</Text>
      
      {/* Renderizar imágenes pequeñas con TouchableOpacity */}
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(image)}>
          <Image source={image} style={{ width: 200, height: 200, margin: 10 }} />
        </TouchableOpacity>
      ))}

      {/* Modal para mostrar la imagen ampliada */}
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Cerrar el modal al presionar fuera
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro
          }}
        >
          {/* Mostrar la imagen seleccionada */}
          {selectedImage && (
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Image
                source={selectedImage}
                style={{
                  width: Dimensions.get('window').width, // Ampliar al ancho de la pantalla
                  height: Dimensions.get('window').height * 0.8, // Ajustar a 80% de la altura de la pantalla
                  resizeMode: 'contain', // Mantener la escala correcta
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}
