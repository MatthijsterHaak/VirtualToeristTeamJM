import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert, ScrollView, Pressable, Image } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {
 
  //disabled backbutton van android.
  //____________________________________________________________________________
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);
  //____________________________________________________________________________

  return (
    <ScrollView>
      <View style={styles.container}>
        
        <Text style={styles.TextTitle}>Virtual tourist</Text>
  
        <Image style={styles.logo} source={require('./logo.png')}/>
  
        <Text style={styles.Text}>Login by scanning your QR code that you received in the mail. click on the QR code logo to scan your QR code.</Text>
  
        <FontAwesome.Button name="camera" 
        backgroundColor= "rgba(154,195,28,0)"
        color= "#9AC31C" 
        iconStyle={styles.iconStyle}
        size={130} 
        onPress={() => navigation.navigate('Scan QR code')}></FontAwesome.Button>

        <Pressable style={styles.SkipButton} onPress={() => navigation.navigate('Tab')}>
            <Text style={styles.TextButton}>Skip</Text>
        </Pressable>

      </View>
    </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 900,
    backgroundColor: '#f2f2f2',
  },
  iconStyle: {
    marginRight: 10,
    marginLeft: 10,
  },
  TextTitle: {
    margin: 20,
    fontSize: 30,
    padding: 50,
    color:'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Text: {
    fontSize: 24,
    padding: 20,
    color:'black',
    textAlign: 'center',
  },
  TextButton: {
    fontSize: 22,
    color:'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  SkipButton: {
    borderRadius: 8,
    margin: 10,
    height: 40,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AC31C',
  },
  logo: {
    width: 310,  
    height: 300,
  },
  });

export default Login;