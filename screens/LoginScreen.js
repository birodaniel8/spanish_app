import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Image } from "react-native";
import { Text, Button, Input } from "react-native-elements";

import { setUser, setSettings, setStats } from "../actions/user";

import { auth, db } from "../firebase";
import { styles } from "../Styles";
import logo from "../assets/logo.png";

const LoginScreen = ({ navigation, setUser, setSettings, setStats }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate to the home screen if logged in:
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Loading")
        setUser(authUser);
        // load the settings:
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setSettings(doc.data().settings);
              setStats(doc.data().stats);
            }
          })
          .then(() => {
            navigation.replace("Home");
          });
      }
    });

    return unsubscribe;
  }, []);

  // Sign in user:
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error));
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.titleContainer}>
        <Image source={logo} style={styles.logoImage}></Image>
        <Text style={styles.conjugacionTitle}>Conjugación</Text>
        <Text style={styles.practicerTitle}>Trainer</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputFieldLabel}>Email</Text>
        <Input
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputField}
        />
        <Text style={styles.inputFieldLabel}>Password</Text>
        <Input
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
          inputContainerStyle={styles.inputField}
        />
      </View>

      <Button
        containerStyle={styles.primaryButtonContainer}
        buttonStyle={styles.primaryButton}
        titleStyle={styles.primaryButtonText}
        onPress={signIn}
        title="Login"
      />
      <Button
        containerStyle={styles.transparentButtonContainer}
        buttonStyle={styles.transparentButton}
        titleStyle={styles.transparentButtonText}
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default connect(null, { setUser, setSettings, setStats })(LoginScreen);
