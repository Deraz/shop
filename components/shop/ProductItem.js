import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let Touchable = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }

  return (
    <Touchable activeOpacity={0.6} onPress={props.onSelect} useForeground>
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          {props.children}
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  product: {
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 15,
  },
  image: {
    width: "100%",
    height: "60%",
  },
  textWrapper: {
    padding: 10,
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: Colors.grey,
  },
  actions: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default ProductItem;
