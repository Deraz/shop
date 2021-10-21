import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import CustomButton from "../../components/UI/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import { deleteItem } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/orders";

const CartScreen = (props) => {
  const total = useSelector((state) => state.cart.sum);
  const cartItems = useSelector((state) => {
    const transformedToArray = [];
    const { items } = state.cart;
    for (const key in items) {
      transformedToArray.push({
        productId: key,
        productTitle: items[key].productTitle,
        productPrice: items[key].productPrice,
        quantity: items[key].quantity,
        sum: items[key].sum,
      });
    }
    return transformedToArray;
  });

  const dispatch = useDispatch();

  const deleteItemHandler = (id) => {
    dispatch(deleteItem(id));
  };

  const renderCartItem = ({ item }) => {
    return (
      <CartItem
        title={item.productTitle}
        quantity={item.quantity}
        price={item.sum}
        onRemove={deleteItemHandler.bind(this, item.productId)}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.row, styles.shadow]}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${total < 0 ? (0.0).toFixed(2) : total.toFixed(2)}
          </Text>
        </Text>
        <CustomButton
          title="Order Now"
          onPress={() => {
            dispatch(addOrder(cartItems, total));
          }}
          borderRadius
          disabled={cartItems.length === 0}
        />
      </View>
      {cartItems.length === 0 ? null : (
        <View style={[styles.shadow, styles.summary]}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={renderCartItem}
          />
        </View>
      )}
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    flex: 1,
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    color: Colors.primary,
  },
  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: 20,
  },
  summary: {
    width: "100%",
  },
});

export default CartScreen;
