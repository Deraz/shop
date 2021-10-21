import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Item, HeaderButtons } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import CustomButton from "../../components/UI/CustomButton";

const ProductOverviewScreen = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.availableProducts);

  const selectHanlder = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const renderProducts = ({ item }) => {
    return (
      <ProductItem
        image={item.imageUrl}
        title={item.title}
        price={item.price}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(item));
        }}
        onSelect={() => {
          selectHanlder(item.id, item.title);
        }}
      >
        <CustomButton
          title="View Details"
          onPress={() => {
            selectHanlder(item.id, item.title);
          }}
          iconName="ios-newspaper"
          borderRadius
        />
        <CustomButton
          title="Add to Cart"
          onPress={() => {
            dispatch(cartActions.addToCart(item));
          }}
          iconName="ios-add"
          borderRadius
        />
      </ProductItem>
    );
  };
  return <FlatList data={products} renderItem={renderProducts} />;
};

ProductOverviewScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: "Products",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => {
              navigationData.navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      );
    },
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

export default ProductOverviewScreen;
