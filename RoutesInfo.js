import React, { useEffect} from "react";
import { View, Text, StyleSheet, BackHandler, Alert, Image, TouchableHighlight, } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

function RoutesInfo({navigation}){

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

  //Functie om een website link te openen.
  const route1Info = async () => {
    WebBrowser.openBrowserAsync('https://www.newtownfestival.nl/product/jve-61/');
  };

  //Functie om een website link te openen.
  const route2Info = async () => {
    WebBrowser.openBrowserAsync('https://www.newtownfestival.nl/product/jve-62/');
  };

  //Functie om een website link te openen.
  const route3Info = async () => {
    WebBrowser.openBrowserAsync('https://www.newtownfestival.nl/product/virtualtourist-63/');
  };
  
  return (
      <View style={styles.container}>
        <TouchableHighlight onPress={route1Info} style={styles.middle}>
          <View>
            <Image style={styles.logo} source={require('./Route1.jpg')}/>
            <Text style={styles.text}>Rondje Middendoor</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={route2Info} style={styles.bottom}>
          <View>
            <Image style={styles.logo} source={require('./Route2.png')}/>
            <Text style={styles.text}>Rondje Noppes</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={route3Info} style={styles.top}>
          <View> 
            <Image style={styles.logo} source={require('./Route3.jpg')}/>
            <Text style={styles.text}>Rondje Jonge parels</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

export default RoutesInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    margin: 10,
  },
  text: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '40%',
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 1,
  },
  top: {
    flex: 0.3,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: '#9AC31C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: '#9AC31C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: '#9AC31C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

  },
  logo: {
    width: '100%',  
    height: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

