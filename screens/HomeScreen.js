import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth, db } from "../firebase";
import { loadDictionary } from "../actions/dictionary";
import dictionaryJSON from "../assets/dictionary.json";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { setUser, setSettings } from "../actions/user";

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
    loadDictionary(dictionaryJSON);
    console.log("dict reloaded");
  }, [settings]);

  if (user?.displayName) {
    return (
      <View style={styles.container}>
        {user?.photoURL && <Avatar source={{ uri: user.photoURL }} size="xlarge" rounded />}
        <Text h3>¡Hola {user?.displayName}!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
        <Button
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate("Practice")}
          title="¡Vamos a practicar!"
        />
        <Button containerStyle={styles.buttonContainer} onPress={signOutUser} title="Sign out" type="outline" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  settings: state.user.settings,
});

export default connect(mapStateToProps, { setUser, setSettings, loadDictionary })(HomeScreen);
