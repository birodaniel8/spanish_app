import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth } from "../firebase";

const PasswordReset = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const sendResetEmail = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Done", "Password reset email has been sent out");
        navigation.replace("Login");
      })
      .catch((err) => {
        Alert.alert("Done", err.toString());
      });
  };

  return (
    <View style={styles.pageContainer}>
      <Text h3 style={styles.h1Text}>
        Password reset
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputFieldLabel}>Email</Text>
        <Input
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputField}
        />
      </View>
      <Button
        containerStyle={styles.secondaryButtonContainer}
        buttonStyle={styles.secondaryButton}
        titleStyle={styles.secondaryButtonText}
        title="Send reset email"
        onPress={sendResetEmail}
        raised
      />
    </View>
  );
};

export default PasswordReset;
