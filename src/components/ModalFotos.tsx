import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "react-native-image-picker";

import { launchCamera, MediaType } from "react-native-image-picker";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { showAlert } from "./Alerts";
import { lightThemeColor } from "../mocks/theme";
import { rMS } from "../styles/responsive";


const ModalFotos = (props: any) => {
  const { modalVisible, closeModal, title, setImage } = props;

  const options = {
    mediaType: "photo" as MediaType, // Aquí se especifica el tipo correctamente
    includeBase64: false,
  };

  const openCamera = async () => {
    const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);

    if (cameraPermission === RESULTS.GRANTED) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          closeModal();
        } else if (response.errorMessage) {
          console.error("ImagePicker Error: ", response.errorMessage);
        } else {
          setImage(response);
        }
      });
    } else {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);

      if (result === RESULTS.GRANTED) {
        openCamera();
      } else {
        showAlert("Permiso de camara negado")
      }
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <View style={{ padding: 5 }}>
                <Text
                  style={{ fontSize: rMS(16 , 2), color: "#000" }}
                >{`Elija ${title}`}</Text>
              </View>
            </View>

            <View>
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: "#fff" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    closeModal();
                    ImagePicker.launchImageLibrary(
                      {
                        mediaType: "photo",
                        includeBase64: false,
                      },
                      (response) => {
                        setImage(response);
                      }
                    );
                  }}
                  style={[
                    styles.Button,
                    { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                  ]}
                >
                  <Text style={{ fontSize: rMS(14 , 2), color: "#fff" , padding : 5 }}>
                    Elegir foto galeria
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.Button,
                  { borderBottomLeftRadius: 10, borderBottomRightRadius: 10  },
                ]}
                onPress={() => {
                  closeModal();
                  openCamera();
                }}
               
              >
                <Text style={{ fontSize: rMS(14 , 2), color: "#fff" , padding : 5}}>Tomar foto</Text>
              </TouchableOpacity>
            </View>

            <View style={{ paddingVertical: 10 }}>
              <TouchableOpacity
                onPress={closeModal}
                style={[
                  {
                    backgroundColor: "#9E9E9E",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  },
                ]}
              >
                <Text style={{ fontSize: rMS(14 , 2), color: "#fff" , padding : 5}}>CANCELAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: lightThemeColor,
    paddingHorizontal : 30,
    paddingVertical : 20,
    borderRadius: 10,
    elevation: 5,
  },
  Button: {
    backgroundColor: "red",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default ModalFotos;
