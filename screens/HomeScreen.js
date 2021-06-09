import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ImageBackground, View } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth, db } from "../firebase";
import { loadDictionary } from "../actions/dictionary";
import dictionaryJSON from "../assets/dictionary.json";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { setUser, setSettings } from "../actions/user";
import backgroundImage from "../assets/wp2.jpg";

const HomeScreen = ({ navigation, user, settings, setUser, setSettings, loadDictionary }) => {
  // Sign Out:
  const signOutUser = () => {
    auth.signOut().then(() => {
      // remove user from state and navigate to login screen:
      setUser(null);
      setSettings(null);
      navigation.replace("Login");
    });
  };

  // Load Dictionary from JSON:
  useEffect(() => {
    let filteredDictionary = {};
    if (settings) {
      Object.keys(dictionaryJSON).forEach((mood) => {
        // if not all the tenses are false in the mood setting we load the tenses:
        if (Object.values(settings[mood]).every((item) => item === false) === false) {
          filteredDictionary[mood] = {};
          // load the only the selected tenses from the settings:
          Object.keys(dictionaryJSON[mood]).forEach((tense) => {
            if (settings[mood][tense] === true) {
              filteredDictionary[mood][tense] = dictionaryJSON[mood][tense];
            }
          });
        }
      });
    }
    // save the filtered dictionary:
    loadDictionary(filteredDictionary);
  }, [settings]);

  if (user?.displayName) {
    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
        <View style={styles.container}>
          {user?.photoURL && <Avatar source={{ uri: user.photoURL }} size="xlarge" rounded />}
          <Text h3>¡Hola {user?.displayName}!</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <AntDesign name="setting" size={36} color="black" />
          </TouchableOpacity>
          <Button
            containerStyle={styles.buttonContainer}
            onPress={() => navigation.navigate("Practice")}
            title="¡Vamos a practicar!"
          />
          <Button containerStyle={styles.buttonContainer} onPress={signOutUser} title="Sign out" type="outline" />
        </View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground source={backgroundImage} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}>
        <View style={styles.container}>
          <Text>loading...</Text>
        </View>
      </ImageBackground>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setUser, setSettings, loadDictionary })(HomeScreen);
