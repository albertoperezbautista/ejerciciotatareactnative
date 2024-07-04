import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "react-native-elements";
import IconMC from "react-native-vector-icons/MaterialCommunityIcons";
import { rMS } from "../../styles/responsive";
import { showAlertConfirmate } from "../../components/Alerts";
import { useState } from "react";
import { DetailProducto } from "./DetailProducto";

// Definimos un tipo para el producto
type Producto = {
  idCliente: number;
  key: string;
  marca: string;
  modeloVehiculo: string;
  anio?: string;
  tipo?: string;
  cubicos?: string;
  codigoProducto: string;
  imagen: string;
  marcaProducto: string;
  precioUnitario: number;
  descripcion : string;
};

// Tu lista original de productos
const catalogoProductos: Producto[] = [
  {
    idCliente: 1,
    key: "1",
    marca: "Chevrolet",
    modeloVehiculo: "Aveo",
    anio: "2015",
    codigoProducto: "1020",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 10.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 30,
    key: "30",
    marca: "Chevrolet",
    modeloVehiculo: "Aveo",
    anio: "2015",
    codigoProducto: "55755",
    tipo: "AIRE",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 12.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 7,
    key: "7",
    marca: "Chevrolet",
    modeloVehiculo: "Aveo",
    anio: "2014",
    codigoProducto: "1020",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 14.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 2,
    key: "2",
    marca: "Chevrolet",
    modeloVehiculo: "SZ",
    anio: "2009",
    codigoProducto: "1050",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 15.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 3,
    key: "3",
    marca: "Hyundai",
    modeloVehiculo: "Tucson",
    codigoProducto: "5085",
    anio: "2009",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 18.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 4,
    key: "4",
    marca: "Hyundai",
    modeloVehiculo: "Santafe",
    anio: "2009",
    codigoProducto: "5095",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 10.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 5,
    key: "5",
    marca: "Mazda",
    modeloVehiculo: "CX-3",
    codigoProducto: "8080",
    anio: "2009",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 9.99,
    descripcion : 'Producto AAA ZZZ'
  },
  {
    idCliente: 6,
    key: "6",
    marca: "Mazda",
    modeloVehiculo: "CX-5",
    codigoProducto: "8092",
    anio: "2009",
    tipo: "FRENO",
    cubicos: "3.0 cc",
    imagen: "../../assets/fondo.png",
    marcaProducto: "FRENEC",
    precioUnitario: 16.99,
    descripcion : 'Producto AAA ZZZ'
  },
];

export const CatalogoProducts = () => {
  const [openDetailProduct, setOpenDetailProduct] = useState(false);
  const [productDetail, setproductDetail] = useState({})
  // Agrupar productos por marca, modeloVehiculo, anio y cubicos
  const groupedProducts = catalogoProductos.reduce<
    {
      cabecera: string;
      subcabecera: string;
      imagen: string;
      productos: Producto[];
    }[]
  >((acc, curr) => {
    const subcabecera = `${curr.anio} - ${curr.cubicos}`;
    const existingIndex = acc.findIndex(
      (item) =>
        item.cabecera === `${curr.marca} - ${curr.modeloVehiculo}` &&
        item.subcabecera === subcabecera &&
        item.imagen === curr.imagen
    );
    if (existingIndex !== -1) {
      acc[existingIndex].productos.push(curr);
    } else {
      acc.push({
        cabecera: `${curr.marca} - ${curr.modeloVehiculo}`,
        subcabecera: subcabecera,
        imagen: curr.imagen, // Assuming each product has an 'imagen' property
        productos: [curr],
      });
    }
    return acc;
  }, []);

  const handleOpenDetailProduct = (product) => {
    setOpenDetailProduct(true)
    setproductDetail(product)
  }

  // Función para renderizar cada grupo de productos
  const renderGrupoItem = ({
    item,
  }: {
    item: {
      cabecera: string;
      subcabecera: string;
      imagen: string;
      productos: Producto[];
    };
  }) => (
    <View style={styles.grupoItem}>
      <View style={{ width: "100%", height: rMS(60, 2), flexDirection: "row" }}>
        <View style={{ width: "80%", height: rMS(60, 2) }}>
          <Text style={{ fontSize: rMS(18, 2) }}>{item.cabecera}</Text>
          <Text style={{ fontSize: rMS(16, 2) }}>{item.subcabecera}</Text>
        </View>
        <View style={{ width: "20%", height: rMS(60, 2) }}>
          {/* <Text style={{ fontSize: rMS(18, 2) }}>{item.imagen}</Text> */}
          <Image
            style={[styles.imagen, { borderRadius: 10 }]}
            source={require("../../assets/logochevi.png")}
            resizeMode="contain"
          />
        </View>
      </View>
      {item.productos.map((producto) => (
        <View
          key={producto.key}
          style={[
            styles.productoItem,
            {
              flexDirection: "row",
              borderColor: "#C0C0C0",
              borderBottomWidth: 1,
            },
          ]}
        >
          <View style={styles.imagenContainer}>
            <Image
              style={[styles.imagen, { borderRadius: 10 }]}
              source={require("../../assets/fondo.png")}
            />
          </View>
          <View style={styles.detalleContainer}>
            <Text style={styles.detalleTexto}>{producto.codigoProducto}</Text>
            <Text style={styles.detalleTexto}>
              Marca : {producto.marcaProducto}
            </Text>
            <Text style={styles.detalleTexto}>Tipo : {producto.tipo}</Text>
          </View>
          <TouchableOpacity
            style={styles.addContainer}
            onPress={() => handleOpenDetailProduct(producto)}
          >
            <IconMC name="plus-box-outline" size={rMS(25, 2)} color="#000" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={groupedProducts}
        renderItem={renderGrupoItem}
        keyExtractor={(item) => `${item.cabecera}-${item.subcabecera}`}
        contentContainerStyle={styles.listaContainer}
      />
      {
        <DetailProducto
          modalVisible={openDetailProduct}
          setModalVisible={setOpenDetailProduct}
          item={productDetail}
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
  listaContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  grupoItem: {
    marginBottom: 20,
  },
  cabecera: {
    fontSize: rMS(18, 2),
    fontWeight: "bold",
    marginBottom: 10,
  },
  productoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  imagenContainer: {
    width: "20%",
    height: rMS(60, 1.5),
    borderRadius: 10,
    overflow: "hidden",
  },
  addContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    height: rMS(60, 1.5),
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
  detalleContainer: {
    width: "65%",
    paddingHorizontal: 10,
  },
  detalleTexto: {
    fontSize: rMS(14, 2),
    marginBottom: 4,
  },
});

export default CatalogoProducts;
