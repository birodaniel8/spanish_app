import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { auth } from "../firebase";
import { styles } from "../Styles";

import backgroundImage from "../assets/wp1.jpg";
// const backgroundImage = require(`../assets/wp1.jpg`);

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to the home screen if logged in:
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  // Sign in user:
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
  };

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, resizeMode: "cover", justifyContent: "center"}}>
      <View style={styles.container}>
        <Text h3 style={{ marginBottom: 50 }}>
          Login
        </Text>
        <View style={styles.inputContainer}>
          <Input placeholder="Email" autoFocus type="email" value={email} onChangeText={(text) => setEmail(text)} />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={signIn}
          />
        </View>

        <Button containerStyle={styles.buttonContainer} onPress={signIn} title="Login" />
        <Button
          containerStyle={styles.buttonContainer}
          type="outline"
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
