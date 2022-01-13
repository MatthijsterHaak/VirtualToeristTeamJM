import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

function DetailsRoute({route}){
  // haalt de parameter die is meegegeven vanuit Routes.js
  let data = route.params;

  return (
    <View>
        <Text style={styles.text}>Activity max speed: {data.activityMaxspeedMs}</Text>
        <Text style={styles.text}>Description activity: {data.activityDescriptionStr}</Text>
        <Text style={styles.text}>Distance: {data.activityDistanceM}</Text>
        <Text style={styles.text}>Date: {data.activityDateStr}</Text>
        <Text style={styles.text}>Duration: {data.activityDurationS}</Text>
        <Text style={styles.text}>Start Date and time: {data.activityStartDatetime}</Text>
        <Text style={styles.text}>Stop Date and time: {data.activityStopDatetime}</Text>
        <Text style={styles.text}>Activity stop time: {data.activityStoptimeStr}</Text>
        <Text style={styles.text}>Activity type: {data.activityType}</Text>
        <Text style={styles.text}>Contest id number: {data.contestIdStr}</Text>
        <Text style={styles.text}>Participentsnumber: {data.jahomaSmartIdStr}</Text>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#9AC31C'
  },
  text: {
    fontSize: 20,
    justifyContent: 'center'
  },
});

export default DetailsRoute;