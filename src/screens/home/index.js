import React, {useEffect} from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
/*
if (__DEV__) {
  firestore().useEmulator('localhost', 8080);
}
*/
const db = firestore();

export default function Home({navigation}) {
  const geTemas = async () => {
    // const temas = await firestore().collection('temas').get();
    // const temas = firestore().collection('temas').doc('ip419sWmEAs5eNThjAFv');
    // const doc = 7await firestore().collection('temas').get();
    const data = await db.collection('temas').get();
    console.log(data.docs);
  };
  useEffect(() => {
    geTemas();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('ExtrasExample')} title="Go to Draw" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
