import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { rMS, rS } from "../../styles/responsive";

import { useCallback, useEffect, useState } from "react";
import { Dimensions } from "react-native";

import { Buscar } from "../../components/Buscar";
import { obtenerProductosFinancieros } from "../../mocks/ProductList";
import { ProductAdd } from "./ProductAdd";
import { ProductList } from "./ProductList";
import { useFocusEffect } from "@react-navigation/native";

export const ProductosPage = () => {
  const { height, width } = Dimensions.get("window");
  const [openProductAdd, setOpenProductAdd] = useState(false)
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos()
  }, []);



  useFocusEffect(
    useCallback(() => {
      cargarProductos();
    }, [])
  );

  const cargarProductos = () => {
    obtenerProductosFinancieros(100)
      .then(data => {
        setProductos(data);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
      });
  };


  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const handleSearchProductos = (term) => {
    // Simular filtrado de productos (aquí deberías implementar lógica de filtro real)
    if (term.trim() === "") {
      setProductosFiltrados([]); // Si no hay término de búsqueda, mostrar lista vacía
    } else {
      // Filtrar productos basados en el término de búsqueda (aquí puedes implementar tu lógica real)
      const filteredProducts = productos.filter((producto : any) =>
        producto.name.toLowerCase().includes(term.toLowerCase())
      );
      setProductosFiltrados(filteredProducts); // Actualizar lista de productos filtrados
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.login}>
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
            height: rMS(60, 2),
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "98%",
              justifyContent: "center",
              paddingHorizontal: "2%",
            }}
          >
            <Buscar onSearch={handleSearchProductos} />
          </View>
        </View>
        <View style={{ width: "100%", height: height - rMS(300, 2) }}>
          <ProductList
            productos={
              productosFiltrados.length > 0 ? productosFiltrados : productos
            }
          />
        </View>
        <TouchableOpacity
          style={styles.btnAgregar}
          onPress={() => setOpenProductAdd(true)}
        >
          <Text style={styles.txtAgregar}>Agregar</Text>
        </TouchableOpacity>
      </View>
      {
        <ProductAdd
        modalVisible={openProductAdd}
        setModalVisible={setOpenProductAdd}
        />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  login: {
    flex: 1,
    width: "100%",
    height: "70%",
    alignItems: "center",
    overflow: "hidden",
  },
  item: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  name: {
    fontSize: rMS(15, 1),
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  arrow: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  weekDay: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  list: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  btnAgregar: {
    top: rMS(20, 1),
    borderRadius: rS(20),
    backgroundColor: "yellow",
    width: "96%",
    height: rMS(47, 1),
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtAgregar: {
    fontSize: rMS(16, 1),
    color: "#000",
  },
});
