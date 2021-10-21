import React from "react";
import { ScrollView, Text, Image, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/UI/CustomButton";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const dispatch = useDispatch();
  const id = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === id)
  );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <CustomButton
        title="Add to Cart"
        iconName="ios-add"
        onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }}
      />
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: navigationData.navigation.getParam("productTitle"),
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: Colors.grey,
    textAlign: "center",
    marginVertical: 25,
    fontFamily: "open-sans",
  },
  description: {
    fontSize: 14,
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetailScreen;
