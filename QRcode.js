import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Pressable, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const navigation = useNavigation();

  // Functie voor het opvragen van de QR code.
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // UseEffect die ervoor zorgt dat de functie aksForPermissions in zijn werking gaat.
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Checkt of het device permissions heeft om een qr code te scannen.
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Functie die de data van de QR code opslaat in local storage.
  const StoreData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@QR_code', jsonValue)
      console.log('Data succesvol opgeslagen')
    } catch (e) {
      console.log('Data opslaan mislukt')
    }
  };

  // Functie die de inhoud van de QR code checkt.
  const handleBarCodeScanned = ({ data }) => {
    setText(data);
    setScanned(true)
    
    try {
      data = JSON.parse(data)
      // wanneer het deelnemersnummer gelijk is aan 7 cijfers.
      if (data.Id.length == 7) {
        // wanneer een token is gevonden in de QR code.
        if(data.token) {
          //Wanneer de naam van de server overeenkomt.
          if(data.server == 'jve')
            // wanneer alle bovenstaande if statements zijn geverivieerd gaat hij pas door naar de volgende pagina.
            StoreData(data)
            navigation.navigate('Tab')
            Alert.alert("Login succesfull", "Welcome");
        }
      }
    }
    catch(err) {
      Alert.alert("scan unsuccessfull", "QR code scanned unsuccessfully try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: "100%", width: "100%" }} />
      </View>
      <Pressable style={styles.ScanButton} title= 'hallo' onPress={() => setScanned(false)}>
        <Text style={styles.TextButton}>Scan QR code</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  barcodebox: {
    height: '85%',
    width: '90%',
    overflow: 'hidden',
    margin: 10,
  },
  ScanButton: {
    height: '10%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AC31C',
    borderRadius: 8,
  },
  TextButton: {
    color:'white',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

