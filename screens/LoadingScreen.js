import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "../Styles";

const LoadingScreen = () => {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.defaultText}>{"loading your profile..."}</Text>
    </View>
  );
};

export default LoadingScreen;
