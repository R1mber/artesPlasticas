import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.textFooter}> ART DRAWER</Text>
      <Text style={styles.textFooter}> 2023</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.gray,
    padding: 8,
  },
  textFooter: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
