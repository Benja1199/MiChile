import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function LocationPicker() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [ubicaciones, setUbicaciones] = useState([]); // Estado para las ubicaciones del backend
  const navigation = useNavigation();
  const mapRef = useRef(null); // Referencia al mapa para ajustar la vista

  useEffect(() => {
    // Solicitar permisos de ubicación y obtener la ubicación actual
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación fue denegado');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  useEffect(() => {
    // Obtener las ubicaciones del backend
    const fetchUbicaciones = async () => {
      try {
        const response = await fetch('http://192.168.1.32:5000/ubicaciones');
        const data = await response.json();

        console.log('Ubicaciones obtenidas:', data);

        // Asegurarse de que las coordenadas estén en el formato correcto
        const formattedUbicaciones = data.map((ubicacion) => {
          const lat = parseFloat(ubicacion.Latitud);
          const lon = parseFloat(ubicacion.Longitud);

          // Solo agregar la ubicación si las coordenadas son válidas
          if (!isNaN(lat) && !isNaN(lon)) {
            return {
              ...ubicacion,
              Latitud: lat,
              Longitud: lon,
            };
          }
          return null; // Retornar null si las coordenadas no son válidas
        }).filter(item => item !== null); // Filtrar las ubicaciones inválidas

        setUbicaciones(formattedUbicaciones);
      } catch (error) {
        console.error('Error al obtener las ubicaciones:', error);
      }
    };

    fetchUbicaciones();
  }, []);

  useEffect(() => {
    // Ajustar la vista del mapa a todas las ubicaciones obtenidas
    if (ubicaciones.length > 0 && mapRef.current) {
      const coordinates = ubicaciones.map((ubicacion) => ({
        latitude: ubicacion.Latitud,
        longitude: ubicacion.Longitud,
      }));

      // Ajustar la vista para mostrar todas las ubicaciones
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [ubicaciones]); // Cuando las ubicaciones cambian, se ajusta la vista

  const handleSearch = () => {
    navigation.navigate('Ciudad');
  };

  return (
    <View style={styles.container}>
      {/* Sección de buscador y botón */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Escriba una Ciudad" style={styles.input} />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      {/* Sección del mapa */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            ref={mapRef} // Referencia al MapView
            style={styles.map}
            region={location} // La región del mapa sigue centrada en tu ubicación
            showsUserLocation={true} // Muestra solo el círculo azul de la ubicación
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Marcadores de las ubicaciones del backend */}
            {ubicaciones.length > 0 && ubicaciones.map((ubicacion) => (
              <Marker
                key={ubicacion._id}
                coordinate={{
                  latitude: ubicacion.Latitud,
                  longitude: ubicacion.Longitud,
                }}
                title={ubicacion.Lugar}
                description={`Lat: ${ubicacion.Latitud}, Lon: ${ubicacion.Longitud}`}
              />
            ))}
          </MapView>
        ) : (
          <Text style={styles.loadingText}>{errorMsg || 'Cargando ubicación...'}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
});