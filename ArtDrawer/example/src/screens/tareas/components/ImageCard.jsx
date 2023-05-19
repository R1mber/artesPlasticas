/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import '@react-native-firebase/app';
import { colors } from '../../../utils/colors';
import { useNavigation } from '@react-navigation/native';

export default function ImageCard({ tema }) {
  const { detalleDibujo, img, nombre } = tema;
  useEffect(() => {
    console.log(tema);
  }, [tema]);

  return (
    <View style={styles.card}>
      <Image style={styles.imageCard} source={{ uri: img }} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.description}>{detalleDibujo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: colors.gray,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    padding: 10,
  },
  cardContent: {
    padding: 10,
  },
  imageCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.verde,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 16,
    color: colors.gray,
    opacity: 0.6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  cantTemas: {
    fontSize: 16,
    color: colors.red,
    fontWeight: 'bold',
  },
  cantData: {
    fontSize: 16,
    color: colors.gray,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.red,
    color: colors.light,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  star: {
    width: 20,
    height: 20,
  },
});
