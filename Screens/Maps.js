import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Button, Text, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";
import { Marker } from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_TRACKING = 'BACKGROUND_TRACKING';
dataTrackedRoute = [];
var test = [];

TaskManager.defineTask(BACKGROUND_TRACKING, ({ data: { locations }, error }) => {
  if (error) {
    console.error(error)
    return;
  }
  dataTrackedRoute.push.apply(dataTrackedRoute, locations);
  console.log(dataTrackedRoute);
});

export default class App extends React.Component {
  state = {
    mapRegion: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    hasLocationPermissions: false,
    locationResult: 0,
    buttons: {
      button1:{
        buttonStatus: false,
        buttonColor: '#9AC31C'
      },
      button2:{
        buttonStatus: true,
        buttonColor: '#808080'
      },
      button3:{
        buttonStatus: true,
        buttonColor: '#808080'
      },
    },
    snelheid: 0,
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };

  // Functie die de activiteit start.
  StartRoute = () => {
    console.log('start tracking')
    Location.startLocationUpdatesAsync(BACKGROUND_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      }
    });

    this.setState({
      buttons: {
        button1:{
          buttonStatus: true,
          buttonColor: '#808080'
        },
        button2:{
          buttonStatus: false,
          buttonColor: '#9AC31C'
        },
        button3:{
          buttonStatus: false,
          buttonColor: '#9AC31C'
        },
      }
    });
    
  };

   // Functie waar hij alle data verzamelt uit de array dataTrackedRoute en deze opslaat in een JSON structuur.
  HandleData = async () => { 
    
    //activityMaxspeedMs
    var activityMaxspeedMs = 0;
    for (var i = 0; i < dataTrackedRoute.length; i++) {
      if (dataTrackedRoute[i]['coords']['speed'] > activityMaxspeedMs)  {
        activityMaxspeedMs = dataTrackedRoute[i]['coords']['speed'];
          
      }
    }

    //activityStartDatetime
    var Startdate = new Date(dataTrackedRoute[0]['timestamp']);
    var activityStartDatetime = ("0" + (Startdate.getDate())) + '-' + ("0" + (Startdate.getMonth()+1)) + '-' + Startdate.getFullYear().toString().substr(-2) + 'T' + ("0" + (Startdate.getHours())).slice(-2) + ':' +  ("0" + (Startdate.getMinutes())).slice(-2) + ':' + ("0" + (Startdate.getSeconds())).slice(-2) + ':' + Startdate.getMilliseconds() + 'Z';

    //activityStopDatetime
    var Stopdate = new Date(dataTrackedRoute[dataTrackedRoute.length - 1]['timestamp'])
    var activityStopDatetime = ("0" + (Stopdate.getDate())) + '-' + ("0" + (Stopdate.getMonth()+1)) + '-' + Stopdate.getFullYear().toString().substr(-2) + 'T' + ("0" + (Stopdate.getHours())).slice(-2) + ':' +  ("0" + (Stopdate.getMinutes())).slice(-2) + ':' + ("0" + (Stopdate.getSeconds())).slice(-2) + ':' + Stopdate.getMilliseconds() + 'Z';

    //activityDateStr
    var DateStart = new Date(dataTrackedRoute[0]['timestamp']);
    var activityDateStr = ("0" + (DateStart.getDate())) + '-' + ("0" + (DateStart.getMonth()+1)) + '-' + DateStart.getFullYear().toString().substr(-2);

    //activityDescriptionStr
    var activityDescriptionStr = ("0" + (Startdate.getDate())) + '-' + ("0" + (Startdate.getMonth()+1)) + '-' + Startdate.getFullYear().toString().substr(-2) + 'T' + ("0" + (Startdate.getHours())).slice(-2) + ':' +  ("0" + (Startdate.getMinutes())).slice(-2) + ':' + ("0" + (Startdate.getSeconds())).slice(-2) + ':' + Startdate.getMilliseconds() + 'Z';

    //activityStarttimeStr
    var activityStarttimeStr = ("0" + (Stopdate.getHours())).slice(-2) + ':' +  ("0" + (Stopdate.getMinutes())).slice(-2);

    //activityStoptimeStr"
    var DateStop = new Date(dataTrackedRoute[dataTrackedRoute.length - 1]['timestamp'])
    var activityStoptimeStr = ("0" + (DateStop.getHours())).slice(-2) + ':' +  ("0" + (DateStop.getMinutes())).slice(-2);

    //activityDurationS
    if (DateStart == DateStop) {
      var activityDurationS = 1;
    }
    else {
      var resolution
      var EndTime = DateStop
      var StartTime = DateStart
      resolution = EndTime - StartTime
      var activityDurationS = (resolution / 1000)
    }

    //"activityDuration":10472,
    for (var i = 0; i < dataTrackedRoute.length; i++) {
      // console.log(dataTrackedRoute[i]['coords']['speed'])
      test.push(dataTrackedRoute[i]['coords']['speed'])
      
    }
    // pakt het gemiddelde van een array met cijfers. 
    const average = (array) => array.reduce((a, b) => a + b) / array.length;

    var activityDuration = average(test) * activityDurationS

    // haalt de informatie op van de QR code die is gescand.
    const value = await AsyncStorage.getItem('@QR_code')
    const DataQRcode = JSON.parse(value)

    // "contestIdStr":"60",
    var contestIdStr = DataQRcode['contest']

    // "jahomaSmartIdStr":"123456789"
    var jahomaSmartIdStr = DataQRcode['Id']

    // "activityType":"TYPE_BIKE",
    var activityType = DataQRcode['type']

    // JSON structuur met alle data van de activiteit.
    var DataActivity = {
      'activityMaxspeedMs': activityMaxspeedMs.toFixed(2),
      'activityStartDatetime': activityStartDatetime,
      'activityStopDatetime': activityStopDatetime,
      'activityDateStr': activityDateStr,
      'activityDescriptionStr': activityDescriptionStr,
      'activityDistanceM': activityDuration.toFixed(2),
      'activityDurationS': activityDurationS.toFixed(2),
      'activityStarttimeStr': activityStarttimeStr,
      'activityStoptimeStr': activityStoptimeStr,
      'activityType': activityType,
      'contestIdStr': contestIdStr,
      'externalSourceIdStr': "TEAM-NAME",
      'externalSourceVersionStr': "v0.1i-07Feb2021-1",
      'jahomaSmartIdStr': jahomaSmartIdStr,
      
    }
    console.log(DataActivity)
    // hier roept hij de functie storeData aan en stuurt hij de JSON DataActivity mee. 
    this.storeData(DataActivity)
  };

  //functie die de route niet opslaat
  DeleteRoute = () => {
    Location.stopLocationUpdatesAsync(BACKGROUND_TRACKING)
    console.log('Track Deleted')
    dataTrackedRoute.length = 0;
    this.setState({
      buttons: {
        button1:{
          buttonStatus: false,
          buttonColor: '#9AC31C'
        },
        button2:{
          buttonStatus: true,
          buttonColor: '#808080'
        },
        button3:{
          buttonStatus: true,
          buttonColor: '#808080'
        },
      }
    });
  }

  // functie die de activiteit route opslaat. 
  StopRoute = () => { 
    Location.stopLocationUpdatesAsync(BACKGROUND_TRACKING)
    console.log('Stop tracking')

    // hier roept hij de functie Handle data aan om alle verzamelde data in orde te maken.
    this.HandleData()

    // hieronder maakt hij de array leeg zodat er geen data overblijft van een eerdere activiteit.
    dataTrackedRoute.length = 0;
    console.log(dataTrackedRoute)

    this.setState({
      buttons: {
        button1:{
          buttonStatus: false,
          buttonColor: '#9AC31C'
        },
        button2:{
          buttonStatus: true,
          buttonColor: '#808080'
        },
        button3:{
          buttonStatus: true,
          buttonColor: '#808080'
        },
      }
    });
  };
  
  // Functie die de activitiet pauzeert. 
  PauzeRoute = () => {
    Location.stopLocationUpdatesAsync(BACKGROUND_TRACKING)
    console.log('Pauzeer tracking')

    this.setState({
      buttons: {
        button1:{
          buttonStatus: false,
          buttonColor: '#9AC31C'
        },
        button2:{
          buttonStatus: true,
          buttonColor: '#9AC31C'
        },
        button3:{
          buttonStatus: false,
          buttonColor: '#9AC31C'
        },
      }
    });
  }

  // Functie waar de meegegeven JSON wordt opgeslagen in local storage.
  storeData = async (DataRoute) => {

    const value = await AsyncStorage.getItem('@Routes')

    if (value == null) {

      var array = []
      array.push(DataRoute)
      
      const jsonValue1 = JSON.stringify(array)
      await AsyncStorage.setItem('@Routes', jsonValue1)

    } 
    else {

      var Data = JSON.parse(value)
      Data.push(DataRoute)

      const jsonValue2 = JSON.stringify(Data)
      await AsyncStorage.setItem('@Routes', jsonValue2)    
    }
  }
  
  // Functie die ervoor zorgt dat de route pauzeert.

  async getLocationAsync() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this.setState({ hasLocationPermissions: true });
      const location = await Location.getCurrentPositionAsync({});
      this.setState({ locationResult: JSON.stringify(location) });
      // Center the map on the location we just fetched.
      this.setState({
        mapRegion: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        },
      });
    } else {
      alert("Location permission not granted");
    }
  }

  render() {
    return (
      <View style={styles.mapStyle}>
        <MapView
          style={styles.mapStyle}
          region={this.state.mapRegion}
          onRegionChangeComplete={this.handleMapRegionChange}
          showsUserLocation={true}
        > 
        </MapView>
          <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={{
                borderRadius: 50,
                height: '200%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:this.state.buttons.button1.buttonColor,
              }}
              disabled={this.state.buttons.button1.buttonStatus}
              onPress={this.StartRoute}>
                <Text style={styles.text}>Start</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={{
                borderRadius: 50,
                height: '200%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: this.state.buttons.button2.buttonColor,
              }}
              disabled={this.state.buttons.button2.buttonStatus}
              onPress={this.PauzeRoute}>
              <Text style={styles.text}>Pauze</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
              <TouchableOpacity 
              style={{
                borderRadius: 50,
                height: '200%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: this.state.buttons.button3.buttonColor,
              }}
              disabled={this.state.buttons.button3.buttonStatus}
              onPress={() => {Alert.alert('Save Tracked Route', 'Do you want to save tracked route?', [
                {
                  text: 'Save', 
                  onPress: () => this.StopRoute()
                },
                {
                  text: 'Delete', 
                  onPress: () => this.DeleteRoute()
                },
                {
                  text: 'Cancel'
                }
              ])}}>
              <Text style={styles.text}>Stop</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: 'rgb(256,256,256)',
    fontSize: 15,
    fontWeight: 'bold',
  },
  TextTitle: {
    margin: 20,
    fontSize: 30,
    color:'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    position: "absolute",
    marginVertical: '140%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
    flex: 1,
  },
});


/*
Methodes om data om te zetten naar de geldige json
activityMaxspeedMs(int) -> highestSpeed function
activityStartDateTime(str)
var d = new Date(dataTrackedRoute[0]['timestamp'] * 1000);
activityStopDateTime(str)
var d = new Date(dataTrackedRoute[-1]['timestamp'] * 1000);
activityDateStr(str)
var d = new Date(dataTrackedRoute[0]['timestamp'] * 1000);
activityDescriptionStr(str)
activityDistanceM(int)
activityDurationS(int)
activityGpxIdStr(str)
activityStarttimestr(str)
var d = new Date(dataTrackedRoute[0]['timestamp'] * 1000);
activityStoptimeStr(str)
var d = new Date(dataTrackedRoute[-1]['timestamp'] * 1000);
*/
