import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Image } from "react-native";
import { Text, Button, Input } from "react-native-elements";

import { setUser, setSettings, setStats, setStreakDone } from "../actions/user";

import { auth, db } from "../firebase";
import { styles } from "../Styles";
import logo from "../assets/logo.png";

const LoginScreen = ({ navigation, setUser, setSettings, setStats, setStreakDone }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    this.setMinutes(this.getMinutes() + (h % 1) * 60);
    return this;
  };

  // Navigate to the home screen if logged in:
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Loading");
        setUser(authUser);
        // load the settings:
        db.collection("users")
          .doc(authUser.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setSettings(doc.data().settings);

              // check if daily streak is broken:
              const oneDay = 24 * 60 * 60 * 1000;
              if (doc.data().stats.lastPracticeTime) {
                var currentDateTime = new Date();
                currentDateTime.addHours(-currentDateTime.getTimezoneOffset() / 60);
                var lastTime = doc.data().stats.lastPracticeTime.toDate();
                var lastPracticeDay = new Date(lastTime.getFullYear(), lastTime.getMonth(), lastTime.getDate());
                lastPracticeDay.addHours(-lastPracticeDay.getTimezoneOffset() / 60);
                var newStreakCount = currentDateTime - lastPracticeDay > 2 * oneDay ? 0 : doc.data().stats.streakCount;
                setStreakDone(currentDateTime - lastPracticeDay <= oneDay);
                var newStats = { ...doc.data().stats, streakCount: newStreakCount };
                doc.ref.update({ stats: newStats });
                setStats(newStats);
              } else {
                setStats(doc.data().stats);
              }
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

export default connect(null, { setUser, setSettings, setStats, setStreakDone })(LoginScreen);
