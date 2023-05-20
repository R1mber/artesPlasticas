import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Header from '../conponents/header';
import { colors } from '../../utils/colors';
import Video from 'react-native-video';
// import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import RNFS from 'react-native-fs';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Draw({ route }) {
  const navigation = useNavigation();
  const { id, tema, dataId } = route.params;
  const {
    nombre,
    Descripcion,
    imagen,
    parrafos,
    puntaje,
    tiempo,
    autor,
    fecha,
    tarea,
    video,
  } = tema;

  const [image, setImage] = useState();
  const videoRef = useRef(null);

  const videoUrl = '';

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.presentFullscreenPlayer(); // Otra opción: videoRef.current.play()
    }
  };
  /* 
  const handlePress = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result[0]);
      console.log(result[0].uri);
      console.log(result[0].type);
      console.log(result[0].name);
      console.log(result[0].size);
      setImage(result[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('El usuario canceló la selección de archivo');
      } else {
        throw err;
      }
    }
  };
*/
  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permiso para acceder al almacenamiento externo',
          message:
            'Esta aplicación necesita acceso al almacenamiento externo para funcionar correctamente',
          buttonNeutral: 'Preguntar más tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Aceptar',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Tienes permiso para acceder al almacenamiento externo');
      } else {
        console.log('No tienes permiso para acceder al almacenamiento externo');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (granted) {
        console.log('Tienes permiso para acceder al almacenamiento externo');
      } else {
        console.log('No tienes permiso para acceder al almacenamiento externo');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  /*
  const uploadFile = async () => {
    const name = image.name;
    const contentUri = image.uri;
    const tempFilePath = `${RNFS.CachesDirectoryPath}/${name}`;
    try {
      await checkPermission();
      await RNFS.copyFile(contentUri, tempFilePath);
      const reference = storage().ref(`/images/${name}`);
      await reference.putFile(tempFilePath);
      await RNFS.unlink(tempFilePath);
      const url = await reference.getDownloadURL();
      console.log(url);
    } catch (err) {
      console.log(err);
    }
  };
  */

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.body}>
        <Image
          style={styles.image}
          source={{
            uri: imagen,
          }}
        />
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.autor}>{autor}</Text>
        <Text style={styles.date}>{fecha}</Text>
        {parrafos.map((parrafo, index) => (
          <Text key={index} style={styles.text}>
            {parrafo}
          </Text>
        ))}
        {/*
        video === '3' && (
          <Video
            source={require('../assets/video3.mp4')} // Can be a URL or a local file.
            style={styles.backgroundVideo}
            controls={true}
            resizeMode={'cover'}
            ref={videoRef}
          />
        )}
        {video === '4' && (
          <Video
            source={require('../assets/video4.mp4')} // Can be a URL or a local file.
            style={styles.backgroundVideo}
            controls={true}
            resizeMode={'cover'}
            ref={videoRef}
          />
        )}
        {video === '5' && (
          <Video
            source={require('../assets/video5.mp4')} // Can be a URL or a local file.
            style={styles.backgroundVideo}
            controls={true}
            resizeMode={'cover'}
            ref={videoRef}
          />
        )
        */}

        <Text style={styles.title}>Actividades :</Text>
        <Text style={styles.text}>{tarea}</Text>
        {/* <TouchableOpacity onPress={handlePress}>
          <Text style={styles.text}>Actividad 1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={checkPermission}>
          <Text style={styles.text}>Actividad 2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.text}>Actividad 3</Text>
        </TouchableOpacity> */}
        <View style={styles.inline}>
          {
            <TouchableOpacity
              onPress={() => navigation.navigate('Tarea', { dataId: dataId })}
              style={styles.btnCargar}
            >
              <Text style={styles.textWhite}>Tareas</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={styles.btnDrawer}
            onPress={() =>
              navigation.navigate('MoreComplexExample', {
                dataId: dataId,
              })
            }
          >
            <Text style={styles.textBlack}>Dibujar Aqui</Text>
          </TouchableOpacity>
        </View>
        {image && (
          <Image
            style={styles.image}
            source={{
              uri: image ? image.uri : 'https://picsum.photos/200/300',
            }}
          />
        )}
        <View style={styles.footer}>
          <Text style={styles.textFooter}> ART DRAWER</Text>
          <Text style={styles.textFooter}> 2020</Text>
        </View>
      </ScrollView>
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
  textWhite: {
    padding: 4,
    paddingHorizontal: 6,
    color: '#fff',
    fontWeight: 'bold',
  },
  textBlack: {
    padding: 4,
    paddingHorizontal: 6,
    color: '#000',
    fontWeight: 'bold',
  },
  inline: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
  btnCargar: {
    backgroundColor: colors.red,
    borderRadius: 8,
    padding: 4,
    margin: 8,
    color: '#fff',
  },
  btnDrawer: {
    backgroundColor: colors.mostaza,
    borderRadius: 8,
    padding: 4,
    margin: 8,
    color: '#fff',
  },
  backgroundVideo: {
    width: width,
    height: 200,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginVertical: 16,
  },
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  image: {
    width: width,
    height: 200,
    // marginHorizontal: -16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 16,
    color: colors.red,
    borderTopColor: colors.verde,
    borderTopWidth: 8,
    paddingHorizontal: 16,
  },
  body: {
    // paddingHorizontal: 16,
  },
  text: {
    paddingTop: 16,
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray,
    textAlign: 'justify',
    paddingHorizontal: 16,
  },
  autor: {
    color: colors.verde,
    paddingHorizontal: 16,
  },
  date: {
    color: colors.verde,
    paddingHorizontal: 16,
  },
});
