import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import moment from "moment"; 
import { ScrollView } from "react-native-gesture-handler";
import { showAlert, showAlertConfirmate } from "../../components/Alerts";
import { guardarProductoFinanciero } from "../../mocks/ProductList";
import { rMS, rV } from "../../styles/responsive";
const baseUrl =
  "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";

export const ProductAdd = ({ modalVisible, setModalVisible }) => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    logo: "",
    fechaLiberacion: "",
    fechaRevision: "",
  });

  const [formErrors, setFormErrors] = useState({
    idError: "",
    nombreError: "",
    descripcionError: "",
    logoError: "",
    fechaLiberacionError: "",
    fechaRevisionError: "",
  });

  // Manejar el cambio en los campos de texto del formulario
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Limpiar el error cuando el usuario comienza a escribir en un campo
    if (field.endsWith("Error")) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      idError: "",
      nombreError: "",
      descripcionError: "",
      logoError: "",
      fechaLiberacionError: "",
      fechaRevisionError: "",
    };

    // Validar campos individualmente

    // Validar Id
    if (formData.id.length < 3 || formData.id.length > 10) {
      errors.idError = "El Id debe tener entre 3 y 10 caracteres.";
      isValid = false;
    }

    // Validar Nombre
    if (formData.nombre.length < 5 || formData.nombre.length > 100) {
      errors.nombreError = "El Nombre debe tener entre 5 y 100 caracteres.";
      isValid = false;
    }

    // Validar Descripción
    if (formData.descripcion.length < 10 || formData.descripcion.length > 200) {
      errors.descripcionError =
        "La Descripción debe tener entre 10 y 200 caracteres.";
      isValid = false;
    }

    // Validar Logo
    if (!formData.logo) {
      errors.logoError = "Debe ingresar la URL del Logo.";
      isValid = false;
    }

    // Validar Fecha de Liberación
    if (!isValidDate(formData.fechaLiberacion)) {
      errors.fechaLiberacionError =
        "Debe ingresar una Fecha de Liberación válida y mayor o igual a la fecha actual.";
      isValid = false;
    }

    // Validar Fecha de Revisión
    if (!isValidDate(formData.fechaRevision)) {
      errors.fechaRevisionError =
        "Debe ingresar una Fecha de Revisión válida y un año posterior a la Fecha de Liberación.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const isValidDate = (dateString) => {
    const dateFormat = "YYYY/MM/DD";

    // Verificar el formato esperado de la fecha (año/mes/día)
    if (!moment(dateString, dateFormat, true).isValid()) {
      return false;
    }

    // Verificar si la fecha es mayor o igual a la fecha actual
    if (moment(dateString, dateFormat).isBefore(moment().startOf("day"))) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      // Validar el formulario antes de enviar
      if (!validateForm()) {
        return; // Detener el envío si hay errores de validación
      }

      const datosGuardar = {
        id: formData.id,
        name: formData.nombre,
        description: formData.descripcion,
        logo: formData.logo,

        date_release: moment(formData.fechaLiberacion, 'YYYY-MM-DD').format('YYYY-MM-DD'),
        date_revision:  moment(formData.fechaRevision, 'YYYY-MM-DD').format('YYYY-MM-DD'),
      };

      const data = await guardarProductoFinanciero(datosGuardar);

      // Manejar la respuesta del servidor si es necesario
      console.log("Producto creado correctamente:", data);
      showAlertConfirmate("Producto creado correctamente.");
      setModalVisible(false); // Cerrar el modal o realizar alguna acción adicional
    } catch (error) {
      console.error("No se puede crear el producto:", error);
      showAlert("No se pudo crear el producto.");
    }
  };

  const handleReset = () => {
    // Resetear todos los campos del formulario
    setFormData({
      id: '',
      nombre: '',
      descripcion: '',
      logo: '',
      fechaLiberacion: '',
      fechaRevision: '',
    });
  };

  return (
    <SafeAreaView>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TouchableWithoutFeedback>
            <>
              <View
                style={{
                  width: "100%",
                  height: rMS(60, 2),
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ fontSize: rMS(16, 2) }}>BANCO</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  top: 10,
                  height: rMS(60, 2),
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  
                }}
              >
                <View style={{width : '85%'}}>
                <Text style={{ fontSize: rMS(26, 2) }}>
                  Formulario de Registro
                </Text>

                </View>
                <TouchableOpacity style={{width : '15%'}}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" size={20} color="#000" />

                </TouchableOpacity>
              </View>
              <ScrollView
                style={{ paddingHorizontal: rMS(20, 2), paddingTop: 20 }}
              >
                {/* Campo Id */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Id *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.id}
                    onChangeText={(text) => handleInputChange("id", text)}
                    placeholder="Ingrese el Id"
                    maxLength={10}
                  />
                  {formErrors.idError ? (
                    <Text style={styles.errorText}>{formErrors.idError}</Text>
                  ) : null}
                </View>

                {/* Campo Nombre */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nombre *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.nombre}
                    onChangeText={(text) => handleInputChange("nombre", text)}
                    placeholder="Ingrese el Nombre"
                    maxLength={100}
                  />
                  {formErrors.nombreError ? (
                    <Text style={styles.errorText}>
                      {formErrors.nombreError}
                    </Text>
                  ) : null}
                </View>

                {/* Campo Descripción */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Descripción *</Text>
                  <TextInput
                    style={[styles.input, { height: 100 }]}
                    value={formData.descripcion}
                    onChangeText={(text) =>
                      handleInputChange("descripcion", text)
                    }
                    placeholder="Ingrese la Descripción"
                    multiline
                    maxLength={200}
                  />
                  {formErrors.descripcionError ? (
                    <Text style={styles.errorText}>
                      {formErrors.descripcionError}
                    </Text>
                  ) : null}
                </View>

                {/* Campo Logo */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Logo *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.logo}
                    onChangeText={(text) => handleInputChange("logo", text)}
                    placeholder="Ingrese la URL del Logo"
                  />
                  {formErrors.logoError ? (
                    <Text style={styles.errorText}>{formErrors.logoError}</Text>
                  ) : null}
                </View>

                {/* Campo Fecha de Liberación */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Fecha de Liberación *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.fechaLiberacion}
                    onChangeText={(text) =>
                      handleInputChange("fechaLiberacion", text)
                    }
                    placeholder="Año/Mes/Día"
                  />
                  {formErrors.fechaLiberacionError ? (
                    <Text style={styles.errorText}>
                      {formErrors.fechaLiberacionError}
                    </Text>
                  ) : null}
                </View>

                {/* Campo Fecha de Revisión */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Fecha de Revisión *</Text>
                  <TextInput
                    style={styles.input}
                    value={formData.fechaRevision}
                    onChangeText={(text) =>
                      handleInputChange("fechaRevision", text)
                    }
                    placeholder="Año/Mes/Día"
                  />
                  {formErrors.fechaRevisionError ? (
                    <Text style={styles.errorText}>
                      {formErrors.fechaRevisionError}
                    </Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitButtonText}>Enviar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitButton, { backgroundColor: "#ccc" }]}
                  onPress={handleReset}
                >
                  <Text style={[styles.submitButtonText]}>Reiniciar</Text>
                </TouchableOpacity>
                <View style={{ width: "100%", height: rMS(100, 2) }}></View>
              </ScrollView>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: rMS(16, 2),
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: rMS(14, 2),
    height: rV(40),
  },
  submitButton: {
    backgroundColor: "yellow",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: rMS(16, 2),
  },
  errorText: {
    color: "red",
    fontSize: rMS(12, 2),
    marginTop: 5,
  },
});

export default ProductAdd;
