import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Avatar, Button, Text } from "react-native-elements";
import { styles } from "../Styles";
import { auth } from "../firebase";
import { loadDictionary } from "../actions/dictionary";
import dictionaryJSON from "../assets/dictionary.json";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation, loadDictionary }) => {
  // Sign Out:
  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  // Load Dictionary from JSON:
  useEffect(() => loadDictionary(dictionaryJSON), []);

  return (
    <View style={styles.container}>
      {auth?.currentUser?.photoURL && <Avatar source={{ uri: auth?.currentUser?.photoURL }} size="xlarge" rounded />}
      <Text h3>¡Hola {auth?.currentUser?.displayName}!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <AntDesign name="setting" size={24} color="black" />
      </TouchableOpacity>
      <Button
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate("Uploader")}
        title="¡Vamos a practicar!"
      />
      <Button containerStyle={styles.buttonContainer} onPress={signOutUser} title="Sign out" type="outline" />
    </View>
  );
};

export default connect(null, { loadDictionary })(HomeScreen);
