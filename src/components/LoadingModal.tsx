import {  Modal, StyleSheet, Text, View } from "react-native";

const LoadingModal = (props: any) => {

  const { loalModal, setloalModal  } = props;
  return (
    <View>
      <Modal
        visible={loalModal}
        transparent={true}
        // onShow={() => setData(dataSource)}
        // animationType={changeAnimation}
        onRequestClose={() => {
          
          setloalModal()
          
          //   setData(dataSource);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          {/* <ActivityIndicator size="large" color="#007BFF" /> */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});
export default LoadingModal;
