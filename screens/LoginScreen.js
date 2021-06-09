import React, { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { auth, db } from "../firebase";
import { styles } from "../Styles";

import backgroundImage from "../assets/wp2.jpg";
import { connect } from "react-redux";
import { setUser, setSettings } from "../actions/user";
// const backgroundImage = require(`../assets/wp1.jpg`);

const LoginScreen = ({ navigation, setUser, setSettings }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to the home screen if logged in:
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        // load the settings:
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            doc.exists && setSettings(doc.data().settings);
          });
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
    <ImageBackground source={backgroundImage} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
      <View style={styles.container}>
        <Text h3 style={styles.loginH3}>
          ¡!¡!¡!¡!¡!¡!
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputContainerStyle={{ borderBottomColor: "black" }}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={signIn}
            inputContainerStyle={{ borderBottomColor: "black" }}
          />
        </View>

        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.loginButton}
          onPress={signIn}
          title="Login"
        />
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.loginRegisterButton}
          titleStyle={{ color: "black" }}
          color="red"
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
};

export default connect(null, { setUser, setSettings })(LoginScreen);
