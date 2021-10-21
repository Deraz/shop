import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../UI/CustomButton";

const CartItem = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        {props.onRemove ? (
          <CustomButton
            borderRadius
            iconName={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            color="transparent"
            iconColor="red"
            iconSize={20}
            onPress={props.onRemove}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    fontFamily: "open-sans-bold",
    color: Colors.primary,
  },
  title: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: "open-sans",
  },
  price: {
    fontSize: 14,
    fontFamily: "open-sans-bold",
    color: Colors.accent,
  },
});

export default CartItem;
