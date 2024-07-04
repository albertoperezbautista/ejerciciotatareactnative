import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Modal } from 'react-native';

const BottomAlert = (props) => {
    const { isVisible, message, onConfirm } = props
  return (
    <Modal visible={isVisible}>
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomAlert;
