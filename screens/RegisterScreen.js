import React, { useState } from "react";
import { View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth } from "../firebase";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const register = () => {
    if (password !== password2) {
      setPassword("");
      setPassword2("");
      alert("The passwords do not match.");
    } else {
      // Create a new used based on email and password and then add the selected name:
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({
            displayName: name,
          });
          alert("You have registered successfully.");
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 50 }}>
        Register
      </Text>
      <View style={styles.inputContainer}>
        <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
        <Input placeholder="Email" type="email" value={email} onChangeText={(text) => setEmail(text)} />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Password again"
          secureTextEntry
          type="password"
          value={password2}
          onChangeText={(text) => setPassword2(text)}
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.buttonContainer}
        title="Register"
        onPress={register}
        raised
        buttonStyle={styles.registerButton}
      />
    </View>
  );
};

export default RegisterScreen;
