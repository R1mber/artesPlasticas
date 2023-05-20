import React, { useEffect, useState } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../../utils/colors';
import Card from '../conponents/card';
import Footer from '../conponents/footer';
import Header from '../conponents/header';
/*
if (__DEV__) {
  firestore().useEmulator('localhost', 8080);
}
*/
const db = firestore();

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [temas, setTemas] = useState([]);
  const geTemas = async () => {
    const data = await db.collection('temas').get();
    setTemas(data.docs);
    console.log(data.docs);
    //espera 2 segundos para mostrar el contenido
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    geTemas();
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.screen}>
          <Image
            style={styles.tinyLogo}
            source={require('../assets/logo.png')}
          />
          <Text style={styles.textLoad}>Cargando...</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Header />
          <ScrollView style={styles.body}>
            {temas.map((tema) => {
              return <Card key={tema.id} tema={tema} />;
            })}
            {/* <Button onPress={() => navigation.navigate('Draw')} title="Go to Draw" /> */}
          </ScrollView>
          <Footer />
        </View>
      )}
    </>
  );
}
//gray-> 757780 mostaza-> d2cca1 verde> 387780 light>dbd4d3 red e83151

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
