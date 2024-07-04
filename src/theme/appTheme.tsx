import {StyleSheet} from 'react-native';

export const colores = {
  primary: '#00a680',
};

export const styles = StyleSheet.create({
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  botonPrimay: {
    height: 60,
    backgroundColor: '#00a680',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    shadowColor: '#00a680',
    shadowOpacity: 1.0,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowRadius: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    elevation: 0,
  },
  botonPrimaryTexto: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  avatarContainer: {
    //backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 20,
  },

  //contenedor del menu
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  menuTexto: {
    fontSize: 20,
    color: 'black',
  },
  menuBoton: {
    marginVertical: 10,
  },
});
