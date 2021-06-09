import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-elements";
import { styles } from "../Styles";

const PracticeDoneScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h3>¡Felicidades!</Text>
      <Button
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.replace("Practice")}
        title="Do another practice round"
      />
      <Button containerStyle={styles.buttonContainer} onPress={() => navigation.replace("Home")} title="Back to home" />
    </View>
  );
};

export default PracticeDoneScreen;
