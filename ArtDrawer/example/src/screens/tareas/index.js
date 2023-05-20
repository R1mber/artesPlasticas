import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Footer from '../conponents/footer';
import Header from '../conponents/header';
import { colors } from '../../utils/colors';
import ImageCard from './components/ImageCard';

export default function Tareas({ route }) {
  const { dataId } = route.params;
  console.log(dataId);

  const [loading, setLoading] = useState(false);
  const [tareas, setTareas] = useState([]);
  const getTareas = async () => {
    const reference = firestore()
      .collection('temas')
      .doc(dataId)
      .collection('Tareas');
    const data = await reference.get();
    setTareas(data.docs);
    console.log(data.docs);
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <ScrollView style={styles.body}>
          {tareas.map((tarea) => {
            return <ImageCard key={tarea.id} tema={tarea.data()} />;
          })}
          {/* <Button onPress={() => navigation.navigate('Draw')} title="Go to Draw" /> */}
        </ScrollView>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.light,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.light,
  },
  tinyLogo: {
    width: 150,
    height: 150,
  },
  textLoad: {
    marginTop: 20,
    color: colors.red,
    fontSize: 24,
    fontWeight: 'bold',
  },
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
  body: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.light,
    marginBottom: 8,
  },
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
