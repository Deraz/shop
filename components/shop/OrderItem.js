import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../UI/CustomButton";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      {showDetails && (
        <View style={styles.details}>
          {props.items.map((item) => {
            return (
              <CartItem
                title={item.productTitle}
                quantity={item.quantity}
                price={item.sum}
              />
            );
          })}
        </View>
      )}
      <CustomButton
        borderRadius
        title={showDetails ? "Hide Details" : "Show Details"}
        iconName={
          showDetails
            ? Platform.OS === "android"
              ? "md-chevron-up-circle-outline"
              : "ios-chevron-up-circle-outline"
            : Platform.OS === "android"
            ? "md-chevron-down-circle-outline"
            : "ios-chevron-down-circle-outline"
        }
        onPress={() => {
          setShowDetails((state) => !state);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: Colors.grey,
  },
  details: {
      margin: 20
  }
});

export default OrderItem;
