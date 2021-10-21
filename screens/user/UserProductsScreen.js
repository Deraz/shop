import React from "react";
import { FlatList, Platform } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import CustomButton from "../../components/UI/CustomButton";

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  const selectHanlder = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
              selectHanlder(item.id, item.title)
          }}
        >
          <CustomButton
            title="Edit Product"
            onPress={() => {
              selectHanlder(item.id, item.title);
            }}
            iconName="ios-pencil"
            borderRadius
          />
          <CustomButton
            title="Delete Product"
            onPress={() => {
              dispatch(cartActions.addToCart(item));
            }}
            iconName="ios-trash"
            borderRadius
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Your Products",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navigationData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default UserProductsScreen;
