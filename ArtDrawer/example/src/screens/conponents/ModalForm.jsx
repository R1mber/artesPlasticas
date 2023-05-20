import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';

export default function ModalForm({ isVisible, children, onClose }) {
  return (
  <>
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ingresa tus datos</Text>
          <Pressable onPress={onClose}
            style={styles.closeIcon}
          >
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    backgroundColor: colors.gray,
    borderRadius: 50,
    padding: 5,
  },
  modalContent: {
    height: '60%',
    width: '100%',
    backgroundColor: colors.mostaza,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: colors.mostaza,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.red,
    fontSize: 20,
    fontWeight: 'bold',

  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
