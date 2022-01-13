import React, {useEffect} from "react";
import { View, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Wanneer je voor de test alle local storage wil wissen.
// clearAsyncStorage = async () => {
//     AsyncStorage.clear();
//   }
// clearAsyncStorage()

function SkipLogin({navigation}){
  
  // functie om te checken of de local storage data heeft van de QR code.
  const CheckLogin = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@QR_code')
      if (JSON.parse(jsonValue)) {
        navigation.navigate('Tab')
      } else {
        navigation.navigate('Login')  
      }
      } catch(e) {
        navigation.navigate('Login')
    }
  }

  // Wanneer de pagina wordt ingeladen voert hij de functie SkipLogin uit.
  useEffect(() => {
    CheckLogin()
  }, []);


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./logo.png')}/>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 310,  
    height: 300,
  },
});

export default SkipLogin;