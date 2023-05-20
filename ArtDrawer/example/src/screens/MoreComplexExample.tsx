import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Pressable,
  View,
} from 'react-native';
import { Canvas, CanvasRef } from '@benjeau/react-native-draw';
import { colors } from '../utils/colors';
import { captureRef } from 'react-native-view-shot';
import ViewShot from 'react-native-view-shot';
import ModalForm from './conponents/ModalForm';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// import { utils } from '@react-native-firebase/app';
export default ({ route }) => {
  const navigation = useNavigation();
  const { dataId } = route.params;
  const ref = useRef<any>();

  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descImage, setDescImage] = useState('');
  const onCapture = useCallback((uri) => {
    console.log('do something with ', uri);
  }, []);

  const saveFirestore = async (uri: any) => {
    const data = {
      img: uri,
      nombre,
      detalleDibujo: descImage,
    };
    try {
      const dbRef = firestore()
        .collection('temas')
        .doc(dataId)
        .collection('Tareas');
      const res = await dbRef.add(data);
      console.log('res:', res);
      Alert.alert('Tarea agregada', 'Tarea agregada correctamente');
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', 'Error al agregar la tarea');
    }
  };

  const uploadFile = async (imageUri: any, fileName: any) => {
    try {
      console.log('imageUri:', imageUri);
      console.log('fileName:', fileName);
      const reference = storage().ref(`/images/${fileName}`);
      await reference.putFile(imageUri);
      const url = await reference.getDownloadURL();
      // url para guardar en la base de datos publica
      console.log('url:', url);
      console.log(url);
      saveFirestore(url);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeText = (text: string) => {
    setNombre(text);
  };
  const onChangeTextDesc = (text: string) => {
    setDescImage(text);
  };
  const canvasRef = useRef<CanvasRef>(null);

  const handleUndo = () => {
    canvasRef.current?.undo();
  };

  const handleClear = () => {
    canvasRef.current?.clear();
  };
  const handleSubir = () => {
    if (nombre === '') {
      Alert.alert('Error', 'Ingrese Su nombre completo');
      return;
    }
    if (descImage === '') {
      Alert.alert('Error', 'Ingrese una descripcion');
      return;
    }
    setModalVisible(false);
    capture();
  };
  const capture = () => {
    captureRef(ref, {
      format: 'jpg',
      quality: 0.8,
    }).then(
      (uri) => {
        const name: any = uri.split('/').pop();
        uploadFile(uri, name);
        // setImageURI(uri);
      },
      (error) => console.error('Oops, snapshot failed', error)
    );
  };

  useEffect(() => {
    console.log('dataId:', dataId);
  }, [dataId]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.mostaza,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      }}
    >
      <ViewShot
        ref={ref}
        onCapture={onCapture}
        captureMode="mount"
        style={styles.container}
      >
        <Canvas
          ref={canvasRef}
          color="red"
          thickness={5}
          opacity={0.6}
          style={{ backgroundColor: 'black' }}
        />
      </ViewShot>

      <Pressable onPress={handleClear} style={styles.btnFloatLeft}>
        <MaterialIcons name="delete" size={24} color="white" />
      </Pressable>
      <Pressable onPress={handleUndo} style={styles.btnFloatRight}>
        <AntDesign name="back" size={24} color="white" />
      </Pressable>

      <TouchableOpacity
        style={styles.buttonSubir}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textBlack}>Subir Dibujo</Text>
      </TouchableOpacity>
      <ModalForm
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      >
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={nombre}
          placeholder="Nombre completo"
        />
        <TextInput
          style={styles.inputDesc}
          onChangeText={onChangeTextDesc}
          value={descImage}
          numberOfLines={4}
          multiline
          placeholder="Descripcion del dibujo"
        />
        <Pressable style={styles.modalBtn} onPress={handleSubir}>
          <Text style={styles.textBlack}>Subir Dibujo</Text>
        </Pressable>
      </ModalForm>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBtn: {
    backgroundColor: colors.verde,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: 'center',
    marginHorizontal: 48,
    justifyContent: 'center',
  },
  btnFloatLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: colors.verde,
    padding: 10,
    borderRadius: 100,
  },
  btnFloatRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.verde,
    padding: 10,
    borderRadius: 100,
  },
  container: {
    flex: 1,
    backgroundColor: colors.mostaza,
  },
  buttonIcon: {
    marginRight: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.light,
  },
  inputDesc: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.gray,
    borderRadius: 16,
    backgroundColor: colors.light,
    textAlignVertical: 'top',
  },
  img: {
    width: 100,
    height: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSubir: {
    backgroundColor: colors.red,
    color: colors.light,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  textBlack: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
