import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import {colors} from '../../utils/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.user} source={require('../assets/user.jpg')} />
      <Text style={styles.textHeader}>Belen Burgoa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  user: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.verde,
  },
  textHeader: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
