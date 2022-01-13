import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, BackHandler, Alert, Button, TouchableOpacity, Image, Icon, Pressable, ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {privacyPolicy} from './PrivacyPolicy';
import * as WebBrowser from 'expo-web-browser';

function More({navigation}){
  
  //Functie die de back button uitschakelt van android toestellen zodat gebruikers niet zomaar terug kunnen naar de vorige pagina.
  const backAction = () => {
    Alert.alert("Quit application", "Are you sure you want to quit the application.", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  // UseEffect die ervoor zorgt dat de functie backaction in zijn werking gaat wanneer je pijltje terug klikt op een android device.
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const [result, setResult] = useState(null);

  //In de onderstaande functies opent hij een website in de app
  const infoPressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.newtownfestival.nl/');
    setResult(result);
  };

  const contactPressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://www.newtownfestival.nl/#contact');
    setResult(result);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./logo.png')}/>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Select Language</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={infoPressButtonAsync}>
          <Text style={styles.text}>Instructions</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
          onPress={() => {Alert.alert('Privacy Policy', privacyPolicy)}}>
          <Text style={styles.text}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate('Scan QR code')}>
        <Text style={styles.text}>Scan Route</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={contactPressButtonAsync}>
          <Text style={styles.text}>Contact</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={contactPressButtonAsync}>
          <Text style={styles.text}>Help & Feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={infoPressButtonAsync}>
          <Text style={styles.text}>More Info</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0,
    backgroundColor: '#f2f2f2',
    width: '90%',
    margin: 5
  },
  Bannercontainer: {
    flex: 0,
    width: '100%',
    margin: 5
  },
  button: {
    borderRadius: 50,
    margin: 0,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9AC31C',
  },
  text: {
    color: 'rgb(256,256,256)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  logo: {
    top: 0,
    position:'relative',
    width: 310,  
    height: 300,
    margin: 20,
    
  },
});

export default More;