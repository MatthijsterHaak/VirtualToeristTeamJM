import React, { useEffect, useState} from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, Button, Pressable, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Routes({navigation}){

  const [initialElements, changeEl]  = useState([]);
  const [exampleState, setExampleState] = useState(initialElements);
  const [idx, incr] = useState(2);

  const addElements  = async () => {
    // Haalt alle routes op vanuit local storage. 
    const jsonValue = await AsyncStorage.getItem('@Routes')
    var DataRoutes = JSON.parse(jsonValue)
    var newArray = [];
    
    // If statement wanneer er geen nieuwe routes zijn gevonden.
    if (DataRoutes == null) {
      return
    }

    var arrayLength = DataRoutes.length;
    // For loop hier gaat hij door alle routes die hij heeft opgehaald.
    for (var i = 0; i < arrayLength; i++) {
        var dataRoute = {
          'activityDescriptionStr': DataRoutes[i]['activityDescriptionStr'],
          'activityMaxspeedMs': DataRoutes[i]['activityMaxspeedMs'],
          'activityStartDatetime': DataRoutes[i]['activityStartDatetime'],
          'activityStopDatetime': DataRoutes[i]['activityStopDatetime'],
          'activityDateStr': DataRoutes[i]['activityDateStr'],
          'activityDistanceM': DataRoutes[i]['activityDistanceM'],
          'activityDurationS': DataRoutes[i]['activityDurationS'],
          'activityStarttimeStr': DataRoutes[i]['activityStarttimeStr'],
          'activityStoptimeStr': DataRoutes[i]['activityStoptimeStr'],
          'activityType': DataRoutes[i]['activityType'],
          'contestIdStr': DataRoutes[i]['contestIdStr'],
          'externalSourceIdStr': "TEAM-NAME",
          'externalSourceVersionStr': "v0.1i-07Feb2021-1",
          'jahomaSmartIdStr': DataRoutes[i]['jahomaSmartIdStr'],
        }
        //Pusht alle routes in de array newArray.
        newArray.push(dataRoute)
    }
    // Hier pakt hij alle routes van newArray en stopt ze in de Flatlist.
    setExampleState(newArray);
    changeEl(newArray);
  } 
  
  // Wanneer de pagina wordt ingeladen voert hij de functie addElements uit.
  useEffect(() => {
    addElements()
  }, []);

  //___________________________________________________________________________________
  // Test functie om alle activiteiten uit local storage te verwijderen.
  const removeItemValue = async () => {
    try {
        await AsyncStorage.removeItem('@Routes');
        return true;
    }
    catch(exception) {
        return false;
    }
  }
  //___________________________________________________________________________________

  // View voor wanneer er geen routes in je 
  const EmptyListMessage = ({item}) => {
    return (
      <View style={styles.ContainerNoData}>
      </View>
     
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.RefreshButton} onPress={addElements}>
        <Text style={styles.title}>Refresh activities</Text>
      </Pressable>
      {/* <Button title='delete' onPress={test}></Button> */}
      <FlatList
        data={exampleState}
        keyExtractor={(item) => item.activityDescriptionStr}
        inverted={false}
        ListEmptyComponent={EmptyListMessage}
        renderItem={( {item} ) => (
          <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DetailsRoute', item )}>
            <Text style={styles.title}>Title: {item.activityDescriptionStr}</Text>
            <Text style={styles.title}>Duration: {item.activityDurationS} seconds</Text>
            <Text style={styles.title}>Distance: {item.activityDistanceM} meters</Text>
            <Text style={styles.title}>Contest number: {item.contestIdStr}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  ContainerNoData: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleNoData: {
    fontSize: 20,
    color: 'black'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#9AC31C',
    borderColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  RefreshButton: {
    margin: 10,
    height: 40,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AC31C',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Routes;