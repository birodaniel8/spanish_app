import React from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import confetti from "../assets/confetti.png";

const PracticeDoneScreen = ({ navigation }) => {
  return (
    <View style={styles.pageContainer}>
      <Image source={confetti} style={styles.confettiImage}></Image>

      <Text style={styles.h1Text}>¡Felicidades!</Text>
      <Button
        containerStyle={styles.primaryButtonContainer}
        buttonStyle={styles.primaryButton}
        titleStyle={styles.primaryButtonText}
        onPress={() => navigation.replace("Practice")}
        title="Practice again"
      />
      <Button
        containerStyle={styles.transparentButtonContainer}
        buttonStyle={styles.transparentButton}
        titleStyle={styles.transparentButtonText}
        onPress={() => navigation.replace("Home")}
        title="Back to home"
      />
    </View>
  );
};

export default PracticeDoneScreen;
