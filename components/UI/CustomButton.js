import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CustomButton = (props) => {
  let Touchable = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    Touchable = TouchableNativeFeedback;
  }
  return (
    <Touchable
      onPress={props.onPress}
      activeOpacity={0.8}
      disabled={props.disabled}
    >
      <View
        style={[
          styles.button,
          {
            backgroundColor: props.color ? props.color : Colors.primary,
            paddingVertical: props.iconName != null ? 7 : 10,
            borderRadius: props.borderRadius ? 7 : 0,
          },
        ]}
      >
        {props.iconName != null ? (
          <Ionicons
            name={props.iconName}
            size={props.iconSize ? props.iconSize : 24}
            color={props.iconColor ? props.iconColor : "white"}
            style={{ marginRight: props.title != null ? 5 : 0 }}
          />
        ) : null}
        {props.title != null ? (
          <Text style={styles.text}>{props.title}</Text>
        ) : null}
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  text: {
    fontSize: 16,
    color: "white",
    fontFamily: "open-sans",
  },
});

export default CustomButton;
